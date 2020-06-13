var _mm = require('util/hm.js');

var _payment = {
    // request payment info
    getPaymentInfo : function(orderNumber,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/pay.do'),
            data    : {
                orderNo:orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    // request order status
    getPaymentStatus : function(orderNumber,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/query_order_pay_status.do'),
            data    : {
                orderNo:orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _payment;