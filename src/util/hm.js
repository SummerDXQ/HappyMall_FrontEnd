let conf = {
    serverHost : ''
}
let _hm = {
    // request data
    request (param) {
        let that = this;
        return new Promise((resolve,reject)=>{
            $.ajax({
                type:param.method || 'get',
                url: param.url || '',
                dataType:param.type || 'json',
                data:param.data || '',
                success (res) {
                    // request success
                    if(res.status === 0){
                        resolve(res.data);
                    }
                    // haven't login
                    else if(res.status === 10){
                        that.doLogin();
                    }
                    else if(res.status === 1){
                        resolve(res.msg);
                    }
                },
                // 404 or 503 etc.
                error (err) {
                    reject(err.statusText)
                }
            })
        })
    },
    // user-login
    doLogin:function () {
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    // get url
    getServerUrl:function (path) {
        return conf.serverHost + path;
    },
    // get url parameter
    getUrlParam:function (name) {
        let reg = new RegExp('(^|&)'+ name + '=([^&]*)(&|$)');
        let result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    // reminder
    successTips:function (msg) {
        alert(msg || 'Successful');
    },
    errorTips:function (msg) {
        alert(msg || 'Fail');
    },
    // validate date
    validate:function (value,type) {
        let val = $.trim(value);
        if(type === 'required'){
            return !!val;   // transfer to boolean
        }
        if(type === 'phone'){
            return /^0\d{9}/.test(val);   // transfer to boolean
        }
        if(type === 'email'){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    // back to home page
    goHome:function () {
        window.location.href ='./index.html';
    }
}
export default _hm;