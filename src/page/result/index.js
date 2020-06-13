import './index.css';
import 'page/common/nav-simple/index.js';
let _hm = require('util/hm.js');

$(function () {
    let type = _hm.getUrlParam('type') || 'default';
    let $element = $('.'+type + '-success');
    if(type === 'payment'){
        let orderNumber = _hm.getUrlParam('orderNumber');
        let $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href',$orderNumber.attr('href') + orderNumber)
    }
    // show result tips
    $element.show();
})