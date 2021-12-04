var productId;
var imageUrl;
var ingredientsList = undefined;
$(document).ready(function () {
    const params = new URLSearchParams(location.search);
    var productName = params.get('productName')
    var introduction = params.get('introduction');
    var price = params.get('price')
    productId = params.get('productId');
    imageUrl = params.get('imageUrl')
    var category = params.get('category');
    console.log(params)
    $("#product-name").val(productName);
    $("#product-introduction").val(introduction);
    $("#category").val(category);
    $("#product-price").val(price);
    $('#img-upload').attr('src', 'http://localhost:8080/' + imageUrl);

    $("#image-file").change(function () {
        readURL(this);
    })
    getAllIngredientsForSelect();
    loadIngredientsForSelect();
    loadIngredientsForProduct();
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#img-upload').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}


function updateProduct(){
    var isValidInput = true;
    var productName = $("#product-name").val();
    var productPrice = $("#product-price").val();
    var productCategory = $("#category").val();
    var productIntroduction = $("#product-introduction").val();
    var priceRegEx = new RegExp('^\\d+(\\.\\d+)?$');
    var imageFile = $("#image-file");
    if(productName === ''){
        $("#product-name").addClass("is-invalid");
        isValidInput = false;
    }
    if(productIntroduction === ''){
        $("#product-introduction").addClass("is-invalid");
        isValidInput = false;
    }
    if(!priceRegEx.test(productPrice) || productPrice === ''){
        $("#product-price").addClass("is-invalid");
        isValidInput = false;
    }
    if(!isValidInput){
        return;
    }
    var targetImageFile;
    if(imageFile[0].files[0] !== undefined){
        targetImageFile = imageFile[0].files[0];
    }else{
        targetImageFile = null;
    }

    let formData = new FormData()
    if(targetImageFile != null) {
        formData.append("file", targetImageFile)
        imageUrl = targetImageFile.name;
    }
    formData.append("body", JSON.stringify({
        productId: productId,
        name: productName,
        price: productPrice,
        imageUrl: imageUrl,
        category: productCategory,
        introduction: productIntroduction,
    }))

    $.ajax({
        url:"http://localhost:8080/product/update",
        type:"POST",
        data: formData,
        contentType: false,
        processData: false,
        header:{
            'Access-Control-Allow-Origin':'http://localhost:8080'
        },
        success: function (data) {
            alert("编辑成功")
        },
        error: function (xhr, status, errorMessage) {
            alert("编辑失败")
        }
    })
}

function deleteProduct(){
    $.ajax({
        url:"http://localhost:8080/product/delete?productId=" + productId,
        type:"GET",
        contentType: "application/json;charset=utf-8",
        processData: false,
        header:{
            'Access-Control-Allow-Origin':'http://localhost:8080'
        },
        success: function (data) {
            alert("删除成功")
            $(location).attr('href','/manage_product');
        },
        error: function (xhr, status, errorMessage) {
            alert("编辑失败")
        }
    })
}


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
}

function loadIngredientsForSelect() {
    for(let i = 0; i < ingredientsList.length; i++){
        $("#ingredientsSelect").append($('<option>',{
            value: ingredientsList[i].ingredientsId,
            text: ingredientsList[i].name
        }));
    }
}

function deleteIngredientForProduct(ingredientId, productId) {
    let result = confirm("确定删除改原料吗？")
    if(result){
        console.log('ingredientId: ' + ingredientId);
        console.log('productId: ' + productId);
        $.ajax({
            url: 'http://localhost:8080/product/deleteIngredientForProduct',
            type: 'POST',
            data: JSON.stringify({
                ingredientsId: ingredientId,
                productId: productId
            }),
            contentType: "application/json;charset=utf-8",
            processData: false,
            header:{
                'Access-Control-Allow-Origin':'http://localhost:8080'
            },
            success(data) {
                alert("删除原料成功")
                location.reload();
            },

        })
    }

}

function loadIngredientsForProduct() {
    let ingredientsForProduct = undefined;
    let ingredientsPrice = 0;
    $.ajax({
        url: 'http://localhost:8080/product/getIngredientsForProduct?productId=' + productId,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            ingredientsForProduct = JSON.parse(data)
            for(let i = 0; i < ingredientsForProduct.length; i++){
                ingredientsPrice += ingredientsForProduct[i].price * ingredientsForProduct[i].count
                let index = i + 1;
                let tbodyHtml = '<tr>' +
                    '<th scope="row">'+ index + '</th>' +
                    '<td>' + ingredientsForProduct[i].ingredientName + '</td>' +
                    '<td>' + ingredientsForProduct[i].merchant + '</td>' +
                    '<td>' + ingredientsForProduct[i].price + '</td>' +
                    '<td>' + ingredientsForProduct[i].count + '</td>' +
                    '<td><button class="btn btn-danger" onclick="deleteIngredientForProduct('+ ingredientsForProduct[i].ingredientId + ',' +  productId + ')">删除</button></td>' +
                    '</tr>'
                $("#ingredient-table tbody").append(tbodyHtml);
            }
            $('#ingredients-price').html(ingredientsPrice)
        },
    })

}

function addIngredientForProduct() {
    let ingredientId = $('#ingredientsSelect option:selected').val(); // 1
    let ingredientCount = $('#ingredientCount').val(); // 10
    $.ajax({
        url: 'http://localhost:8080/product/addIngredientForProduct',
        type: "POST",
        data:JSON.stringify({
            ingredientsId: ingredientId,
            ingredientsNumber: ingredientCount,
            productId : productId
        }),
        contentType: "application/json;charset=utf-8",
        processData: false,
        header:{
            'Access-Control-Allow-Origin':'http://localhost:8080'
        },
        success(data) {
            alert("添加原料成功")
            location.reload();
        },
        error(xhr, status, errorMessage){
            alert("添加原料失败")
        }
    })
}