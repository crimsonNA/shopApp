const HTTP = require("./request.js");

module.exports = {
    "getgoodsdetail": function (data) {
        return HTTP({
            url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/search",
            data
        })
    },
}