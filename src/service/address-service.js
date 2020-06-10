var _mm = require('util/hm.js');

var _address = {
    // request address list
    getAddressList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/list.do'),
            data    :{
                pageSize:50
            },
            success : resolve,
            error   : reject
        });
    },
    // add new address
    save : function(addressInfo,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/add.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _address;