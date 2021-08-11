const HTTP = require("./request.js");

module.exports = {

    "getHomeBanner":function(){
        return HTTP({
            // method:"post",
            // data:{},
            url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
        })
    },
    "getHomeGoods":function(){
        return HTTP({
            url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/search"
        })
    },
    "getGoodsDetail":function(data){
        return HTTP({
            url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",
            data
        })
    }


}