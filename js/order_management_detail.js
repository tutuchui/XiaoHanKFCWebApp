var originalPaymentStatus;
var originalOrderStatus;
var customerId;
var paymentStatusMap = new Map()
$(document).ready(function () {
    const params = new URLSearchParams(location.search);
    var orderId = params.get("orderId");

    paymentStatusMap.set(0, '未支付')
    paymentStatusMap.set(1, '已支付')

    $.ajax({
        url: "http://localhost:8080/employee/getOrderDetails?orderId=" + orderId,
        type: "GET",
        dataType: "json",
        header:{
            'Access-Control-Allow-Origin': "http://localhost:8080"
        },
        success:function (data) {
            displayData(data)
            displayHistoryRecord(data.historyOrderStatus)
        },
    })

});

function displayData(orderData) {
    $("#orderId").attr("value",orderData.orderId);
    $("#name").attr("value",orderData.customerName);
    $("#orderDate").attr("value",orderData.orderTime);
    // $("#payment-" + orderData.paymentStatus).attr('selected','selected')
    $("#paymentStatus").attr('value', paymentStatusMap.get(orderData.paymentStatus))
    $("#order-" + orderData.orderStatus).attr('selected','selected')
    $("#orderStatus").attr("value",orderData.orderStatus);
    originalOrderStatus = orderData.orderStatus;
    originalPaymentStatus = orderData.paymentStatus
    customerId = orderData.customerId;
}

function displayHistoryRecord(historyStatus){
    var content = ""
    for(var i = 0; i < historyStatus.length ; i++){
        var paymentStatus = paymentStatusMap.get(historyStatus[i].paymentStatus);
        var orderStatus;
        if(historyStatus[i].orderStatus === 0){
            orderStatus = '已接单'
        }else if(historyStatus[i].orderStatus === 1){
            orderStatus = '制作完成'
        }else if(historyStatus[i].orderStatus === 2){
            orderStatus = '配送完成'
        }else {
            orderStatus = '订单完成'

        }
         content =  content + "时间：" +  historyStatus[i].time +"&nbsp&nbsp 支付状态：" + paymentStatus +"&nbsp&nbsp 订单状态：" + orderStatus + "&#13;&#10;"
    }
    $("#history-status-content").html(content)
}

function updateRecord() {
    if(originalOrderStatus == $("#orderStatus").val()){
        console.log("Unchanged");
        return;
    }
    let orderId = $("#orderId").val();

    let paymentStatus = originalPaymentStatus;
    let orderStatus = $("#orderStatus").val();

    console.log(paymentStatus);
    console.log(orderStatus);

    $.ajax({
        url:"http://localhost:8080/employee/updateOrderStatus",
        type:"POST",
        data: JSON.stringify({
            orderId:orderId,
            paymentStatus: paymentStatus,
            orderStatus: orderStatus
        }),
        contentType: "application/json;charset=utf-8",
        processData: false,
        header:{
            'Acess-Control-Allow-Origin':'http://localhost:8080'
        },
        success: function (data) {
            alert("更新订单状态成功")
            $(location).attr('href','/employee_html/order_management_detail?orderId=' + $("#orderId").val());

        },
        error: function (xhr, status, errorMessage) {
            alert("编辑失败")
        }
    })

}