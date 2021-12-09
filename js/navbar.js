var numberForBox = [];
$(document).ready(function () {
    if(window.sessionStorage.getItem('name') !== undefined && window.sessionStorage.getItem('name') != null){
        $("#user-info").html('Hi, ' + window.sessionStorage.getItem('name'))
        $("#nav-login-btn").html('登出');
    }
    if(window.sessionStorage.getItem('employeeIsLogin') == 'tre'){
        getNumberForSuggestionBox()
    }
    if(window.sessionStorage.getItem('adminIsLogin') == 'true'){
        getNumberForFeedbackBox()
    }
})

function getNumberForSuggestionBox(){
    $.ajax({
        url: 'http://localhost:8080/suggestion/getNumberForSuggestionBox',
        type: 'GET',
        contentType: "application/json;charset=utf-8",
        header:{
            'Access-Control-Allow-Origin':'http://localhost:8080'
        },
        success: function (data) {
            numberForBox = JSON.parse(data);
            $("#unread-message-count").html(numberForBox)
        },
        async: false
    })
}
function getNumberForFeedbackBox(){
    $.ajax({
        url: 'http://localhost:8080/feedback/getNumberForFeedbackBox',
        type: 'GET',
        contentType: "application/json;charset=utf-8",
        header:{
            'Access-Control-Allow-Origin':'http://localhost:8080'
        },
        success: function (data) {
            numberForBox = JSON.parse(data);
            $("#unread-message-count2").html(numberForBox)
        },
        async: false
    })
}

function suggestion()
{
    $(location).attr('href','../employee_html/all_suggestion');
}

function feedback()
{
    $(location).attr('href','../check_feedback');
}

