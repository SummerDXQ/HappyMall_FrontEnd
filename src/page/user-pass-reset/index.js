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
        $('.error-item').hide().find('.err-msg').text('');
    },
}
// page logic
let page = {
    data:{
        username:'',
        question:'',
        answer:'',
        token:''
    },
    init:function () {
        this.onload();
        this.bindEvent();
    },
    onload:function(){
        this.loadStepUsername();
    },
    bindEvent:function () {
        let that = this;
        // click submit button(first step)
        $('#submit-username').click(function () {
            let username =$.trim($('#username').val());
            // input username
            if (username){
                _user.getQuestion(username).then( (res) =>{
                    that.data.username = username;
                    that.data.question = res;
                    that.loadStepQuestion();
                }).catch( (errMsg)=> {
                    formError.show(errMsg);
                })
            }
            else {
                formError.show('Please input password!');
            }
        })
        //
        $('#submit-question').click(function () {
            let answer =$.trim($('#answer').val());
            console.log('答案');
            console.log(answer);
            // input username
            if (answer){
                _user.checkAnswer({
                    username:that.data.username,
                    question:that.data.question,
                    answer:answer
                }).then( (res) =>{
                    that.data.answer = answer;
                    that.data.token = res;
                    that.loadStepPassword();
                }).catch( (errMsg)=> {
                    formError.show(errMsg);
                })
            }
            else {
                formError.show('Please input answer!');
            }
        })
        // the third step
        $('#submit-password').click(function () {
            let password =$.trim($('#password').val());
            // reset password
            if (password && password.length>=6){
                _user.resetPassword({
                    username:that.data.username,
                    password:password,
                    forgetToken:that.data.token
                }).then( (res) =>{
                    window.location.href='./result.html?type=pass-reset';
                }).catch( (errMsg) =>{
                    formError.show(errMsg);
                })
            }
            else {
                formError.show('Please input password!');
            }
        })
    },
    // load first step
    loadStepUsername:function () {
        $('.step-username').show();
    },
    // load second step
    loadStepQuestion:function () {
        // hide error tips
        formError.hide();
        // load next step
        $('.step-username').hide()
            .siblings('.step-question').show().find('.question').text(this.data.question);
    },
    // load third step
    loadStepPassword:function () {
        // hide error tips
        formError.hide();
        // load next step
        $('.step-question').hide()
            .siblings('.step-password').show();
    }
    // submit login data

};
$(function () {
    page.init();
})