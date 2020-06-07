require('./index.css');
let _hm = require('util/hm.js');
let templateIndex = require('./index.string');
// side navigation
let navSide = {
    option:{
        name:'',
        navList:[
            {name:'user-center',desc:'user center',href:'./user-center.html'},
            {name:'order-list',desc:'my order',href:'./order-list.html'},
            {name:'user-pass-update',desc:'change password',href:'./user-pass-update.html'},
            {name:'about',desc:'about mall',href:'./about.html'}
        ]
    },
    init:function (option) {
        console.log(option);
        // merge options
        $.extend(this.option,option);
        this.renderNav();
    },
    renderNav:function () {
        for (let i=0;i<this.option.navList.length;i++){
            if (this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
            // let navHtml = _hm.renderHtml(templateIndex,{
            //     navList: this.option.navList
            // });
            // $('.nav-side').html(navHtml);
        }
        //render list
        let navHtml = '';
            this.option.navList.map((item,index)=>{
            if(item.isActive){
                return(
                    navHtml += `<li class="nav-item active"><a href="${item.href}" class="link">${item.desc}</a></li>`
                )
            }else {
                navHtml += `<li class="nav-item"><a href="${item.href}" class="link">${item.desc}</a></li>`
            }
        })
        $('.nav-side').html(navHtml);
    }
}
module.exports = navSide;