// pages/search/search.js
var {
    getSearch
} = require("../../api/search");
var {
    getHomeGoods
} = require("../../api/Home");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        shoopingtext: "",
    },
    search: function (e) {
        let searchtext = this.data.shoopingtext;
        console.log(searchtext);
        getSearch({
            "query": searchtext
        }).then(data => {
            let lists = [];
            let goodslists = data.message.goods;
            goodslists.forEach(item => {
                let {
                    goods_id,
                    goods_small_logo,
                    goods_name,
                    goods_price
                } = item;
                let data = {
                    id: goods_id,
                    goodsImage: goods_small_logo,
                    goodsName: goods_name,
                    goodsAddress: "广州",
                    goodsPrice: goods_price
                };
                if (goods_small_logo) {
                    lists.push(data);
                }
            })
            this.setData({
                goodsList: lists
            })
        })
    },
    del() {
        console.log(111);
        this.setData({
            shoopingtext: "",
        })
    },

    shoppinginput: function (e) {
        this.setData({
            shoopingtext: e.detail.value
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        getHomeGoods().then((data) => {
            let tjlists = [];
            let tjgoodslists = data.message.goods;
            tjgoodslists.forEach(item => {
                let {
                    goods_id,
                    goods_small_logo,
                    goods_name,
                    goods_price
                } = item;
                let data = {
                    id: goods_id,
                    goodsImage: goods_small_logo,
                    goodsName: goods_name,
                    goodsAddress: "广州",
                    goodsPrice: goods_price
                };
                if (goods_small_logo) {
                    tjlists.push(data);
                }
            })
            this.setData({
                tjgoodsList: tjlists
            })
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