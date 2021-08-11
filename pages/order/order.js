// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderLists: null,
        index: 3 //全部显示
    },

    // 修改tabs下标
    setIndex(options) {
        let index = options.target.dataset.index;
        console.log(index);
        this.setData({
            index
        })
    },
    setDel(options) {
        // 拿到当前点击的商品的自定义属性
        let orderId = options.currentTarget.dataset.orderid;
        // 拿到商品列表
        let list = wx.getStorageSync('orderLists')
        // 用自定义属性找到该对象在列表数值中的下标
        let currentIndex = list.findIndex((item) => item.orderId === orderId);
        // 删除当前
        list.splice(currentIndex, 1)
        // 重新将列表存储
        wx.setStorageSync("orderLists", list)
        // 重新获取列表
        let orderLists = wx.getStorageSync("orderLists");
        this.setData({
            orderLists
        })
    },

    setPay(options) {
        // 拿到当前点击的商品的自定义属性
        let orderId = options.currentTarget.dataset.orderid;
        // 拿到商品列表
        let list = wx.getStorageSync('orderLists')
        // 用自定义属性找到该对象在列表数值中的下标
        let currentIndex = list.findIndex((item) => item.orderId === orderId);
        // type设为3
        list[currentIndex].type = 2;
        // 重新将列表存储
        wx.setStorageSync("orderLists", list)
        // 重新获取列表
        let orderLists = wx.getStorageSync("orderLists");
        this.setData({
            orderLists
        })
    },

    setSpend(options) {
        // 拿到当前点击的商品的自定义属性
        let orderId = options.currentTarget.dataset.orderid;
        // 拿到商品列表
        let list = wx.getStorageSync('orderLists')
        // 用自定义属性找到该对象在列表数值中的下标
        let currentIndex = list.findIndex((item) => item.orderId === orderId);
        // type设为3
        list[currentIndex].type = 3;
        // 重新将列表存储
        wx.setStorageSync("orderLists", list)
        // 重新获取列表
        let orderLists = wx.getStorageSync("orderLists");
        this.setData({
            orderLists
        })
    },

    setComment(options) {
        // 拿到当前点击的商品的自定义属性
        let orderId = options.currentTarget.dataset.orderid;
        // 拿到商品列表
        let list = wx.getStorageSync('orderLists')
        // 用自定义属性找到该对象在列表数值中的下标
        let currentIndex = list.findIndex((item) => item.orderId === orderId);
        // type设为3
        list[currentIndex].type = 4;
        // 重新将列表存储
        wx.setStorageSync("orderLists", list)
        // 重新获取列表
        let orderLists = wx.getStorageSync("orderLists");
        this.setData({
            orderLists
        })
    },

    setOrderLists(type) {

        // 没有数据时候不添加订单
        let goodsCarlistData = wx.getStorageSync("goodsCarlist");
        if (!goodsCarlistData) {
            return;
        }

        let orderData = {
            orderId: new Date().getTime(),
            orderLists: null,
            type, //1:待支付 2:待发货 3:待收货 4:待评价
            total: this.data.totalData
        };
        // 添加商品列表到订单中
        orderData.orderLists = this.data.goodsList;
        // 1.判断是否有订单
        let orderLists = wx.getStorageSync("orderLists");
        if (orderLists) {
            // 有订单添加订单
            orderLists.push(orderData);
            wx.setStorageSync("orderLists", orderLists)
        } else {
            // 没有订单
            wx.setStorageSync("orderLists", [orderData])
        }


        // 请求购物车数据
        wx.removeStorageSync("goodsCarlist")
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.setData({
            index: options.index,
        })
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

        let orderLists = wx.getStorageSync("orderLists");
        this.setData({
            orderLists,
            index: 0
        })
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
        wx.reLaunch({
            url: '/pages/my/my',
        })
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