import './index.css';
let _hm = require('util/hm.js');
let templateIndex = require('./index.string');
// side navigation
let navSide = {
    option:{
        name:'',
        navList:[
            {name:'user-center',desc:'user center',href:'./user-center.html'},
            {name:'order-list',desc:'my order',href:'./order-list.html'},
            {name:'pass-update',desc:'change password',href:'./pass-update.html'},
            {name:'about',desc:'about mall',href:'./about.html'}
        ]
    },
    init:function (option) {
        // merge options
        $.extend(this.option,option);
        this.renderNav();
    },
    renderNav:function () {
        for (let i=0;i<this.option.navList.length;i++){
            if (this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
            //render list
            let navHtml = _hm.renderHtml(templateIndex,{
                navList: this.option.navList
            });
            $('.nav-side').html(navHtml);
        }
    }
}
module.exports = navSide;