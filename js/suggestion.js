var mySuggestion = [];
var customerId = window.sessionStorage.getItem('customerId');
$(document).ready(function () {
    displayMySuggestion(customerId);
})

function displayMySuggestion(customerId) {
    $.ajax({
        url: 'http://localhost:8080/suggestion/getSuggestionByCustomerId?customerId=' + customerId,
        type: 'GET',
        contentType: "application/json;charset=utf-8",
        header:{
            'Access-Control-Allow-Origin':'http://localhost:8080'
        },
        success: function (data) {
            console.log(data)
            mySuggestion = JSON.parse(data);
            },
        async: false
    })
    for (i = 0; i < mySuggestion.length; i++) {
        let index = i + 1;
        let tbodyHtml = '<tr>' +
            '<th scope="row">' + index + '</th>' +
            '<td>' + mySuggestion[i].suggestTime + '</td>' +
            '<td>' + mySuggestion[i].content + '</td>' +
            '<td>'+
            '<a>' +
            '<button class="btn-primary btn">查看反馈</button>' +
            '</a>' +
            '</td>'+
            '</tr>'
        $("#suggestion-list").append(tbodyHtml);
    }

}

function suggest(){
    var content = $("#content").val();
    var formData = new FormData();
    var customerId = window.sessionStorage.getItem('customerId');
    formData.append("content", content);
    formData.append("customerId", customerId);
    $.ajax({
        url: 'http://localhost:8080/suggestion/addSuggestion',
        type: "POST",
        data:JSON.stringify({
            content: content,
            customerId: customerId,
        }),
        contentType: "application/json;charset=utf-8",
        processData: false,
        header:{
            'Access-Control-Allow-Origin':'http://localhost:8080'
        },
        success(data) {
            alert("发布成功")
            location.reload();
        },
        error(xhr, status, errorMessage){
            alert("发布失败")
        }
    })
}
