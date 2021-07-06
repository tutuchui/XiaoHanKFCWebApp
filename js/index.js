var hamburger = new Object();
hamburger.title = "汉堡";
hamburger.introduction = "汉堡的介绍";
hamburger.id = "hamburger";
hamburger.imageUrl = "images/hamburger.jpeg"

var fries = new Object();
fries.title = "薯条";
fries.introduction = "薯条的介绍";
fries.id = "fries";
fries.imageUrl = "images/fries.jpeg"

var mainProduct =[hamburger, fries];

var iceCream = new Object();
iceCream.title = "冰淇淋";
iceCream.introduction = "冰淇淋的介绍";
iceCream.id = "icecream";
iceCream.imageUrl = "images/icecream.jpeg"

var dessertProduct = [iceCream];
$(document).ready(function () {
    displayProduct('main');
})
function addProduct(ele){
    var productId = $(ele).attr('value') + '-count';
    var productCount = $("#" + productId);
    curCount = parseInt(productCount.html()) + 1;
    productCount.html(curCount);
}

function minusProduct(ele){
    var productId = $(ele).attr('value') + '-count';
    var productCount = $("#" + productId);
    curCount = parseInt(productCount.html()) - 1;
    if(curCount < 0){
        curCount = 0;
    }
    productCount.html(curCount);
}


function displayProduct(category) {
    var product = mainProduct;
    if(category === 'main'){
         product = mainProduct;
    }else if(category === 'dessert'){
        product = dessertProduct;
    }
    $(".main-product-container").html('');
    for (i = 0; i < product.length; i++) {
        var productHtml =
            '<div class="col card me-3" style="width: 18rem;">' +
                '<img src="' + product[i].imageUrl + '" class="card-img-top hfc-card-image">' +
                '<div class="card-body">' +
                    '<h5 class="card-title">' + product[i].title + '</h5>' +
                    '<p class="card-text">' + product[i].introduction + '</p>' +
                    '<button class="btn btn-danger" onclick="addProduct(this)" value=' + product[i].id + '><i class="bi bi-plus"></i></button>' +
                    '&nbsp;<span id=' + product[i].id + '-count' + '>0</span>&nbsp;' +
                    '<button class="btn btn-secondary" onclick="minusProduct(this)" value=' + product[i].id + '><i class="bi bi-dash"></i></button>' +
                '</div>' +
            '</div>'
        $(".main-product-container").append(productHtml);
    }


}