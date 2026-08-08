import React, { useState, useEffect, useCallback } from "react";

/* ---------------- Design tokens ----------------
   ink #101B14   forest #0F5132   gold #F2B134
   coral #E4572E   paper #F5F1E8   line #E4DCC8
--------------------------------------------------*/

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600;700&display=swap');
.ef-display{font-family:'Fraunces',serif;}
.ef-body{font-family:'Work Sans',sans-serif;}
`;

/* ---------------- Curriculum data ---------------- */
/* Each subject has units per grade, pulled from the official table of contents.
   Unit 0 of every subject/grade is free and fully built with an embedded video.
   Remaining units are real titles, locked until enrollment, content pending. */

const CURRICULUM = {
  physics: {
    name: "Physics", glyph: "⚛",
    9: {
      unitTitles: ["Physics and Human Society", "Physical Quantities", "Motion in a Straight Line", "Force, Work, Energy and Power", "Simple Machines", "Mechanical Oscillation and Sound Wave", "Temperature and Thermometry"],
      videoId: "GGZQdBA6BJA",
      lecture: "Physics is the natural science that studies matter, energy, and the fundamental forces that govern the universe. This unit looks at what physics is, its major branches — mechanics, thermodynamics, electromagnetism, optics, and more — and how physics-driven technology, from electricity to medical imaging, has shaped human society.",
      notes: ["Physics studies matter, energy, motion, and forces.", "Major branches: mechanics, thermodynamics, electromagnetism, optics, modern physics.", "Physics underlies technologies like electricity, communication, and medicine.", "Physics contributes directly to Ethiopia's development in energy and technology."],
      quiz: [
        { q: "Physics is best defined as the science that studies:", options: ["Only living things", "Matter, energy and their interactions", "Only planets and stars", "Only chemical reactions"], correct: 1 },
        { q: "The branch of physics that studies heat and energy transfer is:", options: ["Mechanics", "Optics", "Thermodynamics", "Electromagnetism"], correct: 2 },
        { q: "Which of the following is a real-world application of physics?", options: ["Classifying plant species", "Generating electricity", "Analyzing grammar", "Studying historical events"], correct: 1 },
      ],
      euee: [{ q: "Which branch of physics deals with the motion of objects and the forces that cause it?", options: ["Optics", "Mechanics", "Thermodynamics", "Nuclear physics"], correct: 1 }],
    },
    10: {
      unitTitles: ["Vector Quantities", "Uniformly Accelerated Motion", "Elasticity and Static Equilibrium of Rigid Body", "Static and Current Electricity", "Magnetism", "Electromagnetic Waves and Geometrical Optics"],
      videoId: "8xqDRCfPGnw",
      lecture: "A vector quantity carries both magnitude and direction, unlike a scalar which has magnitude only. This unit covers how vectors are represented graphically and analytically, and how they are added and resolved into components — the foundation for later units on motion and forces.",
      notes: ["Vector = magnitude + direction (e.g. displacement, force, velocity).", "Scalar = magnitude only (e.g. distance, speed, mass).", "Vectors can be added graphically (head-to-tail) or analytically (components).", "A vector can be resolved into perpendicular x and y components."],
      quiz: [
        { q: "A vector quantity has:", options: ["Magnitude only", "Direction only", "Magnitude and direction", "Neither"], correct: 2 },
        { q: "Which of these is a scalar quantity?", options: ["Displacement", "Force", "Speed", "Velocity"], correct: 2 },
        { q: "Adding vectors by placing them head-to-tail is called the:", options: ["Component method", "Triangle method", "Scalar method", "Product method"], correct: 1 },
      ],
      euee: [
        { q: "A vector quantity is best represented graphically by:", options: ["A single number", "An arrow with length and direction", "A dot", "A circle"], correct: 1 },
        { q: "Which pair below are both vector quantities?", options: ["Mass and time", "Speed and distance", "Force and displacement", "Energy and temperature"], correct: 2 },
      ],
    },
  },
  chemistry: {
    name: "Chemistry", glyph: "⚗",
    9: {
      unitTitles: ["Chemistry and Its Importance", "Measurements and Scientific Methods", "Structure of the Atom", "Periodic Classification of Elements", "Chemical Bonding"],
      videoId: "4zgKFmax7B0",
      lecture: "Chemistry is the study of matter, its composition, properties, and the changes it undergoes. This opening unit explores what chemistry covers, its close relationship with other natural sciences, and its importance to everyday life, industry, agriculture, and health in Ethiopia and beyond.",
      notes: ["Chemistry studies matter, its composition, and its changes.", "Branches include organic, inorganic, physical, and analytical chemistry.", "Chemistry connects closely with biology, physics, and geology.", "Chemical knowledge supports agriculture, medicine, and industry."],
      quiz: [
        { q: "Chemistry is best defined as the study of:", options: ["Living organisms only", "Matter and the changes it undergoes", "Only industrial processes", "The stars and planets"], correct: 1 },
        { q: "The branch of chemistry that studies carbon-containing compounds is:", options: ["Inorganic chemistry", "Organic chemistry", "Physical chemistry", "Analytical chemistry"], correct: 1 },
        { q: "Chemistry is most closely related to which other sciences?", options: ["History and geography", "Biology and physics", "Literature and art", "Music and philosophy"], correct: 1 },
      ],
      euee: [{ q: "Which of the following is an example of chemistry applied to agriculture?", options: ["Developing fertilizers", "Composing music", "Mapping rivers", "Studying grammar"], correct: 0 }],
    },
    10: {
      unitTitles: ["Chemical Reactions and Stoichiometry", "Solutions", "Important Inorganic Compounds", "Energy Changes and Electrochemistry", "Metals and Nonmetals", "Hydrocarbons and Their Natural Sources"],
      videoId: "LFvKi1_VTWs",
      lecture: "A chemical reaction transforms reactants into products, and stoichiometry uses balanced equations to calculate the exact quantities involved. This unit introduces types of chemical reactions, how to balance equations, and the mole concept that underlies all stoichiometric calculations.",
      notes: ["A balanced chemical equation has equal atoms of each element on both sides.", "Common reaction types: combination, decomposition, displacement.", "The mole is the unit used to count particles in chemistry.", "Stoichiometry uses mole ratios from balanced equations to find quantities."],
      quiz: [
        { q: "A balanced chemical equation must have equal:", options: ["Number of molecules on each side", "Number of atoms of each element on each side", "Volume on each side", "Mass of reactants only"], correct: 1 },
        { q: "A reaction where two substances combine to form one product is called:", options: ["Decomposition", "Combination", "Displacement", "Neutralization"], correct: 1 },
        { q: "The mole is used in chemistry to count:", options: ["Only large objects", "Particles such as atoms or molecules", "Only liquids", "Temperature changes"], correct: 1 },
      ],
      euee: [{ q: "In the reaction 2H₂ + O₂ → 2H₂O, how many moles of H₂ react completely with 1 mole of O₂?", options: ["1", "2", "3", "4"], correct: 1 }],
    },
  },
  biology: {
    name: "Biology", glyph: "🧬",
    9: {
      unitTitles: ["Introduction to Biology", "Characteristics and Classification of Organisms", "Cells", "Reproduction", "Human Health, Nutrition, and Disease", "Ecology"],
      videoId: "17eNFdlgXaM",
      lecture: "Biology is the scientific study of life, covering everything from microscopic bacteria to complex ecosystems. This opening unit introduces what biology is, why it matters to Ethiopia's development in agriculture, health and conservation, and the basic tools and methods biologists use to investigate living things.",
      notes: ["Biology is the scientific study of living organisms.", "The scientific method: observe, question, hypothesize, test, conclude.", "Key branches include botany, zoology, microbiology, and ecology.", "Ethiopia is home to many endemic species studied by biologists."],
      quiz: [
        { q: "Biology is best defined as the study of:", options: ["Non-living matter", "Living organisms", "The stars and planets", "Rocks and minerals"], correct: 1 },
        { q: "The first step of the scientific method is usually to:", options: ["Draw a conclusion", "Observe and ask a question", "Publish results", "Run a controlled experiment"], correct: 1 },
        { q: "The branch of biology that studies plants is called:", options: ["Zoology", "Botany", "Microbiology", "Ecology"], correct: 1 },
      ],
      euee: [
        { q: "Which of the following best describes a hypothesis?", options: ["A proven law of nature", "A testable, tentative explanation", "A random guess with no basis", "A conclusion drawn after all data is collected"], correct: 1 },
        { q: "A species found only in one specific region, such as many in Ethiopia, is called:", options: ["Invasive", "Domestic", "Endemic", "Extinct"], correct: 2 },
      ],
    },
    10: {
      unitTitles: ["Sub-fields of Biology", "Plants", "Biochemical Molecules", "Cell Reproduction", "Human Biology", "Ecological Interaction"],
      videoId: "as9lqStjnUY",
      lecture: "As biological knowledge has grown, the field has branched into many specialized sub-disciplines. This unit distinguishes pure fields, like genetics and physiology, that build fundamental knowledge, from applied fields, like biotechnology and medicine, that use that knowledge to solve real-world problems.",
      notes: ["Pure biology builds fundamental knowledge (e.g. genetics, physiology).", "Applied biology solves practical problems (e.g. biotechnology, medicine).", "Genetics studies heredity and variation.", "Ecology studies interactions between organisms and environment."],
      quiz: [
        { q: "A field that focuses on solving practical, real-world problems is called:", options: ["A pure field", "An applied field", "A theoretical field", "None of these"], correct: 1 },
        { q: "Genetics is the study of:", options: ["Ecosystems", "Heredity and variation", "Plant classification", "Cell energy"], correct: 1 },
        { q: "Which of these is an applied field of biology?", options: ["Taxonomy", "Biotechnology", "Cytology", "Physiology"], correct: 1 },
      ],
      euee: [{ q: "Which sub-field of biology would a scientist developing disease-resistant crops most likely work in?", options: ["Paleontology", "Biotechnology", "Taxonomy", "Histology"], correct: 1 }],
    },
  },
  mathematics: {
    name: "Mathematics", glyph: "∑",
    9: {
      unitTitles: ["Further on Sets", "The Number System", "Solving Equations", "Solving Inequalities", "Introduction to Trigonometry", "Regular Polygons", "Congruency and Similarity", "Vectors in Two Dimensions", "Statistics and Probability"],
      videoId: "JGLimr0dPgQ",
      lecture: "This unit builds on set concepts from earlier grades, covering how to describe sets, perform operations like union and intersection, and apply set theory to solve problems — a foundation frequently tested on the EUEE.",
      notes: ["Union (A∪B): all elements in A or B.", "Intersection (A∩B): elements common to both A and B.", "Complement (A′): elements not in A, within the universal set.", "Sets can be described by listing elements or by a defining property."],
      quiz: [
        { q: "If A = {1,2,3} and B = {2,3,4}, what is A∩B?", options: ["{1}", "{2,3}", "{2,3,4}", "{1,2,3,4}"], correct: 1 },
        { q: "If A = {1,2,3} and B = {2,3,4}, what is A∪B?", options: ["{2,3}", "{1,2,3,4}", "{1}", "{4}"], correct: 1 },
        { q: "The complement of set A contains elements that are:", options: ["In A only", "In both A and the universal set", "Not in A but in the universal set", "In neither set"], correct: 2 },
      ],
      euee: [
        { q: "The number of subsets of a set with 4 elements is:", options: ["8", "12", "16", "32"], correct: 2 },
        { q: "If U = {1,2,3,4,5} and A = {1,2}, then A′ is:", options: ["{1,2}", "{3,4,5}", "{1,2,3,4,5}", "{ }"], correct: 1 },
      ],
    },
    10: {
      unitTitles: ["Relations and Functions", "Polynomial Functions", "Exponential and Logarithmic Functions", "Trigonometric Functions", "Circles", "Solid Figures", "Coordinate Geometry"],
      videoId: "myxlLLLymAA",
      lecture: "A relation pairs elements of one set with elements of another, while a function is a special relation where every input has exactly one output. This unit covers how to identify functions, find domain and range, and represent relations as ordered pairs, tables, or graphs.",
      notes: ["A relation is a set of ordered pairs.", "A function: every input (domain) maps to exactly one output (range).", "The vertical line test checks if a graph represents a function.", "Domain = set of inputs; Range = set of outputs."],
      quiz: [
        { q: "A function is a relation where:", options: ["Every output has one input", "Every input has exactly one output", "Inputs can repeat outputs freely", "None of the above"], correct: 1 },
        { q: "The set of all possible inputs of a function is called its:", options: ["Range", "Domain", "Codomain", "Set"], correct: 1 },
        { q: "Which test determines if a graph represents a function?", options: ["Horizontal line test", "Vertical line test", "Diagonal test", "Origin test"], correct: 1 },
      ],
      euee: [
        { q: "If f(x) = 2x + 3, what is f(4)?", options: ["7", "9", "11", "14"], correct: 2 },
        { q: "Which of the following relations is NOT a function?", options: ["{(1,2),(2,3),(3,4)}", "{(1,2),(1,3),(2,4)}", "{(0,0),(1,1),(2,2)}", "{(1,5),(2,5),(3,5)}"], correct: 1 },
      ],
    },
  },
};

const SUBJECT_ORDER = ["physics", "chemistry", "biology", "mathematics"];
const COMING_SOON = [
  { id: "english", name: "English", glyph: "✎" },
  { id: "sat", name: "SAT", glyph: "◎" },
];

const TABS = [
  { id: "lecture", label: "Video Lecture" },
  { id: "notes", label: "Short Notes" },
  { id: "quiz", label: "Quiz" },
  { id: "euee", label: "EUEE Questions" },
];

/* ---------------- Storage helpers ----------------
   Uses the browser's own localStorage, so progress and
   enrollment persist on this device across visits once
   the app is hosted on its own domain. When you add a real
   backend + login later, swap these for API calls so
   progress follows the student across devices. */

async function loadState() {
  let enrolled = false;
  let progress = {};
  try {
    enrolled = localStorage.getItem("ef_enrolled") === "true";
  } catch (_) {}
  try {
    const raw = localStorage.getItem("ef_progress");
    if (raw) progress = JSON.parse(raw);
  } catch (_) {}
  return { enrolled, progress };
}

async function saveEnrolled(val) {
  try {
    localStorage.setItem("ef_enrolled", val ? "true" : "false");
  } catch (_) {}
}

async function saveProgress(progress) {
  try {
    localStorage.setItem("ef_progress", JSON.stringify(progress));
  } catch (_) {}
}

/* ---------------- UI atoms ---------------- */

function Logo({ onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center ef-display font-bold text-base" style={{ background: "#F2B134", color: "#101B14" }}>
        E
      </div>
      <span className="ef-display font-semibold text-xl tracking-tight" style={{ color: "#F5F1E8" }}>
        E-First
      </span>
    </button>
  );
}

function Ring({ pct, size = 46 }) {
  const bg = `conic-gradient(#F2B134 ${pct * 3.6}deg, #E4DCC8 0deg)`;
  return (
    <div className="rounded-full flex items-center justify-center" style={{ width: size, height: size, background: bg }}>
      <div className="rounded-full flex items-center justify-center ef-body font-semibold text-xs" style={{ width: size - 10, height: size - 10, background: "#FFFFFF", color: "#101B14" }}>
        {pct}%
      </div>
    </div>
  );
}

