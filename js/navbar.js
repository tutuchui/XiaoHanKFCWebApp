$(document).ready(function () {
    if(window.sessionStorage.getItem('isLogin') !== 'true'){
        if(window.location.pathname !== '/login'){
            $(location).attr('href','/login');
        }

    }else{
        $("#user-info").html('Hi, ' + window.sessionStorage.getItem('name'))
        $("#nav-login-btn").html('登出');
    }
})