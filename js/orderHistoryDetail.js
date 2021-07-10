$(document).ready(function () {

    if(window.sessionStorage.getItem('customerIsLogin') !== 'true'){
        $(location).attr('href','/login');
    }

    const params = new URLSearchParams(location.search);
    $.ajax({
        url: "http://localhost:8080/getOrderDetailById?orderId=" + params.get('orderId'),
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


        $("#order_table_content").append(
            '<tr>\n' +
            '            <td>' + curOrder.orderId+'</td>' +
            '            <td>' + curOrder.productName + '</td>\n' +
            '            <td>' + curOrder.productCount + '</td>\n' +
            '            <td>' + curOrder.price + '</td>\n' +
            '</tr>'
        )
    }
}