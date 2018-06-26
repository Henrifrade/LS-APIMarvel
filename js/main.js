let marvel = {
    render: function() {
        let url = 'http://gateway.marvel.com/v1/public/characters?ts=1&apikey=718d9655e79167925631daa64018feda&hash=dbe4e709801f86df2ba72f6ace4facad'
        let footer = document.getElementById("footer")
        let marvelContainer = document.getElementById("marvel-container")
    
    $.ajax({
        type: "GET",
        url: url,
        beforeSend: function() {
            console.log("Loading API")
        },
        complete: function() {
            console.log("API Loaded!")
        },
        error: function() {
            console.log("API não carregou!")
        },
        success: function(data) {
            footer.innerHTML = data.attributionHTML

            let string = ""
            string += "<div class='row'>"

            for(let i = 0; i < data.data.results.length; i++) {
                let element = data.data.results[i]
                
                string += "<div class='card col-md-3 text-center'>"
                string += "<img class='card-img-top' src='" + element.thumbnail.path + "/portrait_uncanny." + element.thumbnail.extension + "'></img>"
                string += "<div class='card-body'>"
                string += "<h5 class='card-title'>" + element.name + "</h5>"
                string += "<h6 class='card-subtitle mb-2 tex-muted'>" + "ID: " + element.id + "</h6>"
                string += "<a href='" + element.urls[0].url + "' class='btn btn-primary' target='_blank'>Link</a>"
                string += "</div>"
                string += "</div>"

                if ((i + 1) % 4 == 0) {
                    string += "</div>"
                    string += "<div class='row'>"
                }
            }

            marvelContainer.innerHTML = string
        }
    });

    }
}
marvel.render()