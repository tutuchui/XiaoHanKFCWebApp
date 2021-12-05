let orderForEmployeeList = null
let paymentStatusMap = new Map()
let orderStatusMap = new Map()
$(document).ready(function () {
    if (window.sessionStorage.getItem('employeeIsLogin') !== 'true') {
        $(location).attr('href', '/employee_html/employee_login');
    }
    initMap();
    getOrderForEmployee();
    loadOrderTable();
})

function initMap() {
    paymentStatusMap.set(0, '未支付')
    paymentStatusMap.set(1, '已支付')

    orderStatusMap.set(0, '已接单')
    orderStatusMap.set(1, '制作完成')
    orderStatusMap.set(2, '配送完成')
    orderStatusMap.set(3, '订单结束')
}

function getOrderForEmployee() {
    $.ajax({
        url: "http://localhost:8080/employee/getAllOrders",
        type: "GET",
        dataType: "json",
        header:{
            'Access-Control-Allow-Origin': "http://localhost:8080"
        },
        success:function (data) {
            console.log(data)
            orderForEmployeeList = data
        },
        async:false
    })
}

function loadOrderTable() {
    for(let i = 0; i < orderForEmployeeList.length; i++){
        let tbodyHtml = '<tr>' +
            '<td>' + orderForEmployeeList[i].orderId + '</td>' +
            '<td>' + orderForEmployeeList[i].customerName + '</td>' +
            '<td>' + orderForEmployeeList[i].phone + '</td>' +
            '<td>' + paymentStatusMap.get(orderForEmployeeList[i].paymentStatus) + '</td>' +
            '<td>' + orderStatusMap.get(orderForEmployeeList[i].orderStatus) + '</td>' +
            '<td>' + '<button class="btn btn-primary" onclick="checkDetail(' + orderForEmployeeList[i].orderId + ')">查看详情</button>' + '</td>' +
            '</tr>'

        $("#order-table tbody").append(tbodyHtml);
    }
}

function checkDetail(orderId) {
    $(location).attr('href', 'order_management_detail?orderId=' + orderId)
}