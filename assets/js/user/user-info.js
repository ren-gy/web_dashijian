$(function() {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        username:function (value) {
            if(value.length > 6){
                return '请输入1-6位长度的昵称'
            }
            
        }
    }),
    initUserInfo()
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status != 0){
                    return layer.msg('获取用户基本信息失败！')

                }
                form.val("formUserInfo",res.data)

                // console.log(res);
            }
        })
    }
    $('#btnReset').on('click',function(e){
        e.preventDefault()
        initUserInfo()

    })

    // 提交信息
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
       
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status != 0){

                    return layer.msg('修改用户信息失败')
                }
                layer.msg('修改用户信息成功！')
                window.parent.getUserInfor()

            }
        })
        
    })
    
})