import './index.css';
import 'page/common/nav-simple/index.js';
let _hm = require('util/hm.js');
let _user = require('service/user-service.js');

// form error message
let formError = {
    show:function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg)
    },
    hide:function (errMsg) {
        $('.error-item').show().find('.err-msg').text('')
    },
}
// page logic
let page = {
    init:function () {
        this.bindEvent();
    },
    bindEvent:function () {
        let that = this;
        // click submit button
        $('#submit').click(function () {
            that.submit();
        })
        // press enter to submit
        $('.user-content').keyup(function (e) {
            if (e.keyCode === 13){
                that.submit();
            }
        })
    },
    // submit login data
    submit:function () {
        // window.location.href ='./index.html';
        let that = this;
        let formData = {
            username:$.trim($('#username').val()),
            password:$.trim($('#password').val()),
        }
        let validateResult = that.formValidate(formData);
        // validate success
        if(validateResult.status){
            _user.login(formData,function (res) {
                window.location.href = _hm.getUrlParam('redirect') || './index.html';
            },function (errMsg) {
                formError.show(errMsg)
            })
        }
        // validate fail
        else{
            // error tips
            formError.show(validateResult.msg)
        }
    },
    formValidate:function (formData) {
        let result ={
            status:false,
            msg:''
        };
        if(!_hm.validate(formData.username,'required')){
            result.msg = 'Username is required!'
            return result;
        }
        if(!_hm.validate(formData.password,'required')){
            result.msg = 'Password is required!'
            return result;
        }
        // validate success
        result.status = true;
        result.msg = 'Successfully Validate!'
        return result;
    }
};
$(function () {
    page.init();
})