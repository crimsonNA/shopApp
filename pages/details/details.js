// pages/details/details.js
var {
    getGoodsDetail
} = require("../../api/Home.js");
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
        goods: {
            // id: 2,
            // goodsImage: "/images/lists01.webp",
            // goodsName: "2商品名称",
            // goodsImgs: [
            //     "/images/banner01.jpg",
            //     "/images/banner02.jpg",
            //     "/images/banner03.jpg",
            //     "/images/banner04.jpg",
            // ],
            // goodsAddress: "广州",
            // goodsPrice: "200",
            // goodsPriceOld: "300",
            // goodsDetails: "/images/IMG_0466.JPG"
        },
        isCollect: false,
        num: 0 //购物车商品数量
    },

    goCart() {
        wx.switchTab({
            url: '/pages/car/car',
        })
    },
    goHome() {
        wx.switchTab({
            url: '/pages/home/home',
        })
    },
    setPay() {
        let cartLists = {
            id: this.data.goods.id,
            goodsImage: this.data.goods.goodsImage,
            goodsName: this.data.goods.goodsName,
            goodsPrice: this.data.goods.goodsPrice,
            num: 1,
        }
        let goodsCarList = wx.getStorageSync("goodsCarlist"); //获取数据
        // 2.有数据
        if (goodsCarList) {
            // 2.1有相同数据，数据加一
            let index = goodsCarList.findIndex(item => item.id == this.data.goods.id);
            if (index != -1) { //有相同数据
                goodsCarList[index].num += 1;
            } else {
                // 2.2有数据没有相同数据,添加数据
                goodsCarList.push(cartLists);
            }

            wx.setStorageSync("goodsCarlist", goodsCarList);

        } else {
            // 3.没有数据 添加数据
            wx.setStorageSync("goodsCarlist", [cartLists]);
        }

        this.setData({
            num: wx.getStorageSync('goodsCarlist').length
        })

        wx.navigateTo({
            url: "/pages/pay/pay"
        })
    },



    // 加入购物车
    setCart() {
        // 购物车数据结构
        let cartLists = {
            id: this.data.goods.id,
            goodsImage: this.data.goods.goodsImage,
            goodsName: this.data.goods.goodsName,
            goodsPrice: this.data.goods.goodsPrice,
            num: 1,
        }
        // 数据添加数据缓存中
        // 1.判断数据缓存中是否有数据
        let goodsCarList = wx.getStorageSync("goodsCarlist"); //获取数据
        // 2.有数据
        if (goodsCarList) {
            // 2.1有相同数据，数据加一
            let index = goodsCarList.findIndex(item => item.id == this.data.goods.id);
            if (index != -1) { //有相同数据
                goodsCarList[index].num += 1;
            } else {
                // 2.2有数据没有相同数据,添加数据
                goodsCarList.push(cartLists);
            }

            wx.setStorageSync("goodsCarlist", goodsCarList);

        } else {
            // 3.没有数据 添加数据
            wx.setStorageSync("goodsCarlist", [cartLists]);
        }

        this.setData({
            num: wx.getStorageSync('goodsCarlist').length
        })

    },

    // 添加到收藏
    collect() {
        // var isColl = this.data.isCollect;

        this.setData({
            isCollect: !this.data.isCollect
        })
        if (this.data.isCollect == true) {
            wx.showToast({
                title: '收藏成功',
            })
            console.log("收藏");
            let collList = {
                id: this.data.id,
                id: this.data.goods.id,
                goodsImage: this.data.goods.goodsImage,
                goodsName: this.data.goods.goodsName,
                goodsPrice: this.data.goods.goodsPrice,
            }
            let goodsCollList = wx.getStorageSync('goodsCollList');
            console.log(goodsCollList);
            if (goodsCollList) {
                goodsCollList.push(collList);
                wx.setStorageSync("goodsCollList", goodsCollList);
            } else {
                wx.setStorageSync("goodsCollList", [collList]);
            }
        } else if (this.data.isCollect == false) {
            wx.showToast({
                title: '取消收藏',
            })
            console.log("取消收藏");
            let goodsCollList = wx.getStorageSync('goodsCollList');
            console.log(goodsCollList);
            if (goodsCollList) {
                let index = goodsCollList.findIndex(item => item.id == this.data.goods.id);
                console.log(index);
                goodsCollList.splice(index, 1)
                console.log(goodsCollList);
                wx.setStorageSync("goodsCollList", [goodsCollList]);
            }
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = options.id;
        getGoodsDetail({
            "goods_id": id
        }).then((data) => {
            console.log(data);
            let {
                goods_id,
                goods_name,
                goods_small_logo,
                pics,
                goods_price,
                goods_introduce
            } = data.message;
            let goods = {
                id: goods_id,
                goodsImage: goods_small_logo,
                goodsName: goods_name,
                goodsImgs: pics,
                goodsAddress: "广州",
                goodsPrice: goods_price,
                goodsPriceOld: goods_price + 100,
                goodsDetails: goods_introduce
            }
            console.log(goods);
            this.setData({
                goods
            })

            // 等数据请求完成之后判断是否已经收藏
            let goodsCollList = wx.getStorageSync('goodsCollList');
            console.log(goodsCollList);
            if (goodsCollList) {
                console.log(goodsCollList);
                console.log(this.data.goods.id);
                let index = goodsCollList.findIndex(item => item.id == this.data.goods.id); {
                    if (index == -1) {
                        this.setData({
                            isCollect: false
                        })
                    } else {
                        this.setData({
                            isCollect: true
                        })
                    }
                }
            }
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
        this.setData({
            num: wx.getStorageSync('goodsCarlist').length
        })

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},

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


// 数据缓存
// 同步操作
// wx.setStorageSync
// wx.getStorageSync
// wx.removeStorageSync
// wx.getStorageInfoSync
// wx.clearStorageSync

// 添加数据 
// wx.setStorageSync("goodslist","加入购物车数据8888888");
// 获取数据
// console.log(wx.getStorageSync("goodslist"));
// 删除数据
// wx.removeStorageSync('goodslist');
// 清除数据  只需要调用方法
// wx.clearStorageSync();
// 获取数据信息
// console.log(wx.getStorageInfoSync());

// 异步操作
// wx.setStorage
// wx.removeStorage
// wx.getStorageInfo
// wx.getStorage
// wx.clearStorage