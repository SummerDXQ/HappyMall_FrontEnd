import './index.css';

let Pagination = function () {
    let that = this;
    this.defaultOption = {
        container:null,
        pageNum:1,
        pageRange:3,
        onSelectPage:null
    }
    // add event
    $(document).on('click','.pg-item',function () {
        let $this = $(this);
        if($this.hasClass('active') || $this.hasClass('disabled')){
            return;
        }
        typeof  that.option.onSelectPage === "function" ? that.option.onSelectPage($this.data('value')) : null;
    })
}

// render pagination
Pagination.prototype.render = function (userOption) {
    // merge option
    this.option = $.extend({},this.defaultOption,userOption);;
    if(!(this.option.container instanceof jQuery)){
        return;
    }
    // if only has one page
    if(this.option.pages <= 1){
        return;
    }
    this.option.container.html(this.getPaginationHTml());
};

Pagination.prototype.getPaginationHTml = function () {
    console.log('getPaginationHTml');
    let html = '';
    let option = this.option;
    console.log(option);
    let pageArray = [];
    let start = option.pageNum - option.pageRange > 0?
                option.pageNum - option.pageRange : 1;
    let end = option.pageNum + option.pageRange < option.pages?
                option.pageNum + option.pageRange : option.pages;
    // data for prev button
    pageArray.push({
        name:'prev',
        value:this.option.prePage,
        disabled:!this.option.hasPreviousPage
    });
    for(let i=start;i<=end;i++){
        pageArray.push({
            name:i,
            value:i,
            active: (i === option.pageNum)
        })
    }
    pageArray.push({
        name:'next',
        value:this.option.nextPage,
        disabled:!this.option.hasNextPage
    });
    console.log(pageArray);
    html = '<div class="pg-content">'
    pageArray.map((item,index)=>{
        return(
            html += `<span class="pg-item 
                           ${item.disabled? 'disabled':''}  
                           ${item.active? 'active':''}" 
                           data-value="${item.value}"
                     >${item.name}</span>`
        )
    })
    html += `<span class="pg-total">${option.pageNum} / ${option.pages}</span></div>`;
    return html;

};

export default Pagination;