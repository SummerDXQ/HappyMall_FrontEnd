import 'page/common/header/index.js'
import 'page/common/nav/index.js'
import './index.css';
import navSide from "page/common/nav-side";
import _hm from "util/hm";
import _user from "service/user-service";

// page logic
let page = {
    init:function () {
        this.onload();
        this.bindEvent();
    },
    onload:function () {
        // initiate side navigation
        navSide.init({
            name:'user-pass-update'
        })
    },
    bindEvent:function () {
        let that = this;
        // press save button
        $(document).on('click','.btn-submit',function () {
            let userInfo = {
                password:$.trim($('#password-old').val()),
                passwordNew:$.trim($('#password-new').val()),
                passwordConfirm:$.trim($('#password-confirm').val()),
            }
            let validateResult = that.validateForm(userInfo);
            if(validateResult.status){
                // update password
                _user.updatePassword({
                    passwordOld : userInfo.password,
                    passwordNew : userInfo.passwordNew
                }).then( (res) =>{
                    _hm.successTips(res);
                }).catch( (errMsg) =>{
                    _hm.errorTips(errMsg);
                })
            }else {
                _hm.errorTips(validateResult.msg);
            }
        })
    },
    // validate input data
    validateForm : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        // validate old password
        if(!_hm.validate(formData.password, 'required')){
            result.msg = 'Old password is required';
            return result;
        }
        if (!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = 'New password length should greater than 6';
            return result;
        }
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = 'New password and confirm password should be same';
            return result;
        }
        result.status   = true;
        result.msg      = 'Successfully Validate';
        return result;
    }
};
$(function () {
    page.init();
})