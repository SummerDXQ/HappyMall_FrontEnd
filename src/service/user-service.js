var _hm = require('util/hm.js');

var _user = {
    // User login
    login (userInfo){
        return _hm.request({
            url     : _hm.getServerUrl('/user/login.do'),
            data    : userInfo,
            method  : 'POST',
        });
    },
    // Check username's availability
    checkUsername (username){
        return _hm.request({
            url     : _hm.getServerUrl('/user/check_valid.do'),
            data    : {
                type    : 'username',
                str     : username
            },
            method  : 'POST'
        });
    },
    // User register
    register (userInfo, resolve, reject){
        return _hm.request({
            url     : _hm.getServerUrl('/user/register.do'),
            data    : userInfo,
            method  : 'POST'
        });
    },
    // 检查登录状态
    checkLogin (resolve, reject){
        return _hm.request({
            url     : _hm.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
        });
    },
    // Get password reset remind question
    getQuestion (username){
        return _hm.request({
            url     : _hm.getServerUrl('/user/forget_get_question.do'),
            data    : {username : username},
            method  : 'POST',
        });
    },
    // check answer for password reset question
    checkAnswer (userInfo){
        return _hm.request({
            url     : _hm.getServerUrl('/user/forget_check_answer.do'),
            data    : userInfo,
            method  : 'POST',
        });
    },
    // reset password
    resetPassword (userInfo){
        return _hm.request({
            url     : _hm.getServerUrl('/user/forget_reset_password.do'),
            data    : userInfo,
            method  : 'POST'
        });
    },
    // Get user information
    getUserInfo (){
        return _hm.request({
            url     : _hm.getServerUrl('/user/get_information.do'),
            method  : 'POST'
        });
    },
    // Update user information
    updateUserInfo (userInfo){
        return _hm.request({
            url     : _hm.getServerUrl('/user/update_information.do'),
            data    : userInfo,
            method  : 'POST'
        });
    },
    // update password
    updatePassword (userInfo){
        return _hm.request({
            url     : _hm.getServerUrl('/user/reset_password.do'),
            data    : userInfo,
            method  : 'POST'
        });
    },
    // 登出
    logout (){
        return _hm.request({
            url     : _hm.getServerUrl('/user/logout.do'),
            method  : 'POST'
        });
    }
}
module.exports = _user;