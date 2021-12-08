var suggestion = [];
var suggestionCountMap = new Map();
$(document).ready(function () {
    $.ajax({
        url: "http://localhost:8080/suggestion/getAllSuggestion",
        type: "GET",
        dataType: "json",
        header:{
            'Access-Control-Allow-Origin': "http://localhost:8080"
        },
        success:function (data) {
            suggestion = data
        },
        async:false
    })
    displaySuggestion();
})

function displaySuggestion() {
    $(".suggestion-information").html('');
    for (i = 0; i < suggestion.length; i++) {
        console.log(suggestion[i])
        var suggestionHtml =
            '<tr>'+
            ' <td>'+suggestion[i].suggestionId +' </td>'+
            ' <td>'+suggestion[i].customerName +' </td>'+
            ' <td>'+suggestion[i].phone +'</td>'+
            ' <td>'+suggestion[i].suggestTime +'</td>'+
            ' <td>'+suggestion[i].content +'</td>'+
            '<td><button class="btn btn-danger">反馈</button></td>' +
            '<tr>'
        $(".suggestion-information").append(suggestionHtml);
    }
}

