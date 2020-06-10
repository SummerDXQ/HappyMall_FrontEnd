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
        $(document).on('click','.address-update',function () {
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
    },
    // load address list
    loadAddressList:function () {
        let that = this;
        _address.getAddressList(function (res) {
            let AddressListHtml = ``;
            res.list.map((item,index)=>{
                AddressListHtml += `
                            <div class="address-item" data-id="${item.id}">
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
        let that = this;
        _order.getProductList(function (res) {
            // that.renderCart(res);
            // let ProductListHtml = '';
            // $('.product-con').html(ProductListHtml)
        },function (errMsg) {
            $('.product-con ').html(`<p class="err-tip">Loading product list failed, please try again!</p>`)
        })
    },
};

$(function () {
    page.init();
})