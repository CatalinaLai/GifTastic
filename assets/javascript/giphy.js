var cookingArray = ["Chocolate", "Eggs", "Pasta", "Steak", "Fries", "Bacon", "Pizza"];

$(document).ready(function() {
    for (var i = 0; i < cookingArray.length; i++) {
        $("#cooking-buttons").append("<button type='button' onclick='searchGif(\"" + cookingArray[i] + "\")' class='btn btn-primary' value=' " + cookingArray[i] + "'> " + cookingArray[i] + " </button>");
    }
});

function cookingButtonClicked() {
    var userInput = $('#cooking-input').val();
    searchGif(userInput);
}

function submitButtonClicked() {
    var userInput = $('#cooking-input').val();

    if (userInput) {
        $('#cooking-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &limit=22&api_key=7SwnBm1Pl30MAbnBeXA4tuUAXdA232oD',
            type: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}

function displayGif(response) {
    $('#cooking').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:300px; height:300px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#cooking').append(image);
    }

    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}