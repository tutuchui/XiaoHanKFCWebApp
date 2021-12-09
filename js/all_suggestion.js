var suggestion = [];
var employeeId;
var content = [];
$(document).ready(function () {
    employeeId = window.sessionStorage.getItem('employeeId');
    $.ajax({
        url: "http://localhost:8080/suggestion/getAllSuggestion",
        type: "GET",
        dataType: "json",
        header:{
            'Access-Control-Allow-Origin': "http://localhost:8080"
        },
        success:function (data) {
            suggestion = data
        },
        async:false
    })
    displaySuggestion();
})

function displaySuggestion() {
    $(".suggestion-information").html('');
    for (var i = 0; i < suggestion.length; i++) {
        var suggestionHtml =
            '<tr>'+
            ' <td>'+suggestion[i].suggestionId +' </td>'+
            ' <td>'+suggestion[i].customerName +' </td>'+
            ' <td>'+suggestion[i].phone +'</td>'+
            ' <td>'+suggestion[i].suggestTime +'</td>'+
            ' <td>'+suggestion[i].content +'</td>'
        if(suggestion[i].state === 0){
            suggestionHtml += '<td><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@mdo" onclick="getContentBySuggestionId(' + suggestion[i].suggestionId + ')">正在审核</button></td>'
        }else if(suggestion[i].state === 1)
        {
            suggestionHtml += '<td><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@mdo" onclick="getContentBySuggestionId(' + suggestion[i].suggestionId + ')">审核通过</button></td>'
        }else if(suggestion[i].state === 2)
        {
            suggestionHtml += '<td><button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal3" data-bs-whatever="@mdo" onclick="getContentBySuggestionId2(' + suggestion[i].suggestionId + ')">审核不通过</button></td>'
        }else
        {
            suggestionHtml += '<td><button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onclick="setFeedbackId(' + suggestion[i].suggestionId + ')">反馈</button></td>'
        }
        suggestionHtml +='<tr>'

        $(".suggestion-information").append(suggestionHtml);
    }
}
function setFeedbackId(id){
    $('#sendFeedbackBtn').attr('onclick','addFeedback(' + id + ')')
}


function addFeedback(suggestionId) {
    let content = $('#content').val(); // 10
    console.log('employee_Id:' + employeeId)
    $.ajax({
        url: 'http://localhost:8080/feedback/addFeedback',
        type: "POST",
        data:JSON.stringify({
            content: content,
            employeeId: employeeId,
            suggestionId:suggestionId,
        }),
        contentType: "application/json;charset=utf-8",
        processData: false,
        header:{
            'Access-Control-Allow-Origin':'http://localhost:8080'
        },
        success(data) {
            alert("反馈成功")
            location.reload();
        },
        error(xhr, status, errorMessage){
            alert("反馈失败")
        }
    })
}

function getContentBySuggestionId(suggestionId) {
    $.ajax({
        url: "http://localhost:8080/feedback/getContentBySuggestionId?suggestionId=" + suggestionId,
        type:"GET",
        contentType: "application/json;charset=utf-8",
        header:{
            'Access-Control-Allow-Origin':'http://localhost:8080'
        },
        success: function (data) {
            $('#content2').html(data)
        },
        async: false
    })
}

function getContentBySuggestionId2(suggestionId) {
    $('#sendFeedbackBtn3').attr('onclick','updateContent(' + suggestionId + ')')
    $.ajax({
        url: "http://localhost:8080/feedback/getContentBySuggestionId?suggestionId=" + suggestionId,
        type:"GET",
        contentType: "application/json;charset=utf-8",
        header:{
            'Access-Control-Allow-Origin':'http://localhost:8080'
        },
        success: function (data) {
            $('#content3').html(data)
        },
        async: false
    })
}
function updateContent(suggestionId) {
    let content = $('#content3').val(); // 10
    $.ajax({
        url: 'http://localhost:8080/feedback/updateContent',
        type: "POST",
        data:JSON.stringify({
            suggestionId: suggestionId,
            content: content,
        }),
        contentType: "application/json;charset=utf-8",
        processData: false,
        header:{
            'Access-Control-Allow-Origin':'http://localhost:8080'
        },
        success(data) {
            alert("反馈成功")
            location.reload();
        },
        error(xhr, status, errorMessage){
            alert("反馈失败")
        }
    })
}

