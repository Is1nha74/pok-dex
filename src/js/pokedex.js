const pokemonImage = document.querySelector(".pokemon__image");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonName = document.querySelector(".pokemon__name");
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;



//CONECTAR E CAPTURAR AS INFORMAÇÕES DA POKEAPI

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {


        const data = await APIResponse.json();

        return data;
    }



};

const renderPokemon = async (pokemon) => {

    pokemonName.textContent = "Loading..."
    pokemonNumber.textContent = "😶"
    pokemonImage.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/029b8bd9-cb5a-41e4-9c7e-ee516face9bb/dayo3ow-7ac86c31-8b2b-4810-89f2-e6134caf1f2d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAyOWI4YmQ5LWNiNWEtNDFlNC05YzdlLWVlNTE2ZmFjZTliYlwvZGF5bzNvdy03YWM4NmMzMS04YjJiLTQ4MTAtODlmMi1lNjEzNGNhZjFmMmQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ooubhxjHp9PIMhVxvCFHziI6pxDAS8glXPWenUeomWs"

    const data = await fetchPokemon(pokemon);

    console.log(data);


    if (data) {
        //CASO TUDO DE CERTO
        pokemonImage.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
        pokemonImage.style.width = "20%"
        pokemonNumber.textContent = data.id;
        pokemonName.innerHTML = data.name;
        input.value = "";
        searchPokemon = data.id;
    } else {
        //CASO DE ERRADO
        pokemonImage.src = "https://i.pinimg.com/originals/80/e1/8d/80e18df0ed0ad872ac1a003d543d9613.gif";
        pokemonImage.style.width = "35%"
        pokemonNumber.textContent = "";
        pokemonName.textContent = "Not found :(";

    };





};

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});



buttonPrev.addEventListener("click", () => {
    
    if (searchPokemon > 1) {
        
        searchPokemon -= 1;
    
        renderPokemon(searchPokemon);
    };

});


buttonNext.addEventListener("click", () => {
    
    searchPokemon += 1; 

    renderPokemon(searchPokemon);
});




renderPokemon(searchPokemon);