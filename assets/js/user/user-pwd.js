$(function(){
    let layer = layui.layer
    let form = layui.form
    // 验证原始密码和新密码是否一致：
    
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        newpwd:function(value){
            if(value == $('[name=oldPwd]').val()){
                return '新密码不能与旧密码相同！'
            }
        },
        // 验证新密码和确认密码是否一致
        repwd:function(value){
            if(value !== $('[name=newPwd]').val()){
                return '两次输入的密码不一致，请重新输入！'
            }
        },
        
    })
    // 重置密码，使用系统本身的重置效果即可
    
    // 修改密码
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status != 0){
                    return layui.layer.msg('更新密码失败')
                }
                layer.msg('更新密码成功！')
                // 重置表单
                $('.layui-form')[0].reset()
    
            }
        })
    
       

    })
    
   

})
