var productId;
var imageUrl;
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
            'Acess-Control-Allow-Origin':'http://localhost:8080'
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
            'Acess-Control-Allow-Origin':'http://localhost:8080'
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
