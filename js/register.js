function register(){
    var name = $("#name").val();
    var phone = $("#phone").val();
    var password = $("#password").val();
    var email = $("#email").val();
    var address = $("#address").val();
    var gender = $("#gender").val();
    var passwordConfirm = $("#password-confirm").val();
    if(password != passwordConfirm){
        $("#password-confirm").addClass("is-invalid")
        return
    }else{
        $("#password-confirm").removeClass("is-invalid")
    }

    $.ajax({
        url:"http://localhost:8080/customer/register",
        type:"POST",
        data: JSON.stringify( {
            name: name,
            password: password,
            email: email,
            address: address,
            gender: gender,
            phone: phone
        }),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        header:{
            'Acess-Control-Allow-Origin':'http://localhost:8080'
        },
        success: function (data, textStatus, xhr) {
            if(xhr.status === 200){
                alert("注册成功")
                $(location).attr('href','/customer_html/login');
            }
        },
        error: function (xhr, status, errorMessage) {

            alert("注册失败")
        }
    })
}
