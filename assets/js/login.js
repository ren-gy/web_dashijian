$(function(){
    // 点击去注册
    $("#toRegist").on("click",function(){
        
        $(".login-box").hide()
        $(".regist-box").show()
    })
    // 点击去登陆
    $("#toLogin").on("click",function(){
        $(".login-box").show()
        $(".regist-box").hide()
    });
    let form = layui.form;
    let layer = layui.layer;
// 使用layui进行输入框验证
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        repss:function(value){
           if (value !== $("#password").val()) {
                return '两次输入的密码不一致'
           } 
           
          }
    })
       
        // 发起注册请求
    $('#form_reg').on('submit',function(e){
        // alert('------')
        e.preventDefault()
        let data = {username: $('#form_reg [name=username]').val(),password: $('#form_reg [name=password]').val()}
       
        $.post('/api/reguser',data,function(res){
            if(res.status !== 0){
                return layer.msg(res.message); 
            }
            layer.msg(res.message);
            $("#toLogin").on('click')
        })

    })
    // 发起登陆请求
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        let data = {username:$('#form_login [name=username]').val(),password:$('#form_login [name=password]').val()}
        
        $.post('/api/login',data,function(res){
            if(res.status != 0){
                return layer.msg(res.message)
            }
            layer.msg("登录成功！")
            // 将登录成功得到的token字符串，保存到localStorage（本地存储）中，用的时候可以取出
           localStorage.setItem('token',res.token)
            // 跳转到后台主页
            location.href='/index.html'
        })

    })

    
    
    
});

