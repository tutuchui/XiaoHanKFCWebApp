var mainMealProduct = [];
var dessertProduct = [];
var snakesProduct = [];
var friesChicken = [];
var totalPrice = 0;
var productCountMap = new Map();
var productIdMap = new Map();
var customerId;
$(document).ready(function () {

    if(window.sessionStorage.getItem('customerIsLogin') !== 'true'){
            $(location).attr('href','/login');
    }
    customerId = window.sessionStorage.getItem('customerId');
    $.ajax({
        url: "http://localhost:8080/product/getAllValidProducts",
        type: "GET",
        dataType: "json",
        header:{
            'Access-Control-Allow-Origin': "http://localhost:8080"
        },
        success:function (data) {
            prepareProducts(data)
        },
        async:false
    })

    displayProduct('main');
})
function prepareProducts(productList) {
    for(i = 0; i < productList.length; i++){
        productCountMap.set('product'+productList[i].productId, 0);
        productIdMap.set('product'+productList[i].productId, productList[i]);
        if(productList[i].category === "mainMeal"){
            mainMealProduct.push(productList[i]);
        }else if(productList[i].category === "dessert"){
            dessertProduct.push(productList[i]);
        }else if(productList[i].category === "snakes"){
            snakesProduct.push(productList[i]);
        }else if(productList[i].category === "friesChicken"){
            friesChicken.push(productList[i]);
        }
    }

}

function refreshOrder(){
    $("#product-item-content").html('');
    for(var key of productCountMap.keys()){
        if(productCountMap.get(key) != 0){
            $("#product-item-content").append('<div class="product_item">' + productIdMap.get(key).name + ' * ' + productCountMap.get(key) + '</div>')
        }
    }
}
function addProduct(ele, thisProduct){
    var productId = $(ele).attr('value') + '-count';
    var productCount = $("#" + productId);
    productCountMap.set($(ele).attr('value'), productCountMap.get($(ele).attr('value')) + 1);
    productCount.html(productCountMap.get($(ele).attr('value')));
    totalPrice = totalPrice + thisProduct.price;
    $("#total-price").html(totalPrice);
}

function minusProduct(ele, thisProduct){
    var productId = $(ele).attr('value') + '-count';
    var productCount = $("#" + productId);

    var curCount = productCountMap.get($(ele).attr('value')) - 1;
    if(curCount >= 0){
        totalPrice = totalPrice - thisProduct.price;
        $("#total-price").html(totalPrice);
    }
    if(curCount < 0){
        curCount = 0;
    }

    productCountMap.set($(ele).attr('value'), curCount);
    productCount.html(productCountMap.get($(ele).attr('value')));

}
function submitOrder() {
    var orderProductList = []
    for(var key of productCountMap.keys()){
        if(productCountMap.get(key) > 0){
            var curProduct = productIdMap.get(key);
            var orderProduct = new Object();
            orderProduct['productId'] = curProduct.name;
            orderProduct['productCount'] = productCountMap.get(key);
            orderProduct['customerName'] = window.sessionStorage.getItem('name');
            orderProduct['productId'] = curProduct.productId;
            orderProduct['price'] = curProduct.price * productCountMap.get(key);
            orderProductList.push(orderProduct);
        }
    }
    console.log(JSON.stringify(orderProductList));
    $.ajax({
        url: "http://localhost:8080/customer/submitOrder",
        type: "POST",
        data: JSON.stringify({
            orderProductList: orderProductList,
            totalPrice: totalPrice,
            customerId: customerId
        }),
        contentType: false,
        processData: false,
        header:{
            'Access-Control-Allow-Origin': "http://localhost:8080"
        },
        success:function (data) {
            alert('下单成功')
            $(location).attr('href','/orderHistory');
        },
        error(){
            alert('提交订单失败');
        },
        async:false
    })
}


function displayProduct(category) {
    var product = mainMealProduct;
    if(category === 'main'){
         product = mainMealProduct;
    }else if(category === 'dessert'){
        product = dessertProduct;
    }else if(category === 'snakes'){
        product = snakesProduct;
    }else if (category === 'friesChicken'){
        product = friesChicken;
    }
    $(".main-product-container").html('');
    for (i = 0; i < product.length; i++) {
        var productHtml =
            '<div class="col card me-3" style="width: 18rem;">' +
                '<img src="http://localhost:8080/' + product[i].imageUrl + '" class="card-img-top hfc-card-image">' +
                '<div class="card-body">' +
                    '<h5 class="card-title">' + product[i].name + '</h5>' +
                    '<p class="card-text">' + product[i].introduction + '</p>' +
                    "<button class='btn btn-danger' onclick='addProduct(this, " + JSON.stringify(product[i]) + ")' value= product" +product[i].productId + "><i class='bi bi-plus'></i></button>" +
                    '&nbsp;<span id=' + 'product' + product[i].productId + '-count' + '>'+ productCountMap.get('product' + product[i].productId) + '</span>&nbsp;' +
                    "<button class='btn btn-secondary' onclick='minusProduct(this, " + JSON.stringify(product[i]) + ")' value= product" +product[i].productId + "><i class='bi bi-dash'></i></button>" +
                '</div>' +
            '</div>'
        $(".main-product-container").append(productHtml);
    }
}