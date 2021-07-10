var productId;
$(document).ready(function () {
    const params = new URLSearchParams(location.search);
    var productName = params.get('productName')
    var introduction = params.get('introduction');
    var price = params.get('price')
    productId = params.get('productId');
    var imageUrl = params.get('imageUrl')
    var category = params.get('category');

    $("#product-name").val(productName);
    $("#product-introduction").val(introduction);
    $("#category").val(category);
    $("#product-price").val(price);
    $('#img-upload').attr('src', imageUrl);

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
    var formData = new FormData();
    var targetImageFile;
    if(imageFile[0].files[0] !== undefined){
        targetImageFile = imageFile[0].files[0];
    }else{
        targetImageFile = null;
    }
    formData.append('imageFile',targetImageFile)
    formData.append("productName", productName);
    formData.append("productPrice",productPrice);
    formData.append("productCategory",productCategory);
    formData.append("productIntroduction", productIntroduction);
    formData.append("productId", productId);

    $.ajax({
        url:"http://localhost:8080/updateProduct",
        type:"POST",
        data: formData,
        contentType: false,
        processData: false,
        header:{
            'Acess-Control-Allow-Origin':'http://localhost:8080'
        },
        success: function (data) {
            if(data === 'Success'){
                alert("编辑成功")
            }
        },
        error: function (xhr, status, errorMessage) {
            alert("编辑失败")
        }
    })
}
