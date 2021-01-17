// 评论模块
// 创建layer对象
var layer = layui.layer;

function loadList() {
    $.ajax({
        type: "get",
        url: "admin/comments",
        success: function(res) {
            console.log(res);
            if (res.status == 0) {
                let arr = res.data;
                let str = "";
                $.each(arr, function(index, item) {

                    str += `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.uname}</td>
                        <td>${item.content}</td>
                        <td>${item.cdate.substr(0,10)}</td>
                        <td>
                        <!-- <button data-id="${item.id}" type="button" class="layui-btn layui-btn-xs edit">
                            编辑
                        </button> -->
                        <button data-id="${item.id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">
                            删除
                        </button>
                        </td>
                    </tr>
                    `;
                })
                $('tbody').html(str);
            }
        }
    })
};
loadList();

// 删除功能
$('tbody').on('click', '.delete', function() {
    let id = $(this).attr('data-id');
    layer.confirm('你确定要删除吗？', {
        btn: ['YSE', 'NO'], //两个按钮，btn中填写按钮显示信息
        icon: 3, //询问信息前显示的图标代码
        title: '提示' //弹窗标题
    }, function(index) {
        $.ajax({
            url: "admin/comments/" + id,
            type: 'DELETE',
            success: function(res) {
                if (res.status == 0) {
                    layer.msg(res.message);
                    loadList();
                }
            }
        })
    })

})