function LockBadge() {
  return <span className="ef-body text-xs font-medium px-2 py-1 rounded-full inline-flex items-center gap-1" style={{ background: "#F3ECD8", color: "#E4572E" }}>🔒 Locked</span>;
}
function FreeBadge() {
  return <span className="ef-body text-xs font-medium px-2 py-1 rounded-full" style={{ background: "#0F5132", color: "#F5F1E8" }}>Free</span>;
}
function DoneBadge() {
  return <span className="ef-body text-xs font-medium px-2 py-1 rounded-full" style={{ background: "#F2B134", color: "#101B14" }}>✓ Done</span>;
}

/* ---------------- Quiz block ---------------- */

function QuizBlock({ questions, storeKey, progress, commitScore }) {
  const saved = progress[storeKey];
  const [picks, setPicks] = useState({});
  const [submitted, setSubmitted] = useState(!!saved);

  const pick = (qi, oi) => {
    if (submitted) return;
    setPicks((p) => ({ ...p, [qi]: oi }));
  };

  const score = questions.reduce((acc, q, qi) => acc + (picks[qi] === q.correct ? 1 : 0), 0);
  const allAnswered = questions.every((_, qi) => picks[qi] !== undefined);

  const submit = () => {
    setSubmitted(true);
    commitScore(storeKey, score, questions.length);
  };
  const retake = () => {
    setPicks({});
    setSubmitted(false);
  };

  const displayScore = saved && !Object.keys(picks).length ? saved.score : score;
  const displayTotal = saved && !Object.keys(picks).length ? saved.total : questions.length;

  return (
    <div className="space-y-5">
      {submitted && (
        <div className="ef-body rounded-xl px-4 py-3 font-medium" style={{ background: "#0F5132", color: "#F5F1E8" }}>
          Score: {displayScore} / {displayTotal}
        </div>
      )}
      {questions.map((q, qi) => {
        const picked = picks[qi] !== undefined ? picks[qi] : submitted ? -1 : undefined;
        return (
          <div key={qi} className="rounded-xl p-4" style={{ background: "#FFFFFF", border: "1px solid #E4DCC8" }}>
            <p className="ef-body font-semibold mb-3 text-sm" style={{ color: "#101B14" }}>{qi + 1}. {q.q}</p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                let style = { border: "1px solid #E4DCC8", color: "#101B14" };
                if (submitted) {
                  if (oi === q.correct) style = { border: "1px solid #0F5132", background: "#0F51321A", color: "#0F5132" };
                  else if (oi === picks[qi]) style = { border: "1px solid #E4572E", background: "#E4572E1A", color: "#E4572E" };
                } else if (oi === picks[qi]) {
                  style = { border: "1px solid #F2B134", background: "#F2B1341A", color: "#101B14" };
                }
                return (
                  <button key={oi} onClick={() => pick(qi, oi)} className="ef-body w-full text-left px-3 py-2 rounded-lg text-sm transition" style={style}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="flex gap-3">
        {!submitted ? (
          <button onClick={submit} disabled={!allAnswered} className="ef-body font-medium px-5 py-2 rounded-full text-sm disabled:opacity-40" style={{ background: "#F2B134", color: "#101B14" }}>
            Submit answers
          </button>
        ) : (
          <button onClick={retake} className="ef-body font-medium px-5 py-2 rounded-full text-sm" style={{ background: "#F3ECD8", color: "#101B14" }}>
            Retake
          </button>
        )}
      </div>
    </div>
  );
}

/* -------
