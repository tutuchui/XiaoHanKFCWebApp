var originalPaymentStatus;
var originalOrderStatus;
var customerId;
$(document).ready(function () {
    const params = new URLSearchParams(location.search);
    var orderId = params.get("orderId");

    $.ajax({
        url: "http://localhost:8080/getOrderStatusDetail?orderId=" + orderId,
        type: "GET",
        dataType: "json",
        header:{
            'Access-Control-Allow-Origin': "http://localhost:8080"
        },
        success:function (data) {
            console.log(data)
            displayData(data)
        },
        async:true
    })

    $.ajax({
        url: "http://localhost:8080/getHistoryOrderStatus?orderId=" + orderId,
        type: "GET",
        dataType: "json",
        header:{
            'Access-Control-Allow-Origin': "http://localhost:8080"
        },
        success:function (data) {
            console.log(data)
            displayHistoryRecord(data)
        },
        async:true
    })
});

function displayData(orderData) {
    $("#orderId").attr("value",orderData.orderId);
    $("#name").attr("value",orderData.customerName);
    $("#orderDate").attr("value",orderData.orderDate);
    $("#payment-" + orderData.paymentStatus).attr('selected','selected')
    $("#order-" + orderData.orderStatus).attr('selected','selected')
    $("#orderStatus").attr("value",orderData.orderStatus);
    originalOrderStatus = orderData.orderStatus;
    originalPaymentStatus = orderData.paymentStatus
    customerId = orderData.customerId;
}

function displayHistoryRecord(historyStatus){
    var content = ""
    for(var i = 0; i < historyStatus.length ; i++){
        var paymentStatus;
        if(historyStatus[i].paymentStatus === 0){
            paymentStatus = '未支付'
        }else{
            paymentStatus = '已支付'
        }
        var orderStatus;
        if(historyStatus[i].orderStatus === 0){
            orderStatus = '未准备'
        }else if(historyStatus[i].orderStatus === 1){
            orderStatus = '准备中'
        }else if(historyStatus[i].orderStatus === 2){
            orderStatus = '配送中'
        }else {
            orderStatus = '完成'

        }
         content =  content + "时间：" +  historyStatus[i].updateTime +  "  支付状态：" + paymentStatus + "  订单状态：" + orderStatus + "&#13;&#10;"
    }
    $("#history-status-content").html(content)
}

function updateRecord() {
    if(originalPaymentStatus == $("#paymentStatus").val() && originalOrderStatus == $("#orderStatus").val()){
        console.log("Unchanged");
        return;
    }
    var formData = new FormData();
    formData.append('orderId',$("#orderId").val())
    formData.append("customerName", $("#name").val());
    formData.append("customerId",customerId)
    formData.append("paymentStatus",$("#paymentStatus").val());
    formData.append("orderStatus",$("#orderStatus").val());

    $.ajax({
        url:"http://localhost:8080/updateOrderStatus",
        type:"POST",
        data: formData,
        contentType: false,
        processData: false,
        header:{
            'Acess-Control-Allow-Origin':'http://localhost:8080'
        },
        success: function (data) {
            if(data === 'Success'){
                alert("编辑成功")
                $(location).attr('href','/orderManagementDetail?OrderId=' + $("#orderId").val());
            }
        },
        error: function (xhr, status, errorMessage) {
            alert("编辑失败")
        }
    })

}