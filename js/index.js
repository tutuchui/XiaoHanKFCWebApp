var mainMealProduct = [];
var dessertProduct = [];
var snakesProduct = [];
var friesChicken = [];

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

    displayProduct('main');
})
function prepareProducts(productList) {
    for(i = 0; i < productList.length; i++){
        productCountMap.set('product'+productList[i].id, 0);
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
function addProduct(ele){
    var productId = $(ele).attr('value') + '-count';
    var productCount = $("#" + productId);
    productCountMap.set($(ele).attr('value'), productCountMap.get($(ele).attr('value')) + 1);
    productCount.html(productCountMap.get($(ele).attr('value')));
}

function minusProduct(ele){
    var productId = $(ele).attr('value') + '-count';
    var productCount = $("#" + productId);
    var curCount = productCountMap.get($(ele).attr('value')) - 1;
    if(curCount < 0){
        curCount = 0;
    }
    productCountMap.set($(ele).attr('value'), curCount);
    productCount.html(productCountMap.get($(ele).attr('value')));
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
                '<img src="' + product[i].imageUrl + '" class="card-img-top hfc-card-image">' +
                '<div class="card-body">' +
                    '<h5 class="card-title">' + product[i].name + '</h5>' +
                    '<p class="card-text">' + product[i].introduction + '</p>' +
                    '<button class="btn btn-danger" onclick="addProduct(this)" value=' + 'product' +product[i].id + '><i class="bi bi-plus"></i></button>' +
                    '&nbsp;<span id=' + 'product' + product[i].id + '-count' + '>'+ productCountMap.get('product' + product[i].id) + '</span>&nbsp;' +
                    '<button class="btn btn-secondary" onclick="minusProduct(this)" value=' + 'product'+product[i].id + '><i class="bi bi-dash"></i></button>' +
                '</div>' +
            '</div>'
        $(".main-product-container").append(productHtml);
    }


}