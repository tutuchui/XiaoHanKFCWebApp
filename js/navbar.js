$(document).ready(function () {



    if(window.sessionStorage.getItem('name') !== undefined){
        $("#user-info").html('Hi, ' + window.sessionStorage.getItem('name'))
        $("#nav-login-btn").html('登出');
    }
})