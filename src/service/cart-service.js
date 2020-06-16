import _hm from "util/hm";

let _cart = {
    // get shopping cart quantity
    getCartCount (){
        return _hm.request({
            url     : _hm.getServerUrl('/cart/get_cart_product_count.do'),
        });
    },
    // Add to shopping cart
    addToCart (productInfo){
        return _hm.request({
            url     : _hm.getServerUrl('/cart/add.do'),
            data    : productInfo,
        });
    },
    // Request product list
    getCartList (){
        return _hm.request({
            url     : _hm.getServerUrl('/cart/list.do'),
        });
    },
    // select product
    selectProduct (productId){
        return _hm.request({
            url     : _hm.getServerUrl('/cart/select.do'),
            data    : {productId : productId}
        });
    },
    // deselect product
    unselectProduct (productId){
        return _hm.request({
            url     : _hm.getServerUrl('/cart/un_select.do'),
            data    : {productId : productId},
        });
    },
    // select all product
    selectAllProduct (){
        return _hm.request({
            url     : _hm.getServerUrl('/cart/select_all.do'),
        });
    },
    // deselect all product
    unselectAllProduct (){
        return _hm.request({
            url     : _hm.getServerUrl('/cart/un_select_all.do'),
        });
    },
    // update product quantity
    updateProduct (productInfo){
        return _hm.request({
            url     : _hm.getServerUrl('/cart/update.do'),
            data    : productInfo,
        });
    },
    // delete a product
    deleteProduct (productIds){
        return _hm.request({
            url     : _hm.getServerUrl('/cart/delete_product.do'),
            data    : {productIds:productIds},
        });
    },
    // delete selected product


}

export default _cart;