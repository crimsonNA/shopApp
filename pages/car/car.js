// pages/car/car.js

var {
    getHomeGoods
} = require("../../api/Home");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsList: [
            // {
            //     id:1,
            //     goodsImage:"/images/lists01.webp",
            //     goodsName:"1商品名称",
            //     goodsAddress:"广州",
            //     goodsPrice:"200",
            //     num:1,
            // },
            // {
            //     id:2,
            //     goodsImage:"/images/lists01.webp",
            //     goodsName:"2商品名称",
            //     goodsAddress:"广州",
            //     goodsPrice:"200",
            //     num:1,
            // },
        ],
        totalData: 0
    },

    // 跳转购物车页面
    goPay() {

        wx.navigateTo({
            url: "/pages/pay/pay"
        })
    },

    // 数量加一
    add(options) {
        // console.log(options.target.dataset.id);
        let index = options.target.dataset.id;
        let num = this.data.goodsList[index].num;
        let key = "goodsList[" + index + "].num"
        // 写法一
        // let obj = {};
        // obj[key] = num+1;
        // this.setData(obj)
        // 写法二  推荐
        this.setData({
            [key]: num + 1
        })

        this.getTotal();
    },
    // 数据减一
    reduce(options) {

        let index = options.target.dataset.id;
        let num = this.data.goodsList[index].num;
        let key = "goodsList[" + index + "].num";
        num = num <= 1 ? 1 : num - 1;
        this.setData({
            [key]: num
        })

        this.getTotal();
    },

    // 删除数据
    del(options) {
        console.log(options);
        let index = options.currentTarget.dataset.id;
        this.data.goodsList.splice(index, 1);
        // this中数据删除后重新渲染视图
        this.setData({
            goodsList: this.data.goodsList
        })

        this.getTotal();
    },

    // 计算总价格
    getTotal: function () {
        // 获取数据
        let goodsList = this.data.goodsList;

        if (goodsList == "") {
            return;
        } else {
            let data = goodsList.reduce(function (total, item) {
                return total + item.num * item.goodsPrice;
            }, 0)

            this.setData({
                totalData: data
            })
        }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getTotal();
        getHomeGoods().then((data) => {
            console.log(data.message.goods);
            let lists = [];
            let reclists = data.message.goods;
            reclists.forEach(item => {
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
                reclists: lists
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
        // 获取数据
        var getCartData = wx.getStorageSync("goodsCarlist");
        this.setData({
            goodsList: getCartData
        });

        this.getTotal();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        // 离开页面，更新数据缓存
        wx.setStorageSync("goodsCarlist", this.data.goodsList)
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