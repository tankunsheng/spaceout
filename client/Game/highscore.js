function getAllScores(){
    fetch("/api/getScores", {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "GET"
    }).then(
        function (response) {
            if (response.status !== 200) {
                console.log("Looks like there was a problem. Status Code: " +
                    response.status);
                return;
            }
            // Examine the text in the response
            response.json().then(function (data) {
                
                $("#HighscoresTable > tbody").empty();
                Object.keys(data).forEach(function(single){
                    $("#HighscoresTable > tbody:last").append("<tr><td>"+single+"</td><td>"+ data[single].score+"</td></tr>");
                   
                })
                //add rows
                $("#HighscoresTable > tbody:last").append("<tr> ... </tr>"); //do the magic
            });
        }
    ).catch(function (err) {
        console.log('Fetch Error :-S', err);
    });
}
getAllScores()
export {getAllScores as getAllScores}