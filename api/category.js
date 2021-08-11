const HTTP = require("./request.js");

module.exports = {
    "getcategories": function (data) {
        return HTTP({
            url: "https://api-hmugo-web.itheima.net/api/public/v1/categories",
            data
        })
    },
}