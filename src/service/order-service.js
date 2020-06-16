let _hm = require('util/hm.js');

var _cart = {
    // get shopping cart quantity
    getProductList (){
        return _hm.request({
            url     : _hm.getServerUrl('/order/get_order_cart_product.do'),
        });
    },
    // submit order
    createOrder (orderInfo){
        return _hm.request({
            url     : _hm.getServerUrl('/order/create.do'),
            data    : orderInfo,
        });
    },
    // request order list
    getOrderList (listParam){
        return _hm.request({
            url     : _hm.getServerUrl('/order/list.do'),
            data    : listParam,
        });
    },
    // request order detail
    getOrderDetail (orderNumber){
        return _hm.request({
            url     : _hm.getServerUrl('/order/detail.do'),
            data    : {
                orderNo:orderNumber
            },
        });
    },
    // cancel order
    cancelOrder (orderNumber){
        return _hm.request({
            url     : _hm.getServerUrl('/order/cancel.do'),
            data    : {
                orderNo:orderNumber
            }
        });
    }
}
module.exports = _cart;