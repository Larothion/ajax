$(window).load(function() { 

/*GLOBAL VARIABLES ----------------------------	*/
  
 var giphsArray = ["cats","dogs","dragons"];


/*FUNCTIONS ----------------------------*/

/*dynamically creates buttons for each value of giphsArray*/
renderedButtons = function () {

	$("#buttons-view").empty();

	for(i = 0; i < giphsArray.length; i++) {

		var giphButton = $("<button>")
		.addClass("giphs-class btn btn-info")
		.attr("data-name", giphsArray[i])
		.text(giphsArray[i]);

		$("#buttons-view").append(giphButton);
	}
}

/*function that displays the various gifs*/
displayGiphsInfo = function() {

	$("#giph-view").empty();

	var giphsQuery = $(this).attr("data-name");

	var queryURL= "http://api.giphy.com/v1/gifs/search?q=" +
	giphsQuery + "&limit=10&api_key=dc6zaTOxFJmzC";

	$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	console.log(response);

        	for( var i=0; i < response.data.length ; i++ ) {

        	var giphDiv = $("<div class='giphDiv'>")
        	var giphDisplay = response.data[i].images.fixed_height_still.url;
        	var giphStateStill = response.data[i].images.fixed_height_still.url;
        	var giphStateAnimate = response.data[i].images.fixed_height.url;

        	var giph1 = $("<img class='giphImg' data-animate=" + giphStateAnimate + " data-still=" + giphStateStill + " data-state='still'>")
        	.attr("src", giphDisplay);
       

        	giphDiv.append(giph1);

        	$("#giph-view").append(giphDiv);
        	console.log("append worked!");

        	}
        }); 
}

/*MAIN PROCESSES ----------------------------*/

/*When a new giph is submitted, adds the submitted input and dynamically
creates a new button*/
$("#add-giph").on("click", function(event) {

	event.preventDefault();

	var newGiph = $("#giph-input").val().trim()

	giphsArray.push(newGiph);

	renderedButtons();
});

/*toggles the gifs between being still and animated*/
$(document).on("click", ".giphImg", function() {

	console.log("giph is clicked");

	var state = $(this).attr("data-state");

		if (state == "still") {
			$(this).attr('src', ($(this).attr('data-animate')));
			$(this).attr("data-state","animate");
			console.log("animate should be working");
		} else {
			$(this).attr('src', $(this).data('still'));
			$(this).attr("data-state","still");
			console.log("still should be working");
		}	
});

 $(document).on("click", ".giphs-class", displayGiphsInfo);

renderedButtons();
});


