// 引入layer模块
var layer = layui.layer;


//获取数据，渲染到页面中 ，并且 点击加载更多时，再次加载信息
(function () {


    //传入所需参数 (必填项)
    var params = {
        pagenum: 1, //分页参数：页码
        pagesize: 6 //分页参数：每页显示的条数
    };

    //定义变量来接受 总的数据数量值 用来数组长度做判断
    var total;

    // 初始化数组
    var arr = [`<div class = "kr_news_date">17 <span> 08 月 </span></div>`]

    //将遍历封装到外部
    function each(res) {

        $.each(res.data, function (index, item) {
            //每加载一次数据 就将数据添加在arr数组中 可通过数组长度 来 与总的数据数量值做比较 
            arr.push(`
            <div class="item">
            <h4>
              <a href="./detail.html?id=${item.id}">${item.title}</a>
            </h4>
            <p class="meta">
              <span>19分钟前 分享至</span>
              <a href="javascript:;" class="wechat"></a>
              <a href="javascript:;" class="weibo"></a>
            </p>
            <p class="brief">${item.content}</p>
          </div>
            `)

        })

        $('.kr_news_list').append(arr.join(''));
    }

    function loadList() {
        $.ajax({
            type: 'get',
            url: 'http://localhost:8888/api/articles',
            data: params,
            success: function (res) {
                //将响应回来的数据有几条 赋值给变量total
                total = res.total;
                if (res.status === 0 && res.message === "获取文章列表成功！") {
                    each(res); //调用 渲染到页面中
                }
            }
        });
    }
    loadList();

    //加载更多功能---------------------------------------
    //注册点击事件 每次触发 将params.pagenum页码加1
    // 加载更多数据
    $('.kr_more a').on('click', function () {
        //当全部数据加载完毕时 提示用户
        if (arr.length > total) { //因为arr数组初始化时 有一条数据 所以判断条件不可能等于total
            return layer.msg('数据已加载完全部')
        }
        params.pagenum++;
        //重新渲染内容区域
        loadList();
    })

})();