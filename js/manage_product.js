var Product = [];
var productCountMap = new Map();
let stateMap = new Map();
let foodCategoryMap = new Map()

$(document).ready(function () {
    if (window.sessionStorage.getItem('adminIsLogin') !== 'true') {
        $(location).attr('href', '/adminLogin');
    }
    initMap()

    $.ajax({
        url: "http://localhost:8080/product/getAllProducts",
        type: "GET",
        dataType: "json",
        header: {
            'Access-Control-Allow-Origin': "http://localhost:8080"
        },
        success: function (data) {
            prepareProducts(data)
        },
        async: false
    })
    displayProduct();

    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })

    var popover = new bootstrap.Popover(document.querySelector('.example-popover'), {
        container: 'body'
    })
})



function prepareProducts(productList) {
    for (let i = 0; i < productList.length; i++) {
        productCountMap.set('product' + productList[i].id, 0);
        Product.push(productList[i]);
    }
}

function initMap() {
    stateMap.set(0, '下架');
    stateMap.set(1, '上架');

    foodCategoryMap.set('mainMeal','主食')
    foodCategoryMap.set('dessert','甜点')
    foodCategoryMap.set('snacks','小吃')
    foodCategoryMap.set('friesChicken','炸鸡')

}

function displayProduct() {
    var product = Product;
    let data = []
    for (i = 0; i < product.length; i++) {
        let index = i + 1;
        let introduction = product[i].introduction
        if(introduction.length > 10){
            introduction = introduction.substring(0,10) + '......'
        }
        let introductionHtml = '<p data-bs-trigger="hover" data-bs-toggle="popover"  data-bs-container="body"  data-bs-placement="top" data-bs-content="' + product[i].introduction + '">' + introduction + ' </p>'


        let curRow = [index, product[i].name ,product[i].price, foodCategoryMap.get(product[i].category) , introductionHtml, product[i].remainCount, stateMap.get(product[i].state)]
        curRow.push('<button class="btn btn-primary" onclick=checkDetail(' + JSON.stringify(product[i]) + ')>查看详情</button>' + '<button class="btn btn-danger"  style="margin-left: 5px" data-bs-toggle="modal" data-bs-target="#makeProductModal" onclick="displayIngredientsForProduct(' + product[i].productId + ')">生产</button>')
        data.push(curRow)
        let tbodyHtml = '<tr>' +
            '<th scope="row">' + index + '</th>' +
            '<td>' + product[i].name + '</td>' +
            '<td>' + product[i].price + '</td>' +
            '<td>' + foodCategoryMap.get(product[i].category) + '</td>' +
            '<td>' + product[i].introduction + '</td>' +
            '<td>' + product[i].remainCount + '</td>' +
            '<td>' + stateMap.get(product[i].state) + ' </td>' +
            '<td>' +
            '<a>' +
            '<button class="btn btn-primary" onclick=checkDetail(' + JSON.stringify(product[i]) + ')>查看详情</button>' +
            '</a>' +
            '<a style="margin-left: 5px">' +
            '<button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#makeProductModal" onclick="displayIngredientsForProduct(' + product[i].productId + ')">生产</button>' +
            '</a>' +
            '</td>' +
            '</tr>'
        $("#product-table tbody").append(tbodyHtml);
    }
    $("#product-table").DataTable({
        data: data
    })

}

function makeProduct(productId) {
    let productCount = $("#product-count").val()
    $.ajax({
        url : 'http://localhost:8080/product/makeProduct',
        type: 'POST',
        data:JSON.stringify({
            productId: productId,
            number: productCount
        }),
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (data){
            alert("生产成功!")
            location.reload();
        },
        error: function (xhr, status, errorMessage) {
            if(xhr.status === 501){
                alert("原料数量不足，请购买原料");
            }else{
                alert("系统错误，生产失败")
            }
        }
    })
}

function displayIngredientsForProduct(productId) {
    $('#ingredients-table-list').empty()
    $('#make-product-btn').attr("onclick", "makeProduct(" + productId + ")")
    $.ajax({
        url: 'http://localhost:8080/product/getIngredientsForProductTable?productId=' + productId,
        type: 'GET',
        dataType: 'json',
        success: function (data) {

            for (var i = 0; i < data.length; i++) {
                let tbodyHtml = '<tr>' +
                    '<td>' + data[i].ingredientName + '</td>' +
                    '<td>' + data[i].count + '</td>' +
                    '<td>' + data[i].remainCount + '</td>' +
                    '</tr>'

                $('#ingredients-table-list').append(tbodyHtml)
            }
        }
    })
}

function checkDetail(product) {
    var url = '/modify_product?productName=' + product.name + '&productId=' + product.productId + "&imageUrl=" + product.imageUrl + "&price=" + product.price + "&introduction=" + product.introduction + "&category=" + product.category;
    $(location).attr('href', url);
}