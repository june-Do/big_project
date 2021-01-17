let layer = layui.layer,
    form = layui.form;

// 给form表单注册提交事件
$('form').on('submit', function(e) {
    // 阻止默认事件
    e.preventDefault();
    // 获取参数
    let params = $(this).serialize();
    // 提交数据
    $.ajax({
        type: "post",
        url: "api/login",
        data: params,
        success: function(res) {
            layer.msg(res.message);
            console.log(res);
            if (res.status == 0) {
                location.href = "/admin/index.html";
                localStorage.setItem('mytoken', res.token);
            } else {
                $('form')[0].reset();
            }
        }
    })
})