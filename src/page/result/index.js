import './index.css';
import 'page/common/nav-simple/index.js';
let _hm = require('util/hm.js');

$(function () {
    let type = _hm.getUrlParam('type') || 'default';
    let $element = $('.'+type + '-success');
    $element.show();
})