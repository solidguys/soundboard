const buttons   = document.getElementById("buttons");
const audio     = document.getElementById("audio");
const fragment  = document.createDocumentFragment();
const colors    = {
    "Chuck": "#0f5daf",
    "Eladio": "#4c4091",
    "Gus": "#65960f",
    "Hector": "#fa9e2b",
    "Lalo": "#439ed2",
    "Mike": "#f00"
    
};
let activeSound = null;
let timer       = 0;
let clicked     = false;

sounds.forEach(function (sound) {
    const item = createItem(sound[0], sound[1]);
    fragment.appendChild(item);
});

buttons.appendChild(fragment);

function createItem(sound, person) {
    const item             = createElement("div", { className: "item" });
    const buttonWrapper    = createElement("div", { className: "button" });
    const buttonBackground = createElement("div", { className: "button-background" });
    const button           = document.createElement("button");
    const label            = createElement("div", {
        className: "label",
        innerText: sound
    });
    const fileName         = getFilename(sound);
    buttonBackground.style.backgroundColor = colors[person];
    button.addEventListener("click", function () {
        if (clicked) {
            clearTimeout(timer);
            downloadSound(fileName);
            clicked = false;
        } else {
            clicked = true;
            timer = setTimeout(function () {
                playSound(fileName);
                clicked = false;
            }, 200);
        }
    });
    appendChildren(buttonWrapper, buttonBackground, button);
    appendChildren(item, buttonWrapper, label);
    return item;
}

function createElement(tagName, attributes) {
    const element = document.createElement(tagName);
    for (const attribute in attributes) {
        if (attributes.hasOwnProperty(attribute)) {
            element[attribute] = attributes[attribute];
        }
    }
    return element;
}

function appendChildren(parent, ...children) {
    children.forEach(function (child) {
        parent.appendChild(child);
    });
}

function getFilename(sound) {
    return sound.toLowerCase().replace(/[?!']/g, "").replace(/ /g, "-");
}

function playSound(sound) {
    if (activeSound) {
        activeSound.pause();
        activeSound.currentTime = 0;
    }

    audio.src = `sounds/${sound}.mp3`;
    audio.play();
    activeSound = audio;
}

function downloadSound(sound) {
    const dl         = document.createElement("a");
    dl.href          = `sounds/${sound}.mp3`;
    dl.download      = `${sound}.mp3`;
    dl.style.display = "none";
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
}