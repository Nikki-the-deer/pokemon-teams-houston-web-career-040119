document.addEventListener('DOMContentLoaded', () => {

let allTrainerData = []

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const trainerContainer = document.querySelector('#trainer-container')
const main = document.querySelector('main')

fetch(TRAINERS_URL)
    .then((resp) => resp.json())
    .then((trainerJson) => {
        renderTrainerData(trainerJson)
    })

function renderTrainerData(trainerJson){
    trainerJson.forEach((object) => cardBuilder(object))
}

function cardBuilder(object){
    var div = document.createElement('div')
    var p = document.createElement('p')
    div.classList.add("card")
    div.dataset.id = object.id
    var ul = document.createElement('ul')
    ul.dataset.trainerId = object.id
    var addMonsButton = document.createElement('button')
    addMonsButton.classList.add("birth")
    addMonsButton.innerText = "Add Pokemon"
    addMonsButton.dataset.trainerId = object.id
    main.appendChild(div)
    p.innerText = object.name
    div.append(p)
    div.append(addMonsButton)
    div.append(ul)
    object.pokemons.forEach(function(mons){

        var li = document.createElement('li')
        li.innerText = `${mons.nickname} (${mons.species})`
        li.dataset.pokemonId = mons.id
        ul.append(li)
        var pokeKiller = document.createElement('button')
        li.appendChild(pokeKiller)
        pokeKiller.innerText = "Release Pokemon"
        pokeKiller.dataset.pokemonId = mons.id
        pokeKiller.classList.add("release")
    })
}


document.addEventListener("click", function(e){
    console.log(e.target)
    if (e.target.classList[0] == "release"){
        console.log("HIT!")
        // var ul = document.querySelector(`"#${}"`)
        fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`,{
        method: "DELETE"
    })
    .then(() => {e.target.parentElement.remove()})

    // if (e.target.classList[0] === "birth"){
    //     console.log("OW!")
    //     fetch(POKEMONS_URL,{
    //         method: "POST",
    //         headers: {'Content-Type': 'application/json'},
    //         body: {"trainer_id": `${e.target.trainerId}`}
    //     })
    //     .then((resp) => resp.json())
    //     .then((obj) => {debugger} )
    // }
     }
})

document.addEventListener("click", function(e){

    if (e.target.classList[0] === "birth"){
        // debugger
        console.log("OW!")
        fetch(POKEMONS_URL,{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"trainer_id": `${e.target.dataset.trainerId}`})
        })
        .then((resp) => resp.json())
        .then((obj) => {
            var pokemonNickName = obj.nickname;
            var pokemonSpecies = obj.species;
            var pokemonOwner = obj.trainer_id - 1;
            debugger
            var pokemonId = obj.id;
            var ul = document.querySelectorAll('ul')[pokemonOwner]
            var li = document.createElement('li')
            li.innerText = `${pokemonNickName} (${pokemonSpecies})`
            li.dataset.pokemonId = pokemonId
            ul.append(li)
            var pokeKiller = document.createElement('button')
            li.appendChild(pokeKiller)
            pokeKiller.innerText = "Release Pokemon"
            pokeKiller.dataset.pokemonId = obj.id
            pokeKiller.classList.add("release")

        } )
    }
})




});