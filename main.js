const buttons = document.getElementById("buttons");
const audio = document.getElementById("audio");
let activeSound = null;
let timer = 0;
let clicked = false;

sounds.forEach(function (sound) {
    let button = document.createElement("button");
    let fileName = getFilename(sound);
    button.innerText = sound;
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
    buttons.appendChild(button);
});

function getFilename(sound) {
    return sound.toLowerCase().replace(/[?!]/g, "").replace(/ /g, "-");
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
    const dl = document.createElement("a");
    dl.href = `sounds/${sound}.mp3`;
    dl.download = `${sound}.mp3`;
    dl.style.display = "none";
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
}