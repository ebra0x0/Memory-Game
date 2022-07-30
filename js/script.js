const Elements = {
    game_banel: document.querySelector(".game-banel"),
    boxes: document.querySelectorAll(".game-banel .box"),
    backs: document.querySelectorAll(".game-banel .box .back"),
    startCanava: document.querySelector(".canava"),
    catagory: document.querySelectorAll(".canava .shapes span"),
    userName: document.querySelector(".info-banel .userName span"),
    timer: document.querySelector("#timer"),
    triesCount: document.querySelector(".tries span"),
    editName: document.querySelector(".info-banel .name i"),
};

let listOrder = Array.from(Array(Elements.boxes.length).keys()),
    allIcons = [],
    duration = 3,
    sleep = 500,
    wrongChoose = 0;
(rightChoose = 0), (chances = 15);

const Sounds = {
    timer: "sounds/countdown.mp3",
    right: "sounds/Right.mp3",
    wrong: "sounds/Wrong.mp3",
    victory: "sounds/Victory.mp3",
    lose: "sounds/Lose.mp3",
};
let audio = document.createElement("audio");

RandomeArray(listOrder);

const catgIcons = {
    Food: [
        { class: "fa-solid fa-pizza-slice", index: listOrder[0] },
        { class: "fa-solid fa-egg", index: listOrder[1] },
        { class: "fa-solid fa-cake-candles", index: listOrder[2] },
        { class: "fa-solid fa-apple-whole", index: listOrder[3] },
        { class: "fa-solid fa-lemon", index: listOrder[4] },
        { class: "fa-solid fa-pizza-slice", index: listOrder[5] },
        { class: "fa-solid fa-shrimp", index: listOrder[6] },
        { class: "fa-solid fa-apple-whole", index: listOrder[7] },
        { class: "fa-solid fa-ice-cream", index: listOrder[8] },
        { class: "fa-solid fa-shrimp", index: listOrder[9] },
        { class: "fa-solid fa-burger", index: listOrder[10] },
        { class: "fa-solid fa-carrot", index: listOrder[11] },
        { class: "fa-solid fa-pepper-hot", index: listOrder[12] },
        { class: "fa-solid fa-carrot", index: listOrder[13] },
        { class: "fa-solid fa-pepper-hot", index: listOrder[14] },
        { class: "fa-solid fa-burger", index: listOrder[15] },
        { class: "fa-solid fa-cake-candles", index: listOrder[16] },
        { class: "fa-solid fa-ice-cream", index: listOrder[17] },
        { class: "fa-solid fa-lemon", index: listOrder[18] },
        { class: "fa-solid fa-egg", index: listOrder[19] },
    ],
    Animals: [
        { class: "fa-solid fa-cat", index: listOrder[0] },
        { class: "fa-solid fa-frog", index: listOrder[1] },
        { class: "fa-solid fa-crow", index: listOrder[2] },
        { class: "fa-solid fa-dove", index: listOrder[3] },
        { class: "fa-solid fa-fish-fins", index: listOrder[4] },
        { class: "fa-solid fa-spider", index: listOrder[5] },
        { class: "fa-solid fa-horse", index: listOrder[6] },
        { class: "fa-solid fa-cow", index: listOrder[7] },
        { class: "fa-solid fa-dog", index: listOrder[8] },
        { class: "fa-solid fa-frog", index: listOrder[9] },
        { class: "fa-solid fa-hippo", index: listOrder[10] },
        { class: "fa-solid fa-cow", index: listOrder[11] },
        { class: "fa-solid fa-horse", index: listOrder[12] },
        { class: "fa-solid fa-spider", index: listOrder[13] },
        { class: "fa-solid fa-dog", index: listOrder[14] },
        { class: "fa-solid fa-fish-fins", index: listOrder[15] },
        { class: "fa-solid fa-crow", index: listOrder[16] },
        { class: "fa-solid fa-dove", index: listOrder[17] },
        { class: "fa-solid fa-cat", index: listOrder[18] },
        { class: "fa-solid fa-hippo", index: listOrder[19] },
    ],
    Brands: [
        { class: "fa-brands fa-amazon", index: listOrder[0] },
        { class: "fa-brands fa-android", index: listOrder[1] },
        { class: "fa-brands fa-apple", index: listOrder[2] },
        { class: "fa-brands fa-bitcoin", index: listOrder[3] },
        { class: "fa-brands fa-cc-mastercard", index: listOrder[4] },
        { class: "fa-brands fa-cc-paypal", index: listOrder[5] },
        { class: "fa-brands fa-cc-visa", index: listOrder[6] },
        { class: "fa-brands fa-discord", index: listOrder[7] },
        { class: "fa-brands fa-facebook", index: listOrder[8] },
        { class: "fa-brands fa-google", index: listOrder[9] },
        { class: "fa-brands fa-cc-paypal", index: listOrder[10] },
        { class: "fa-brands fa-amazon", index: listOrder[11] },
        { class: "fa-brands fa-facebook", index: listOrder[12] },
        { class: "fa-brands fa-apple", index: listOrder[13] },
        { class: "fa-brands fa-android", index: listOrder[14] },
        { class: "fa-brands fa-bitcoin", index: listOrder[15] },
        { class: "fa-brands fa-discord", index: listOrder[16] },
        { class: "fa-brands fa-cc-mastercard", index: listOrder[17] },
        { class: "fa-brands fa-google", index: listOrder[18] },
        { class: "fa-brands fa-cc-visa", index: listOrder[19] },
    ],
};

