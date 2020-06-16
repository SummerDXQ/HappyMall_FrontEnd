import './index.css';
import _hm from "util/hm";
import _user from "service/user-service";
import _cart from "service/cart-service";

// Navigation
let nav = {
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent : function(){
        // login
        $('.js-login').click(function(){
            _hm.doLogin();
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
                _hm.errorTips(errMsg);
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

// module.exports = nav.init();

export default nav.init();