$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;
    //定义一个美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
            const dt = new Date(date)
            var y = dt.getFullYear()
            var m = padZero(dt.getMonth() + 1)
            var d = padZero(dt.getDate())
            var hh = padZero(dt.getHours())
            var mm = padZero(dt.getMinutes())
            var ss = padZero(dt.getSeconds())
            return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
        }
        //定义一个补零的方法
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    //定义一个查询的参数对象，将来请求数据的时候
    //需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示几条数据，默认每页显示两条
        cate_id: '', //文章分类的id
        state: ''
    }
    initTable()
    initCate()
        //获取文章列表数据的方法
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                //使用模板引擎渲染页面中的数据
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                    //调用渲染分页的方法
                renderPage(res.total)
            }
        })
    }
    //初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类列表数据失败！')
                }
                //调用模引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render() //因为layui在jquery之前导入，渲染完之后，并未调用jquery渲染数据（添加成功但并未渲染）
                    //所以需要重新进行一次数据的渲染

            }
        })
    }
    //为筛选表单绑定submit事件
    $('#form-search').on('submit', function(e) {
            e.preventDefault()
                //获取表单中选中项的值
            var cate_id = $('[name=cate_id]').val()
            var state = $('[name=state]').val()
                //为查询参数对象q中对应的参数赋值
            q.cate_id = cate_id
            q.state = state
                //根据最新的筛选条件，重新渲染表格的数据
            initTable()
        })
        //定义渲染分页的方法
    function renderPage(total) {
        //调用laypage方法渲染结构
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize, //每页显示几条数据
            curr: q.pagenum, //设置选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            //分页发生切换的时候触发jump回调
            /* 触发jump回调的方式有两种：
            *1.点击页码时候，会触发jump回调  first=undefined
            2.只要调用了laypage.render()方法，就会触发jump回调 first=1
            */
            jump: function(obj, first) {
                //把最新的页码值赋值到q查询对象中
                q.pagenum = obj.curr
                    //把最新的条目数，赋值到q这个查询参数对象的pagesize属性中
                q.pagesize = obj.limit
                if (!first) {
                    //根据最新的q获取数据列表，b并渲染表格
                    initTable()
                }

            }
        });
    }
    //通过代理的方式，为删除按钮绑定点击事件处理函数
    $('tbody').on('click', '.btn-delete', function() {
        //获取删除按钮的个数
        var len = $('.btn-delete').length
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg('删除文章成功！')
                        //当数据删除完成后，需要判断当前这一页中，是否还有剩余的数据
                        //如果没有剩余的数据了，则让页码值-1之后，
                        //再重新调用initTable方法
                    if (len === 1) {
                        //如果len的值=1，则证明删除之后页面没有任何数据了
                        //页码值最小必须是1
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }

            })

            layer.close(index);
        });
    })
})