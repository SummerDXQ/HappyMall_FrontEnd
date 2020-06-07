var _mm = require('util/hm.js');

var _product = {
    // Request product list
    getProductDetail : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _product;