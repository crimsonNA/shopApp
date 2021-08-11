// pages/cateList/cateList.js
var {
    getgoodsdetail
} = require("../../api/cateList");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsList: [
            // {
            //     id: 1,
            //     goodsImage: "/images/lists01.webp",
            //     goodsName: "1商品名称",
            //     goodsAddress: "广州",
            //     goodsPrice: "200"
            // },
            // {
            //     id: 2,
            //     goodsImage: "/images/lists01.webp",
            //     goodsName: "2商品名称",
            //     goodsAddress: "广州",
            //     goodsPrice: "200"
            // },
        ]

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = options.id
        console.log(id);
        getgoodsdetail({
            "cid": id
        }).then((data) => {
            console.log(data);
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
                lists.push(data);
                console.log(lists);
            })
            this.setData({
                goodsList: lists
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