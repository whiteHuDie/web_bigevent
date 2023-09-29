$(function() {
    var layer = layui.layer;
    var form = layui.form;
    //获取文章分类的列表
    initArtCateList()
        //获取分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    var indexAdd = null
        //为"添加类别"按钮添加点击事件
    $('#addClass').on('click', function() {
            indexAdd = layer.open({
                type: 1,
                title: '添加文章分类',
                content: $("#dialog-add").html(),
                area: ['500px', '300px']
            })
        })
        //通过代理的形式为form表单绑定submit事件
    $('body').on('submit', '#form-add', function(e) {
            e.preventDefault()
            $.ajax({
                method: 'post',
                url: '/my/article/addcates',
                data: $('#form-add').serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('新增分类失败！')
                    }
                    initArtCateList()
                    layer.msg('新增分类成功！')
                        //根据索引关闭对应的弹出层
                    layer.close(indexAdd)
                }
            })
        })
        //通过代理的形式，为btn-edit按钮绑定点击事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function(e) {
            // 弹出一个修改文章信息的层
            indexEdit = layer.open({
                type: 1,
                title: '修改文章分类',
                content: $("#dialog-edit").html(),
                area: ['500px', '300px']
            })
            var id = $(this).attr('data-id')
                //发起请求获取对应分类的数据
            $.ajax({
                method: 'GET',
                url: '/my/article/cates/' + id,
                success: function(res) {
                    form.val('form-edit', res.data)
                }

            })
        })
        // 通过代理的形式，为修改分类的表单绑定submit事件
    $('body').on('submit', '#form-edit', function(e) {
            e.preventDefault()
            $.ajax({
                method: 'post',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('更新分类数据失败！')
                    }
                    layer.msg('更新分类数据成功！')
                    layer.close(indexEdit)
                    initArtCateList()
                }
            })

        })
        //通过代理的形式为删除按钮添加删除事件
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
            //提示用户是否删除
        layer.confirm('确认删除？', { icon: 3, title: '提示' },
            function(index) {
                $.ajax({
                    methods: 'get',
                    url: '/my/article/deletecate/' + id,
                    success: function(res) {
                        if (res.status !== 0) {
                            return layer.msg('删除分类失败！')
                        }
                        layer.msg('删除分类成功！')
                        layer.close(index)
                        initArtCateList()
                    }

                })

            })
    })
})