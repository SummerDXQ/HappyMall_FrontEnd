import './index.css';
import 'page/common/nav-simple/index.js';
let _hm = require('util/hm.js');
let _user = require('service/user-service.js');

// form error message
let formError = {
    show:function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg)
    },
    hide:function () {
        $('.error-item').hide().find('.err-msg').text('')
    },
}
// page logic
let page = {
    init:function () {
        this.bindEvent();
    },
    bindEvent:function () {
        let that = this;
        // validate username
        $('#username').blur(function () {
            let username = $.trim($(this).val());
            if (!username){
                return;
            }
            _user.checkUsername(username,function () {
                formError.hide();
            },function (errMsg) {
                formError.show(errMsg);
            })
        })
        // click register button
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
            passwordConfirm:$.trim($('#password-confirm').val()),
            phone:$.trim($('#phone').val()),
            email:$.trim($('#email').val()),
            question:$.trim($('#question').val()),
            answer:$.trim($('#answer').val()),
        }
        let validateResult = that.formValidate(formData);
        // validate success
        if(validateResult.status){
            _user.register(formData,function (res) {
                window.location.href = './result.html?type=register';
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
        // Username cannot be empty
        if(!_hm.validate(formData.username,'required')){
            result.msg = 'Username is required!'
            return result;
        }
        // Password cannot be empty
        if(!_hm.validate(formData.password,'required')){
            result.msg = 'Password is required!'
            return result;
        }
        // Password length should greater than 6
        if(formData.password.length < 6){
            result.msg = 'Password length should greater than 6!';
            return result;
        }
        // Password and confirm password
        if(formData.password !== formData.passwordConfirm){
            result.msg = 'Password and confirm password should be same!';
            return result;
        }
        // validate phone
        if(!_hm.validate(formData.phone,'phone')){
            result.msg = 'Phone format is not correct!';
            return result;
        }
        // validate email
        if(!_hm.validate(formData.email,'email')){
            result.msg = 'Email format is not correct!';
            return result;
        }
        // validate question
        if(!_hm.validate(formData.question,'required')){
            result.msg = 'Question is required!'
            return result;
        }
        // validate answer
        if(!_hm.validate(formData.answer,'required')){
            result.msg = 'Answer is required!'
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