// Trigger fllipBox function
Elements.boxes.forEach((box) => {
    box.addEventListener("click", () => {
        fllipBox(box);
    });
});

// Edit User Name
Elements.editName.addEventListener("click", canavaName);

// On Pick Catagory
Elements.catagory.forEach((type) => {
    type.addEventListener("click", () => {
        Elements.triesCount.textContent = `${wrongChoose} / ${chances}`;
        setIconspick(type);
        saveIcons();

        let savedName = window.localStorage.getItem("username");

        if (savedName !== null) {
            Elements.userName.textContent = savedName;
            canavanameCheck = true;
        } else {
            canavaName();
        }
        let Named = setInterval(() => {
            if (window.localStorage.getItem("username") !== null) {
                stopClicking(duration * 1000 + 1000);
                handleBox();
                Remember();
                clearInterval(Named);
            }
        }, 100);
    });
});

// Randome array for order list
function RandomeArray(array) {
    let current = array.length,
        random;

    while (current > 0) {
        random = Math.floor(Math.random() * current);

        current--;

        [array[current], array[random]] = [array[random], array[current]];
    }
    let UniqArray = new Set(array);
    return UniqArray;
}
// Set boxes order
function handleBox() {
    // Create randome array from list order
    RandomeArray(listOrder);

    allIcons.forEach((icon, index) => {
        icon.dataset.index = listOrder[index];
    });

    Elements.boxes.forEach((box) => {
        let targetIcon = allIcons.filter((icon) => {
            return icon.dataset.index === box.dataset.index;
        });
        let backBox = box.lastElementChild;
        backBox.appendChild(targetIcon[0]);
    });
}
// Show all boxes for some of time
function Remember() {
    let countDown = duration;

    setTimeout(() => {
        Elements.boxes.forEach((box) => {
            box.classList.add("active");
        });
    }, 1000);

    let counter = setInterval(() => {
        Elements.timer.textContent = countDown;
        if (countDown <= 0) {
            clearInterval(counter);
            Elements.timer.textContent = countDown;
        } else {
            addSound(Sounds.timer);
            countDown--;
        }
    }, 1000);

    setTimeout(() => {
        HideAndRemove();
    }, duration * 1000 + 1000);
    saveIcons();
}
// Handle flliping box
function fllipBox(Box) {
    if (Box.classList.contains("flliped")) {
        return false;
    }

    // Locate the target icon and append it inside his back
    let backBox = Box.lastElementChild,
        targetedIcon = allIcons.filter((icon) => {
            return icon.dataset.index === Box.dataset.index;
        });

    backBox.appendChild(targetedIcon[0]);
    // Add active class for box
    Box.classList.add("active");

    let allActiveicons = document.querySelectorAll(".box.active .back i");

    //  if there 2 box flliped will check choose if right will keep active boxes else remove all active box and increase wrong choose
    if (allActiveicons.length === 2) {
        stopClicking(sleep);
        checkChoose(allActiveicons[0], allActiveicons[1]);
        setTimeout(() => Finished(), sleep);
    }
}
function stopClicking(timeout) {
    Elements.game_banel.classList.add("noClick");
    setTimeout(() => {
        Elements.game_banel.classList.remove("noClick");
    }, timeout);
}
// Check user choose
function checkChoose(choose1, choose2) {
    let activeBoxes = document.querySelectorAll(".box.active");

    if (choose1.className === choose2.className) {
        addSound(Sounds.right);
        rightChoose++;
        console.log("Right choose");
        activeBoxes.forEach((box) => {
            box.classList.add("flliped");
            box.classList.remove("active");
        });
    } else {
        addSound(Sounds.wrong);

        choose1.classList.add("wrong");
        choose2.classList.add("wrong");
        wrongChoose++;
        Elements.triesCount.textContent = `${wrongChoose} / ${chances}`;
        setTimeout(() => {
            choose1.classList.remove("wrong");
            choose2.classList.remove("wrong");
            activeBoxes.forEach((box) => {
                box.classList.remove("active");
            });
        }, sleep);
    }
}
// Handle The End Game
function Finished() {
    let fllipedBoxes = document.querySelectorAll(".box.flliped");

    if (
        fllipedBoxes.length === Elements.boxes.length ||
        wrongChoose >= chances
    ) {
        Elements.boxes.forEach((box) => {
            let genDelay = Math.floor(Math.random() * 2);
            box.style.transition = `2s ${genDelay}s`;
        });
        Elements.game_banel.classList.add("finished");
        setTimeout(() => {
            GameOver(wrongChoose >= chances ? true : false);
        }, sleep * 2);
    }
}

