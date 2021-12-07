let paymentStatusMap = new Map()
let orderStatusMap = new Map()

$(document).ready(function () {
    if(window.sessionStorage.getItem('customerIsLogin') !== 'true'){
        $(location).attr('href','/login');
    }
    initMap()
    $.ajax({
        url: "http://localhost:8080/customer/getOrdersForCustomer?customerId=" + window.sessionStorage.getItem('customerId'),
        type: "GET",
        dataType: "json",
        header:{
            'Access-Control-Allow-Origin': "http://localhost:8080"
        },
        success:function (data) {
            displayData(data)
        },
    })
})

function initMap(){
    paymentStatusMap.set(0, '未支付')
    paymentStatusMap.set(1, '已支付')

    orderStatusMap.set(0, '已接单')
    orderStatusMap.set(1, '制作完成')
    orderStatusMap.set(2, '配送完成')
    orderStatusMap.set(3, '订单结束')
}

function displayData(orderData) {
    for(let i = 0; i < orderData.length; i++){
        let htmlBody = '<tr>' +
            '<td>' + orderData[i].orderId+'</td>' +
            '<td>' + orderData[i].customerName + '</td>' +
            '<td>' + orderData[i].phone + '</td>' +
            '<td>' + orderData[i].totalPrice + '</td>' +
            '<td>' + paymentStatusMap.get(orderData[i].paymentStatus)+ '</td>' +
            '<td>' + orderStatusMap.get(orderData[i].orderStatus) + '</td>' +
            '<td>' + orderData[i].orderTime + '</td>' +
            '<td>' + '<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#orderDetailModal" onclick="loadDetail(' + orderData[i].orderId + ')">详情</button>' +'</td>'
        if(orderData[i].paymentStatus == 0){
            htmlBody += '<td><button class="btn btn-danger" onclick="payOrder(' + orderData[i].orderId + ',' + orderData[i].orderStatus + ')">支付</button></td>'
        }else{
            htmlBody += '<td><button class="btn btn-danger"disabled>已支付</button></td>'
        }
        htmlBody += '</tr>'
        $("#order_table_content").append(htmlBody)
    }
}
function loadDetail(orderId){
    $.ajax({
        url:'http://localhost:8080/customer/getOrderDetail?orderId='+orderId,
        type: 'GET',
        dataType: 'json',
        success: function (data){
            $('#order-detail-table tbody').empty()
            for(let i = 0; i < data.length; i++){
                let htmlBody = '<tr>' +
                    '<td>' + data[i].productName + '</td>' +
                    '<td>' + data[i].number + '</td>' +
                    "</tr>"
                $('#order-detail-table tbody').append(htmlBody)
            }
        }
    })
}

function payOrder(orderId, orderStatus){
    $.ajax({
        url: 'http://localhost:8080/customer/payOrder',
        type: 'POST',
        data: JSON.stringify({
            orderId: orderId,
            orderStatus: orderStatus,
        }),
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (data){
            alert('支付成功')
            location.reload()
        }
    })
}
