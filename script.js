const openBtn = document.getElementById("openBtn");
const envelope = document.getElementById("envelope");
const book = document.getElementById("book");
const flap = document.querySelector(".flap");
const messageBox = document.getElementById("messageBox");

openBtn.addEventListener("click", () => {
  flap.style.transform = "rotateX(-180deg)";

  setTimeout(() => {
    envelope.classList.add("hidden");
    book.classList.remove("hidden");
  }, 900);
});

let currentPage = 1;

function nextPage() {
  document.getElementById(`page${currentPage}`).classList.add("hidden");
  currentPage++;
  document.getElementById(`page${currentPage}`).classList.remove("hidden");

 if (currentPage === 3) initShraddha();
if (currentPage === 4) initFlowers();
if (currentPage === 6) initCandleWish();
if (currentPage === 8) initPigPop();
if (currentPage === 9) initPuzzle();


}

function prevPage() {
  document.getElementById(`page${currentPage}`).classList.add("hidden");
  currentPage--;
  document.getElementById(`page${currentPage}`).classList.remove("hidden");
}

/* Show message below book */
function showMessage(text) {
  messageBox.textContent = text;
  messageBox.classList.remove("hidden");

  setTimeout(() => {
    messageBox.classList.add("hidden");
  }, 2000);
}

/* Candle Wish Page */
function initCandleWish() {
  const candle = document.getElementById("candle");
  const flame = document.getElementById("flame");
  const wishMsg = document.getElementById("wishMsg");

  wishMsg.textContent = "";

  candle.onclick = () => {
    if (flame.style.display === "none") return;

    flame.style.display = "none";

    wishMsg.textContent =
      "🌸 Wish made! I hope all your dreams come true Makdin 💖";

    confettiPop();
    showMessage("🕯️ Candle blown! Cutie moment!");
  };
}


/* Celebration Shower */
function confettiPop() {
  const bookBox = document.querySelector(".book");

  for (let i = 0; i < 120; i++) {
    const conf = document.createElement("div");
    conf.className = "confetti";

    // 🎨 Random bright colors
    const colors = [
      "#ff4d6d",
      "#ffd93d",
      "#6bcbef",
      "#b28dff",
      "#00f5d4",
      "#ff9f1c",
    ];

    conf.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    // 🎯 Random blast direction
    const x = (Math.random() - 0.5) * 400 + "px";
    const y = (Math.random() - 0.5) * 400 + "px";

    conf.style.setProperty("--x", x);
    conf.style.setProperty("--y", y);

    // Random size variation
    const size = Math.random() * 8 + 6;
    conf.style.width = size + "px";
    conf.style.height = size + "px";

    bookBox.appendChild(conf);

    // Remove after animation
    setTimeout(() => conf.remove(), 1300);
  }
}





/* Flowers */
function initFlowers() {
  document.querySelector(".flower").onclick = () => {
    showMessage("🌸 He ky tri tp madhe kela a  💕");
    confettiPop();

  };
}

/* Pig Pop + Celebration */
function initPigPop() {
  const pigImg = document.getElementById("pigImage");

  setTimeout(() => {
    pigImg.classList.remove("hidden");
    showMessage("🎂 Me tr yeu nahi shkt maza humshakl cake gheun ala a ");
    confettiPop();

  }, 1000);
}

function initShraddha() {
  const container = document.getElementById("shraddhaLine");
  const msgBox = document.getElementById("shraddhaMsg");
  const nextBtn = document.getElementById("unlockNextBtn");

  container.innerHTML = "";
  msgBox.textContent = "";

  const letters = [
    { l: "S", msg: "S - for sweetuuu kasa gulabjam srki sweet ahes ragvti hi agdi sweet " },
    { l: "H", msg: "H - for happiness ata yaat jast ky bolu tu asli ki me hasto smjla " },
    { l: "R", msg: "R - for radki nusta nusta swtala underestimate krnar and blame krnar" },
    { l: "A", msg: "A - for angry bird nusta raag naka vr asto kahi bolla ka nko jaude krti meee tu nko kruu....." },
    { l: "D", msg: "D - for dreamgirl kisi shayar ki gazal meri dreamgirl " },
    { l: "D", msg: "D - for dil ki dhadkan kharch tu ali teva pasun asa bhari bhari vatta na makdeee" },
    { l: "H", msg: "H - for life ch hydrogen because without you maza pani (H2o) hi incomplete ahe , and without Hydrogen Oxygen hi nahi so you you are my life " },
    { l: "A", msg: "A - for aareeee bhhaaaiii and tuza te signature move   🌷" }
  ];

  let clicked = 0;

  letters.forEach((item) => {
    const btn = document.createElement("button");
    btn.className = "shr-btn";
    btn.textContent = item.l;

    btn.onclick = () => {
      if (btn.classList.contains("done")) return;

      btn.classList.add("done");
      clicked++;

      msgBox.textContent = item.msg;

      if (clicked === 8) {
  // ✅ Do NOT overwrite last message
  nextBtn.classList.remove("hidden");

  // Optional: show unlock message separately after 1.5s
  setTimeout(() => {
    showMessage("Unlocked! Now go next 🌸");
  }, 1500);
}

    };

    container.appendChild(btn);
  });
}


/* Puzzle */
function initPuzzle() {
  const board = document.getElementById("puzzleBoard");
  board.innerHTML = "";

  const imgSrc = "makdin.jpeg";
  const size = 3;
  const total = size * size;

  let order = Array.from({ length: total }, (_, i) => i);

  do {
    order.sort(() => Math.random() - 0.5);
  } while (order.every((v, i) => v === i));

  let firstTile = null;

  order.forEach((pieceIndex) => {
    const tile = document.createElement("div");
    tile.className = "puzzle-tile";
    tile.dataset.piece = pieceIndex;

    tile.style.backgroundImage = `url(${imgSrc})`;
    tile.style.backgroundSize = `${size * 100}% ${size * 100}%`;
    tile.style.backgroundPosition = getPosition(pieceIndex);

    board.appendChild(tile);
  });

  board.onclick = (e) => {
    const tile = e.target.closest(".puzzle-tile");
    if (!tile) return;

    if (!firstTile) {
      firstTile = tile;
      tile.style.outline = "3px solid white";
      return;
    }

    swapTiles(firstTile, tile);

    firstTile.style.outline = "none";
    firstTile = null;
  };

  document.getElementById("verifyPuzzleBtn").onclick = verifyPuzzle;

  function swapTiles(a, b) {
    let temp = a.dataset.piece;
    a.dataset.piece = b.dataset.piece;
    b.dataset.piece = temp;

    a.style.backgroundPosition = getPosition(a.dataset.piece);
    b.style.backgroundPosition = getPosition(b.dataset.piece);
  }

  function getPosition(pieceIndex) {
    const x = pieceIndex % size;
    const y = Math.floor(pieceIndex / size);
    return `${(x * 100) / (size - 1)}% ${(y * 100) / (size - 1)}%`;
  }

  function verifyPuzzle() {
    const tiles = [...board.children];

    const solved = tiles.every((tile, i) => Number(tile.dataset.piece) === i);

    if (solved) {
      showMessage("🎉 Hushar ahes makdin 💖");
      confettiPop();


      setTimeout(() => nextPage(), 1500);
    } else {
      showMessage("Solve kr shemde");
    }
  }
}
