

function suggest(){
    var content = $("#content").val();
    var formData = new FormData();
    var customerId = window.sessionStorage.getItem('phone');
    var customerName = window.sessionStorage.getItem('name');
    formData.append("content", content);
    formData.append("customerId", customerId);
    formData.append("customerName", customerName);
    $.ajax({
        url:"http://localhost:8080/suggest",
        type:"POST",
        data: formData,
        contentType: false,
        processData: false,
        header:{
            'Acess-Control-Allow-Origin':'http://localhost:8080'
        },
        success: function (data) {
            if(data === 'Success'){
                alert("发送成功")
                $(location).attr('href', '/index');
            }
        },
        error: function (xhr, status, errorMessage) {
            alert("发送失败")
        }
    })
}
