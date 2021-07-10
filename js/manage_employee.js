var Employee = [];
var employeeCountMap = new Map();
$(document).ready(function () {
    $.ajax({
        url: "http://localhost:8080/getAllEmployee",
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

function displayEmployee() {
    var employee = Employee;
    $(".employee-information").html('');
    for (i = 0; i < employee.length; i++) {
        var employeeHtml =
            '<tr>'+
            ' <td>'+employee[i].number +' </td>'+
            ' <td>'+employee[i].name +'</td>'+
            ' <td>'+employee[i].type +'</td>'+
            ' <td>'+employee[i].phone +'</td>'+
            '<td>'+
                '<a>'+
                  '<button class="btn btn-success waves-effect waves-light">查看详情</button>'+
               ' </a>'+
                '<a>'+
                  '<button class="btn btn-danger waves-effect waves-light">炒他</button>'+
                ' </a>'+
            ' </td>'+
            '<tr>'
        $(".employee-information").append(employeeHtml);
    }
}

