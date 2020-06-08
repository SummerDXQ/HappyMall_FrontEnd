var _mm = require('util/hm.js');

var _cart = {
    // get shopping cart quantity
    getCartCount : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error   : reject
        });
    },
    // Add to shopping cart
    addToCart : function(productInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/add.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    // Request product list
    getCartList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/list.do'),
            success : resolve,
            error   : reject
        });
    },
    // select product
    selectProduct : function(productId,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/select.do'),
            data    : {productId : productId},
            success : resolve,
            error   : reject
        });
    },
    // deselect product
    unselectProduct : function(productId,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select.do'),
            data    : {productId : productId},
            success : resolve,
            error   : reject
        });
    },
    // select all product
    selectAllProduct : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // deselect all product
    unselectAllProduct : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // update product quantity
    updateProduct : function(productInfo,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/update.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    // delete a product
    deleteProduct : function(productIds,resolve, reject){
        console.log(productIds);
        _mm.request({
            url     : _mm.getServerUrl('/cart/delete_product.do'),
            data    : {productIds:productIds},
            success : resolve,
            error   : reject
        });
    },
    // delete selected product


}
module.exports = _cart;