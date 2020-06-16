import 'page/common/header/index.js'
import 'page/common/nav/index.js'
import 'util/slider/index.js'
import './index.css'
import navSide from 'page/common/nav-side/index.js';
import 'page/common/index.js';

navSide.init({name:'user-center'});

$(function() {
    // banner html
    let bannerHtml  = `
    <div class="banner">
        <ul>
            <li>
                <a href="./list.html?categoryId=100021" target="_blank">
                    <img class="banner-img" src=${require('../../image/banner/banner1.jpg')} />
                </a>
            </li>
            <li>
                <a href="./list.html?categoryId=100030" target="_blank">
                    <img class="banner-img" src=${require('../../image/banner/banner2.jpg')} />
                </a>
            </li>
            <li>
                <a href="./list.html?categoryId=100016" target="_blank">
                    <img class="banner-img" src=${require('../../image/banner/banner3.jpg')} />
                </a>
            </li>
            <li>
                <a href="./list.html?categoryId=100001" target="_blank">
                    <img class="banner-img" src=${require('../../image/banner/banner4.jpg')} />
                </a>
            </li>
            <li>
                <a href="./list.html?categoryId=100021" target="_blank">
                    <img class="banner-img" src=${require('../../image/banner/banner5.jpg')} />
                </a>
            </li>
        </ul>
        <div class="banner-arrow prev">
            <i class="fa fa-angle-left"></i>
        </div>
        <div class="banner-arrow next">
            <i class="fa fa-angle-right"></i>
        </div>
    </div>
    `;
    $('.banner-con').html(bannerHtml);
    // initiate banner
    let $slider = $('.banner').unslider({
        dots: true
    });
    // pre and next
    $('.banner-con .banner-arrow').click(function(){
        let forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});