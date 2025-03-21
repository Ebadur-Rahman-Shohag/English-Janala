// --------------------------------------------fetching data--------------------------------------


// fetching vocabularies Button data
const loadLevel = async () => {
  const resposne = await fetch(
    "https://openapi.programming-hero.com/api/levels/all"
  );
  const data = await resposne.json();
  displayLevel(data.data);
};

// fetching words by clicking a specefic button
const loadWords = async (id) => {
  showSpinner();
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  const resposne = await fetch(url);
  const data = await resposne.json();
  // console.log(data);
  removeActiveClass();
  const lessonBtn = document.getElementById(`btn-${id}`);
  lessonBtn.classList.add("active");
  displayCards(data.data);
};

// --------------------------display data in the website----------------------------------------------
// display the level in the vocabularies button and add buttons dynamically
const displayLevel = (data) => {
  // console.log(data);
  for (let level of data) {
    const btnContainer = document.getElementById("level-btn-container");
    btnContainer.innerHTML += `<button id="btn-${level.level_no}" onclick=loadWords('${level.level_no}') class="btn border border-[#422AD5] poppins text-xs lg:text-sm text-[#422AD5] font-semibold hover:bg-[#422AD5] hover:text-white">
            <i class="fa-solid fa-book-open"></i>
            <span>Lesson -${level.level_no}</span>
          </button>`;
  }
};

// display the modal data
const displayModal = (modalData) => {
  // console.log(modalData);
  const {
    word,
    meaning,
    pronunciation,
    level,
    sentence,
    points,
    partsOfSpeech,
    synonyms,
  } = modalData;
  let conditionalWord =
    word === null || undefined ? "কোন শব্দ পাওয়া যায়নি" : word;
  let conditionalMeaning =
    meaning === null || undefined ? "এই শব্দের কোন অর্থ পাওয়া যায়নি" : meaning;
  let conditionalPronunciation =
    pronunciation === null || undefined
      ? "এই শব্দের কোন Pronunciation পাওয়া যায়নি"
      : pronunciation;
  let conditionalSentence =
    sentence === null || undefined
      ? "কোন প্রকার sentence পাওয়া যায়নি"
      : sentence;

  const modalContainer = document.getElementById("modal-details");
  // console.log(modalContainer);

  modalContainer.innerHTML += `
              <h1 class="poppins font-semibold text-4xl text-[#000000]">
                ${conditionalWord} (<i class="fa-solid fa-microphone h-8 w-8"></i> : ${conditionalPronunciation})
              </h1>
              <!-- meaning div -->
              <div class="space-y-[10px]">
                <p class="poppins font-semibold text-2xl text-[#000000]">
                  Meaning
                </p>
                <p class="hind font-medium text-2xl text-[#000000]">${conditionalMeaning}</p>
              </div>
              <!-- example div -->
              <div class="space-y-2">
                <p class="poppins font-semibold text-2xl text-[#000000]">
                  Example
                </p>
                <p
                  class="poppins font-normal text-2xl text-[#000000] opacity-[0.8]"
                >
                 ${conditionalSentence}
                </p>
              </div>
     
            </div>`;
  const synContainer = document.getElementById("syn-container");
  // console.log(synContainer);
  for (let i of synonyms) {
    synContainer.innerHTML += `<p
                  class="bg-[#D7E4EF] border-[#D7E4EF] rounded-xl px-3 py-2 poppins font-normal text-sm lg:text-xl text-[#000000] opacity-[0.8px]"
                >
                  ${i}
                </p>`;
  }
};

//  < !--syn div-- >

const displayCards = (data) => {
  const cardsContainer = document.getElementById("cards-container");
  const noLesson = document.getElementById("no-lessons");
  const notFoundLesson = document.getElementById("not-found-lesson");

  noLesson.style.display = "none";
  cardsContainer.innerHTML = "";

  if (data.length == 0) {
    notFoundLesson.style.display = "flex";
    noLesson.style.display = "none";
    cardsContainer.style.display = "none";
  } else {
    notFoundLesson.style.display = "none";
    cardsContainer.style.display = "grid";
    for (let card of data) {
      cardsContainer.innerHTML += `<div  class="bg-[#FFFFFF] rounded-xl flex flex-col justify-center items-center py-14">
                    <!-- cards descriptions -->
                    <div class="space-y-6">
                      <h1 class="inter text-center text-[32px] text-[#000000] font-bold">${card.word === null || undefined
          ? "No Word Found"
          : card.word
        }</h1>
                      <p class="inter text-center text-xl text-[#000000] font-medium">
                        Meaning /Pronounciation
                      </p>
                      <h4
                        class="hind text-center text-[32px] text-[#18181B] font-semibold opacity-[]"
                      >
                        "${card.meaning === null
          ? "এই শব্দের কোন অর্থ পাওয়া যায়নি"
          : card.meaning
        } / ${card.pronunciation === null || undefined
          ? "No pronunciation found"
          : card.pronunciation
        }"
                      </h4>
                    </div>
                    <!-- buttons -->
                    <div class="mt-14 w-10/12 flex justify-between">
                      <button
                      id="${card.id}"
                        onclick=modalOpen('${card.id}')
                        class="bg-[#1A91FF1A] rounded-lg py-3 px-4"
                      >
                        <i class="fa-solid fa-circle-info"></i>
                      </button>
                      <button onclick=pronounceWord('${card.word}') class="bg-[#1A91FF1A] rounded-lg py-3 px-4">
                        <i class="fa-solid fa-volume-high"></i>
                      </button>
                    </div>
                  </div>`;
    }
  }
  hideSpinner();
};

const modalOpen = async (id) => {
  my_modal_1.showModal();
  // console.log(id);
  // const btn = document.getElementById(`${id}`)
  // console.log(btn);
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const resposne = await fetch(url);
  const data = await resposne.json();
  document.getElementById("modal-details").innerHTML = "";
  document.getElementById("syn-container").innerHTML = "";

  displayModal(data.data);
};

// remove active class
function removeActiveClass() {
  const active = document.getElementsByClassName("active");
  for (let i of active) {
    i.classList.remove("active");
  }
}

// challenge part

// login click
document
  .getElementById("banner-btn")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    const userName = document.getElementById("name").value;
    const userPassword = document.getElementById("password").value;
    if (userName.length <= 0 && userPassword.length <= 0) {
      // alert("Please enter your name and password");
      Swal.fire("Please enter your name and password🚫");
      return;
    }
    else if (userName.length <= 0) {
      Swal.fire("Please enter your name");
      return;
    } else if (Number(userPassword) != 123456) {
      Swal.fire("Please enter correct password");
      return;
    } else {
      Swal.fire("You have logged in successfully!!");
      document.getElementById("banner").style.display = "none";
      document.getElementById("header").style.display = "block";
      document.getElementById("learn").style.display = "flex";
      document.getElementById("faq").style.display = "block";
    }
    document.getElementById("name").value = "";
    document.getElementById("password").value = "";
  });

// logout click
document.getElementById("logout").addEventListener("click", function () {
  document.getElementById("header").style.display = "none";
  document.getElementById("banner").style.display = "flex";
  document.getElementById("learn").style.display = "none";
  document.getElementById("faq").style.display = "none";
});

// spinner loading
const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
  document.getElementById("learn").style.display = "hidden";
};
const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
  document.getElementById("learn").style.display = "flex";
};

// optional part
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-EN'; // English
  window.speechSynthesis.speak(utterance);
}

loadLevel();
