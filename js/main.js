// codigo feito usando o material do ifpb-github
 
// urls padrão de requisição da API
const baseUrlStart  = `https://gateway.marvel.com/v1/public/`
const baseUrlEnd    = `&ts=1&apikey=718d9655e79167925631daa64018feda&hash=dbe4e709801f86df2ba72f6ace4facad`
const baseComics    = ``
const baseSeries    = ``
const baseStories   = ``
const baseEvents    = ``
const baseCreators  = ``
const baseCharacter = `characters?name=`

// selecao dos ids do html
let searchInputElm = document.querySelector('#search-input')
let searchBtn = document.querySelector('#search-btn')
let homeLoading = document.querySelector('#loading')
let homeLoaded = document.querySelector('#loaded')
let loadSearch = document.querySelector('#load-search')
let footer = document.querySelector('#footer')


// ================== Funções =================== //

// Função que recebe o resultado de pesquisa
let searchResponse = (searchChar) => {

    if (searchChar.data.results != ''){
        console.log('Sucesso ao procurar personagem na API')
        return searchChar.data.results
        .map(
            item =>
            `<div class="col-sm-12">
                <div class="card" id="card-style">
                    <img class="card-img-top" src="${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}">
                    <div class="card-body">
                        <h5 class="card-title text-center">${item.name}</h5>
                    </div>
                </div>
            </div>`
        )
        .join('')
    } else {
        console.log('data.results vazio, nao encontrou nenhum personagem.')
        let retorno =
            `<div class="text-center col-md-12">
                <i class="material-icons">error</i>
                <p>Character not found.</p>
                <img src="images/notFoundImage.png" style="heigth: 100px; width: 150px;">
            </div>`
        return retorno
    }
}

// ================= Event Listeners ================ //

// Event Listener do botao de pesquisa
searchBtn.addEventListener('click', () => {
    
    let searchInput = searchInputElm.value.replace(" ", "%20")
    let url = `https://gateway.marvel.com/v1/public/characters?name=${searchInput}&ts=1&apikey=718d9655e79167925631daa64018feda&hash=dbe4e709801f86df2ba72f6ace4facad`
    console.log(url)
    homeLoading.style.display = 'flex'
    homeLoaded.style.display = 'none'

    fetch(url)
        .then(res => res.json())
        .then(searchChar => {
            if(searchChar.error) {
                // TO DO
                console.log('Fetch Erro')
            } else {
                homeLoaded.innerHTML = searchResponse(searchChar)

                console.log('Fetch OK')
                footer.innerHTML = searchChar.attributionHTML
                homeLoading.style.display = 'none'
                homeLoaded.style.display = 'flex'
            }
        })
})


// Event listerner de Enter e ESC
searchInputElm.addEventListener('keyup', () => {
    if (event.key === 'Enter') {
        searchBtn.click();
    } else if (event.key === 'Escape') {
        searchInputElm.value = ''
    }
})


















/* codigo feito usando jquery
let marvel = {
    render: function() {
        let url = 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=718d9655e79167925631daa64018feda&hash=dbe4e709801f86df2ba72f6ace4facad'
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

*/