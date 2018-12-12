
Page({
  data: {
    books: Object,
  },

  onLoad: function (options) {
    var books = wx.getStorageSync(
      'books'
      ) 
    this.setData({
      books: books
    })
  },

  onShareAppMessage() {

  }
})