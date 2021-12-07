let allProductList = undefined
let categoryMap = new Map()
let stateMap = new Map()
let operationMap = new Map()
$(document).ready(function () {
    if (window.sessionStorage.getItem('employeeIsLogin') !== 'true') {
        $(location).attr('href', '/employee_html/employee_login');
    }
    initMap();
    getAllProducts();
    showProduct();
})

function initMap() {
    categoryMap.set('dessert','甜点')
    categoryMap.set('mainMeal', '主食')
    categoryMap.set('snakes', '小食')
    categoryMap.set('friesChicken', '炸鸡')

    stateMap.set(0,'未上架');
    stateMap.set(1,'已上架');
    operationMap.set(0, '上架');
    operationMap.set(1, '下架');

}

function showProduct() {
    for(var i = 0; i < allProductList.length; i++){
        let tbodyHtml = '<tr>' +
            '<td>' + allProductList[i].name + '</td>' +
            '<td>' + allProductList[i].price + '</td>' +
            '<td>' + categoryMap.get(allProductList[i].category) + '</td>' +
            '<td>' + allProductList[i].introduction + '</td>' +
            '<td>' + allProductList[i].remainCount + '</td>';
        if(allProductList[i].state === 0){
            tbodyHtml +=  '<td style="color: red">' + stateMap.get(allProductList[i].state)  + '</td>' +
                '<td>' + '<button class="btn btn-primary" onclick="operateProduct(' + allProductList[i].productId + ',' +  allProductList[i].state + ')">' + operationMap.get(allProductList[i].state) + '</button>' + '</td>'
        }else{
            tbodyHtml +=  '<td style="color: green">' + stateMap.get(allProductList[i].state)  + '</td>' +
                '<td>' + '<button class="btn btn-danger" onclick="operateProduct(' + allProductList[i].productId + ',' +  allProductList[i].state + ')">' + operationMap.get(allProductList[i].state) + '</button>' + '</td>'

        }
        tbodyHtml += '</tr>'
        $('#product-table tbody').append(tbodyHtml);
    }
}

function operateProduct(productId, state){
    let result = undefined;
    if(state === 0) {
        result = confirm('确认上架该商品?')
    }else {
        result = confirm('确认下架该商品?')
    }
    if(!result) {
        return;
    }
    $.ajax({
        url: "http://localhost:8080/product/updateProductState",
        type: "GET",
        dataType: "json",
        data:{
            productId: productId,
            state: state
        },
        header:{
            'Access-Control-Allow-Origin': "http://localhost:8080"
        },
        success:function (data) {
            if(data == 1){
                alert('上架商品成功');
            }else{
                alert('下架商品成功');
            }
            location.reload()
        },
        error(){
           console.log('error')
        },
    })
}


function getAllProducts(){
    $.ajax({
        url: "http://localhost:8080/product/getAllProducts",
        type: "GET",
        dataType: "json",
        header:{
            'Access-Control-Allow-Origin': "http://localhost:8080"
        },
        success:function (data) {
            allProductList = data
        },
        async:false
    })
}

