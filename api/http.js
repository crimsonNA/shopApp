export function getHomeBanner(callback){
    wx.request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        success(res){
            callback(res.data)
        }
      })

}