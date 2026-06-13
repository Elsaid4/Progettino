document.getElementById("noBtn").addEventListener("click", noBtnClicked);
document.getElementById("yesBtn").addEventListener("click", yesBtnClicked);

function yesBtnClicked() {
    document.getElementById("audioPlayer").pause();
    document.getElementById("yeyAudioPlayer").play();
    createFireworksEffect();
}

function createFireworksEffect() {
    const canvas = document.createElement("canvas");
    canvas.className = "fireworks-canvas";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = [];
    let frame = 0;

    const createBurst = (x, y) => {
        const hue = Math.floor(Math.random() * 360);
        const count = 100 + Math.floor(Math.random() * 100);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 4;
            particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                life: 60 + Math.random() * 30,
                color: `hsl(${hue}, 100%, ${50 + Math.random() * 20}%)`
            });
        }
    };

    var texts = ["♡〜٩( ˃ ＳＩＩＩＩＩ ˂ )۶〜♡", "꧁・┆✦ʚ 𝚂𝙸𝙸𝙸𝙸𝙸 ɞ✦ ┆・꧂", "♡( ˘ ³˘)♥︎ 𝓢𝓘𝓘𝓘𝓘𝓘 ♡( ˘ ³˘)♥︎", "(=♡  𝚂𝙸𝙸𝙸𝙸𝙸 ♡=)", "(๑•᎑•๑) ＳＩＩＩＩＩ (๑•᎑•๑)"];
    var randomText = texts[Math.floor(Math.random() * texts.length)];

    const animate = () => {
        ctx.fillStyle = "#00000040";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // add text
        ctx.fillStyle = "white";
        ctx.font = "100px Arial";
        ctx.textAlign = "center";
        
        ctx.fillText(randomText, canvas.width / 2, canvas.height / 2);

        if (frame % 15 === 0) {
            createBurst(
                Math.random() * canvas.width,
                Math.random() * canvas.height * 0.5 + 50
            );
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.04;
            p.alpha -= 1 / p.life;

            if (p.alpha <= 0) {
                particles.splice(i, 1);
                continue;
            }

            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, (1 + Math.random() * 2.5) , 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.globalAlpha = 1;
        frame += 1;

        if (frame < 90 || particles.length > 0) {
            requestAnimationFrame(animate);
        } else {
            cleanup();
        }
    };

    const cleanup = () => {
        window.removeEventListener("resize", resize);
        if (canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
        }
        document.getElementById("yeyAudioPlayer").pause();
        document.getElementById("audioPlayer").play();
    };

    requestAnimationFrame(animate);
    setTimeout(cleanup, 10000);
}

function noBtnClicked() {
    document.getElementById("noAudioPlayer").play();
    var noBtn = document.getElementById("noBtn");
    var windowWidth = 500;
    var windowHeight = 500;
    var btnWidth = noBtn.offsetWidth;
    var btnHeight = noBtn.offsetHeight;
    var randomX = Math.floor(Math.random() * (windowWidth - btnWidth));
    var randomY = Math.floor(Math.random() * (windowHeight - btnHeight));
    var noBtnPosition = noBtn.getBoundingClientRect();
    if (randomX < noBtnPosition.left + btnWidth && randomX + btnWidth > noBtnPosition.left && randomY < noBtnPosition.top + btnHeight && randomY + btnHeight > noBtnPosition.top) {
        noBtnClicked();
        return;
    }

    noBtn.style.transition = "left 0.5s, top 0.5s";
    noBtn.style.position = "absolute";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}

document.getElementById("noBtn").addEventListener("mouseover", () => changeImg("cry"));
document.getElementById("noBtn").addEventListener("mouseout",  () => changeImg("shy"));

document.getElementById("yesBtn").addEventListener("mouseover", () => changeImg("happy"));
document.getElementById("yesBtn").addEventListener("mouseout", () => changeImg("shy"));


window.onload = function() {
    changeImg("shy");
    document.getElementById("audioPlayer").play();
};

// on first click unmute audioplayer
document.addEventListener("click", function() {
    var audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.play();
});


function changeImg(type) {
    console.log("Changing images to type: " + type);
    var randomNum1 = Math.floor(Math.random() * 7) + 1;
    var randomNum2;
    do{
        randomNum2 = Math.floor(Math.random() * 7) + 1;
    }while(randomNum1 == randomNum2);

    document.getElementById("img1").src = "Images/" + type + randomNum1 + ".gif";
    document.getElementById("img2").src = "Images/" + type + randomNum2 + ".gif";
}


