// 引入功能！HTML页面已经引入layui.all.js 可以使用全部模块！
var form = layui.form;
var layer = layui.layer;
var laypage = layui.laypage;

var data = {
    pagenum: 1, // 获取第1页的数据 
    pagesize: 3, // 每页显示2条数据 
};

//-------------------------------------  发出请求 加载用户列表
function getList() {
    $.ajax({
        type: "get",
        data: data,
        url: "admin/users",
        success: function (res) {
            if (res.status == 0) {
                var str = "";
                $.each(res.data, function (index, item) {
                    str += `<tr>
                                <td>${item.id}</td>
                                <td>${item.username}</td>
                                <td>${item.nickname}</td>
                                <td>${item.email}</td>
                                <td>
                                <button data-id="${item.id}" type="button" class="layui-btn layui-btn-xs ">
                                    <a style="color: #fff" target="iframeArea" href="./edit.html?id=${item.id}">编辑</a>
                                </button>
                                <button data-id="${item.id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">删除</button>
                                <button data-id="${item.id}" type="button" class="layui-btn layui-btn-xs layui-btn-normal delete">重置密码</button>
                                </td>
                            </tr>`;
                });
                $('.layui-table tbody').html(str)

                // --------------------------------------------分页
                page(res.total);
            }
        }
    });
};
getList();

// ------------------------------------------------------封装函数 分页加载
function page(total) {

    laypage.render({
        // 容器的id值；
        elem: 'articlePage',


        count: total, // 数据总数
        limit: data.pagesize, // 每页显示条数
        curr: data.pagenum, // 起始页，当前页

        limits: [3, 10, 30, 40, 100], // 下拉框的值，表示每页多少条，下拉框用于更换
        layout: ['prev', 'page', 'next', 'count', 'limit', 'skip'],

        // 刷新页面 及 页码切换 的时候，会执行jump函数
        jump: function (obj, first) {
            // first: jump第一次触发，first=true;  除此之外，first=undefined
            if (first === undefined) {
                data.pagenum = obj.curr;
                data.pagesize = obj.limit;
                getList();
            }
        }
    });
};



// ------------------------------------------------------删除
$("tbody").on("click", ".layui-btn-danger", function () {

    // 1. 获取对应
    var id = $(this).attr("data-id");

    // 2. 发送请求
    layer.confirm('是否要删除？', function (index) {

        // 点击确定，执行这里的代码
        $.ajax({
            //  接口文档要求
            type: "delete",

            url: 'admin/users/' + id,
            success: function (res) {
                layer.msg(res.message);
                if (res.status === 0) {

                    layer.close(index);
                    // 删除数据后 重新加载数据  回到第一页
                    data.pagenum = 1;
                    getList();
                }
            }
        });
    });
});


//  修改密码
$('.layui-table tbody').on('click', '.layui-btn-normal', function (e) {

    // 查接口文档发现 需要动态id 
    var id = $(this).attr("data-id");

    //  弹窗
    var wind = layer.open({
        type: 1,
        title: '重置密码',
        content: $('#repwd-form-tpl').html(),
        area: ['500px', '300px']
    })

    // 自定义表单验证
    form.verify({
        //  自定义验证判断两次密码输入是否一样
        same: function (val) {
            // val:形参 确认密码的值
            // .newPwd :新密码
            if (val != $(".newPwd").val()) {
                return "两次新密输入的不一样！"
            }
        }
    });

    // 重置密码
    $('#repwd-form').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: 'put',
            url: 'admin/users/' + id,
            data: {
                password: $('#repwd-form .newPwd').val()
            },
            success: function (res) {
                layer.msg(res.message)
                layer.close(wind)
            }
        })
    })
});