var Product = [];
var productCountMap = new Map();
let stateMap = new Map();

$(document).ready(function () {
    if(window.sessionStorage.getItem('adminIsLogin') !== 'true'){
        $(location).attr('href','/adminLogin');
    }
    initMap()
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

function initMap() {
    stateMap.set(0,'下架');
    stateMap.set(1,'上架');

}

function displayProduct() {
    var product = Product;
    for (i = 0; i < product.length; i++) {
        let index = i + 1;
        let tbodyHtml = '<tr>' +
            '<th scope="row">'+ index + '</th>' +
            '<td>' + product[i].name + '</td>' +
            '<td>' + product[i].price + '</td>' +
            '<td>' + product[i].category + '</td>' +
            '<td>' + product[i].introduction + '</td>' +
            '<td>' + 0 + '</td>' +
            '<td>' + + stateMap.get(product[i].state)   +' </td>' +
            '<td>' +
             '<a>' +
            '<button class="btn btn-primary" onclick=checkDetail('+ JSON.stringify(product[i]) + ')>查看详情</button>' +
            '</a>' +
            '<a style="margin-left: 5px">' +
            '<button class="btn btn-danger")>生产</button>' +
            '</a>' +
            '</td>' +
            '</tr>'
        $("#product-table tbody").append(tbodyHtml);
    }
}

function checkDetail(product){
    var url = '/modify_product?productName=' + product.name + '&productId=' + product.productId + "&imageUrl=" + product.imageUrl + "&price=" + product.price + "&introduction=" + product.introduction + "&category=" + product.category;
    $(location).attr('href', url);
}