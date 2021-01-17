 // 编辑用户
 var form = layui.form;

 //获取地址上传入id值
 function getID() {

     var url = location.href;

     // 用 ?  将字符串变成数组   
     var arr = url.split("?");

     url = arr[1];
     var params = url.split("&");
     var obj = {};
     for (var i = 0; i < params.length; i++) {
         var one = params[i]; //  id=601
         one = one.split("="); // ["id",601]
         var key = one[0]; // "id"
         var val = one[1]; // 601
         obj[key] = val;
     }
     return obj.id;
 };
 var id = getID();

 //  根据 id  获取原来的数据 回填到表上
 //  要传递id给后台, 返回对应用户的数据
 $.ajax({
     type: 'get',
     url: 'admin/users/' + id,
     success: function (res) {
         if (res.status === 0) {

             // form模块赋值    
             form.val('editForm', res.data)
         } else {
             layer.msg(res.message)
         }
     }
 });


 //  确认修改：带id提交表单 
 $("form").on("submit", function (e) {
     e.preventDefault();
     var data = $(this).serialize();
     // 快速收集数据
     //  var data = new FormData(this);
     $.ajax({
         type: 'put',
         url: 'admin/users',
         data: data,
         success: function (res) {
             layer.msg(res.message);
             location.href = '/admin/user/user.html';
             console.log(data);
         }
     });
 });