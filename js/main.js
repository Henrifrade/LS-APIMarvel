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

// ============ Selecao dos ids do html ============= //

// load-search
let searchInputElm = document.querySelector('#search-input')
let searchBtn = document.querySelector('#search-btn')
let homeLoading = document.querySelector('#loading')
let homeLoaded = document.querySelector('#loaded')
let loadSearch = document.querySelector('#load-search')

// top-characters


// footer
let footer = document.querySelector('#footer')

// ================== Funções =================== //

// Função que recebe o resultado de pesquisa
let searchResponse = (searchChar) => {

    if (searchChar.data.results != ''){
        console.log('Sucesso ao procurar personagem na API')
        return searchChar.data.results
        .map(
            item =>
            `<div class="d-flex justify-content-center" style="margin-bottom: 2%;">
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
                console.log('Fetch OK')
                homeLoaded.innerHTML = searchResponse(searchChar)
                footer.innerHTML = searchChar.attributionHTML
                homeLoading.style.display = 'none'
                homeLoaded.style.display = 'grid'
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