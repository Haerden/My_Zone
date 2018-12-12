var config = require('/../../config/config.js');
const app = getApp()
Page({
  data: {
    list: [],
    currentPage: 1,
    totalPage: 0,
    //更多 0初始 1加载更多 2全部加载完成
    hasMore: 0,
    isShow: false,
    scrollTop: 0,
  },

  onLoad: function () {
    getApp().registerGoTop(this);
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    this.getListData();
  
  },
  getListData(){
    let submitData = {
      currPage: this.data.currentPage,
    };
    wx.request({
      url: `${config.host}/Book_getNewsList.action`,
      data: submitData,
      method: 'GET',
      header: {
        'Content-Type': 'json'
      },
      success: (res) => {
        let result = res.data;
        if (!result) {
          wx.showToast({ title: result.msg });
          return false;
        }
        this.setData({
          // list: result
          list: this.data.list.concat(result.data),
          totalPage: parseInt((result.total + 10 - 1) / 10),
        })
      },
      complete: (res) => {
        wx.hideLoading()
      }
    });
  },

  // 滚动条滚到底部事件
  onScrollToLower: function (e) {
    if (this.data.currentPage == this.data.totalPage) {
      this.setData({
        hasMore: 2,
      });
      return false;
    } else {
      this.setData({
        hasMore: 1,
      });
    }
    this.setData({
      currentPage: this.data.currentPage + 1,
    });
    this.getListData();
  },
  scroll: function (e) {
    if (e.detail.scrollTop > getApp().systemInfo.windowHeight) {
      this.setData({
        isShow: true
      });
    } else {
      this.setData({
        isShow: false
      });
    }
  },
  refresh: function () {
    this.setData({
      list: [],
      currentPage: 1,
      totalPage: 0,
      hasMore: 0,
      isShow: false,
      scrollTop: 0,
      emptyMessage: false,
    });
    this.getListData();
  },
})
