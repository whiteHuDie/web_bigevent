$(function() {
    $('#link_reg').on('click', () => {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', () => {
            $('.login-box').show()
            $('.reg-box').hide()
        })
        //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
        //自定义一个叫做pwd的校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //校验两次密码是否一致的规则
        repwd: function(value) {
            //通过形参拿到是确认密码框中的内容
            //还需要拿到密码框中的内容
            //然后进行一次等于的判断
            //如果判断失败，则return一个错误提示的消息即可
            var pwd = $('#form_reg [name=password]').val()
            if (pwd !== value) {
                return "两次密码不一致！"
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        //阻止默认的提交行为
        e.preventDefault();
        //发起一个ajax的post请求
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                // return console.log()
                return layer.msg(res.message)
            }
            layer.msg('注册成功！！');
            //模拟人的点击行为
            $('#link_login').click()
        })

    })
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登陆成功！');
                localStorage.setItem('token', res.token)
                console.log(res.token)
                    //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })

})