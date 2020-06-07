var _mm = require('util/hm.js');

var _user = {
    // User login
    login : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/login.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // Check username's availability
    checkUsername : function(username, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/check_valid.do'),
            data    : {
                type    : 'username',
                str     : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // User register
    register : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/register.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 检查登录状态
    checkLogin : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // Get password reset remind question
    getQuestion : function(username, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_get_question.do'),
            data    : {username : username},
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // check answer for password reset question
    checkAnswer : function(userInfo, resolve, reject){
        console.log(userInfo);
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_check_answer.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // reset password
    resetPassword : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // Get user information
    getUserInfo : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_information.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // Update user information
    updateUserInfo : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/update_information.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // update password
    updatePassword : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 登出
    logout : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _user;