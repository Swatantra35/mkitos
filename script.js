/* -- Glow effect -- */
const blob = document.getElementById("blob");

window.onpointermove = (event) => {
  const { clientX, clientY } = event;

  blob.animate(
    {
      left: `${clientX - 50}px`, // Center the blob
      top: `${clientY - 50}px`,
    },
    { duration: 3000, fill: "forwards" }
  );
};

/* -- Text effect -- */
const letters = "मकइतओसकखगचजदध";
const randomWords = [
  "Unplanned",
  "Chaotic",
  "Unscripted",
  "Disruptor",
  "Berozgar",
  "Useless",
  "Undirected",
  "Moldless",
  "Impromptu",
  "Open Loop",
  "Biradar",
];

const wordDisplay = document.getElementById("name");

let currentWord = wordDisplay.innerText; // Store the initial word in case of resetting
let interval = null;

function morphToRandomWord() {
  const randomIndex = Math.floor(Math.random() * randomWords.length);
  const randomWord = randomWords[randomIndex];

  let iteration = 0;
  clearInterval(interval); // Stop previous interval

  // Morph into the random word
  interval = setInterval(() => {
    wordDisplay.innerText = randomWord
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return letter; // Reveal the original letter
        }

        // Random character until the original letter is revealed
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");

    if (iteration >= randomWord.length) {
      clearInterval(interval);
    }

    iteration += 1; // Increase this value for a slower transition
  }, 100); // 100ms interval for smoother effect
}

// Change to a random word on mouse hover
wordDisplay.onmouseover = morphToRandomWord;

// Reset to original word if hovered again
wordDisplay.onmouseleave = () => {
  clearInterval(interval); // Clear the existing interval
  wordDisplay.innerText = currentWord; // Reset to the original word
};

/* -- Star Effect --*/
const numberOfStars = 100; // Number of stars to create
const body = document.body;

for (let i = 0; i < numberOfStars; i++) {
  const star = document.createElement("div");
  star.classList.add("star");

  // Random sizes for stars
  const size = Math.random() * (5 - 1) + 1; // Size between 1px and 3px
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  // Random position for stars
  star.style.top = `${Math.random() * 100}vh`;
  star.style.left = `${Math.random() * 100}vw`;

  // Random animation duration
  star.style.animationDuration = `${Math.random() * 1 + 0.5}s`;

  body.appendChild(star);
}

const columns = document.querySelectorAll(".column");
const visual = document.getElementById("visual");

const Boxlayout = (() => {
  const wrapper = document.body,
    sections = [...document.querySelectorAll(".section")],
    closeButtons = [...document.querySelectorAll(".close-section")],
    expandedClass = "is-expanded",
    hasExpandedClass = "has-expanded-item";

  const initEvents = () => {
    sections.forEach((element) => {
      element.addEventListener("click", () => openSection(element));
    });
    closeButtons.forEach((element) => {
      element.addEventListener("click", (event) => {
        event.stopPropagation();
        closeSection(element.parentElement);
      });
    });
  };

  const openSection = (element) => {
    if (element.classList.contains(expandedClass)) return;
    element.classList.add(expandedClass);
    wrapper.classList.add(hasExpandedClass);
  };

  const closeSection = (element) => {
    if (!element.classList.contains(expandedClass)) return;
    element.classList.remove(expandedClass);
    wrapper.classList.remove(hasExpandedClass);
  };

  return { init: initEvents };
})();

Boxlayout.init();

const closeBtn = document.querySelector(".close-btn");
const boxes = document.querySelectorAll(".square");
const boxesContent = document.querySelectorAll(".box-content");

closeBtn.style.display = "none";

boxesContent.forEach((box) => {
  box.classList.add("box-content-hide");
});

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    boxes.forEach((each) => {
      each.classList.remove("box-modal");
      each.classList.add("no-height-width");
    });

    box.classList.remove("no-height-width");
    box.classList.add("box-modal");
    box.lastElementChild.classList.remove("box-content-hide");
    closeBtn.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  closeBtn.style.display = "none";

  boxes.forEach((eachBox) => {
    eachBox.classList.remove("no-height-width");
    eachBox.classList.remove("box-modal");
  });

  boxesContent.forEach((box) => {
    box.classList.add("box-content-hide");
  });
});
