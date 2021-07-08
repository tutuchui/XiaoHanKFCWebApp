var Product = [];
var productCountMap = new Map();
$(document).ready(function () {
    $.ajax({
        url: "http://localhost:8080/getAllProducts",
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
    for(i = 0; i < productList.length; i++){
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
            '<img src="' + product[i].imageUrl + '" class="card-img-top hfc-card-image">' +
            '<div class="card-body">' +
            '<h5 class="card-title">' + product[i].name + '</h5>' +
            '<button class="btn btn-danger" >查看详情</button>' +
            '</div>' +
            '</div>'
        $(".main-product-container").append(productHtml);
    }


}