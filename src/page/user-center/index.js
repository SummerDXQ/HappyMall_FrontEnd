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
    },
    onload:function () {
        // initiate side navigation
        navSide.init({
            name:'user-center'
        })
        // load user information
        this.loadUserInfo();
    },
    loadUserInfo:function () {
        let userHtml = '';
        _user.getUserInfo()
            .then( (res)=> {
            userHtml = `
            <div class="user-info">
                    <div class="form-line">
                        <span class="label">Username:</span>
                        <span class="text">${res.username}</span>
                    </div>
                    <div class="form-line">
                        <span class="label">Phone:</span>
                        <span class="text">${res.phone}</span>
                    </div>
                    <div class="form-line">
                        <span class="label">Email:</span>
                        <span class="text">${res.email}</span>
                    </div>
                    <div class="form-line">
                        <span class="label">Question:</span>
                        <span class="text">${res.question}</span>
                    </div>
                    <div class="form-line">
                        <span class="label">Answer:</span>
                        <span class="text">${res.answer}</span>
                    </div>
                    <a href="./user-center-update.html" class="btn btn-submit">Edit</a>
                </div>
            `;
            $('.panel-body').html(userHtml);
        })
            .catch( (errMsg) => _mm.errorTips(errMsg))
    }
};
$(function () {
    page.init();
})