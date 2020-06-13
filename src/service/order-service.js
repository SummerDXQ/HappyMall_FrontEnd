var _mm = require('util/hm.js');

var _cart = {
    // get shopping cart quantity
    getProductList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error   : reject
        });
    },
    // submit order
    createOrder : function(orderInfo,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/create.do'),
            data    : orderInfo,
            success : resolve,
            error   : reject
        });
    },
    // request order list
    getOrderList:function(listParam,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    // request order detail
    getOrderDetail:function(orderNumber,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/detail.do'),
            data    : {
                orderNo:orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    // cancel order
    cancelOrder:function(orderNumber,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/cancel.do'),
            data    : {
                orderNo:orderNumber
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _cart;