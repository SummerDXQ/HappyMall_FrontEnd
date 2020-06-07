var _mm = require('util/hm.js');

var _product = {
    // Request product list
    getProductList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    // Request product detail
    getProductDetail : function(productId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/detail.do'),
            data    : {productId:productId},
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _product;