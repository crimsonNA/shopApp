// pages/home/home.js
var {
    getHomeBanner,
    getHomeGoods
} = require("../../api/Home");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgs: [
            "/images/banner01.jpg",
            "/images/banner02.jpg",
            "/images/banner03.jpg",
            "/images/banner04.jpg",
        ],
        iconArray: [{
                url: "/images/icon-qiandao.png",
                text: "大家电",
            },
            {
                url: "/images/icon-fujin.png",
                text: "热门推荐",
            },
            {
                url: "/images/icon-zhanhui.png",
                text: "海外购",
            },
            {
                url: "/images/icon-fuli.png",
                text: "苏宁房产",
            },
            {
                url: "/images/icon-muma.png",
                text: "手机相机",
            },
            {
                url: "/images/icon-tiyu.png",
                text: "电脑办公",
            },
            {
                url: "/images/icon-xingxing.png",
                text: "厨卫电器",
            },
            {
                url: "/images/icon-qinzi.png",
                text: "食品酒水",
            },
        ],
        goodsList: [
            // {
            //     id:1,
            //     goodsImage:"/images/lists01.webp",
            //     goodsName:"1商品名称",
            //     goodsAddress:"广州",
            //     goodsPrice:"200"
            // },
            // {
            //     id:2,
            //     goodsImage:"/images/lists01.webp",
            //     goodsName:"2商品名称",
            //     goodsAddress:"广州",
            //     goodsPrice:"200"
            // },
        ]

    },

    goCategory(options) {
        console.log(options)
        let index = options.currentTarget.dataset.index;
        // 向数据缓存中存储数据
        wx.setStorageSync('categoryIndex', index);
        // wx.switchTab tabbar中方法无法传参
        wx.switchTab({
            url: '/pages/category/category',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        getHomeBanner().then((data) => {
            this.setData({
                imgs: data.message
            })
        })

        getHomeGoods().then((data) => {
            console.log(data.message.goods);
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