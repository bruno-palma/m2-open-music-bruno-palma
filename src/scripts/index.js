/* Desenvolva sua lógica aqui ... */

function renderGenreItems(genres) {
  const ulGenreList = document.querySelector(".genres__list");

  genres.forEach((currentGenre) => {
    const liGenre = document.createElement("li");
    liGenre.innerText = currentGenre;
    liGenre.classList.add("genre__item", "text3");
    if (currentGenre === "Todos") {
      liGenre.classList.add("active");
    }
    ulGenreList.appendChild(liGenre);
  });
}

function createAlbumCard(albumData) {
  // CRIANDO OS ELEMENTOS
  const card = document.createElement("li");

  const albumCoverContainer = document.createElement("figure");
  const albumCoverImg = document.createElement("img");
  const albumDetails = document.createElement("div");
  const albumBand = document.createElement("span");
  const albumYear = document.createElement("span");
  const albumGenre = document.createElement("span");
  const albumTitle = document.createElement("h3");
  const albumPriceContainer = document.createElement("div");
  const albumPrice = document.createElement("h3");
  const albumBuyButton = document.createElement("button");

  // CARD
  card.classList.add("album__item");

  // COVER IMG
  albumCoverContainer.classList.add("album__cover-container");
  albumCoverImg.classList.add("album__cover");
  albumCoverImg.src = albumData.img;
  albumCoverContainer.appendChild(albumCoverImg);

  // ALBUM INFO
  albumDetails.classList.add("album__details");

  albumBand.classList.add("album__band");
  albumYear.classList.add("album__year");
  albumGenre.classList.add("album__genre");

  albumBand.innerText = albumData.band;
  albumYear.innerText = albumData.year;
  albumGenre.innerText = albumData.genre;
  albumDetails.append(albumBand, albumYear, albumGenre);
  // TITLE
  albumTitle.classList.add("album__name");
  albumTitle.innerText = albumData.title;

  // PRICE CONTAINER
  albumPriceContainer.classList.add("album__price--container");

  albumPrice.classList.add("album__price");
  albumPrice.innerText = "R$ " + albumData.price;
  albumBuyButton.classList.add("album__buy--button");
  albumBuyButton.innerText = "Comprar";
  albumPriceContainer.append(albumPrice, albumBuyButton);
  // ADD ALL
  card.append(
    albumCoverContainer,
    albumTitle,
    albumDetails,
    albumTitle,
    albumPriceContainer
  );

  return card;
}

function renderAlbumCards(albums) {
  const ulAlbumList = document.querySelector(".albums__list");
  ulAlbumList.innerHTML = "";

  albums.forEach((currentAlbum) => {
    const albumCard = createAlbumCard(currentAlbum);
    ulAlbumList.appendChild(albumCard);
  });
}

function handleFilter(albums, genreFilter = "Todos", priceFilter) {
  const filteredAlbums = [];

  albums.forEach((currentAlbum) => {
    if (
      (currentAlbum.genre === genreFilter || genreFilter === "Todos") &&
      currentAlbum.price <= priceFilter
    ) {
      filteredAlbums.push(currentAlbum);
    }
  });

  return filteredAlbums;
}

function removeActiveClass(genres) {
  genres.forEach((genre) => genre.classList.remove("active"));
}

function handleFilterEvents(albums) {
  const genres = document.querySelectorAll(".genre__item");
  const inputPriceRange = document.querySelector(".price__input-range");
  const spanPriceValue = document.querySelector(".price-range__value--dynamic");

  let genreCategory = "Todos";
  let priceValue = inputPriceRange.valueAsNumber;

  genres.forEach((currentGenre) => {
    currentGenre.addEventListener("click", (event) => {
      removeActiveClass(genres);
      currentGenre.classList.add("active");
      genreCategory = event.target.innerText;

      const albumsToRender = handleFilter(albums, genreCategory, priceValue);
      renderAlbumCards(albumsToRender);
    });
  });

  inputPriceRange.addEventListener("input", function (event) {
    priceValue = event.target.value;
    spanPriceValue.innerText = "R$ " + priceValue;
    const albumsToRender = handleFilter(albums, genreCategory, priceValue);

    renderAlbumCards(albumsToRender);
  });
}

renderGenreItems(genresList);
handleFilterEvents(albumList);
renderAlbumCards(albumList);
