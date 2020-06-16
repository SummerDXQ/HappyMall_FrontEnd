import _hm from "util/hm";
import _cities from "util/cities";
import _address from "service/address-service";

let addressModal = {
    show:function (option) {
        this.option = option;
        // this.option.data = option.data || {};
        this.$modalWrap = $('.modal-wrap');
        // render modal
        this.loadModal();
        // bind events
        this.bindEvent();
    },
    hide:function (  ) {
        this.$modalWrap.empty();
    },
    loadModal:function () {
        this.$modalWrap.html(`
            <div class="modal close">
                <div class="modal-container">
                    <div class="modal-header">
                        <h1 class="modal-title"> ${this.option.isUpdate ? 'Update address':'User new address'}</h1>
                        <i class="fa fa-close close"></i>
                    </div>
                    <div class="modal-body">
                        <div class="form">
                            <div class="form-line">
                                <label for="receiver-name" class="label">
                                    <span class="required">*</span>Receiver:
                                </label>
                                ${
                                    this.option.isUpdate?
                                        `<input type="text" class="form-item" id="receiver-name" placeholder="receiver name" value="${this.option.data.receiverName}">`: 
                                        `<input type="text" class="form-item" id="receiver-name" placeholder="receiver name">`
                                }
                            </div>
                            <div class="form-line">
                                <label class="label" for="receiver-province">
                                    <span class="required">*</span>City:
                                </label>
                                <select name="" class="form-item" id="receiver-province">
                                    <option value="">Select</option>
                                </select>
                                <select name="" class="form-item" id="receiver-city">
                                    <option value="">Select</option>
                                </select>
                            </div>
                            <div class="form-line">
                                <label class="label" for="receiver-address">
                                    <span class="required">*</span>Address:
                                </label>
                                 ${
                                    this.option.isUpdate? 
                                        `<input type="text" class="form-item" id="receiver-address" placeholder="receiver address" value="${this.option.data.receiverAddress}">`:
                                        `<input type="text" class="form-item" placeholder="address" id="receiver-address">`
                                 }
                            </div>
                            <div class="form-line">
                                <label for="receiver-phone" class="label">
                                    <span class="required">*</span>Phone:
                                </label>
                                ${
                                    this.option.isUpdate?
                                        `<input type="text" class="form-item" id="receiver-phone" placeholder="receiver phone" value="${this.option.data.receiverPhone}">`:
                                        `<input type="text" class="form-item" placeholder="phone" id="receiver-phone">`
                                }
                            </div>
                            <div class="form-line">
                                <label for="receiver-postcode" class="label">Postcode:</label>
                                 ${
                                    this.option.isUpdate?
                                        `<input type="text" class="form-item" id="receiver-postcode" placeholder="receiver postcode" value="${this.option.data.receiverZip}">`:
                                        `<input type="text" class="form-item" placeholder="postcode" id="receiver-postcode">`
                                }
                            </div>
                            <div class="form-line">
                            ${
                                this.option.isUpdate?
                                    `<input type="hidden" id="receiver-id" value="${this.option.data.id}">`:''
                            }
                                <a href="javascript:;" class="btn address-btn">Submit</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        );
        this.loadProvince();
    },
    bindEvent:function () {
        let that = this;
        // load cities based on selected provinces
        this.$modalWrap.find('#receiver-province').change(function () {
            let selectedProvince = $(this).val();
            that.loadCities(selectedProvince);
        });
        // submit address
        this.$modalWrap.find('.address-btn').click(function () {
            let receiverInfo = that.getReceiverInfo();
            let isUpdate = that.option.isUpdate;
            // add new address and successfully validate data
            if(!isUpdate && receiverInfo.status){
                _address.save(receiverInfo.data,function (res) {
                    _hm.successTips('Successfully add new address!');
                    that.hide();
                    // render updated address list
                    typeof that.option.onSuccess ==='function'
                        && that.option.onSuccess(res);
                },function (errMsg) {
                    _hm.errorTips(errMsg);
                })
            }
            // update address
            else if(isUpdate && receiverInfo.status){
                _address.update(receiverInfo.data,function (res) {
                    _hm.successTips('Successfully update address!');
                    that.hide();
                    // render updated address list
                    typeof that.option.onSuccess ==='function'
                        && that.option.onSuccess(res);
                },function (errMsg) {
                    _hm.errorTips(errMsg);
                })
            }
            else {
                _hm.errorTips(receiverInfo.errMsg || 'Something Wrong!');
            }
        });
        // stop propagation
        this.$modalWrap.find('.modal-container').click(function (e) {
            e.stopPropagation();
        })
        // close modal
        this.$modalWrap.find('.close').click(function () {
            that.hide();
        })
    },
    // load province info
    loadProvince:function () {
        let provinces = _cities.getProvinces() || [];
        let $provinceSelect = this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
        if(this.option.isUpdate && this.option.data.receiverProvince){
            $provinceSelect.val(this.option.data.receiverProvince);
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    // get options for select
    getSelectOption:function(optionArray){
        let html = '<option value="">select</option>';
        for (let i = 0, length = optionArray.length; i< length;i++){
            html += `<option value="${optionArray[i]}">${optionArray[i]}</option>`;
        }
        return html;
    },
    // load city info
    loadCities:function (provinceName) {
        let cities = _cities.getCities(provinceName) || [];
        let $citySelect = this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
        if(this.option.isUpdate && this.option.data.receiverCity){
            $citySelect.val(this.option.data.receiverCity);
        }
    },
    // validate form data
    getReceiverInfo:function () {
        let receiverInfo = {};
        let result = {
            status:false
        }
        receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = this.$modalWrap.find('#receiver-province').val();
        receiverInfo.receiverCity = this.$modalWrap.find('#receiver-city').val();
        receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverPostcode = $.trim(this.$modalWrap.find('#receiver-postcode').val());
        if(this.option.isUpdate){
            receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
        }
        // validate date
        if(!receiverInfo.receiverName){
            result.errMsg = 'Receiver name is required!'
        }
        else if(!receiverInfo.receiverProvince){
            result.errMsg = 'Receiver province is required!'
        }
        else if(!receiverInfo.receiverCity){
            result.errMsg = 'Receiver city is required!'
        }
        else if(!receiverInfo.receiverAddress){
            result.errMsg = 'Receiver address is required!'
        }
        else if(!receiverInfo.receiverPhone){
            result.errMsg = 'Receiver phone is required!'
        }
        else {
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
    }
};
// module.exports = addressModal;
export default addressModal;