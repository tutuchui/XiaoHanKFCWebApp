var ingredientsList = [];
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
        let ingredientsInfo = ingredientsList[i]
        var ingredientsHtml =
            '<tr>'+
            '<td>'+ ingredientsList[i].name +'</td>'+
            '<td>'+ ingredientsList[i].merchant +'</td>'+
            '<td>'+ ingredientsList[i].category +'</td>'+
            '<td>'+ ingredientsList[i].introduction +'</td>'+
            '<td>'+ ingredientsList[i].price +'</td>'+
            '<td>'+ ingredientsList[i].number +'</td>'+
            '<td>' +
            '<div>' +
            '<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#purchaseIngredientModal" onclick="loadPurchaseInfo(' + ingredientsInfo.ingredientsId + ',' + ingredientsInfo.price  + ')">购买</button>' +
            '<button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal1" style="margin-left: 10px">查看详情</button>' +
            '</div>' +
            '</td>'+
            '<tr>'
        $(".ingredients-information").append(ingredientsHtml);
    }
}
function loadPurchaseInfo(id, price){
    $("#purchasePrice").attr('value', price)
    $("#purchase-ingredients-btn").attr("onclick", "purchaseIngredients(" + id + ")")
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

function purchaseIngredients(ingredientsId){
    let number = $("#ingredientsCount").val()
    $.ajax({
        url: 'http://localhost:8080/product/purchaseIngredients',
        type: "POST",
        data: JSON.stringify({
            ingredientsId: ingredientsId,
            number: number
        }),
        contentType: 'application/json;charset-utf-8',
        success(data) {
            alert("购买原料成功!")
            location.reload();
        },
    })
}