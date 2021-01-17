// 获取列表信息

function loadList() {
    $('tbody').html();
    $.ajax({
        type: "get",
        url: "admin/swipers",
        success: function(res) {
<<<<<<< HEAD
            var tags = template('table-tpl', res)
            $('.layui-table tbody').html(tags)
        }

=======

            if (res.status == 0) {
                let arr = res.data;
                let str = "";
                $.each(arr, function(index, item) {
                    str += `<tr>
                    <td>${item.id}</td> 
                    <td>  <img src="http://localhost:8888/uploads/${item.swiperimg}" alt=""></td> 
                    <td> ${item.swiperimg} </td> 
                    <td> <span data-id="${item.id}" data-status="${item.swiperstatus}" class="layui-badge layui-bg-green">${item.swiperstatus}</span></td> 
                    <td>
                    <button data-id="${item.id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger del">
                    删除
                  </button></td>
                    </tr>`;
                    if (arr.swiperstatus == 0) {
                        $('tbody span').addClass('layui-bg-green').removeClass('layui-bg-cyan');
                        $('tbody span').text('√')
                    } else {
                        $('tbody span').addClass('layui-bg-cyan').removeClass('layui-bg-green');
                        $('tbody span').text('x');
                    }
                });
                $('tbody').html(str);
            }
        }
>>>>>>> 678f9b2... 文章列表版本
    });
}
loadList();
var layer = layui.layer;

// 删除功能
<<<<<<< HEAD
$('tbody').on('click', '.delete', function() {
=======
$('tbody').on('click', '.del', function() {
>>>>>>> 678f9b2... 文章列表版本

    let id = $(this).attr('data-id');
    layer.confirm('确定要删除吗？', {
        btn: ['YSE', 'NO'],
        icon: 3, //询问信息前显示的图标代码
        title: '提示'
    }, function(index) {
        $.ajax({
            type: "delete",
            url: "admin/swipers/" + id,
            success: function(res) {
                layer.msg(res.message);
                loadList();
            }
        })
    });
});

// 修改状态功能
$('tbody').on('click', 'span', function(e) {
    let data_id = $(this).attr('data-id');
    let status = $(this).attr('data-status');
<<<<<<< HEAD
    console.log(status);
    $.ajax({
        type: 'put',
        url: "admin/swipers/" + data_id,
        data: { status, },
=======
    $.ajax({
        type: 'put',
        url: "admin/swipers/" + data_id,
        data: status,
>>>>>>> 678f9b2... 文章列表版本
        success: function(res) {
            if (res.status == 0) {
                layer.msg(res.message);
                loadList();
            }
        }
    })
});

// 批量上传
$('#uploadSwiper').on('click', function() {
    $('#myfile').click();
})
$('body').on('change', '#myfile', function(e) {
    let files = e.target.files
    let fd = new FormData()
    $.each(files, function(index, item) {
        fd.append('swipers', item)
    })
    $.ajax({
        type: 'post',
        url: 'admin/swipers',
        data: fd,
        // 俩个false
        processData: false,
        contentType: false,
        success: function(res) {
            if (res.status === 0) {
                layer.msg(res.message)
                loadList()
            }
        }
    })
})