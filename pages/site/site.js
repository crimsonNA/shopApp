// pages/site/site.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        msg: [{
            index: 10,
            name: "张三",
            phone: "13345678901",
            area: "广东省广州市天河区",
            site: "珠吉路100号",
            checked: 'true'
        }, ],
        index: 0,
    },
    radioChange(e) {
        console.log(e);
        console.log(e.detail);
        const msg = this.data.msg
        let site = wx.getStorageSync('site')
        console.log(site.length);
        for (let i = 0, len = msg.length; i < len; ++i) {
            msg[i].checked = msg[i].index == e.detail.value
            wx.setStorageSync('nowIndex', e.detail.value)
            console.log(msg[i]);
        }

        this.setData({
            msg
        })
        console.log(this.data.msg);
    },

    del(e) {
        let index = e.currentTarget.dataset.index
        console.log(index);
        let site = wx.getStorageSync('site');

        let delIndxe = site.findIndex((item) => item.index == index);
        site.splice(delIndxe, 1)

        wx.setStorageSync('site', site)
        wx.setStorageSync('nowIndex', e.detail.value)
        this.setData({
            msg: site
        })
        console.log(this.data.msg);
    },
    compile(e) {
        let index = e.currentTarget.dataset.index;
        console.log(index);
        wx.navigateTo({
            url: '/pages/address/address?index=' + index,
        })
    },
    geAddress() {
        let type = this.data.type;
        console.log(type);
        wx.navigateTo({
            url: '/pages/address/address?type=' + 1,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.type);
        let site = wx.getStorageSync('site')
        this.setData({
            msg: site,
            type: options.type,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let Index = wx.getStorageSync('nowIndex')
        if (Index == "") {
            wx.setStorageSync('nowIndex', 0)
        }
        let nowIndex = wx.getStorageSync('nowIndex')
        console.log(nowIndex);
        const msg = this.data.msg
        console.log(msg);
        if (msg == "") {
            return;
        } else {
            msg[nowIndex].checked = true;
            this.setData({
                msg
            })
        }

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