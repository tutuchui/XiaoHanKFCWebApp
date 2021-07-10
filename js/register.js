function register(){
    var name = $("#name").val();
    var phone = $("#phone").val();
    var password = $("#password").val();
    var email = $("#email").val();
    var address = $("#address").val();
    var gender = $("#gender").val();
    var formData = new FormData();
    var passwordConfirm = $("#password-confirm").val();
    if(password != passwordConfirm){
        $("#password-confirm").addClass("is-invalid")
        return
    }
    formData.append("name", name);
    formData.append("phone",phone);
    formData.append("password", password);
    formData.append("email",email);
    formData.append("address",address);
    formData.append("gender",gender);
    $.ajax({
        url:"http://localhost:8080/register",
        type:"POST",
        data: formData,
        contentType: false,
        processData: false,
        header:{
            'Acess-Control-Allow-Origin':'http://localhost:8080'
        },
        success: function (data) {
            if(data === 'Success'){
                alert("注册成功")
                $(location).attr('href','/login');
            }
        },
        error: function (xhr, status, errorMessage) {
            alert("注册失败")
        }
    })
}
