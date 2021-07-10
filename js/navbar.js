$(document).ready(function () {
    if(window.sessionStorage.getItem('name') !== undefined && window.sessionStorage.getItem('name') != null){
        $("#user-info").html('Hi, ' + window.sessionStorage.getItem('name'))
        $("#nav-login-btn").html('登出');
    }
})

function suggestion()
{
    $(location).attr('href','/allSuggestion');
}