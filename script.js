const PLANETS = {
  mercury: {
    name: "Mercury",
    colors: ["#d0c9bf", "#6e675f"],
    trait: "Quick, curious, always moving",
    line: "You move fast and get bored standing still. Mercury is the smallest planet and the closest to the Sun, and it never slows down.",
    fact: "A year on Mercury lasts only 88 Earth days."
  },
  venus: {
    name: "Venus",
    colors: ["#f3d08a", "#c0762f"],
    trait: "Warm, magnetic, intense",
    line: "You pull people in and feel things strongly. Venus is wrapped in thick clouds and is the hottest planet in the solar system.",
    fact: "Venus spins backward compared to most planets, so the Sun rises in the west."
  },
  earth: {
    name: "Earth",
    colors: ["#6fb7ff", "#1f6b3a"],
    trait: "Grounded, caring, adaptable",
    line: "You make wherever you are feel like home. Earth is the only planet we know of that has life.",
    fact: "About 71% of Earth's surface is covered in water."
  },
  mars: {
    name: "Mars",
    colors: ["#e8845a", "#8c3418"],
    trait: "Bold, determined, hands-on",
    line: "You start things and you don't quit when they get hard. Mars is a rugged, dusty world that explorers keep sending robots to.",
    fact: "Olympus Mons on Mars is the tallest volcano in the solar system, about 22 km high."
  },
  jupiter: {
    name: "Jupiter",
    colors: ["#f0cfa4", "#b4693a"],
    trait: "Big-hearted, loud, generous",
    line: "You bring the energy and the crowd. Jupiter is the biggest planet, with dozens of moons circling it.",
    fact: "Jupiter's Great Red Spot is a storm that has been raging for centuries."
  },
  saturn: {
    name: "Saturn",
    colors: ["#f4e0a8", "#b79a55"],
    trait: "Patient, organized, graceful",
    line: "You plan ahead and make it look easy. Saturn keeps its famous rings in perfect order.",
    fact: "Saturn is so light for its size that it would float in a big enough bathtub."
  },
  uranus: {
    name: "Uranus",
    colors: ["#b8f0f0", "#4fa7b5"],
    trait: "Original, independent, unpredictable",
    line: "You do things your own way, and that's the point. Uranus spins on its side while the other planets stay mostly upright.",
    fact: "Uranus is tilted about 98 degrees, so it rolls around the Sun like a ball."
  },
  neptune: {
    name: "Neptune",
    colors: ["#6f8dff", "#1c2f9c"],
    trait: "Dreamy, deep, mysterious",
    line: "You feel more than you say and notice what others miss. Neptune is deep blue, far from the Sun, and full of hidden storms.",
    fact: "Neptune has winds over 2,000 km/h, the fastest in the solar system."
  }
};

const QUESTIONS = [
  {
    text: "What sounds like a great weekend?",
    options: [
      { text: "Seeing friends and going out", pts: { jupiter: 2, earth: 1 } },
      { text: "Building or fixing something", pts: { mars: 2, mercury: 1 } },
      { text: "Trying something I've never done", pts: { uranus: 2, mercury: 1 } },
      { text: "Quiet time with a book or my thoughts", pts: { neptune: 2, saturn: 1 } }
    ]
  },
  {
    text: "How do you handle a deadline?",
    options: [
      { text: "Finish early and neatly", pts: { saturn: 2, earth: 1 } },
      { text: "Sprint at the last minute", pts: { mercury: 2, mars: 1 } },
      { text: "Do it my own odd way", pts: { uranus: 2, neptune: 1 } },
      { text: "Get everyone to pitch in", pts: { jupiter: 2, venus: 1 } }
    ]
  },
  {
    text: "Pick a kind of weather.",
    options: [
      { text: "Warm and cozy", pts: { venus: 2, earth: 1 } },
      { text: "Dry and dusty with a big sky", pts: { mars: 2, saturn: 1 } },
      { text: "Stormy and dramatic", pts: { jupiter: 2, neptune: 1 } },
      { text: "Crisp, cold, and clear", pts: { uranus: 2, saturn: 1 } },
      { text: "Mild, a bit of everything", pts: { earth: 2, venus: 1 } }
    ]
  },
  {
    text: "Your friends would call you...",
    options: [
      { text: "The loyal one everyone relies on", pts: { earth: 2, saturn: 1 } },
      { text: "The bold one who starts things", pts: { mars: 2, jupiter: 1 } },
      { text: "The charming one", pts: { venus: 2, mercury: 1 } },
      { text: "The mysterious one", pts: { neptune: 2, uranus: 1 } }
    ]
  },
  {
    text: "Pick a superpower.",
    options: [
      { text: "Teleporting anywhere", pts: { mercury: 2, uranus: 1 } },
      { text: "Reading minds", pts: { neptune: 2, venus: 1 } },
      { text: "Super strength", pts: { mars: 2, jupiter: 1 } },
      { text: "Making anything grow", pts: { earth: 2, venus: 1 } },
      { text: "Controlling time", pts: { saturn: 2, neptune: 1 } }
    ]
  }
];

