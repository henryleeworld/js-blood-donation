const humans_parent = document.getElementById("humans");
const bloodTypesRelation = {
    "O−": ["O−", "O+", "A−", "A+", "B−", "B+", "AB−", "AB+"],
    "O+": ["O+", "A+", "B+", "AB+"],
    "A−": ["A−", "A+", "AB−", "AB+"],
    "A+": ["A+", "AB+"],
    "B−": ["B−", "B+", "AB−", "AB+"],
    "B+": ["B+", "AB+"],
    "AB−": ["AB−", "AB+"],
    "AB+": ["AB+"]
};
const selector = document.getElementById("blood-selector");
const bloodVias = document.querySelectorAll("#humans .human .blood-via");
const bloodBag = document.querySelector("#blood-content > div.main_bag > div");
const centerVia = document.querySelector(".center-via > .blood-via");
const bloodTypes = document.querySelectorAll(".blood-type");
let lastCalled;
addListeners();

function callIfChildren(e) {
    if (lastCalled) change();
    if (e.target !== this) setRecipents(e);
}

function addListeners() {
    selector.addEventListener("click", callIfChildren);
}

function change() {
    lastCalled.target.classList.remove("highlight");

    for (let i = 0; i < bloodVias.length; i++) {
        bloodVias[i].style.width = "0px";
        bloodTypes[i].classList.remove("highlightText");
    }
}

function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function setRecipents(e) {
    e.target.classList.add("highlight");
    lastCalled = e;

    const donor = e.target.innerText;
    for (let item of bloodTypesRelation[donor]) {
        const recipent_index = Object.keys(bloodTypesRelation).indexOf(item);
        const height = 50 + 50 * Math.floor(recipent_index / 2);
        const blood_height = 125 - 25 * Math.floor(recipent_index / 2);
        bloodBag.style.height = `${blood_height}px`;
        centerVia.style.height = `${height}px`;

        await timeout(100);
        bloodVias[recipent_index].style.width = "100%";
        bloodTypes[recipent_index].classList.add("highlightText");
    }
}