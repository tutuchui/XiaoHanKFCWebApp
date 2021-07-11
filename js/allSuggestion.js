var suggestion = [];
var suggestionCountMap = new Map();
$(document).ready(function () {
    $.ajax({
        url: "http://localhost:8080/getAllSuggestion",
        type: "GET",
        dataType: "json",
        header:{
            'Access-Control-Allow-Origin': "http://localhost:8080"
        },
        success:function (data) {
            prepareSuggestion(data)
        },
        async:false
    })
    displaySuggestion();
})

function prepareSuggestion(suggestionList) {
    for(i = 0; i < suggestionList.length; i++){
        suggestionCountMap.set('suggestion'+suggestionList[i].id, 0);
        suggestion.push(suggestionList[i]);
    }
}

function displaySuggestion() {
    var curSuggestion = suggestion;
    $(".suggestion-information").html('');
    for (i = 0; i < curSuggestion.length; i++) {
        var suggestionHtml =
            '<tr>'+
            ' <td>'+curSuggestion[i].suggestionId +' </td>'+
            ' <td>'+curSuggestion[i].customerName +' </td>'+
            ' <td>'+curSuggestion[i].customerId +'</td>'+
            ' <td>'+curSuggestion[i].suggestionTime +'</td>'+
            ' <td>'+curSuggestion[i].content +'</td>'+
            '<td>'+
            '<a>'+
            '<button class="btn btn-success waves-effect waves-light">忽略</button>'+
            ' </a>'+
            ' </td>'+
            '<tr>'
        $(".suggestion-information").append(suggestionHtml);
    }
}

