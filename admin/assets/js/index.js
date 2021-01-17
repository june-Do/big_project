// 如果没有token就返回登录页
if (localStorage.getItem('mytoken') == undefined) {
    location.href = '/admin/login.html';
}
let layer = layui.layer,
    form = layui.form;

$('.quit').on('click', function() {
    layer.confirm('你确定退出吗？死鬼', {
        btn: ['YSE', 'NO'],
        icon: 3,
        title: '提示'
    }, function(index) {
        location.href = "/admin/login.html";
        localStorage.removeItem('mytoken');
        // 关闭弹窗了
        layer.close(index);
    })
})