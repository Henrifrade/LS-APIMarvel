
// Várias necessárias para o SearchResponse.
let loadOffset = 0
let loadLimit = 8
let fetchedUrl
let SelectSearch = document.getElementById("inputGroupSelect01")


function cardTitleCharacter (Cname){
    return `<div id="img-card-title">
                <h5 class="card-title text-left">${Cname}</h5>
            </div>`
}

function textDescription(description) {

    if (description == ''){
        return `No description.`
    } else {
        return description
    }
}

export function searchResponse (searchData) {

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
                                <h5 class="modal-title" id="ModalLabel"><a href="${item.urls[0].url}" target="_blank" style="color: #C82333; text-decoration: none;">${item.name}</a></h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <img id="modal-img" src="${item.thumbnail.path.replace("http", "https")}/portrait_uncanny.${item.thumbnail.extension}">
                            <div class="modal-body">
                                <p class="text-justify" id="modal-texts">Description:</p>
                                <p class="text-justify">${textDescription(item.description)}</p>
                                <p class="text-justify" id="modal-texts">Comics: ${item.comics.available}</p>
                                <p class="text-justify">${item.comics.items.map(items => `${items.name}`).join(', ')}.</p>
                                <p class="text-justify" id="modal-texts">Series: ${item.series.available}</p>
                                <p class="text-justify">${item.series.items.map(items => `${items.name}`).join(', ')}.</p>
                                <p class="text-justify" id="modal-texts">Stories: ${item.stories.available}</p>
                                <p class="text-justify">${item.stories.items.map(items => `${items.name}`).join(', ')}.</p>
                                <p class="text-justify" id="modal-texts">Events: ${item.events.available}</p>
                                <p class="text-justify">${item.events.items.map(items => `${items.name}`).join(', ')}.</p>
                            </div>
                            <div class="justify-content-center modal-footer">
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