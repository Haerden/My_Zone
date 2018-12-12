//app.js
var config = require('config/config.js');
App({
  onLaunch: function () {

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.getSystemInfo({
      success: (res) => {
        this.systemInfo = res;
        let px = 750 / res.windowWidth;
        this.systemInfo.windowHeightRpx = res.windowHeight * px;
      }
    });
    // 获取Books
    this.getAllBooks()
  },
  getAllBooks: function () {
    wx.request({
      url: `${config.host}/Book_getAllBooks.action`,
      data: {},
      method: 'GET',
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        let result = res.data.data;
        if (!result) {
          wx.showToast({ title: result.msg });
          return false;
        }
        wx.setStorage({
          key: 'books',
          data: result
        });
      }
    });
  },

  globalData: {
    userInfo: null
  },
  // 注册回到顶部
  registerGoTop: function (page) {
    page.onGoTop = () => {
      this.onGoTop(page);
    }
  },
  onGoTop: function (page) {
    page.setData({
      scrollTop: 0,
    });
  },

})