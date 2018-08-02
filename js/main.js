// Código feito usando o material do ifpb-github
//imports
import { searchResponse } from "./card.js"


// urls padrão de requisição da API
const baseUrlStart  = `https://gateway.marvel.com/v1/public/`
const baseUrlEnd    = `&apikey=718d9655e79167925631daa64018feda&hash=dbe4e709801f86df2ba72f6ace4facad`
const baseSingleS   = `&ts=1`
const baseAllStart  = `characters?nameStartsWith=`
const baseAllEnd    = `&limit=8`
let   baseOffset    = `&offset=0`
const baseCharacter = `characters?name=`
const baseComics    = `comics?titleStartsWith=`
const baseCreators  = `creators?nameStartsWith=`
const baseEvents    = `events?nameStartsWith=`
const baseSeries    = `series?titleStartsWith=`

// variaveis do event listener load more
let loadOffset = 0
let loadLimit = 8
let fetchedUrl
let lastInput
let cont=0
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
btnLoadMore.disabled = true

// selects from top-characters-box
let topCharactersBox = document.querySelector('#topCharactersBox')
// selects from az-index-box
let azIndexBox       = document.querySelector('#azIndexBox')
// selects from footer-box
let footerBox        = document.querySelector('#footer')


// ================== Funções =================== //
// Corrige a posição do scroll quando recarrega a pagina em um ponto fora do topo da pagina, resolvendo um problema de quebra de local onde é exibido a div da landing page
window.onbeforeunload = function() {window.scrollTo(0,0);}


// Card Modular


// ================= Event Listeners ================ //


// Event Listener do botao de pesquisa
searchBtn.addEventListener('click', () => {
    cont=0
// correçao de espaço em branco do campo de pesquisa para a url (substituir por regex)
    let searchInput = searchInputElm.value.replace(" ", "%20")
    lastInput = searchInput
// tratamento do campo de input do search
    let url
    if(searchInputElm.value == '') {
    btnLoadMore.disabled = true;
    let retornoNoTyping =
    `<div class="text-center col-md-12">
        <i class="material-icons">error</i>
        <p>My spider-sense is telling me you should type something.</p>
        <img src="images/spidermanNoSpace.jpg" style="heigth: 100px; width: 150px;">
    </div>`
    homeLoaded.innerHTML = retornoNoTyping
    } else {
        btnLoadMore.disabled = false;
        if (SelectSearch.value == "Characters") {
            url = `${baseUrlStart}${baseAllStart}${searchInput}${baseOffset}${baseAllEnd}${baseSingleS}${baseUrlEnd}`
        } else if (SelectSearch.value == "Comics") {
            url = `${baseUrlStart}${baseComics}${searchInput}${baseOffset}${baseAllEnd}${baseSingleS}${baseUrlEnd}`
        } else if (SelectSearch.value == "Creators") {
            url = `${baseUrlStart}${baseCreators}${searchInput}${baseOffset}${baseAllEnd}${baseSingleS}${baseUrlEnd}`
        } else if (SelectSearch.value == "Events") {
            url = `${baseUrlStart}${baseEvents}${searchInput}${baseOffset}${baseAllEnd}${baseSingleS}${baseUrlEnd}`
        } else if (SelectSearch.value == "Series") {
            url = `${baseUrlStart}${baseSeries}${searchInput}${baseOffset}${baseAllEnd}${baseSingleS}${baseUrlEnd}`
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
                let x=searchResponse(searchData)
                let y=`<div class="text-center col-md-12">
                <i class="material-icons">error</i>
                <p style="margin-bottom:0px">Can't find!</p>
                <p>I guess my maximum effort doesn't work anymore.</p>
                <img src="images/notFoundImage.png" style="heigth: 100px; width: 150px;">
            </div>`
                if(x==y){
                    btnLoadMore.disabled = true;
                }
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
        $(document.body).css('overflow', 'scroll')
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
        } else if (SelectSearch.value == "Creators") {
            url = `${baseUrlStart}${baseCreators}${searchInput}${baseOffset.replace(/.$/,loadOffset)}${baseAllEnd}${baseSingleS}${baseUrlEnd}`
        } else if (SelectSearch.value == "Events") {
            url = `${baseUrlStart}${baseEvents}${searchInput}${baseOffset.replace(/.$/,loadOffset)}${baseAllEnd}${baseSingleS}${baseUrlEnd}`
        } else if (SelectSearch.value == "Series") {
            url = `${baseUrlStart}${baseSeries}${searchInput}${baseOffset.replace(/.$/,loadOffset)}${baseAllEnd}${baseSingleS}${baseUrlEnd}`
        } else {
            url = `${baseUrlStart}${baseAllStart}${searchInput}${baseOffset.replace(/.$/,loadOffset)}${baseAllEnd}${baseSingleS}${baseUrlEnd}`
        }
        fetchedUrl = url
    }
    fetch(fetchedUrl)
    .then(response2 => response2.json())
    .then(searchDataLoaded => {
        nothingShow=`<div class="text-center col-md-12">
                <i class="material-icons">error</i>
                <p style="margin-bottom:0px">Nothing to show anymore!</p>
                <p>Hulk gonna smash!</p>
                <img src="images/loadedAll.png" style="heigth: 100px; width: 150px;">
            </div>`
        res=searchResponse(searchDataLoaded)
        console.log('cont É',cont)
        if(res == nothingShow && cont<1){
            console.log("entrou aqui 1")
            cont+=1
            homeLoaded.insertAdjacentHTML('beforeend', searchResponse(searchDataLoaded))
            btnLoadMore.disabled = true;
       }else if(res != nothingShow){
        homeLoaded.insertAdjacentHTML('beforeend', searchResponse(searchDataLoaded))
    }})
})
