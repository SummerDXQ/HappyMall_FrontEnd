require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
let _hm = require('util/hm.js');
let _cart = require('service/cart-service.js');

let page = {
    data:{

    },
    init:function () {
        this.onload();
        this.bindEvent();
    },
    onload:function () {
        this.loadCart();
    },
    bindEvent:function () {
        // let that = this;
    },
    // load shopping cart info
    loadCart:function () {
        let that = this;
        let html = '';
        let $pageWrap = $('.page-wrap');
        // loading
        // get shopping cart list
        _cart.getCartList(function (res) {
            if(res.cartProductVoList.length === 0){
                html = `<p class="err-tip">Your shopping cart is empty,<a href="./index.html" class="err-tip">&nbsp;go to shop!</a></p>`
            }else {
                html = `
                    <div class="cart-header">
                        <table class="cart-table">
                            <tr>
                                <th class="cart-cell cell-check">
                                    <label class="cart-label">
                                        <input type="checkbox" class="cart-select-all" ${res.allChecked? 'checked':''}>
                                        <span>Select all</span>
                                    </label>
                                </th>
                                <th class="cart-cell cell-info">Product Information</th>
                                <th class="cart-cell cell-price">Price</th>
                                <th class="cart-cell cell-count">Quantity</th>
                                <th class="cart-cell cell-total">Total</th>
                                <th class="cart-cell cell-opera">Operation</th>
                            </tr>
                        </table>
                    </div>
                    <div class="cart-list">
                    
                    ${
                        res.cartProductVoList.map((item,index)=>{
                            return(`
                        <table class="cart-table" data-product-id="${item.productId}">
                            <tr>
                                <td class="cart-cell cell-check">
                                    <label class="cart-label">
                                        <input type="checkbox" class="cart-select" ${item.productChecked ===1 ? 'checked':''}>
                                    </label>
                                </td>
                                <td class="cart-cell cell-img">
                                    <img src="${res.imageHost}${item.productMainImage}" alt="${item.productName}" class="p-img"/>
                                </td>
                                <td class="cart-cell cell-info">
                                    <a href="./detail.html?productId=${item.productId}" class="link">${item.productName}</a>
                                </td>
                                <td class="cart-cell cell-price">$ ${item.productPrice.toFixed(2)}</td>
                                <td class="cart-cell cell-count">
                                    <span class="count-btn minus">-</span>
                                    <input type="text" class="count-input" value="${item.quantity}" data-max="${item.productStock}"/>
                                    <span class="count-btn plus">+</span>
                                </td>
                                <td class="cart-cell cell-total">$ ${item.productTotalPrice.toFixed(2)}</td>
                                <td class="cart-cell cell-opera">
                                    <span class="link cart-delete">Operation</span>
                                </td>
                            </tr>
                        </table>
                                `
                            )
                        })
                    }
                    </div>
                    <div class="cart-footer">
                        <div class="select-con">
                            <label>
                                <input type="checkbox" class="cart-select-all" ${res.allChecked? 'checked':''}>
                                <span>Select all</span>
                            </label>
                        </div>
                        <div class="delete-con">
                            <span class="link">
                                <i class="fa fa-trash-o"></i>
                                <span>Delete</span>
                            </span>
                        </div>
                        <div class="submit-con">
                            <span>Total price:</span>
                            <span class="submit-total">$ ${res.cartTotalPrice.toFixed(2)}</span>
                            <span class="btn btn-submit">Check out</span>
                        </div>
                    </div>
                `;
            }
            console.log(res);
            $pageWrap.html(html);
        },function (errMsg) {
            html = `<p class="err-tip">Something wrong!</p>`
        })

    },
    filter:function (data) {

    }
};

$(function () {
    page.init();
})