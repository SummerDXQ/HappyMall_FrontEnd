import 'page/common/header/index.js'
import 'page/common/nav/index.js'
require('./index.css');
let navSide = require('page/common/nav-side/index.js');
let _mm = require('util/hm.js');
let _user = require('service/user-service.js')

// page logic
let page = {
    init:function () {
        this.onload();
        this.bindEvent();
    },
    onload:function () {
        // initiate side navigation
        navSide.init({
            name:'user-center'
        })
        // load user information
        this.loadUserInfo();
    },
    // load user information
    loadUserInfo:function () {
        let userHtml = '';
        _user.getUserInfo(function (res) {
            userHtml = `
            <div class="user-info">
                    <div class="form-line">
                        <span class="label">Username:</span>
                        <span class="text">${res.username}</span>
                    </div>
                    <div class="form-line">
                        <span class="label">Phone:</span>
                        <input type="text" class="input" id="phone" value="${res.phone}">
                    </div>
                    <div class="form-line">
                        <span class="label">Email:</span>
                        <input type="text" class="input" id="email" value="${res.email}">
                    </div>
                    <div class="form-line">
                        <span class="label">Question:</span>
                        <input type="text" class="input" id="question" value="${res.question}">
                    </div>
                    <div class="form-line">
                        <span class="label">Answer:</span>
                        <input type="text" class="input" id="answer" value="${res.answer}">
                    </div>
                    <span class="btn btn-submit">Save</span>
                </div>
            `;
            $('.panel-body').html(userHtml);
        },function (errMsg) {
            _mm.errorTips(errMsg);
        })
    },
    bindEvent:function () {
        let that = this;
        // press save button
        $(document).on('click','.btn-submit',function () {
            let userInfo = {
                phone:$.trim($('#phone').val()),
                email:$.trim($('#email').val()),
                question:$.trim($('#question').val()),
                answer:$.trim($('#answer').val()),
            }
            let validateResult = that.validateForm(userInfo);
            if(validateResult.status){
                // edit user information
                _user.updateUserInfo(userInfo,function (res,msg) {
                    _mm.successTips(msg);
                    window.location.href = './user-center.html';
                },function (errMsg) {
                    _mm.errorTips(errMsg);
                })
            }else {
                _mm.errorTips(validateResult.msg);
            }
        })
    },
    // validate input data
    validateForm : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        // validate phone number format
        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = 'Phone format is not correct';
            return result;
        }
        // validate email format
        if(!_mm.validate(formData.email, 'email')){
            result.msg = 'Email format is not correct';
            return result;
        }
        // validate password reset question
        if(!_mm.validate(formData.question, 'required')){
            result.msg = 'Question is required';
            return result;
        }
        // validate answer
        if(!_mm.validate(formData.answer, 'required')){
            result.msg = 'Answer is required';
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