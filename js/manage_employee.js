var Employee = [];
var employeeCountMap = new Map();
let stateMap = new Map();
$(document).ready(function () {
    if(window.sessionStorage.getItem('adminIsLogin') !== 'true'){
        $(location).attr('href','/adminLogin');
    }

    initMap()

    $.ajax({
        url: "http://localhost:8080/employee/getAllEmployee",
        type: "GET",
        dataType: "json",
        header:{
            'Access-Control-Allow-Origin': "http://localhost:8080"
        },
        success:function (data) {
            prepareEmployee(data)
        },
        async:false
    })
    displayEmployee();
})

function prepareEmployee(employeeList) {
    for(i = 0; i < employeeList.length; i++){
        employeeCountMap.set('employee'+employeeList[i].id, 0);
        Employee.push(employeeList[i]);
    }
}
function initMap() {
    stateMap.set(0,'正常');
    stateMap.set(1,'已解聘');

}

function displayEmployee() {
    var employee = Employee;
    $(".employee-information").html('');
    for (i = 0; i < employee.length; i++) {
        var employeeHtml =
            '<tr>'+
            '<td>'+employee[i].number +'</td>'+
            '<td>'+employee[i].name +'</td>'+
            '<td>'+employee[i].phone +'</td>';
        if(employee[i].state === 0)    {
            employeeHtml += ' <td>'+ stateMap.get(employee[i].state) +'</td>'+
                '<td>'+
                '<a>'+
                '<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1">查看详情</button>'+
                '</a>'+
                '<a>'+
                '<button class="btn btn-danger waves-effect waves-light" style="margin-left: 10px" data-bs-toggle="modal" data-bs-target="#fireEmployeeModal" onclick="setModalName('+"'"+employee[i].number+"'"+')">炒他</button>'+
                '</a>'+
                '</td>'+
                '<tr>'
        }else{
            employeeHtml += ' <td  style="color: red">'+ stateMap.get(employee[i].state) +'</td>'+
                '<td>'+
                '<a>'+
                ' <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1">查看详情</button>'+
                ' </a>'+
                ' </td>'+
                '<tr>'
        }

        $(".employee-information").append(employeeHtml);
    }
}

function setModalName(name){
    $("#employee-name").html(name);
    $("#fire-btn").attr('onClick', "fireEmployee("+"'"+name+"'"+")")
}

function fireEmployee(name) {
    $.ajax({
        url:"http://localhost:8080/employee/fire?employeeNumber=" +name,
        type:"POST",
        contentType: "application/json;charset=utf-8",
        processData: false,
        header:{
            'Access-Control-Allow-Origin':'http://localhost:8080'
        },
        success: function (data) {
            alert("删除成功")
            $(location).attr('href','/manage_employee');
        },
        error: function (xhr, status, errorMessage) {
            alert("删除失败")
        }
    })
}

function addEmployee() {
    let employeeNumber = $('#employeeNumber').val(); // 10
    let employeeName = $('#employeeName').val();
    let employeePhone = $('#employeePhone').val();
    let employeePassword = $('#employeePassword').val();
    let employeeEmail = $('#employeeEmail').val();
    let employeeGender = $('#employeeGender option:selected').val(); // 1
    let employeeType = $('#employeeType option:selected').val(); // 1
    $.ajax({
        url: 'http://localhost:8080/employee/addEmployee',
        type: "POST",
        data:JSON.stringify({
            number: employeeNumber,
            name: employeeName,
            phone : employeePhone,
            password: employeePassword,
            email: employeeEmail,
            gender : employeeGender,
            type: employeeType,
        }),
        contentType: "application/json;charset=utf-8",
        processData: false,
        header:{
            'Access-Control-Allow-Origin':'http://localhost:8080'
        },
        success(data) {
            alert("增加员工成功")
            location.reload();
        },
        error(xhr, status, errorMessage){
            alert("增加员工失败")
        }
    })
}