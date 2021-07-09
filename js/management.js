$(document).ready(function () {
    $("#image-file").change(function () {
        readURL(this);
    })
})

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#img-upload').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function uploadProduct(){
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
    formData.append('imageFile',imageFile[0].files[0])
    formData.append("productName", productName);
    formData.append("productPrice",productPrice);
    formData.append("productCategory",productCategory);
    formData.append("productIntroduction", productIntroduction);
    $.ajax({
        url:"http://localhost:8080/uploadProduct",
        type:"POST",
        data: formData,
        contentType: false,
        processData: false,
        header:{
            'Acess-Control-Allow-Origin':'http://localhost:8080'
        },
        success: function (data) {
            if(data === 'Success'){
                alert("上传成功")
            }
        },
        error: function (xhr, status, errorMessage) {
            alert("上传失败")
        }
    })
}
