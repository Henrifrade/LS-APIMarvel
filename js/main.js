// codigo feito usando o material do ifpb-github

// urls padrão de requisição da API
const baseUrlStart  = `https://gateway.marvel.com/v1/public/`
const baseUrlEnd    = `&apikey=718d9655e79167925631daa64018feda&hash=dbe4e709801f86df2ba72f6ace4facad`
const baseSingleS   = `&ts=1`
const baseAllStart  = `characters?nameStartsWith=`
const baseAllEnd    = `&limit=8`
let   baseOffset    = `&offset=0`
const baseCharacter = `characters?name=`
const baseComics    = `comics?titleStartsWith=`
const baseCreators  = ``
const baseEvents    = ``
const baseSeries    = ``
const baseStories   = ``

// variaveis do event listener load more
let loadOffset = 0
let loadLimit = 8
let fetchedUrl
let lastInput

// ============ Selecao dos ids do html ============= //

// selects from landing-page-main
let landingMainDiv   = document.querySelector("#landing-page-main")
let landingBtn       = document.querySelector("#landing-btn")

// selects from input from SearchBox
let SelectSearch     = document.getElementById("inputGroupSelect01")

// selects from load-search-box
let loadSearchBox    = document.querySelector('#load-search-box')
let searchInputElm   = document.querySelector('#search-input')
let searchBtn        = document.querySelector('#search-btn')
let homeLoading      = document.querySelector('#loading')
let homeLoaded       = document.querySelector('#loaded')
let btnLoadMore      = document.querySelector('#btnLoadMore')

// selects from top-characters-box
let topCharactersBox = document.querySelector('#topCharactersBox')
// selects from az-index-box
let azIndexBox       = document.querySelector('#azIndexBox')
// selects from footer-box
let footerBox        = document.querySelector('#footer')

// ================== Funções =================== //
// Corrige a posição do scroll quando recarrega a pagina em um ponto fora do topo da pagina, resolvendo um problema de quebra de local onde é exibido a div da landing page
window.onbeforeunload = function() {window.scrollTo(0,0);}

function cardTitleCharacter (Cname){
    return `<div id="img-card-title">
                <h5 class="card-title text-left">${Cname}</h5>
            </div>`
}

function testDescription(description) {

    if (description == ''){
        return `No description.`
    } else {
        return description
    }
}

// Função que recebe o resultado de pesquisa
function searchResponse (searchData) {
    
    if (searchData.data.results != ''){ 
        console.log(loadOffset,loadLimit)
        console.log(fetchedUrl)
        console.log('Sucesso ao procurar personagem na API')
        if (SelectSearch.value == "Characters") {
            return searchData.data.results
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
                                <h5 class="modal-title" id="ModalLabel"><a href="${item.urls[0].url}" target="_blank">${item.name}</a></h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>Description:</p>
                                <p class="text-justify">${testDescription(item.description)}</p>
                                <p>Comics: ${item.comics.available}</p>
                                <p><ul>${item.comics.items.map(items => `<li>${items.name}</li>`).join('')}</ul></p>
                                <p>Series: ${item.series.available}</p>
                                <p><ul>${item.series.items.map(items => `<li>${items.name}</li>`).join('')}</ul></p>
                                <p>Stories: ${item.stories.available}</p>
                                <p><ul>${item.stories.items.map(items => `<li>${items.name}</li>`).join('')}</ul></p>
                                <p>Events: ${item.events.available}</p>
                                <p><ul>${item.events.items.map(items => `<li>${items.name}</li>`).join('')}</ul></p>
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
        let retorno
        console.log('data.results vazio, nao encontrou nenhum personagem.')
        if(loadOffset > 0){
            retorno =
            `<div class="text-center col-md-12">
                <i class="material-icons">error</i>
                <p style="margin-bottom:0px">Nothing to show anymore!</p>
                <p>Hulk gonna smash if you keep pressing.</p>
                <img src="images/loadedAll.png" style="heigth: 100px; width: 150px;">
            </div>`
        } else {
            retorno =
            `<div class="text-center col-md-12">
                <i class="material-icons">error</i>
                <p style="margin-bottom:0px">Can't find!</p>
                <p>I guess my maximum effort doesn't work anymore.</p>
                <img src="images/notFoundImage.png" style="heigth: 100px; width: 150px;">
            </div>`
        }
        return retorno
    }
}



// ================= Event Listeners ================ //


// Event Listener do botao de pesquisa
searchBtn.addEventListener('click', () => {

// correçao de espaço em branco do campo de pesquisa para a url (substituir por regex)
    let searchInput = searchInputElm.value.replace(" ", "%20")
    lastInput = searchInput
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
            url = `${baseUrlStart}${baseAllStart}${searchInput}${baseOffset}${baseAllEnd}${baseSingleS}${baseUrlEnd}`
        } else if (SelectSearch.value == "Comics") {
            url = `${baseUrlStart}${baseComics}${searchInput}${baseAllEnd}${baseSingleS}${baseUrlEnd}`
        } else {
            url = `${baseUrlStart}${baseAllStart}${searchInput}${baseAllEnd}${baseSingleS}${baseUrlEnd}`
        }
        console.log('event listener busca')
        homeLoading.style.display = "flex"
        homeLoaded.style.display = "none"  
        fetchedUrl = url
        fetch(url)
        .then(response => response.json())
        .then(searchData => {
                console.log('Fetch OK')
                loadOffset = 0
                if (lastInput != searchInput){
                    homeLoaded.insertAdjacentHTML('afterbegin', searchResponse(searchData))
                } else {
                    homeLoaded.innerHTML = searchResponse(searchData)
                }
                homeLoading.classList.add('animated')
                homeLoading.classList.add('zoomOut')
                homeLoading.style.display = 'none'
                homeLoaded.style.display = 'flex'
                btnLoadMore.style.display = 'flex'
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

// Event listener do botao da landing page
landingBtn.addEventListener('click', () => {
    landingMainDiv.classList.add('animated')
    landingMainDiv.classList.add('fadeOutUp')
    $(landingMainDiv).one("animationend", function(){
        $(this).css('display', 'none')
        $(document.body).css('overflow', 'auto')
    });
})

// Event listener de carregar mais da busca

btnLoadMore.addEventListener('click', () => {
    let click
    click++
    if(click != 0){
        loadOffset = loadOffset+loadLimit
        let searchInput = searchInputElm.value.replace(" ", "%20")
        if (SelectSearch.value == "Characters") {
            url = `${baseUrlStart}${baseAllStart}${searchInput}${baseOffset.replace(/.$/,loadOffset)}${baseAllEnd}${baseSingleS}${baseUrlEnd}`
        } else if (SelectSearch.value == "Comics") {
            url = `${baseUrlStart}${baseComics}${searchInput}${baseOffset.replace(/.$/,loadOffset)}${baseAllEnd}${baseSingleS}${baseUrlEnd}`
        } else {
            url = `${baseUrlStart}${baseAllStart}${searchInput}${baseOffset.replace(/.$/,loadOffset)}${baseAllEnd}${baseSingleS}${baseUrlEnd}`
        }
        fetchedUrl = url
    }
    fetch(fetchedUrl)
    .then(response2 => response2.json())
    .then(searchDataLoaded => {
        homeLoaded.insertAdjacentHTML('beforeend', searchResponse(searchDataLoaded))
    })
})
