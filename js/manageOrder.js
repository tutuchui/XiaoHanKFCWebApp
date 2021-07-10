$(document).ready(function () {
    $.ajax({
        url: "http://localhost:8080/getAllOrders",
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
    }
)

function displayData(orderData) {
    for(var i = 0; i < orderData.length; i++){
        var paymentStatus;
        if(orderData[i].paymentStatus === 0){
            paymentStatus = '未支付'
        }else{
            paymentStatus = '已支付'
        }
        var orderStatus;
        if(orderData[i].orderStatus === 0){
            orderStatus = '未准备'
        }else if(orderData[i].orderStatus === 1){
            orderStatus = '准备中'
        }else if(orderData[i].orderStatus === 2){
            orderStatus = '配送中'
        }else {
            orderStatus = '完成'

        }
        var trHtml = '<tr>\n' +
            '                <td>' + orderData[i].orderId + '</td>\n' +
            '                <td>' + orderData[i].customerName + '</td>\n' +
            '                <td>' + orderData[i].customerId + '</td>\n' +
            '                <td>' + paymentStatus + '</td>\n' +
            '                <td>' + orderStatus + '</td>\n' +
            '                <td><button class="btn btn-secondary" onclick="redirectToOrderDetail(' + "'" + orderData[i].orderId + "'" + ')">查看详情</button></td>\n' +
            '              </tr>'
        $(".order_info_content").append(trHtml)
    }
}

function redirectToOrderDetail(orderId){
    var url = "/orderManagementDetail?orderId=" + orderId;
    $(location).attr("href", url);
}