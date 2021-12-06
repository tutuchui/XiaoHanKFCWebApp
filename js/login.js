$(document).ready(function () {
    if(window.sessionStorage.getItem('name') !== undefined){
        window.sessionStorage.removeItem('name');
        window.sessionStorage.removeItem('phone');
        window.sessionStorage.removeItem('customerId');
        window.sessionStorage.removeItem('customerIsLogin');
    }
})
function login(){
    var phone = $("#phone").val();
    var password = $("#password").val();
    $.ajax({
        url:"http://localhost:8080/customer/login",
        type:"POST",
        data: JSON.stringify({
            phone: phone,
            password: password
        }),
        contentType: "application/json;utf-8",
        dataType: "json",
        processData: false,
        header:{
            'Acess-Control-Allow-Origin':'http://localhost:8080'
        },
        success: function (data) {
            console.log(data)
                window.sessionStorage.setItem('phone', phone);
                window.sessionStorage.setItem('name', data.name);
                window.sessionStorage.setItem('customerId', data.customerId);
                window.sessionStorage.setItem('customerIsLogin', "true");
                $(location).attr('href','/index');
        },
        error: function (xhr, status, errorMessage) {
            if(xhr.status === 501){
                alert("用户不存在，请注册");
            }else if(xhr.status === 502){
                alert("用户名或密码错误");
            }else{
                alert("未知错误");
            }
        }
    })
}

function ToAdminLogin()
{
    $(location).attr('href','/adminLogin');
}

function ToEmployeeLogin() {
    $(location).attr('href','/employee_html/employee_login');

}