// 注意：每次调用$.get()或$.post()或$.ajax()的时候，
// 会先调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options){
    
    options.url = 'http://www.liulongbin.top:3007'+ options.url
    // console.log(options.url);
    // 统一为需要权限的接口设置headers请求头
    if(options.url.indexOf('/my/') != -1){
        options.headers = {
            Authorization:localStorage.getItem('token')||''
        }
    }
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！' ) {
            localStorage.removeItem('token')
            // 跳转到登陆
            location.href = '/login.html'
           
            
        }
    }
    
})