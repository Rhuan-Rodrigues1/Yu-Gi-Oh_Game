const state = {
  score: {
    playerScore: 0,
    computeScore: 0,
    scoreBox: document.querySelector("#score_points"),
  },
  cardsSprites: {
    avatar: document.querySelector("#card_image"),
    name: document.querySelector("#card-name"),
    type: document.querySelector("#card-type"),
  },
  fieldCards: {
    player: document.querySelector("#player-field-card"),
    compute: document.querySelector("#computer-field-card"),
  },
  playerSides: {
    player1: "player-cards",
    playerBox: document.querySelector("#player-cards"),
    computer: "computer-cards",
    computerBox: document.querySelector("#computer-cards"),
  },
  actions: {
    button: document.querySelector("#next-duel"),
  },
};

const pathImages = "./src/assets/icons/";

const cardData = [
  {
    id: 0,
    name: "Blue Eyes White Dragon",
    type: "Paper",
    img: `${pathImages}dragon.png`,
    WinOf: [1],
    LoseOf: [2],
  },
  {
    id: 1,
    name: "Dark Magician",
    type: "Rock",
    img: `${pathImages}magician.png`,
    WinOf: [2],
    LoseOf: [0],
  },
  {
    id: 2,
    name: "Exodia",
    type: "Scissors",
    img: `${pathImages}exodia.png`,
    WinOf: [0],
    LoseOf: [1],
  },
];

async function getRandomIdCard() {
  const randomIndex = Math.floor(Math.random() * cardData.length);

  return cardData[randomIndex].id;
}

async function createCardImage(IdCard, fildSide) {
  const cardImage = document.createElement("img");
  cardImage.setAttribute("height", "100px");
  cardImage.setAttribute("src", "./assets/icons/card-back.png");
  cardImage.setAttribute("data-id", IdCard);

  cardImage.classList.add("card");

  if (fildSide == state.playerSides.player1) {
    cardImage.addEventListener("mouseover", () => {
      drawSelectCard(IdCard);
    });
  }

  cardImage.addEventListener("click", () => {
    setCardsField(cardImage.getAttribute("data-id"));
  });
  return cardImage;
}

async function drawCards(cardNumbers, fildSide) {
  for (let i = 0; i < cardNumbers; i++) {
    const randomIdCard = await getRandomIdCard();
    const cardImage = await createCardImage(randomIdCard, fildSide);
    console.log(fildSide);
    document.getElementById(fildSide).appendChild(cardImage);
  }
}

function init() {
  drawCards(5, state.playerSides.player1);
  drawCards(5, state.playerSides.computer);
}

init();
