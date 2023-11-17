const state = {
  score: {
    playerScore: 0,
    computerScore: 0,
    scoreBox: document.querySelector("#score_points"),
  },
  cardsSprites: {
    avatar: document.querySelector("#card_image"),
    name: document.querySelector("#card-name"),
    type: document.querySelector("#card-type"),
  },
  fieldCards: {
    player: document.querySelector("#player-field-card"),
    computer: document.querySelector("#computer-field-card"),
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

const pathImages = "./assets/icons/";

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

async function drawSelectCard(IdCard) {
  state.cardsSprites.avatar.src = cardData[IdCard].img;
  state.cardsSprites.name.innerText = cardData[IdCard].name;
  state.cardsSprites.type.innerText = "Attribute : " + cardData[IdCard].type;
}

async function removeAllCardsImages() {
  let { computerBox, playerBox } = state.playerSides;
  let imgElements = computerBox.querySelectorAll("img");

  imgElements.forEach((img) => img.remove());

  imgElements = playerBox.querySelectorAll("img");

  imgElements.forEach((img) => img.remove());
}

async function ShowHiddenCardFieldsImage(value) {
  if (value == true) {
    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";
  } else {
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";
  }
}

async function hiddenCardDetails() {
  state.cardsSprites.avatar = "";
  state.cardsSprites.name = "";
  state.cardsSprites.type = "";
}

async function drawButton(result) {
  state.actions.button.innerText = result;
  state.actions.button.style.display = "block";
}

async function updateScore() {
  state.score.scoreBox.innerHTML = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

async function drawCardsInFields(cardId, computerCardId) {
  state.fieldCards.player.src = cardData[cardId].img;
  state.fieldCards.computer.src = cardData[computerCardId].img;
}

async function checkDuelResults(cardId, computerCardId) {
  let duelResult = "Empate";
  let playerCard = cardData[cardId];

  if (playerCard.WinOf.includes(computerCardId)) {
    duelResult = "GANHOU";
    await playAudio("win");
    state.score.playerScore++;
  }

  if (playerCard.LoseOf.includes(computerCardId)) {
    duelResult = "PERDEU";
    await playAudio("lose");
    state.score.computerScore++;
  }

  return duelResult;
}

async function setCardsField(cardId) {
  await removeAllCardsImages();

  let computerCardId = await getRandomIdCard();

  await ShowHiddenCardFieldsImage(true);

  await hiddenCardDetails();
  await drawCardsInFields(cardId, computerCardId);

  let duelResults = await checkDuelResults(cardId, computerCardId);

  await updateScore();
  await drawButton(duelResults);
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

    document.getElementById(fildSide).appendChild(cardImage);
  }
}

async function playAudio(status) {
  const audio = new Audio(`./assets/audios/${status}.wav`);

  try {
    audio.play();
  } catch {}
}

async function resetDuel() {
  state.cardsSprites.avatar.src = "";
  state.actions.button.style.display = "none";

  state.fieldCards.player.style.display = "none";
  state.fieldCards.computer.style.display = "none";

  init();
}

function init() {
  ShowHiddenCardFieldsImage(false);
  drawCards(5, state.playerSides.player1);
  drawCards(5, state.playerSides.computer);

  const bgm = document.getElementById("bgm");
  bgm.play();
}

init();
