let _mm = require('util/hm.js');
// _mm.request({
//     url:'/product/list.do?keyword=1',
//     success:function (res) {
//         console.log(res)
//     },
//     error:function (err) {
//         console.log(err);
//     }
// })

let html = '<div>{{data}}</div>>'
let data = {
    data:123
}
console.log(_mm.renderHtml(html,data));

// console.log(_mm.getUrlParam('test'));