$(document).ready(function () {
    if(window.sessionStorage.getItem('adminIsLogin') !== 'true'){
        $(location).attr('href','/adminLogin');
    }
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
    let formData = new FormData()
    formData.append("file", imageFile[0].files[0])
    formData.append("body", JSON.stringify({
        name: productName,
        price: productPrice,
        imageFile: imageFile[0].files[0].name,
        category: productCategory,
        introduction: productIntroduction,
    }))
    console.log(imageFile[0].files[0].name)
    $.ajax({
        url:"http://localhost:8080/product/upload",
        type:"POST",
        data: formData,
        contentType: false,
        processData: false,
        header:{
            'Acess-Control-Allow-Origin':'http://localhost:8080'
        },
        success: function (data) {
            alert("上传成功")
            $(location).attr('href','/manage_product');
        },
        error: function (xhr, status, errorMessage) {
            alert("上传失败")
        }
    })
}
