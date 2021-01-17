//  添加用户

var form = layui.form

// 自定义表单验证
form.verify({
    //  自定义验证判断两次密码输入是否一样
    same: function (val) {
        // val:形参 确认密码的值
        // .newPwd :新密码
        if (val != $(".layui-form .newPwd").val()) {
            return "两次新密输入的不一样！"
        }
    }
});


//  添加用户
$(".layui-form").submit(function (e) {
    e.preventDefault()
    var data = $(this).serialize()
    $.ajax({
        type: 'post',
        url: 'admin/users',
        data: data,
        success: function (res) {
            console.log(data);
            layer.msg(res.message)
            location.href = '/admin/user/user.html';
            // 相对应的a要亮起来；
            var light = window.parent.document.querySelector("#light");
            $(light).addClass("layui-this").next().removeClass("layui-this");
        }
    })

});