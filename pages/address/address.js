// pages/address/address.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: "",
        phone: "",
        area: "",
        site: "",
        region: ['广东省', '广州市', '海珠区'],
        index: "",
    },


    getMsg(e) {
        console.log(e);
        let item = e.currentTarget.dataset.model;
        console.log(item);

        this.setData({
            [item]: e.detail.value,
        })
        console.log(this.data);
    },
    add() {
        let index = wx.getStorageSync("index")
        console.log(index);
        if (index == "") {
            wx.setStorageSync('index', 0)
            let index = wx.getStorageSync("index")
            console.log(index);
        }
        console.log(this.data.index);
        let addList = {}
        index == "" ? index = 0 : index
        addList.index = index;
        addList.name = this.data.name;
        addList.phone = this.data.phone;
        addList.area = this.data.region[0] + this.data.region[1] + this.data.region[2];
        addList.site = this.data.site;
        // addList.checked = "false";
        console.log(addList);
        index++;
        wx.setStorageSync('index', index)
        let site = wx.getStorageSync('site')
        console.log(site);

        if (site) {
            site.push(addList)
            wx.setStorageSync('site', site)
        } else {
            wx.setStorageSync('site', [addList])
        }
        console.log(this.data.type);
        if (this.data.type == 1) {
            wx.navigateTo({
                url: '/pages/pay/pay',
            })
        }

    },
    bindRegionChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            region: e.detail.value
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.type);
        this.setData({
            type: options.type
        })

        console.log(options);
        let index = options.index;
        console.log(index);
        if (index) {

            let site = wx.getStorageSync('site');
            let currentIndex = site.findIndex((item) => item.index == index)
            console.log(currentIndex);
            console.log(site[currentIndex]);
            site.splice(currentIndex, 1);
            wx.setStorageSync('site', site)
            this.setData({
                name: site[currentIndex].name,
                phone: site[currentIndex].phone,
                area: site[currentIndex].area,
                site: site[currentIndex].site,
                region: ['广东省', '广州市', '海珠区'],
                index: site[currentIndex].index,
            })
        }

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