//轮播图模块
$.ajax({
    //请求方式
    type: 'GET',
    //请求的URL地址
    url: 'http://localhost:8888/api/swipers',
    // headers: {
    //     Authorization: localStorage.getItem("mytoken")
    // },
    // 请求响应过程成功触发的函数
    success: function (res) {
        // console.log(res);
        if (res.status === 0) {
            var str = '';
            $.each(res.data, function (index, item) {
                // console.log(item);
                str += `
                <li class="img-effect">
            
                <img src="uploads/${item.swiperimg}" alt="">
               
            </li>`;
            })
        }
        $("#carousel-item").html(str);
    }
});


//友情链接模块
$.ajax({
    // 请求方式
    type: 'GET',
    // 请求的url地址
    url: 'http://localhost:8888/api/links',
    // 携带请求头mytoken值
    headers: {
        Authorization: localStorage.getItem("mytoken")
    },
    // 请求响应整个过程成功了，触发的函数
    success: function (res) {
        // 如果status==0，则遍历返回数据，然后插入页面渲染
        // console.log(res);
        if (res.status == 0) {
            var str = '<dt>合作伙伴</dt>';
            $.each(res.data, function (index, item) {
                str += `<dd>
                <a href="javascript:;">
                 <img src="${'http://localhost:8888/uploads/' + item.linkicon}" alt="${item.linkname}">
                </a>
              </dd>`
            });
        }
        $('.kr_collaborator').html(str);
    }

});