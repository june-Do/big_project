//在列表页中点击具体某一项链接，跳转到详情页 详情页 有 评论列表并可以发布评论
//   通过url路劲中携带的id来获取到具体数据 并渲染
//   1.获取到评论内容 渲染到页面   -------------------------------评论列表渲染功能
//   2.点击提交按钮 将表单内容 收集 提交到服务器 再刷新评论列表----------------评论发布功能

//引入layui中的layer模块


var layer = layui.layer;

//评论列表渲染功能-------------------------------------------
//    1.获取到url路径中的id
var arr = location.href.split('=');
var id = arr[1];

function loadList() {
    var str = '<h4><i class="sprites"></i>评论区</h4>';
    //   将遍历封装到外部 
    function each(res) {
        $.each(res.data, function (index, item) {
            str +=
                `
            <div class="kr_comment_card">
                <div class="img-wrap">
                    <img src="./uploads/avatar_3.jpg" alt="">
                </div>
                <div class="info">
                    <p>${item.uname}  ·  <span>${item.cdate}</span></p>
                    <p>${item.content}</p>
                </div>
                <a href="javascript:;" class="like">${item.count}</a>
            </div>
            `
        })
    }

    //    2.向服务器发起请求  拿到id所对应的数据库数据 渲染到页面中
    //        封装起来 方便发布新评论时 重新渲染评论区域

    $.ajax({
        type: 'get',
        url: `http://localhost:8888/api/articles/${id}/comments`,
        // url: `http://localhost:8888/api/articles/2/comments`,
        success: function (res) {
            // console.log(res);

            if (res.status === 0 && res.message === '查询文章评论成功') {
                //调用封装的遍历方法
                each(res);
                //将字符串形式的str放到.kr_panel:eq(1)中
                $('.kr_panel:eq(1)').html(str)
            }
        }
    })
}
loadList();



//评论发布功能------------------------------------------------
$('#comment-form').on('submit', function (e) {
    //阻止默认行为
    e.preventDefault();

    //通过serialize收集表单数据
    var params = $(this).serialize();

    // 发送ajax请求
    $.ajax({
        type: 'post',
        url: `http://localhost:8888/api/articles/${id}/comments`,
        // url: `http://localhost:8888/api/articles/2/comments`,
        data: params,
        success: function (res) {
            layer.msg(res.message);
            // console.log(res);
            if (res.status === 0 && res.message === '添加文章评论成功') {
                $('#comment-form')[0].reset(); //表单重置
                $('.kr_panel:eq(1)').empty(); //清空内容
                loadList(); //重新渲染
            }
        }
    })
})