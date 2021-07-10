function login(){
    var phone = $("#phone").val();
    var password = $("#password").val();
    var formData = new FormData();
    formData.append("password",password);
    formData.append("phone", phone);
    $.ajax({
        url:"http://localhost:8080/customer_login",
        type:"POST",
        data: formData,
        contentType: false,
        processData: false,
        header:{
            'Acess-Control-Allow-Origin':'http://localhost:8080'
        },
        success: function (data) {
                window.sessionStorage.setItem('phone', phone);
                window.sessionStorage.setItem('name', data);
                window.sessionStorage.setItem('isLogin', "true");
                $(location).attr('href','/index');
        },
        error: function (xhr, status, errorMessage) {
            if(status === 501){
                alert("用户不存在，请注册");
            }else if(status === 502){
                alert("用户名或密码错误");
            }else{
                alert("未知错误");
            }
        }
    })
}