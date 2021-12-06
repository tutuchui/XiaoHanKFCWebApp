var ingredientsList = [];
var purchaseRecord = [];
$(document).ready(function () {
    getAllIngredientsForSelect()
    displayIngredients()
});


function getAllIngredientsForSelect() {
    $.ajax({
        url: "http://localhost:8080/product/getAllIngredients",
        type:"GET",
        contentType: "application/json;charset=utf-8",
        header:{
            'Access-Control-Allow-Origin':'http://localhost:8080'
        },
        success: function (data) {
            ingredientsList = JSON.parse(data);
        },
        async: false
    })
};

function displayIngredients() {
    $(".ingredients-information").html('');
    for (i = 0; i < ingredientsList.length; i++) {
        var ingredientsHtml =
            '<tr>'+
            '<td>'+ ingredientsList[i].name +'</td>'+
            '<td>'+ ingredientsList[i].merchant +'</td>'+
            '<td>'+ ingredientsList[i].category +'</td>'+
            '<td>'+ ingredientsList[i].introduction +'</td>'+
            '<td>'+ ingredientsList[i].price +'</td>'+
            '<td>'+ 0 +'</td>'+
            '<td>' +
            '<div>' +
            '<button class="btn btn-primary">购买</button>' +
            '<button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal1" style="margin-left: 10px" onclick="getPurchaseIngredientsRecordById('+ingredientsList[i].ingredientsId+')">购买详情</button>' +
            '</div>' +
            '</td>'+
            '<tr>'
        $(".ingredients-information").append(ingredientsHtml);
    }
}

function addIngredient() {
    let ingredientsName = $('#ingredientsName').val(); // 10
    let ingredientsPrice = $('#ingredientsPrice').val();
    let ingredientsMerchant = $('#ingredientsMerchant').val();
    let ingredientsIntro = $('#ingredientsIntro').val();
    let ingredientsType = $('#ingredientsType option:selected').val(); // 1
    $.ajax({
        url: 'http://localhost:8080/product/addIngredient',
        type: "POST",
        data:JSON.stringify({
            name: ingredientsName,
            price: ingredientsPrice,
            merchant : ingredientsMerchant,
            category: ingredientsType,
            introduction: ingredientsIntro,
        }),
        contentType: "application/json;charset=utf-8",
        processData: false,
        header:{
            'Access-Control-Allow-Origin':'http://localhost:8080'
        },
        success(data) {
            alert("增加原料供应商成功")
            location.reload();
        },
        error(xhr, status, errorMessage){
            alert("增加失败")
        }
    })
}

function getPurchaseIngredientsRecordById(ingredientsId) {
    $.ajax({
        url: "http://localhost:8080/product/getPurchaseIngredientsRecordById?ingredientsId=" + ingredientsId,
        type:"GET",
        contentType: "application/json;charset=utf-8",
        header:{
            'Access-Control-Allow-Origin':'http://localhost:8080'
        },
        success: function (data) {
            purchaseRecord = JSON.parse(data);
        },
        async: false
    })
    $("#ingredients-record").html('');
    for (i = 0; i < purchaseRecord.length; i++) {
        var purchaseRecordHtml =
            '<tr>' +
                '<td style="color: green">' + purchaseRecord[i].purchaseTime + '</td>' +
                '<td style="color: green">' + purchaseRecord[i].number + '</td>' +
                '<td style="color: green">' + '管理员小明'+ '</td>' +
                '<td style="color: green">' + '购买记录'+ '</td>' +
            '</tr>'
        $("#ingredients-record").append(purchaseRecordHtml);

    }
}