// codigo feito usando o material do ifpb-github

// urls padrão de requisição da API
const baseUrlStart  = `https://gateway.marvel.com/v1/public/`
const baseUrlEnd    = `&apikey=718d9655e79167925631daa64018feda&hash=dbe4e709801f86df2ba72f6ace4facad`
const baseSingleS   = `&ts=1`
const baseAllStart  = `characters?nameStartsWith=`
const baseAllEnd    = `&limit=8`
const baseCharacter = `characters?name=`
const baseComics    = `comics?titleStartsWith=`
const baseCreators  = ``
const baseEvents    = ``
const baseSeries    = ``
const baseStories   = ``

// variaveis do event listener scroll
let items
let itemsTotal = 0
const itemsPage = 8

// ============ Selecao dos ids do html ============= //

// select from landing-page-main
let landingMainDiv  = document.querySelector("#landing-page-main")
let landingBtn      = document.querySelector("#landing-btn")

// select input from SearchBox
let SelectSearch    = document.getElementById("inputGroupSelect01")

// load-search
let searchInputElm  = document.querySelector('#search-input')
let searchBtn       = document.querySelector('#search-btn')
let homeLoading     = document.querySelector('#loading')
let homeLoaded      = document.querySelector('#loaded')
let loadSearch      = document.querySelector('#load-search')

// top-characters


// footer
//let footer = document.querySelector('#footer')

// ================== Funções =================== //

function cardTitleCharacter (Cname){
    return `<div id="img-card-title">
                <h5 class="card-title text-left">${Cname}</h5>
            </div>`
}

// Função que recebe o resultado de pesquisa
function searchResponse (searchData, offset = 0, limit = itemsPage) {
    
    if (searchData.data.results != ''){ 
        
        console.log('Sucesso ao procurar personagem na API')
        if (SelectSearch.value == "Characters") {
            return searchData.data.results
            .slice(offset, offset+limit)
            .map(item =>
                `<div class="col-md-3" id="card-full" style="margin-bottom: 2%;">
                    <div class="card border-0" id="card-style">
                        <div id="img-card">
                            <!-- Button trigger modal -->
                            <button type="button" class="text-left btn-link border-0" id="btn-modal" data-toggle="modal" data-target="#t${item.id}">
                            <div id="img-card-interior">
                                <img class="card-img-top rounded-0" src="${item.thumbnail.path.replace("http", "https")}/portrait_uncanny.${item.thumbnail.extension}">
                                ${cardTitleCharacter(item.name)}
                            </button>
                            </div>
                        </div>
                        <!-- Modal -->
                        <div class="modal fade" id="t${item.id}" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="ModalLabel"><a href="#">${item.name}</a></h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p class="text-justify">${item.description}</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>`
            )
            .join('')
            
        } else if (SelectSearch.value == "Comics"){
            return searchData.data.results
            .map(
                item =>
                `<div class="col-md-3" id="card-full" style="margin-bottom: 2%;">
                    <div class="card border-0" id="card-style">
                        <div id="img-card">
                            <!-- Button trigger modal -->
                            <button type="button" class="text-left btn-link border-0" id="btn-modal" data-toggle="modal" data-target="#t${item.id}">
                            <div id="img-card-interior">
                                <img class="card-img-top rounded-0" src="${item.thumbnail.path.replace("http", "https")}/portrait_uncanny.${item.thumbnail.extension}">
                                <div id="img-card-title">
                                <h5 class="card-title text-left">${item.title}</h5>
                                </div>
                            </button>
                            </div>
                        </div>
                        <!-- Modal -->
                        <div class="modal fade" id="t${item.id}" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="ModalLabel"><a href="#">${item.title}</a></h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p class="text-justify">${item.description}</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>`
            )
            .join('')
        } else {
            return searchData.data.results
            .map(
                item =>
                `<div class="col-md-3" id="card-full" style="margin-bottom: 2%;">
                    <div class="card border-0" id="card-style">
                        <div id="img-card">
                            <!-- Button trigger modal -->
                            <button type="button" class="text-left btn-link border-0" id="btn-modal" data-toggle="modal" data-target="#t${item.id}">
                            <div id="img-card-interior">
                                <img class="card-img-top rounded-0" src="${item.thumbnail.path.replace("http", "https")}/portrait_uncanny.${item.thumbnail.extension}">
                                <div id="img-card-title">
                                <h5 class="card-title text-left">${item.name}</h5>
                                </div>
                            </button>
                            </div>
                        </div>
                        <!-- Modal -->
                        <div class="modal fade" id="t${item.id}" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="ModalLabel"><a href="#">${item.name}</a></h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p class="text-justify">${item.description}</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>`
            )
            .join('')       
        }
    } else {
        console.log('data.results vazio, nao encontrou nenhum personagem.')
        let retorno =
            `<div class="text-center col-md-12">
                <i class="material-icons">error</i>
                <p style="margin-bottom:0px">Character not found!</p>
                <p>I guess my maximum effort doesn't work anymore.</p>
                <img src="images/notFoundImage.png" style="heigth: 100px; width: 150px;">
            </div>`
        return retorno
    }
}



// ================= Event Listeners ================ //


// Event Listener do botao de pesquisa
searchBtn.addEventListener('click', () => {

// Funçao original

// correçao de espaço em branco do campo de pesquisa para a url (substituir por regex)
    let searchInput = searchInputElm.value.replace(" ", "%20")
// tratamento do campo de input do search
    let url
    if(searchInputElm.value == '') {
    let retornoNoTyping =
    `<div class="text-center col-md-12">
        <i class="material-icons">error</i>
        <p>My spider-sense is telling me you should type something.</p>
        <img src="images/spidermanNoSpace.jpg" style="heigth: 100px; width: 150px;">
    </div>`
    homeLoaded.innerHTML = retornoNoTyping
    } else {
        
        if (SelectSearch.value == "Characters") {
            url = `${baseUrlStart}${baseAllStart}${searchInput}${baseAllEnd}${baseSingleS}${baseUrlEnd}`
        } else if (SelectSearch.value == "Comics") {
            url = `${baseUrlStart}${baseComics}${searchInput}${baseAllEnd}${baseSingleS}${baseUrlEnd}`
        } else {
            url = `${baseUrlStart}${baseAllStart}${searchInput}${baseAllEnd}${baseSingleS}${baseUrlEnd}`
        }
        console.log(url)
        homeLoading.style.display = "flex"
        homeLoaded.style.display = "none"  
        
        fetch(url)
        .then(response => response.json())
        .then(searchData => {
                console.log('Fetch OK')
                homeLoaded.innerHTML = searchResponse(searchData, itemsTotal)
                homeLoading.style.display = "none"
                homeLoaded.style.display = "flex"
        })
    }
})

// Event listerner de Enter e ESC
searchInputElm.addEventListener('keyup', () => {
    if (event.key === 'Enter') {
        searchBtn.click();
    } else if (event.key === 'Escape') {
        searchInputElm.value = ''
    }
})


landingBtn.addEventListener('click', () => {
    landingMainDiv.style.display = "none"
})