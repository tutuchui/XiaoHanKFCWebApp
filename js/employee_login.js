$(document).ready(function () {
    if(window.sessionStorage.getItem('name') !== undefined){
        window.sessionStorage.removeItem('name');
        window.sessionStorage.removeItem('number');
        window.sessionStorage.removeItem('employeeIsLogin');
    }
})

function employee_login(){
    var number = $("#number").val();
    var password = $("#password").val();
    $.ajax({
        url:"http://localhost:8080/employee/login",
        type:"POST",
        data: JSON.stringify({
            number: number,
            password: password,
        }),
        contentType: "application/json;utf-8",
        dataType: "json",
        processData: false,
        header:{
            'Acess-Control-Allow-Origin':'http://localhost:8080'
        },
        success: function (data) {
            window.sessionStorage.setItem('number', number);
            window.sessionStorage.setItem('name', data);
            window.sessionStorage.setItem('employeeIsLogin', "true");
            $(location).attr('href','/employee_html/manage_product_state_0');
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
    $(location).attr('href','../adminLogin');
}

function ToCustomerLogin()
{
    $(location).attr('href','../customer_html/login');
}