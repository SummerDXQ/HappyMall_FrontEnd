require('./index.css');
let _mm     = require('util/hm.js');
let _user   = require('service/user-service.js');
let _cart = require('service/cart-service.js');

// Navigation
var nav = {
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent : function(){
        // login
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        // register
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        // logout
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },
    // load user information
    loadUserInfo : function(){
        _user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
        }, function(errMsg){
            // do nothing
        });
    },
    // load shopping cart quantity
    loadCartCount:function () {
        _cart.getCartCount()
            .then(
                (res)=>$('.nav .cart-count').text(res || 0)
            )
            .catch(
                (errMsg)=>$('.nav .cart-count').text(0)
            )
    }
};

module.exports = nav.init();