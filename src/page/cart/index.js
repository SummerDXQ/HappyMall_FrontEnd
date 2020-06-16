import './index.css';
import 'page/common/header/index.js';
import nav from 'page/common/nav/index.js';
import _hm from "util/hm";
import _cart from "service/cart-service";

let page = {
    data:{},
    init:function () {
        this.onload();
        this.bindEvent();
    },
    onload:function () {
        this.loadCart();
    },
    bindEvent:function () {
        let that = this;
        // select or deselect product
        $(document).on('click','.cart-select',function () {
            let $this = $(this);
            let productId = $this.parents('.cart-table').data('product-id');
            // change select status
            if($this.is(':checked')){
                _cart.selectProduct(productId)
                    .then(
                        (res)=>that.renderCart(res)
                    )
                    .catch(
                        (err)=>that.showCartError()
                    )
            }else {
                _cart.unselectProduct(productId)
                    .then(
                        (res)=>that.renderCart(res)
                    )
                    .catch(
                        (err)=>that.showCartError()
                    )
            }
        })
        // select all or deselect all
        $(document).on('click','.cart-select-all',function () {
            let $this = $(this);
            // select all
            if($this.is(':checked')){
                _cart.selectAllProduct()
                    .then(
                        (res)=>that.loadCart(res)
                    )
                    .catch(
                        (err)=>that.showCartError()
                    )
            }
            // deselect all
            else {
                _cart.unselectAllProduct()
                    .then(
                        (res)=>that.loadCart(res)
                    )
                    .catch(
                        (err)=>that.showCartError()
                    )
            }
        })
        // change product quantity
        $(document).on('click','.count-btn',function () {
            let $this = $(this);
            let $pCount = $this.siblings('.count-input');
            let currentCount = parseInt($pCount.val());
            let type = $this.hasClass('plus')? 'plus' : 'minus';
            let productId = $this.parents('.cart-table').data('product-id');
            let minCount = 1;
            let maxCount = parseInt($pCount.data('max'));
            let newCount = 0;
            if(type === 'plus'){
                if(currentCount >= maxCount){
                    _hm.errorTips('Quantity is up to limit');
                    return;
                }
                newCount = currentCount + 1;
            }else if(type === 'minus'){
                if(currentCount <= minCount){
                    _hm.errorTips('Quantity has already been 1');
                    return;
                }
                newCount = currentCount - 1;
            }
            _cart.updateProduct({productId:productId, count:newCount})
                .then(
                    (res)=>that.renderCart(res)
                )
                .catch(
                    (errMsg)=>that.showCartError())
        })
        // delete a product
        $(document).on('click','.cart-delete',function () {
            if (window.confirm('Do you want to delete the product?')){
                let productId = $(this).parents('.cart-table').data('product-id');
                that.deleteCartProduct(productId)
            }
        })
        // delete selected product
        $(document).on('click','.delete-selected',function () {
            if (window.confirm('Do you want to delete the selected product?')){
                let arrProductIds = [];
                let $selectedItem = $('.cart-select:checked');
                // get selected products' id
                for (let i=0;i<$selectedItem.length;i++){
                    arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                }
                if (arrProductIds.length){
                    that.deleteCartProduct(arrProductIds.join(','));
                }else {
                    _hm.errorTips('No product has been selected');
                }
            }
        })
        // checkout
        $(document).on('click','.btn-submit',function () {
            if(that.data.cartInfo && that.data.cartInfo.cartTotalPrice>0){
                window.location.href = './order-confirm.html';
            }else {
                _hm.errorTips('No product has been selected');
            }
        });
    },
    // load shopping cart info
    loadCart:function () {
        let that = this;
        let $pageWrap = $('.page-wrap');
        // loading
        $pageWrap.html(`<span class="loading"></span>`);
        // get shopping cart list
        _cart.getCartList()
            .then(
                (res)=>that.renderCart(res)
            )
            .catch(
                (err)=> html = that.showCartError()
            )
    },
    // render shopping cart html
    renderCart:function (res) {
        let html = '';
        let $pageWrap = $('.page-wrap');
        this.data.cartInfo = res;
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
                                    <span class="link cart-delete">Delete</span>
                                </td>
                            </tr>
                        </table>`
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
                            <span class="link delete-selected">
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
        $pageWrap.html(html);
        // change product quantity for navigation
        nav.loadCartCount();
    },
    // show error information
    showCartError:function () {
        return `<p class="err-tip">Something wrong!</p>`;
    },
    // delete product
    deleteCartProduct:function (productIds) {
        let that = this;
        _cart.deleteProduct(productIds)
            .then(
                (res)=>that.renderCart(res)
            )
            .catch(
                (err)=> html = that.showCartError()
            )
    }
};

$(function () {
    page.init();
})