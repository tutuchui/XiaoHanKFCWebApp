var suggestion = [];
var feedback = [];
$(document).ready(function () {

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
    let data = []
    for (var i = 0; i < suggestion.length; i++) {
        let curRow = [suggestion[i].suggestionId,suggestion[i].customerName,suggestion[i].phone,suggestion[i].suggestTime, suggestion[i].content]
        if(suggestion[i].state === 0){
            var id = suggestion[i].suggestionId
            curRow.push('<span style="color: red">待审核</span>')
            curRow.push('<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onclick="displayFeedbackBySuggestionId('+id+')">查看详情</button>')
        }else if(suggestion[i].state === 1){
            var id = suggestion[i].suggestionId
            curRow.push('<span>审核通过</span>')
            curRow.push('<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1" data-bs-whatever="@mdo" onclick="displayFeedbackBySuggestionId('+id+')">查看详情</button>')
        }else if(suggestion[i].state === 2){
            var id = suggestion[i].suggestionId
            curRow.push('<span>审核不通过</span>')
            curRow.push('<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@mdo" onclick="displayFeedbackBySuggestionId('+id+')">查看详情</button>')
        }else {
            curRow.push('<span>没有员工进行反馈</span>')
            curRow.push('<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal3" data-bs-whatever="@mdo" >查看详情</button>')
        }
        data.push(curRow)

    }
    $("#feedback-table").DataTable({
        data: data
    })
}

function displayFeedbackBySuggestionId(suggestionId) {
    $('#feedback-pass-btn').attr('onclick','updateState(' + suggestionId + ',' + 1 + ')')
    $('#feedback-nopass-btn').attr('onclick','updateState(' + suggestionId +','+ 2 +')')
    $.ajax({
        url: 'http://localhost:8080/feedback/getFeedbackBySuggestionIdForAdmin?suggestionId=' + suggestionId,
        type: 'GET',
        contentType: "application/json;charset=utf-8",
        header:{
            'Access-Control-Allow-Origin':'http://localhost:8080'
        },
        success: function (data) {
            feedback = JSON.parse(data);
        },
        async: false
    })
    $("#form-employee-name").html(feedback.employeeName)
    $("#form-feedback-time").html(feedback.feedbackTime)
    $("#form-state").html('待审核')
    $('#content').html(feedback.content)
    $("#form-employee-name1").html(feedback.employeeName)
    $("#form-feedback-time1").html(feedback.feedbackTime)
    $("#form-state1").html('审核通过')
    $('#content1').html(feedback.content)
    $("#form-employee-name2").html(feedback.employeeName)
    $("#form-feedback-time2").html(feedback.feedbackTime)
    $("#form-state2").html('审核不通过')
    $('#content2').html(feedback.content)
}

function updateState(suggestionId,state) {
    $.ajax({
        url: 'http://localhost:8080/feedback/updateState',
        type: "POST",
        data:JSON.stringify({
            suggestionId: suggestionId,
            state: state,
        }),
        contentType: "application/json;charset=utf-8",
        processData: false,
        header:{
            'Access-Control-Allow-Origin':'http://localhost:8080'
        },
        success(data) {
            alert("审核成功")
            location.reload();
        },
        error(xhr, status, errorMessage){
            alert("审核失败")
        }
    })
}