$(function() {
    //调用函数获得用户的基本信息
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        //提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            //1.清空本地存储中的token
            localStorage.removeItem('token')
                //2.重新跳转到登录页
            location.href = '/login.html';
            //关闭confirm询问框
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用renderAvatar渲染用户头像
            // console.log(res)
            renderAvatar(res.data)
        },
        //无论成功还是失败，最终都会调用complete回调函数
        /*  complete: function(res) {
             //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
             if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                 //1.强制清空token
                 localStorage.removeItem('token');
                 //2.强制跳转到登录页面
                 location.href = '/login.html'
             }
         } */
    })
}
// 渲染用户头像
function renderAvatar(user) {
    //获取用户名
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //按需渲染用户的头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        $(".layui-nav-img").hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}