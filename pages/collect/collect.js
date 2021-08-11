// pages/collect/collect.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsList: "",
    },
    del(options) {
        console.log(options);
        let index = options.currentTarget.dataset.index;

        this.data.goodsList.splice(index, 1);

        this.setData({
            goodsList: this.data.goodsList
        })


        let id = options.currentTarget.dataset.id;
        console.log(id);
        let goodsCollList = wx.getStorageSync('goodsCollList');
        console.log(goodsCollList);
        if (goodsCollList) {
            let index = goodsCollList.findIndex(item => item.id == id);
            console.log(index);
            goodsCollList.splice(index, 1);
            wx.setStorageSync("goodsCollList", goodsCollList)
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var goodsCollList = wx.getStorageSync("goodsCollList");
        console.log(goodsCollList);
        this.setData({
            goodsList: goodsCollList
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 获取数据
        var getCollData = wx.getStorageSync("goodsCollList");
        this.setData({
            goodsList: getCollData
        });
        console.log(this.data.goodsList);
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})