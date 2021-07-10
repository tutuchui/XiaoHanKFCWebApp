$(document).ready(function () {
    $.ajax({
        url: "http://localhost:8080/getOrderByCustomer?phone=" + window.sessionStorage.getItem('phone'),
        type: "GET",
        dataType: "json",
        header:{
            'Access-Control-Allow-Origin': "http://localhost:8080"
        },
        success:function (data) {
            console.log(data)
            displayData(data)
        },
        async:false
    })
})

function displayData(orderData) {
    for(var i = 0; i < orderData.length; i++){
        var curOrder = orderData[i];
        var paymentStatus, orderStatus;
        if(curOrder.paymentStatus === 0){
            paymentStatus = '未支付'
        }else{
            paymentStatus = '已支付'
        }

        if(curOrder.orderStatus === 0){
            orderStatus = '未准备'
        }else if(curOrder.orderStatus === 1){
            orderStatus = '准备中'
        }else if(curOrder.orderStatus === 2){
            orderStatus = '配送中'
        }else {
            orderStatus = '完成'

        }

        var paymentButton;
        if(curOrder.paymentStatus === 0){
            paymentButton = '<td> <button class="btn btn-danger"> 去支付</button></td>';
        }else{
            paymentButton = '<td> <button class="btn btn-danger" disabled> 去支付</button></td>';
        }
        $("#order_table_content").append(
            '<tr>\n' +
            '            <td>' + curOrder.orderId+'</td>' +
            '            <td>' + window.sessionStorage.getItem('name') + '</td>\n' +
            '            <td>' + curOrder.customerId + '</td>\n' +
            '            <td>' + curOrder.totalPrice + '</td>\n' +
            '<td>' + paymentStatus + '</td>' +
            '<td>' + orderStatus + '</td>' +
            '<td>' + curOrder.orderDate + '</td>' +
            '<td> <button class="btn btn-secondary" onclick="directToDetail(' + curOrder.orderId + ')">查看详情</button></td>' +
            paymentButton +
            '</tr>'
        )
    }
}

function directToDetail(orderId) {
    var targetUrl = '/orderHistoryDetail?orderId=' + orderId.toString()
    $(location).attr('href',targetUrl);
}