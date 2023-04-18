const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".img_pokemon");
const input = document.querySelector(".search-input");

const form = document.querySelector(".form");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");
let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIresponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (APIresponse.status == 200) {
    const data = await APIresponse.json();
    return data;
  }
};
const delayedRenderPokemon = (pokemon) => {
    setTimeout(async () => {
      await renderPokemon(pokemon);
    }, 2000);
}
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "loading...";
  pokemonNumber.innerHTML = "";

  const data = await fetchPokemon(pokemon);
  if (data) {
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input.value = "";
    searchPokemon =data.id
  } else {
   
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Não encontrado:c";
    pokemonNumber.innerHTML = "";
    input.value = "";
    delayedRenderPokemon(searchPokemon);
    
    
}
   


};
form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});
buttonPrev.addEventListener("click", () => {
    if(searchPokemon > 1){
        searchPokemon -= 1
    renderPokemon(searchPokemon)
    }else{
        alert("Não é válido pois a lista está no ínicio (Digite um Número ou o Nome do Pokemon!)")
    }
    
});




buttonNext.addEventListener("click", () => {
    searchPokemon +=1
    renderPokemon(searchPokemon)
});

renderPokemon(searchPokemon);
