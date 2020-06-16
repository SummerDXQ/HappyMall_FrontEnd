var _hm = require('util/hm.js');

var _address = {
    // request address list
    getAddressList (){
        return _hm.request({
            url     : _hm.getServerUrl('/shipping/list.do'),
            data    :{
                pageSize:50
            }
        });
    },
    // add new address
    save (addressInfo){
        return _hm.request({
            url     : _hm.getServerUrl('/shipping/add.do'),
            data    : addressInfo,
        });
    },
    // update address
    update (addressInfo){
        return _hm.request({
            url     : _hm.getServerUrl('/shipping/update.do'),
            data    : addressInfo,
        });
    },
    // get specific address info
    getAddress (shippingId){
        return _hm.request({
            url     : _hm.getServerUrl('/shipping/select.do'),
            data    : {shippingId:shippingId},
        });
    },
    // delete address
    deleteAddress (shippingId){
        return _hm.request({
            url     : _hm.getServerUrl('/shipping/del.do'),
            data    : {shippingId:shippingId},
        });
    },
}
module.exports = _address;