var _hm = require('util/hm.js');

var _product = {
    // Request product list
    getProductList (listParam){
        return _hm.request({
            url     : _hm.getServerUrl('/product/list.do'),
            data    : listParam,
        });
    },
    // Request product detail
    getProductDetail (productId){
        return _hm.request({
            url     : _hm.getServerUrl('/product/detail.do'),
            data    : {productId:productId},
        });
    },
}
module.exports = _product;