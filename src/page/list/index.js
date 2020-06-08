import 'page/common/header/index.js'
import 'page/common/nav/index.js'
require('./index.css');
let navSide = require('page/common/nav-side/index.js');
let _hm = require('util/hm.js');
let Pagination = require('util/pagination/index.js');
let _product = require('service/product-service.js')

let page = {
    data:{
        listParam:{
            keyword:_hm.getUrlParam('keyword') || '',
            categoryId:_hm.getUrlParam('categoryId') || '',
            orderBy:_hm.getUrlParam('orderBy') || 'default',
            pageNum:_hm.getUrlParam('pageNum') || 1,
            pageSize:_hm.getUrlParam('pageSize') || 20,
        }
    },
    init:function () {
        this.onload();
        this.bindEvent();
    },
    onload:function () {
        this.loadList();
    },
    bindEvent:function () {
        let that = this;
        // default sort
        $('.sort-item').click(function () {
            let $this = $(this);
            that.data.listParam.pageNum = 1;
            if($this.data('type') === 'default'){
                // already be active
                if($this.hasClass('active')){
                    return;
                }else{
                    $this.addClass('active')
                        .siblings('.sort-item').removeClass('active asc desc');
                    that.data.listParam.orderBy = 'default';
                }
            }
            // price sort
            else if($this.data('type') === 'price'){
                $this.addClass('active')
                    .siblings('.sort-item').removeClass('active asc desc');
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    that.data.listParam.orderBy = 'price_asc';
                }else {
                    $this.addClass('desc').removeClass('asc');
                    that.data.listParam.orderBy = 'price_desc';
                }
            }
            // reload product list
            that.loadList();
        })
    },
    loadList:function () {
        let that = this;
        let listHtml = '';
        let listParam = this.data.listParam;
        let $pListCon = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>');
        // delete unnecessary parameters
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
        _product.getProductList(listParam,function (res) {
            // console.log('-----------');
            // console.log(res);
            if(res.list.length > 0){
                res.list.map((item,index)=>{
                    return(
                        listHtml += `
                        <li class="p-item">
                            <div class="p-img-con">
                                <a class="link" href="./detail.html?productId=${item.id}" target="_blank">
                                    <img class="p-img" src="${item.imageHost}${item.mainImage}" alt="${item.name}" />
                                </a>
                            </div>
                            <div class="p-price-con">
                                <span class="p-price">￥ ${item.price}</span>
                            </div>
                            <div class="p-name-con">
                                <a class="p-name" href="./detail.html?productId={{id}}" target="_blank">${item.name}</a>
                            </div>
                        </li>
                    `
                    )
                })
            }else {
                listHtml = `<p class="err-tip">The product is not exist!</p>`
            }
            // console.log(listHtml);
            $('.p-list-con').html(listHtml);
            that.loadPagination({
                hasPreviousPage:res.hasPreviousPage,
                prePage:res.prePage,
                hasNextPage:res.hasNextPage,
                nextPage:res.nextPage,
                pageNum:res.pageNum,
                pages:res.pages,
            });
        },function (errMsg) {
            _hm.errorTips(errMsg);
        })
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
                    that.loadList();
                }
            }))
    }
};

$(function () {
    page.init();
})