function ResetGame() {
    HideAndRemove();
    wrongChoose = 0;
    rightChoose = 0;
    Elements.triesCount.textContent = wrongChoose;
    Elements.startCanava.style.display = "flex";
    saveIcons();
}

function HideAndRemove() {
    Elements.game_banel.classList.contains("finished")
        ? Elements.game_banel.classList.remove("finished")
        : false;
    Elements.boxes.forEach((box) => {
        box.classList.remove("active");
        box.classList.contains("flliped")
            ? box.classList.remove("flliped")
            : false;
        box.style.transition = "transform 0.5s";
    });
    let icons = document.querySelectorAll(".box .back i");
    icons.forEach((icon) => {
        icon.remove();
    });
}

function GameOver(result) {
    // Create elements
    let resultCanava = document.createElement("div"),
        card = document.createElement("div"),
        gameOverHeader = document.createElement("span"),
        resultTxt = document.createTextNode(result ? "Defeat" : "Victory"),
        wrongInfo = document.createElement("span"),
        rightInfo = document.createElement("span"),
        againBtn = document.createElement("span");

    // Set attributes
    resultCanava.setAttribute("class", "gameover");
    card.setAttribute("class", "cardInfo");
    gameOverHeader.setAttribute("class", "header");
    wrongInfo.setAttribute("class", "wrongInfo");
    rightInfo.setAttribute("class", "rightInfo");
    againBtn.setAttribute("class", "again");
    // Append elements
    gameOverHeader.appendChild(resultTxt);
    card.appendChild(gameOverHeader);
    card.appendChild(wrongInfo);
    card.appendChild(rightInfo);
    wrongInfo.textContent = `Wrong : ${wrongChoose}`;
    rightInfo.textContent = `Right : ${rightChoose}`;
    card.appendChild(againBtn);
    againBtn.textContent = "Again";
    resultCanava.appendChild(card);
    document.body.appendChild(resultCanava);
    // Styling elements
    if (result) {
        // if lose
        addSound(Sounds.lose);
        resultCanava.style.backgroundColor = "#ff0000b3";
        gameOverHeader.style.backgroundColor = "#f12121";
    } else {
        //if win
        addSound(Sounds.victory);
        resultCanava.style.backgroundColor = "#00853bb3";
        gameOverHeader.style.backgroundColor = "#009356";
    }
    // Again button on click
    againBtn.addEventListener("click", () => {
        ResetGame();
        // Remove Result canava
        resultCanava.remove();
    });
}

function showAllIcons() {
    let backBox = document.querySelectorAll(".box .back");
    backBox.forEach((back, index) => {
        back.appendChild(allIcons[index]);
    });
}

function canavaName() {
    let nameCanava = document.createElement("div");
    let prompt = document.createElement("input");

    nameCanava.setAttribute("class", "namecanava");
    prompt.setAttribute("placeholder", "Enter a name");
    prompt.setAttribute("maxlength", "9");

    nameCanava.appendChild(prompt);
    document.body.appendChild(nameCanava);

    nameCanava.style.backgroundColor = "#161616f7";

    prompt.onfocus = () => {
        prompt.style.outline = "none";
    };
    prompt.focus();

    prompt.addEventListener("keyup", (ev) => {
        if (ev.key === "Enter") {
            let Name = Array.from(prompt.value.trim());
            let clearName = Name.filter((char) => {
                return char.match(/[a-zA-Z]/);
            })
                .toString()
                .replace(/[,]/g, "");
            if (
                clearName === null ||
                clearName === "" ||
                clearName.split("").length < 2
            ) {
                window.localStorage.setItem("username", "Unknown");
            } else {
                window.localStorage.setItem("username", clearName);
            }
            Elements.userName.textContent =
                window.localStorage.getItem("username");
            nameCanava.remove();
        }
    });
}

function setIconspick(pick) {
    // Get id name for the selected catagory
    let pickName = pick.getAttribute("id");

    console.log("the pick id is: " + pickName);

    Elements.backs.forEach((back, index) => {
        let icon = catgIcons[`${pickName}`][index],
            classIcon = icon.class,
            dataIndex = icon.index;
        // create icon and append it into back
        let newI = document.createElement("i");
        newI.setAttribute("class", classIcon);
        newI.setAttribute("data-index", dataIndex);
        // append it inside the back
        back.appendChild(newI);
    });
    Elements.startCanava.style.display = "none";
}

function saveIcons() {
    allIcons = Array.from(document.querySelectorAll(".box .back i"));
}

function addSound(sound) {
    setTimeout(() => {
        audio.setAttribute("src", sound);
        Elements.game_banel.appendChild(audio);
        audio.play();
    }, 200);
}
