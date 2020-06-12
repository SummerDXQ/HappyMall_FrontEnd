require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
let _hm = require('util/hm.js');
let _order = require('service/order-service.js');
let _address = require('service/address-service.js');
let addressModal = require('./address-modal.js');

let page = {
    data:{
        selectedAddressId : null,
    },
    init:function () {
        this.onload();
        this.bindEvent();
    },
    onload:function () {
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent:function () {
        let that = this;
        // select address
        $(document).on('click','.address-item',function () {
            let $this = $(this);
            $this.addClass('active').siblings('.address-item').removeClass('active');
            that.data.selectedAddressId = $this.data('id');
        })
        // submit order
        $(document).on('click','.order-submit',function () {
            let shippingId = that.data.selectedAddressId;
            if(shippingId){
                _order.createOrder({
                    shippingId: shippingId
                },function (res) {
                    window.location.href = './payment.html?orderNumber='+ res.orderNo;
                },function (errMsg) {
                    _hm.errorTips(errMsg);
                })
            }else {
                _hm.errorTips('Please select address before submitting order!')
            }
        })
        // add new address
        $(document).on('click','.address-add',function () {
            addressModal.show({
                isUpdate:false,
                onSuccess:function () {
                    that.loadAddressList();
                }
            })
        })
        $(document).on('click','.address-update',function (e) {
            e.stopPropagation();
            let shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId,function (res) {
                addressModal.show({
                    isUpdate:true,
                    data:res,
                    onSuccess:function () {
                        that.loadAddressList()
                    }
                })
            },function (errMsg) {
                _hm.errorTips(errMsg);
            })
        })
        $(document).on('click','.address-delete',function (e) {
            e.stopPropagation();
            let id = $(this).parents('.address-item').data('id');
            if(window.confirm('Do you want to delete?')){
                _address.deleteAddress(id,function (res) {
                    that.loadAddressList();
                },function (errMsg) {
                    _hm.errorTips(errMsg);
                })
            }
        })
    },
    // load address list
    loadAddressList:function () {
        let that = this;
        $('.address-con').html('<div class="loading"></div>')
        _address.getAddressList(function (res) {
            that.addressFilter(res);
            console.log('filter');
            console.log(res);
            let AddressListHtml = ``;
            res.list.map((item,index)=>{
                AddressListHtml += `
                            <div class="address-item ${item.isActive? 'active' : ''}" data-id="${item.id}">
                                <div class="address-title">
                                    ${item.receiverProvince} ${item.receiverCity} (${item.receiverName})
                                </div>
                                <div class="address-detail">
                                    ${item.receiverAddress} ${item.receiverPhone}
                                </div>
                                <div class="address-opera">
                                    <span class="link address-update">Edit</span>
                                    <span class="link address-delete">Delete</span>
                                </div>
                            </div>
                            `
            })
            AddressListHtml +=`
                            <div class="address-add">
                                <div class="address-new">
                                    <i class="fa fa-plus"></i>
                                    <div class="text">Use new address</div>
                                </div>
                            </div>
                            `
            $('.address-con').html(AddressListHtml);
        },function (errMsg) {
            $('.address-con').html(`<p class="err-tip">Loading address failed, please try again!</p>`)
        })
    },
    // load product list
    loadProductList:function () {
        $('.product-con').html('<div class="loading"></div>');
        _order.getProductList(function (res) {
            let ProductListHtml = `
                <table class="product-table">
                <tr>
                    <th class="cell-img">&nbsp;</th>
                    <th class="cell-info">Product Description</th>
                    <th class="cell-price">Price</th>
                    <th class="cell-count">Quantity</th>
                    <th class="cell-total">Total</th>
                </tr>`;
            res.orderItemVoList.map((item,index)=>{
                ProductListHtml +=
                `<tr>
                        <td class="cell-img">
                            <a href="./detail.html?productId=">
                            <img src="${res.imageHost}${item.productImage}" alt="" class="p-img">
                            </a>
                        </td>
                        <td class="cell-info">
                            <a href="./detail.html?productId=" class="link">${item.productName}</a>
                        </td>
                        <td class="cell-price">${item.currentUnitPrice}</td>
                        <td class="cell-count">${item.quantity}</td>
                        <td class="cell-total">${item.totalPrice}</td>
                     </tr>`
            })
            ProductListHtml +=`</table>
            <div class="submit-con">
                <span>Total Price:</span>
                <span class="submit-total">${res.productTotalPrice}</span>
                <span class="btn order-submit">Submit </span>
            </div>`
            $('.product-con').html(ProductListHtml)
        },function (errMsg) {
            $('.product-con ').html(`<p class="err-tip">Loading product list failed, please try again!</p>`)
        })
    },
    // address list's selected status
    addressFilter:function (data) {
        if(this.data.selectedAddressId){
            let selectedAddressIdFlag = false;
            for (let i=0,length=data.list.length;i<length;i++){
                if(data.list[i].id === this.data.selectedAddressId){
                    data.list[i].isActive = true;
                    selectedAddressIdFlag = true;
                }
            }
            // selected address has been removed
            if(!selectedAddressIdFlag){
                this.data.selectedAddressId = null;
            }
        }
    }
};

$(function () {
    page.init();
})