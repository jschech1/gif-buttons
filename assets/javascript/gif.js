

        $(document).ready(function () {

            var politiciansArray = ["George W. Bush", "Bill Clinton", "Barack Obama", "Ted Cruz", "Donald Trump", "Hillary Clinton", "Joe Biden", "Bernie Sanders", "Sarah Palin", "Roy Moore", "Richard Nixon", "John F. Kennedy", "Ben Carson", "John Edwards", "Abraham Lincoln", "Ronald Reagan", "Mitt Romney", "John McCain", "Nancy Pelosi", "Mitch McConnell", "Paul Ryan"];

            function renderButtons() {

                // Deleting the movie buttons prior to adding new movie buttons
                // (this is necessary otherwise we will have repeat buttons)
                $("#buttonDiv").empty();

                // Looping through the array of movies
                for (var i = 0; i < politiciansArray.length; i++) {

                    // Then dynamicaly generating buttons for each movie in the array.
                    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
                    var a = $("<button>");
                    // Adding a class
                    a.addClass("politician");
                    // Adding a data-attribute with a value of the movie at index i
                    a.attr("data-name", politiciansArray[i]);
                    // Providing the button's text with a value of the movie at index i
                    a.text(politiciansArray[i]);
                    // Adding the button to the HTML
                    $("#buttonDiv").append(a);
                }
            }

            renderButtons();



            // Need to implement search button, appending that search term to array of buttons

            $("#search-button").on("click", function (event) {
                event.preventDefault();

                var searchword = $("#search-term").val().trim();

                politiciansArray.push(searchword);

                renderButtons();
            });




            $(document).on("click", ".politician", function () {
                var politician = $(this).attr("data-name");
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                    politician + "&api_key=UnkJ0C5uzQvTkTO6mPP43kFA9yp0pOVH&limit=10";
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {

                    console.log(queryURL);

                    console.log(response);

                    var results = response.data;

                    for (var i = 0; i < results.length; i++) {

                        var gifDiv = $("<div class='gifDivClass'>");

                        var p = $("<p>").text("Rating: " + results[i].rating);

                        // Animate vs still

                        // var gifImageAnimate = $("<img class='gif'>").attr("src", results[i].images.fixed_height.url);

                        var gifImage = $("<img class='gif'>").attr("src", results[i].images.fixed_height_still.url);
                        gifImage.attr("data-state", "still");
                        gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                        gifImage.attr("data-animate", results[i].images.fixed_height.url);





                        gifDiv.append(p, gifImage);



                        $("#gif-display").prepend(gifDiv);



                    }
                });
            });


            $(document).on("click", ".gif", function () {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            })



        });

