//Програмд ашиглагдах глобаль хувсагчдыг энд зарлана
var activePlayer;
var scores = [];
var roundScore;

var diceDom = document.querySelector(".dice");
//Тоглоомыг эхлүүлнэ
initGame();
// Тоглоом эхлэхэд бэлтгэх
function initGame() {
  // Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчийг 0, хоёрдугаар тоглогчийг 1 гэж тэмдэглэе

  activePlayer = 0;

  // Тоглогчдын цуглуулсан оноог хадгалах хувьсагч

  scores = [0, 0];

  // Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч

  roundScore = 0;

  diceDom.style.display = "none";

  // Програм эхлэхэд бэлтгэе.
  // document.querySelector("#score-1").textContent = 0;
  document.getElementById("score-1").textContent = "0";
  document.getElementById("score-0").textContent = "0";

  document.getElementById("current-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";

  //Ялсан тоглогчийн нэрийг буцаагаад хэвэнд нь оруулах
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");
}

// Шоог шидэх эвент листенэр
document.querySelector(".btn-roll").addEventListener("click", function() {
  // 1 - 6 хүртэл санатсаргүй тоог гаргана.
  var diceNumber = Math.floor(Math.random() * 6) + 1;
  // Нуусан шоог гаргаж ирнэ.
  diceDom.style.display = "block";
  // Буусан шооны тоонд харгалзах зургийг гаргаж ирнэ.
  diceDom.src = "dice-" + diceNumber + ".png";
  //Буусан тоо 1 -с ялгаатай бол идэвхтэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ.
  if (diceNumber !== 1) {
    //1 - с ялгаатай тоо буулаа. Буусан тоог тоглогчид нэмж өгнө.
    roundScore = roundScore + diceNumber;
    document.getElementById("current-" + activePlayer).textContent = roundScore;
  } else {
    // 1 буусан тул тоглогчийн ээлжийг энд солино.
    switchToNextPlayer();
  }
});
// Hold товчны эвент листенэр

document.querySelector(".btn-hold").addEventListener("click", function() {
  // ээлжинд уг тоглогчийн цуглуулсан ээлжны оныг глобаль оноон дээр нь нэмж өгнө.
  scores[activePlayer] = scores[activePlayer] + roundScore;
  //Дэлгэц дээр оноог нь өөрчилнө.
  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];
  //Уг тоглогч хожсон эсэхийг шалгах
  if (scores[activePlayer] >= 10) {
    //Ялагч гэсэн техтийг нэрнийх нь нь оронд залгана.
    document.getElementById("name-" + activePlayer).textContent = "Winner!!!";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
  } else {
    //Ээлжийн оноог нь 0 болгоно.
    //Тоглогчийн ээлжийг солино.
    switchToNextPlayer();
  }
});

//Тоглох ээлжийг сольдог функц
function switchToNextPlayer() {
  //Энэ тоглогчийн оноог 0 болгоно.
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;

  //Тоглогчийн ээлжийг нөгөө тоглогчруу шилжүүлнэ.
  // Хэрэв идэвхтэй тоглогч нь 0 байвал идэвхтэй тоглогчийг 1 болго.
  // Үгүй бол идэвхтэй тоглогчийг 0 болго.
  //Гурвалсан оператор ашиглав.
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  //Улаан цэг шилжүүлэх
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //Шоог түр алга болгох
  diceDom.style.display = "none";
}
//Шинэ тоглоом эхлүүлэх товчны эвент листенэр

document.querySelector(".btn-new").addEventListener("click", initGame);
