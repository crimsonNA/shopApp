// pages/pay/pay.js
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
        totalData: 0,
        site: [{
            index: 10,
            name: "张三",
            phone: "13345678901",
            area: "广东省广州市天河区",
            site: "珠吉路100号",
            checked: 'true'
        }, ],
        index: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.setData({
            options
        })
        console.log(this.data.options);
        let site = wx.getStorageSync('site');
        var nowIndex = wx.getStorageSync('nowIndex');
        console.log(site);
        if (site.length == 0) {
            this.setData({
                haveSite: false
            })
        } else {
            this.setData({
                haveSite: true,
                site: site[nowIndex]
            })
        }

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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
    goAddress() {
        wx.navigateTo({
            url: '/pages/site/site?type=' + 1,
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

        // console.log(this.data.options.pay);
        // let cls = this.data.options.pay
        // if (cls) {
        //     var goodsPayList = wx.getStorageSync("goodsPayList");
        //     this.setData({
        //         goodsList: goodsPayList
        //     });
        // } else {
        //     var getCartData = wx.getStorageSync("goodsCarlist");
        //     this.setData({
        //         goodsList: getCartData
        //     });
        // }
        var getCartData = wx.getStorageSync("goodsCarlist");
        this.setData({
            goodsList: getCartData
        });


        this.getTotal();

        let site = wx.getStorageSync('site');
        var nowIndex = wx.getStorageSync('nowIndex');
        // console.log(site[nowIndex]);
        // console.log(site);
        this.setData({
            site: site[nowIndex]
        })
        // console.log(this.data.site);
    },

    goOrder() {
        // 跳转订单页面

        wx.navigateTo({
            url: '/pages/order/order',
        })
        this.setOrderLists(2);
    },

    setOrderLists(type) {

        console.log(111);
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
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        // console.log("监听页面卸载")
        this.setOrderLists(1);
        wx.removeStorageSync("goodsPayList")
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