const stage = document.getElementById("stage");
const scores = {};
let name = "";
let step = 0;

function el(tag, props = {}, ...kids) {
  const node = document.createElement(tag);
  Object.assign(node, props);
  kids.forEach((kid) => node.append(kid));
  return node;
}

function render(...nodes) {
  stage.replaceChildren(...nodes);
}

function showIntro() {
  Object.keys(PLANETS).forEach((key) => (scores[key] = 0));
  step = 0;

  const input = el("input", {
    id: "name",
    type: "text",
    maxLength: 24,
    autocomplete: "given-name",
    placeholder: "Your name"
  });
  const go = el("button", {
    className: "btn primary",
    textContent: "Board the shuttle",
    onclick: () => {
      name = input.value.trim() || "Traveler";
      showQuestion();
    }
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") go.click();
  });

  render(el("label", { htmlFor: "name", textContent: "What's your name?" }), input, go);
}

function showQuestion() {
  const q = QUESTIONS[step];

  const fill = el("i");
  fill.style.width = `${(step / QUESTIONS.length) * 100}%`;
  const bar = el("div", { className: "bar" }, fill);

  const heading = el("h2", { textContent: q.text, tabIndex: -1 });
  const options = q.options.map((option) =>
    el("button", { className: "btn", textContent: option.text, onclick: () => choose(option) })
  );

  render(
    el("p", { className: "count", textContent: `Question ${step + 1} of ${QUESTIONS.length}` }),
    bar,
    heading,
    ...options
  );
  heading.focus();
}

function choose(option) {
  Object.entries(option.pts).forEach(([planet, points]) => (scores[planet] += points));
  step += 1;
  if (step < QUESTIONS.length) showQuestion();
  else showResult();
}

function row(label, value) {
  return el("div", {}, el("dt", { textContent: label }), el("dd", { textContent: value }));
}

function showResult() {
  const key = Object.keys(scores).reduce((best, k) => (scores[k] > scores[best] ? k : best));
  const planet = PLANETS[key];

  const visual = el("div", { className: `planet${key === "saturn" ? " ringed" : ""}` });
  visual.style.setProperty("--c1", planet.colors[0]);
  visual.style.setProperty("--c2", planet.colors[1]);

  const heading = el("h2", { textContent: `${name}, you're headed to ${planet.name}`, tabIndex: -1 });

  const pass = el(
    "article",
    { className: "pass" },
    el(
      "div",
      { className: "pass-top" },
      el("span", { textContent: "Shuttle to You" }),
      el("span", { textContent: "Boarding pass" })
    ),
    el("div", { className: "pass-body" }, visual, heading, el("p", { textContent: planet.line })),
    el("div", { className: "pass-tear" }),
    el(
      "dl",
      { className: "pass-info" },
      row("Passenger", name),
      row("Destination", planet.name),
      row("Why you fit", planet.trait),
      row("Fun fact", planet.fact)
    )
  );

  const again = el("div", { className: "again" }, el("button", {
    className: "btn primary",
    textContent: "Fly again",
    onclick: showIntro
  }));

  render(pass, again);
  heading.focus();
}

showIntro();
