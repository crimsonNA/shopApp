// pages/category/category.js
var {
    getcategories
} = require("../../api/category")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        scrollHeight: 100,
        num: 0, //左侧按钮下标
        num2: 0, //右侧按钮下标
        num3: 0,
        categoryItem: [
            // ["签到"],
            // ["附近"],
            // ["展会"],
            // ["福利"],
            // ["玩乐"],
            // ["体育"],
            // ["周边"],
            // ["亲子"],
        ],
        catrgoryContent: [
            [{
                    name: "电视",
                },
                {
                    name: "电视",
                },
                {
                    name: "电视",
                },
                {
                    name: "电视",
                },
                {
                    name: "电视",
                },
                {
                    name: "电视",
                },
                {
                    name: "电视",
                },
            ]
        ],
        content: [
            [{
                    img: "/images/goods01.jpg",
                    name: "商品"
                },
                {
                    img: "/images/goods01.jpg",
                    name: "商品"
                },
            ],
            [{
                    img: "/images/goods02.jpg",
                    name: "商品"
                },
                {
                    img: "/images/goods02.jpg",
                    name: "商品"
                },
            ],
            [{
                    img: "/images/goods03.jpg",
                    name: "商品"
                },
                {
                    img: "/images/goods03.jpg",
                    name: "商品"
                },
            ],
        ]
    },

    // 自定义方法
    // 触发修改下标
    setIndex(options) {
        // console.log(options);
        let index = options.target.dataset.id;
        this.setData({
            num: index
        })
    },

    setNum(options) {
        // console.log(options);
        let index = options.target.dataset.id;
        // console.log(index)
        this.setData({
            num2: index
        })
    },
    setList(options) {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 通过微信api接口获取信息
        wx.getSystemInfo({
            success: (result) => {
                // console.log(result.windowHeight);
                // 修改data里面数据
                // 调用this.setData();
                this.setData({
                    scrollHeight: result.windowHeight
                })
            },
        })

        getcategories().then((data) => {
            // console.log(data.message);
            let categorylist = [];
            let categoryList = data.message;
            categoryList.forEach(item => {
                let {
                    cat_id,
                    cat_name,
                    children
                } = item;
                let data = {
                    id: cat_id,
                    name: cat_name,
                    cat: children
                };
                categorylist.push(data);
                // console.log(categorylist);
            })

            let childLists = [];
            let childList = data.message;
            console.log(childList);
            childList.forEach(item => {
                let {
                    cat_id,
                    cat_name,
                    children
                } = item;
                let data = {
                    id: cat_id,
                    name: cat_name,
                    cat: children
                };
                childLists.push(data);

                this.setData({
                    catrgoryContent: childLists,
                    content: childLists,
                })
            })

            this.setData({
                categoryItem: categorylist,
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
        // 因为经常切换路由，使用onshow
        this.setData({
            num: wx.getStorageSync("categoryIndex") || 0
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