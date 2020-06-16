var _hm = require('util/hm.js');

var _payment = {
    // request payment info
    getPaymentInfo (orderNumber){
        return _hm.request({
            url     : _hm.getServerUrl('/order/pay.do'),
            data    : {
                orderNo:orderNumber
            }
        });
    },
    // request order status
    getPaymentStatus (orderNumber){
        return _hm.request({
            url     : _hm.getServerUrl('/order/query_order_pay_status.do'),
            data    : {
                orderNo:orderNumber
            }
        });
    },
}
module.exports = _payment;