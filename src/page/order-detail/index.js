import 'page/common/header/index.js'
import 'page/common/nav/index.js'
require('./index.css');
let navSide = require('page/common/nav-side/index.js');
let _hm = require('util/hm.js');
let _order = require('service/order-service.js');

// page logic
let page = {
    data:{
        orderNumber: _hm.getUrlParam('orderNumber')
    },
    init:function () {
        this.onload();
        this.bindEvent();
    },
    onload:function () {
        // initiate side navigation
        navSide.init({
            name:'order-list'
        })
        this.loadDetail();
    },
    bindEvent:function () {
        let that = this;
        $(document).on('click','.order-cancel',function () {
            if(window.confirm('Do you want to cancel the order?')){
                _order.cancelOrder(that.data.orderNumber)
                    .then(
                        (res)=>{
                            _hm.successTips('Successfully cancel order');
                            that.loadDetail();
                        })
                    .catch(
                        errMsg=>_hm.errorTips(errMsg)
                    )
            }
        })
    },
    loadDetail:function () {
        let that = this;
        let orderDetailHtml = ``;
        let $content = $('.content');
        $content.html(`<div class="loading"></div>`);
        _order.getOrderDetail(this.data.orderNumber)
            .then(  (res)=> {
            that.dataFilter(res);
            orderDetailHtml = `
                <div class="panel">
                    <div class="panel-title">Order Information</div>
                    <div class="panel-body">
                        <div class="order-info">
                            <div class="text-line">
                                <span class="text">Order Number: ${res.orderNo}</span>
                                <span class="text">Create Time: ${res.createTime}</span>
                            </div>
                            <div class="text-line">
                                <span class="text">
                                    Receiver: 
                                    ${res.shippingVo.receiverProvince} 
                                    ${res.shippingVo.receiverCity}  
                                    ${res.shippingVo.receiverAddress}  
                                    ${res.shippingVo.receiverMobile}  
                                </span>
                            </div>
                             <div class="text-line">
                                <span class="text">Order status: ${res.statusDesc}</span>
                            </div>
                            <div class="text-line">
                                <span class="text">Payment method: ${res.paymentTypeDesc}</span>
                            </div>
                            <div class="text-line">
                                ${ res.needPay ? `<a href="./payment.html?orderNumber=${res.orderNo}" class="btn">Check Out</a>` : ''}
                                ${ res.IsCancelable ? `<a href="javascript:;" class="btn order-cancel">Cancel Order</a>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel">
                    <div class="panel-title">Product List</div>
                        <div class="panel-body">
                            <table class="product-table">
                                <tr>
                                    <th class="cell-th cell-img">&nbsp;</th>
                                    <th class="cell-th cell-info">Product</th>
                                    <th class="cell-th cell-price">Price</th>
                                    <th class="cell-th cell-count">Quantity</th>
                                    <th class="cell-th cell-total">Total</th>
                                </tr>`;
            res.orderItemVoList.map((subitem,index)=>{
                orderDetailHtml +=`
                    <tr>
                        <td class="cell cell-img">
                            <a href="./detail.html?productId=${subitem.productId}" target="_blank">
                                <img src="${res.imageHost}${subitem.productImage}" alt="${subitem.productName}" class="p-img">
                            </a>
                        </td>
                        <td class="cell cell-info">
                            <a class="link" href="./detail.html?productId=${subitem.productId}" target="_blank">
                                ${subitem.productName}
                            </a>
                        </td>
                        <td class="cell cell-price">${subitem.currentUnitPrice}</td>
                        <td class="cell cell-count">${subitem.quantity}</td>
                        <td class="cell cell-total">${subitem.totalPrice}</td>
                    </tr>
                `
            })
            orderDetailHtml +=`
                    </table>
                        <p class="total">
                            <span>Total Price: </span>
                            <span class="total-price">$ ${res.payment}</span> 
                        </p>
                    </div>
                </div>`;
            $content.html(orderDetailHtml);
        })
            .catch(
                errMsg=>$listCon.html(`<p class="err-tip">${errMsg}</p>`)
            )
    },
    dataFilter:function (data) {
        data.needPay = data.status === 10;
        data.IsCancelable = data.status === 10;
    }
};
$(function () {
    page.init();
})