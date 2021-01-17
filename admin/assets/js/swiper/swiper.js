// 获取列表信息

function loadList() {
    $('tbody').html();
    $.ajax({
        type: "get",
        url: "admin/swipers",
        success: function(res) {
            var tags = template('table-tpl', res)
            $('.layui-table tbody').html(tags)
        }

    });
}
loadList();
var layer = layui.layer;

// 删除功能
$('tbody').on('click', '.delete', function() {

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
    console.log(status);
    $.ajax({
        type: 'put',
        url: "admin/swipers/" + data_id,
        data: { status, },
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