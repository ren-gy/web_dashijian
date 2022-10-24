$(function(){
    getUserInfor1()
    let layer = layui.layer
    $('#btnlogout').on('click',function(){
        layer.confirm('此操作将退出登录, 是否继续?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清除本地缓存的token
            localStorage.removeItem('token')
            // 1.跳转到首页
            location.href='/login.html'
            
            layer.close(index);
          });
    })

})
// 发起请求,更新头像
function getUserInfor1(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token')||''
        // },
       
        success:function(res){
            // console.log(res);
            rendeAvatar(res.data)
        },
        // complete:function(res){
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！' ) {
        //         localStorage.removeItem('token')
        //         // 跳转到登陆
        //         location.href = '/login.html'
               
                
        //     }
            
        // },
        
    
    })
}
// 渲染用户头像
function rendeAvatar(user){
    let name = user.nickname || user.username
    let first = name[0].toUpperCase()
    if(user != undefined){
       
        // console.log(user);
        if(user.user_pic != null){
            // 渲染用户头像
            $('#welcome').html(user.username)
            $('.layui-nav-img').attr('src',user.user_pic).show()
            $('.text-avater').hide()
        }else{
            // 渲染文字头像
            
            // console.log(name);
            $('#welcome').html('欢迎'+name)
            $('.text-avater').html(first).show()
            $('.layui-nav-img').hide()

        }

    }
    
   
    
        
}
