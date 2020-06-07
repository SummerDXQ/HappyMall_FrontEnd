import './index.css';
let _hm = require('util/hm.js');
let header = {
    init:function () {
        this.bindEvent();
        this.onload();
    },
    onload:function () {
        let keyword = _hm.getUrlParam('keyword');
        if(keyword){
            // set input value
            $('#search-input').val(keyword)
        }
    }
    ,
    bindEvent:function () {
        let that = this;
        // click search button to submit
        $('#search-btn').click(function () {
            that.searchSubmit();
        })
        // press return to submit
        $('#search-input').keyup(function (e) {
            console.log('回车');
            if(e.keyCode === 13){
                that.searchSubmit();
            }
        })
    },
    searchSubmit:function () {
        let keyword = $.trim($('#search-input').val());
        // link to list page
        if(keyword){
            window.location.href = './list.html?keyword='+keyword;
        }else{
            // back to home page
            _hm.goHome();
        }
    }
}

header.init();