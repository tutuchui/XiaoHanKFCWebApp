function login(){
    var number = $("#number").val();
    var password = $("#password").val();
    var formData = new FormData();
    formData.append("password",password);
    formData.append("number", number);
    $.ajax({
        url:"http://localhost:8080/employee_login",
        type:"POST",
        data: formData,
        contentType: false,
        processData: false,
        header:{
            'Acess-Control-Allow-Origin':'http://localhost:8080'
        },
        success: function (data) {
            if(data === 'Success'){
                alert("登陆成功")
            }
        },
        error: function (xhr, status, errorMessage) {
            alert("登陆失败")
        }
    })
}