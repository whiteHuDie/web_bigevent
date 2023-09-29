http://big-event-api-t.itheima.net/api/reguserr
难点：自定义校验规则{ 1.获取 layui 中的 form var form = layui.form

    2.使用form.verify自定义效验规则
    //自定义一个叫做pwd的校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格']
    })

}
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTcxMjQsInVzZXJuYW1lIjoiYWFhMzIxIiwicGFzc3dvcmQiOiIiLCJuaWNrbmFtZSI6IiIsImVtYWlsIjoiIiwidXNlcl9waWMiOiIiLCJpYXQiOjE2OTUyOTQxODQsImV4cCI6MTY5NTMzMDE4NH0.KTsnxKDrKqtW7KFQU26PN8re07TQRE1jXcHn7VKfITM

//点击跳转的页面，并以小窗口的形式在页面中展示
<a href="/home/dashboard.html" target="fm">
//在页面中开辟一个小窗口，用来显示按钮点击需要跳转的页面

<iframe name="fm" src="/home/dashboard.html" frameborder="0"></iframe>
 
 
 禁止用户选中（复制）
 user-select: none;

按需调用，如果成功只调成功函数；失败只调失败函数；但是最终都要调 complete 函数
![Alt text](./pictures/image.png)
![Alt text](./pictures/image1.png)

## base64 字符串

![Alt text](./pictures/imageImg.png)

template-web 模版渲染页面表格:https://blog.csdn.net/qq_30258957/article/details/82557519
