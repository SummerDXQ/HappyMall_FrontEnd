require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
let _hm = require('util/hm.js');
let _product = require('service/product-service.js');
let _cart = require('service/cart-service.js');

let page = {
    data:{
        productId:_hm.getUrlParam('productId') || '',
    },
    init:function () {
        this.onload();
        this.bindEvent();
    },
    onload:function () {
        if (!this.data.productId){
            _hm.goHome();
        }
        this.loadDetail();
    },
    bindEvent:function () {
        let that = this;
        // change product quantity
        $(document).on('click', '.p-count-btn', function(){
            let type        = $(this).hasClass('plus') ? 'plus' : 'minus';
            let $pCount     = $('.p-count');
            let currCount   = parseInt($pCount.val());
            let minCount    = 1;
            let maxCount    = that.data.detailInfo.stock || 1;
            if(type === 'plus'){
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            }
            else if(type === 'minus'){
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        // add to shopping cart
        $(document).on('click', '.cart-add', function(){
            if(that.data.detailInfo.stock === 0){
                _hm.errorTips('There is no stock for this product');
                return;
            }
            _cart.addToCart({
                productId   : that.data.productId,
                count       : $('.p-count').val()
            }).then(
                ()=>window.location.href = './result.html?type=cart-add'
            ).catch(
                (errMsg)=>_hm.errorTips(errMsg)
            )
        });
    },
    // load product detail
    loadDetail:function () {
        let that = this;
        let html = '';
        let $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>')
        _product.getProductDetail(this.data.productId)
            .then(
                (res)=>{
                    that.filter(res);
                    // store product detail information
                    that.data.detailInfo = res;
                    // thumb images
                    let thumbImageHtml = res.subImages.map((index,item)=>{
                        return(
                            `<li class="p-img-item">
                    <img class="p-img" src="${res.imageHost}${res.mainImage}" alt="">
                    </li>`
                        )})
                    html = `
                <div class="intro-wrap">
                    <div class="p-img-con">
                        <div class="main-img-con">
                            <img class="main-img" src="${res.imageHost}${res.mainImage}" alt="">
                        </div>
                        <ul class="p-img-list">
                            ${
                        res.subImages.map((item,index)=>{
                            return(
                                `<li class="p-img-item" key="${index}"><img class="p-img" src="${res.imageHost}${item}" alt=""></li>`
                            )
                        })
                    }
                        </ul>
                    </div>
                    <div class="p-info-con">
                        <h1 class="p-name">${res.name}</h1>
                        <p class="p-subtitle">${res.subtitle}</p>
                        <div class="p-info-item p-price-con">
                            <span class="label">Price:</span>
                            <span class="info">$ ${res.price}</span>
                        </div>
                        <div class="p-info-item">
                            <span class="label">Store:</span>
                            <span class="info">${res.stock}</span>
                        </div>
                        <div class="p-info-item p-count-con">
                            <span class="label">Quantity:</span>
                            <input class="p-count" value="1" readonly/>
                            <span class="p-count-btn plus">+</span>
                            <span class="p-count-btn minus">-</span>
                        </div>
                        <div class="p-info-item">
                            <a href="javascript:;" class="btn cart-add">Add to Cart</a>
                        </div>
                    </div>
                </div>
                <div class="detail-wrap">
                    <div class="detail-tab-con">
                        <ul class="tab-list">
                            <li class="tab-item active">Product Detail</li>
                        </ul>
                    </div>
                    <div class="detail-con">
                        ${res.detail}
                    </div>
                </div>
            `;
                    $pageWrap.html(html);
                }
            )
            .catch(
                (errMsg)=>$pageWrap.html('<p class="err-tip">The product is not exist</p>')
            )
    },
    filter:function (data) {
        data.subImages = data.subImages.split(',');
    }
};

$(function () {
    page.init();
})