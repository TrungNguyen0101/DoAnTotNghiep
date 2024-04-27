import axios from "axios";

class MemoryBlock {
  constructor(id, frontImage, backImage) {
    this.id = id;
    this.blockCSS = "block";
    this.frontImage = frontImage;
    this.backImage = backImage;
    this.front = false;
    this.back = true;
    this.frontCSS = "block-front block-face";
    this.backCSS = "block-back block-face";
    this.imgCSS = "block-value";
  }
}

export const FlipFlopDidMount = (currentUser) => {
  console.log(currentUser);
  var countdown;

  function startTimer(duration, display) {
    var timer = 60 * duration,
      minutes,
      seconds;
    countdown = setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.textContent = `Thời gian ${minutes}:${seconds}`;
      if (--timer < 0) {
        gameOver();
      }
    }, 1000);
  }

  // for creating divs and shuffling blocks
  var divblock,
    blockData,
    blockFrontImages,
    memoryBlockArr,
    blockFrontImagesAll,
    shuffledBlocks;
  // for implementing flip n match logic
  var currentlyFlippedArr, matchedCount, blockToMatch1, blockToMatch2;
  // for implementing game info block
  var flipCounter,
    gameOn = false;

  //count down

  //play again
  playAgain();

  // start Game
  startGame();

  function playAgain() {
    const playAgain = document.getElementById("play-again");
    if (playAgain) {
      playAgain.addEventListener("click", function () {
        if (document.getElementsByClassName("panel")) {
          document.getElementsByClassName("panel")[0].style.display = "none";
        }
        if (document.getElementsByClassName("demo")) {
          document.getElementsByClassName("demo")[0].style.display = "block";
        }
        if (document.getElementById("countdown")) {
          document.getElementById("countdown").classList.add("overlay-text");
        }
        if (document.getElementById("countdown")) {
          document.getElementById("countdown").classList.add("visible");
        }

        var wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        Promise.resolve(3600)
          .then(() => wait(3600))
          .then(() => {
            if (document.getElementById("countdown")) {
              document
                .getElementById("countdown")
                .classList.remove("overlay-text");
            }
            if (document.getElementById("countdown")) {
              document.getElementById("countdown").classList.remove("visible");
            }
            if (document.getElementsByClassName("demo")) {
              document.getElementsByClassName("demo")[0].style.display = "none";
            }

            resetGame();
            init();
          });
      });
    }
  }

  function startGame() {
    const startGame = document.getElementById("start-game");
    if (startGame) {
      startGame.addEventListener("click", function () {
        if (document.getElementsByClassName("panel-hd")) {
          document.getElementsByClassName("panel-hd")[0].style.display = "none";
        }
        if (document.getElementsByClassName("demo")) {
          document.getElementsByClassName("demo")[0].style.display = "block";
        }
        if (document.getElementById("countdown")) {
          document.getElementById("countdown").classList.add("overlay-text");
        }
        if (document.getElementById("countdown")) {
          document.getElementById("countdown").classList.add("visible");
        }

        var wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        Promise.resolve(3600)
          .then(() => wait(3600))
          .then(() => {
            if (document.getElementById("countdown")) {
              document
                .getElementById("countdown")
                .classList.remove("overlay-text");
            }
            if (document.getElementById("countdown")) {
              document.getElementById("countdown").classList.remove("visible");
            }
            if (document.getElementsByClassName("demo")) {
              document.getElementsByClassName("demo")[0].style.display = "none";
            }
            resetGame();
            init();
          });
      });
    }
  }

  function countdown() {
    var wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    Promise.resolve(3600)
      .then(() => wait(3600))
      .then(() => {
        if (document.getElementById("countdown")) {
          document.getElementById("countdown").classList.remove("overlay-text");
        }
        if (document.getElementById("countdown")) {
          document.getElementById("countdown").classList.remove("visible");
        }
        if (document.getElementsByClassName("demo")) {
          document.getElementsByClassName("demo")[0].style.display = "none";
        }
        resetGame();
        init();
      });
  }

  function resetGame() {
    var elements = document.getElementsByClassName("block");
    if (elements) {
      while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
      }
    }
  }

  function init() {
    gameOn = true;
    memoryBlockArr = new Array(18);
    blockFrontImagesAll = [];
    shuffledBlocks = [];
    currentlyFlippedArr = [];
    matchedCount = 0;
    flipCounter = 0;
    var minutes = 2;
    var display = document.getElementById("Timer");
    blockFrontImages = [
      "Images/Unit_Aphabet/Game_Cards/A.png",
      "Images/Unit_Aphabet/Game_Cards/B.png",
      "Images/Unit_Aphabet/Game_Cards/C.png",
      "Images/Unit_Aphabet/Game_Cards/D.png",
      "Images/Unit_Aphabet/Game_Cards/E.png",
      "Images/Unit_Aphabet/Game_Cards/F.png",
      "Images/Unit_Aphabet/Game_Cards/G.png",
      "Images/Unit_Aphabet/Game_Cards/H.png",
      "Images/Unit_Aphabet/Game_Cards/I.png",
      "Images/Unit_Aphabet/Game_Cards/J.png",
      "Images/Unit_Aphabet/Game_Cards/K.png",
      "Images/Unit_Aphabet/Game_Cards/L.png",
      "Images/Unit_Aphabet/Game_Cards/M.png",
      "Images/Unit_Aphabet/Game_Cards/N.png",
      "Images/Unit_Aphabet/Game_Cards/O.png",
      "Images/Unit_Aphabet/Game_Cards/P.png",
      "Images/Unit_Aphabet/Game_Cards/Q.png",
      "Images/Unit_Aphabet/Game_Cards/R.png",
      "Images/Unit_Aphabet/Game_Cards/S.png",
      "Images/Unit_Aphabet/Game_Cards/T.png",
      "Images/Unit_Aphabet/Game_Cards/U.png",
      "Images/Unit_Aphabet/Game_Cards/V.png",
      "Images/Unit_Aphabet/Game_Cards/W.png",
      "Images/Unit_Aphabet/Game_Cards/X.png",
      "Images/Unit_Aphabet/Game_Cards/Y.png",
      "Images/Unit_Aphabet/Game_Cards/Z.png",
    ];
    // init();
    startTimer(minutes, display);
    let arrRandom = getRandom(blockFrontImages, 9);
    blockFrontImagesAll = arrRandom.concat(arrRandom);
    shuffledBlocks = shuffleBlocks(blockFrontImagesAll);
    if (document.getElementById("Point")) {
      document.getElementById("Point").innerText = `Điểm: ${flipCounter}`;
    }
    createElements();
  }

  function createElements() {
    var finalCount = shuffledBlocks.length;
    for (var i = 0; i < finalCount; i++) {
      var cardFront = shuffledBlocks.pop();
      blockData = new MemoryBlock(i, cardFront, "Images/Unit_Aphabet/Star.png");
      memoryBlockArr[i] = blockData;
      divblock = document.createElement("div");
      var divblockFront = document.createElement("div");
      var divblockBack = document.createElement("div");
      var imgFront = document.createElement("img");
      var imgBack = document.createElement("img");
      divblock.id = memoryBlockArr[i].id;
      divblock.className = memoryBlockArr[i].blockCSS;
      divblockFront.className = memoryBlockArr[i].frontCSS;
      divblockBack.className = memoryBlockArr[i].backCSS;
      imgFront.src = memoryBlockArr[i].frontImage;
      imgFront.className = memoryBlockArr[i].imgCSS;
      imgBack.src = memoryBlockArr[i].backImage;
      imgBack.className = memoryBlockArr[i].imgCSS;
      divblockFront.append(imgFront);
      divblockBack.append(imgBack);
      divblock.append(divblockFront);
      divblock.append(divblockBack);
      divblock.addEventListener("click", flipBlock);
      if (i < 6) {
        if (document.getElementById("game-aphabet-row-one")) {
          document.getElementById("game-aphabet-row-one").append(divblock);
        }
      } else if (6 <= i && i < 12) {
        if (document.getElementById("game-aphabet-row-two")) {
          document.getElementById("game-aphabet-row-two").append(divblock);
        }
      } else {
        if (document.getElementById("game-aphabet-row-three")) {
          document.getElementById("game-aphabet-row-three").append(divblock);
        }
      }
    }
  }

  function hideElements() {
    if (document.getElementsByClassName("block")) {
      var hideBlocks = Array.from(document.getElementsByClassName("block"));
      for (var i = 0; i < hideBlocks.length; i++) {
        if (document.getElementById(hideBlocks[i].id)) {
          document.getElementById(hideBlocks[i].id).classList.remove("visible");
        }
      }
    }
  }

  function shuffleBlocks(blocksArray) {
    var currentIndex = blocksArray.length,
      temporaryValue,
      randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick an element from the remaining lot...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // Swap it with the current element.
      temporaryValue = blocksArray[currentIndex];
      blocksArray[currentIndex] = blocksArray[randomIndex];
      blocksArray[randomIndex] = temporaryValue;
    }
    return blocksArray;
  }

  function flipBlock() {
    if (gameOn === true) {
      this.classList.add("visible");
      if (blockToMatch1 !== this.id) {
        if (currentlyFlippedArr.length === 0) {
          currentlyFlippedArr.push(this.innerHTML);
          blockToMatch1 = this.id;
        } else if (currentlyFlippedArr.length === 1) {
          currentlyFlippedArr.push(this.innerHTML);
          blockToMatch2 = this.id;
          if (currentlyFlippedArr[0] === currentlyFlippedArr[1]) {
            const index = currentlyFlippedArr[0].indexOf("png");
            const message = currentlyFlippedArr[0].substring(
              index - 2,
              index - 1
            );
            toSpeak(message);
            blocksMatched();
          } else {
            if (document.getElementById("img-cat")) {
              document.getElementById("img-cat").src =
                "Images/Avatar/Cat/Cat_no.png";
            }
            //1s display cat-normal
            var wait = (ms) =>
              new Promise((resolve) => setTimeout(resolve, ms));
            Promise.resolve(2000)
              .then(() => wait(2000))
              .then(() => {
                if (document.getElementById("img-cat")) {
                  document.getElementById("img-cat").src =
                    "Images/Avatar/Cat/Cat_normal.png";
                }
              });

            gameOn = false;
            var wait = (ms) =>
              new Promise((resolve) => setTimeout(resolve, ms));
            Promise.resolve(800)
              .then(() => wait(800))
              .then(() => {
                revertFlip();
              });
          }
        }
      }
    }
  }

  function blocksMatched() {
    flipCounter += 10;
    if (document.getElementById("Point")) {
      document.getElementById("Point").innerText = `Điểm: ${flipCounter}`;
    }

    if (document.getElementById("img-cat")) {
      document.getElementById("img-cat").src = "Images/Avatar/Cat/Cat_yes.png";
    }
    //1s display cat-normal
    var wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    Promise.resolve(2000)
      .then(() => wait(2000))
      .then(() => {
        if (document.getElementById("img-cat")) {
          document.getElementById("img-cat").src =
            "Images/Avatar/Cat/Cat_normal.png";
        }
      });

    currentlyFlippedArr = [];
    matchedCount += 2;
    if (document.getElementById(blockToMatch1)) {
      document
        .getElementById(blockToMatch1)
        .removeEventListener("click", flipBlock);
    }
    if (document.getElementById(blockToMatch2)) {
      document
        .getElementById(blockToMatch2)
        .removeEventListener("click", flipBlock);
    }
    if (matchedCount === memoryBlockArr.length) {
      showWin();
    }
  }

  function revertFlip() {
    if (document.getElementById(blockToMatch1)) {
      document.getElementById(blockToMatch1).classList.remove("visible");
    }
    if (document.getElementById(blockToMatch2)) {
      document.getElementById(blockToMatch2).classList.remove("visible");
    }

    currentlyFlippedArr = [];
    gameOn = true;
  }

  function showWin() {
    hideElements();
    gameOn = false;
    if (document.getElementsByClassName("panel")) {
      if (document.getElementsByClassName("panel")[0]) {
        document.getElementsByClassName("panel")[0].style.display = "block";
      }
    }
    if (document.getElementById("notify")) {
      document.getElementById("notify").innerHTML = "Chúc mừng";
    }
    if (document.getElementById("notify")) {
      document.getElementById("notify").style.color = "#28a745";
    }

    if (currentUser) {
      if (document.getElementById("description")) {
        document.getElementById("description").innerHTML =
          "Bạn được nhận thêm điểm kinh nghiệm";
      }
    }
    if (document.getElementById("point-game")) {
      document.getElementById("point-game").innerHTML = `${flipCounter}`;
    }

    apiScore();
    clearInterval(countdown);
  }

  function gameOver() {
    gameOn = false;
    if (document.getElementsByClassName("panel")) {
      if (document.getElementsByClassName("panel")[0]) {
        document.getElementsByClassName("panel")[0].style.display = "block";
      }
    }
    if (document.getElementById("notify")) {
      document.getElementById("notify").innerHTML = "Hết giờ";
    }
    if (document.getElementById("notify")) {
      document.getElementById("notify").style.color = "#dc3545";
    }
    if (document.getElementById("description")) {
      document.getElementById("description").style.display = "none";
    }
    if (document.getElementById("point-game")) {
      document.getElementById("point-game").innerHTML = `${flipCounter}`;
    }
    apiScore();
    clearInterval(countdown);
  }

  function getRandom(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  function toSpeak(message) {
    var speechSynthesisUtterance = new SpeechSynthesisUtterance(message);
    speechSynthesisUtterance.lang = "en-UK";
    window.speechSynthesis.speak(speechSynthesisUtterance);
  }

  const apiScore = () => {
    (async () => {
      try {
        if (currentUser) {
          const { id, accessToken } = currentUser;
          const res = await axios.put(
            `http://localhost:3030/api/user/score/${id}`,
            {
              name: "aphabet",
              score: flipCounter,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const { data } = res;
          if (data) {
            if (data.exp && data.score) {
              currentUser.exp = data.exp;
              currentUser.listScore = currentUser.listScore.map((e) => {
                if (e.name === "UNIT_APHABET") {
                  if (e.score < data.score) {
                    e.score = data.score;
                  }
                  return e;
                }
                return e;
              });

              localStorage.setItem(
                "user",
                JSON.stringify({
                  ...currentUser,
                })
              );
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    })();
  };
};
