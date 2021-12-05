var Product = [];
var productCountMap = new Map();

$(document).ready(function () {
    if(window.sessionStorage.getItem('adminIsLogin') !== 'true'){
        $(location).attr('href','/adminLogin');
    }
    $.ajax({
        url: "http://localhost:8080/product/getAllProducts",
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
    displayProduct();
})
function prepareProducts(productList) {
    for(let i = 0; i < productList.length; i++){
        productCountMap.set('product'+productList[i].id, 0);
       Product.push(productList[i]);
    }
}

function displayProduct() {
    var product = Product;
    $(".main-product-container").html('');
    for (i = 0; i < product.length; i++) {
        var productHtml =
            '<div class="col card me-3" style="width: 18rem;">' +
            '<img src="http://localhost:8080/' +  product[i].imageUrl + '" class="card-img-top hfc-card-image">' +
            '<div class="card-body">' +
            '<h5 class="card-title">' + product[i].name + '</h5>' +
            "<button class='btn btn-danger' onclick='checkDetail(" + JSON.stringify(product[i]) + ")'>查看详情</button>" +
            '</div>' +
            '</div>'
        $(".main-product-container").append(productHtml);
    }
}

function checkDetail(product){
    var url = '/modify_product?productName=' + product.name + '&productId=' + product.productId + "&imageUrl=" + product.imageUrl + "&price=" + product.price + "&introduction=" + product.introduction + "&category=" + product.category;
    $(location).attr('href', url);
}