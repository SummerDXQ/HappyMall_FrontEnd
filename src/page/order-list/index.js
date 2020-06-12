import 'page/common/header/index.js'
import 'page/common/nav/index.js'
require('./index.css');
let navSide = require('page/common/nav-side/index.js');
let _mm = require('util/hm.js');
let _order = require('service/order-service.js');
let Pagination = require('util/pagination/index.js');

// page logic
let page = {
    data:{
        listParam: {
            pageNum:1,
            pageSize:10,
        }
    },
    init:function () {
        this.onload();
    },
    onload:function () {
        // initiate side navigation
        navSide.init({
            name:'order-list'
        })
        this.loadOderList();
    },
    // load order list
    loadOderList:function () {
        let that = this;
        let orderListHtml = '';
        let $listCon = $('.order-list-con');
        $listCon.html('<p class="loading"></p>');
        _order.getOrderList(this.data.listParam,function (res) {
            if(res.list.length === 0 ){
                $listCon.html(`<p class="err-tip">You have not orders!</p>`);
                return;
            }
            // render order list html
            orderListHtml = `
                <table class="order-list-table header">
                    <tr>
                        <th class="cell cell-img">&nbsp;</th>
                        <th class="cell cell-info">Product</th>
                        <th class="cell cell-price">Price</th>
                        <th class="cell cell-count">Quantity</th>
                        <th class="cell cell-total">Total</th>
                    </tr>
                </table>
            `;
            res.list.map((item,index)=>{
                orderListHtml += `
                    <table class="order-list-table order-item">
                        <tr>
                            <td colspan="5" class="order-info">
                                <span class="order-text">
                                    <span>Oder Number:</span>
                                    <a href="./order-detail.html?orderNumber=${item.orderNo}" class="link order-num">${item.orderNo}</a>
                                </span>
                                <span class="order-text">${item.createTime}</span>
                                <span class="order-text">Receiver: ${item.receiverName}</span>
                                <span class="order-text">Oder Status ${item.statusDesc}</span>
                                <span class="order-text">
                                    <span>Total Price:</span>
                                    <span class="order-total">${item.payment}</span>
                                </span>
                                <a href="./order-detail.html?orderNumber=XXX" class="link order-detail">Detail ></a>
                            </td>
                        </tr>`;
                item.orderItemVoList.map((subitem,index)=>{
                    orderListHtml +=
                        `<tr>
                            <td class="cell cell-img">
                                <a href="./detail.html?productId=${subitem.productId}" target="_blank">
                                    <img src="${item.imageHost}${subitem.productImage}" alt="${subitem.productName}" class="p-img">
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
                        </tr>`
                })
                orderListHtml +=`</table>`;
            })
            $listCon.html(orderListHtml);
            that.loadPagination({
                hasPreviousPage:res.hasPreviousPage,
                prePage:res.prePage,
                hasNextPage:res.hasNextPage,
                nextPage:res.nextPage,
                pageNum:res.pageNum,
                pages:res.pages,
                }
            );
        },function (errMsg) {
            $listCon.html('<p class="err-tip">Load oder list fail, please try again!</p>')
        });
    },
    // load pagination
    loadPagination:function (pageInfo) {
        let that = this;
        this.pagination ? '':(this.pagination = new Pagination());
        this.pagination.render(
            $.extend({},pageInfo,{
                container:$('.pagination'),
                onSelectPage: function (pageNum) {
                    that.data.listParam.pageNum = pageNum;
                    that.loadOderList();
                }
            }))
    }
};
$(function () {
    page.init();
})