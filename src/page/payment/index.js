import 'page/common/header/index.js'
import 'page/common/nav/index.js'
require('./index.css');
let _hm = require('util/hm.js');
let _payment = require('service/payment-service.js');

// page logic
let page = {
    data:{
        orderNumber: _hm.getUrlParam('orderNumber')
    },
    init:function () {
        this.onload();
    },
    onload:function () {
        this.loadPaymentInfo();
    },
    loadPaymentInfo:function () {
        let that = this;
        let paymentHtml = ``;
        let $pageWrap = $('.page-wrap');
        $pageWrap.html(`<div class="loading"></div>`);
        _payment.getPaymentInfo(this.data.orderNumber).then( (res)=> {
            paymentHtml = `
                <p class="payment-tips">Successfully submit order, the order number is ${res.orderNo}</p>
                <p class="payment-tips enhance">Please use Alipay to scan the QR code to pay for the order:</p>
                <div class="img-con">
                    <img src="${res.qrUrl}" alt="QR code" class="qr-code"/>
                </div>
            `;
            $pageWrap.html(paymentHtml);
            that.listenOrderStatus();
        }).catch( (errMsg) => $pageWrap.html(`<p class="err-tip">${errMsg}</p>`) )
    },
    // watch order status
    listenOrderStatus:function () {
        var that = this;
        this.paymentTimer = setInterval(function () {
            _payment.getPaymentStatus(that.data.orderNumber).then( (res) => {
                if(!res){
                    window.location.href = './result.html?type=payment&orderNumber='+that.data.orderNumber;
                }
            }).catch(errMsg=>{})
        },5000)
    }
};
$(function () {
    page.init();
})