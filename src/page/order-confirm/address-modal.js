let _hm = require('util/hm.js');
let _cities = require('util/cities/index.js');
let _order = require('service/address-service.js');

let addressModal = {
    show:function (option) {
        console.log(option);
        this.option = option;
        this.$modalWrap = $('.modal-wrap');
        // render modal
        this.loadModal();
        // bind events
        this.bindEvent();
    },
    hide:function (  ) {

    },
    loadModal:function () {
        this.$modalWrap.html(`
            <div class="modal">
                <div class="modal-container">
                    <div class="modal-header">
                        <h1 class="modal-title">User new address</h1>
                        <i class="fa fa-close close"></i>
                    </div>
                    <div class="modal-body">
                        <div class="form">
                            <div class="form-line">
                                <label for="receiver-name" class="label">
                                    <span class="required">*</span>Receiver:
                                </label>
                                <input type="text" class="form-item" id="receiver-name" placeholder="receiver name">
                            </div>
                            <div class="form-line">
                                <label class="label" for="receiver-province">
                                    <span class="required">*</span>City:
                                </label>
                                <select name="" class="form-item" id="receiver-province">
                                    <option value="">Beijing</option>
                                </select>
                                <select name="" class="form-item" id="receiver-city">
                                    <option value="">Beijing</option>
                                </select>
                            </div>
                            <div class="form-line">
                                <label class="label" for="receiver-address">
                                    <span class="required">*</span>Address:
                                </label>
                                <input type="text" class="form-item" placeholder="address" id="receiver-address">
                            </div>
                            <div class="form-line">
                                <label for="receiver-phone" class="label">
                                    <span class="required">*</span>Phone:
                                </label>
                                <input type="text" class="form-item" id="receiver-phone" placeholder="phone number">
                            </div>
                            <div class="form-line">
                                <label for="receiver-postcode" class="label">Postcode:</label>
                                <input type="text" class="form-item" id="receiver-postcode" placeholder="eg. 3000">
                            </div>
                            <div class="form-line">
                                <a href="javascript:;" class="btn address-btn">Submit</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        );
        this.loadProvince();
        this.loadCities();
    },
    bindEvent:function () {
        let that = this;
        // load cities based on selected provinces
        this.$modalWrap.find('#receiver-province').change(function () {
            let selectedProvince = $(this).val();
            that.loadCities(selectedProvince);
        });
    },
    // load province info
    loadProvince:function () {
        let provinces = _cities.getProvinces() || [];
        let $provinceSelect = this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
    },
    // get options for select
    getSelectOption:function(optionArray){
        let html = '<option>select</option>';
        for (let i = 0, length = optionArray.length; i< length;i++){
            html += `<option>${optionArray[i]}</option>`;
        }
        return html;
    },
    // load city info
    loadCities:function (provinceName) {
        let cities = _cities.getCities(provinceName) || [];
        let citySelect = this.$modalWrap.find('#receiver-city');
        citySelect.html(this.getSelectOption(cities));
    }
};
module.exports = addressModal;