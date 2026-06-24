function createFireworksEffect() {
    const canvas = document.createElement("canvas");
    canvas.className = "fireworks-canvas";
    document.body.appendChild(canvas);

    var windowWidth = Math.min(window.innerWidth, 500);
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
        ctx.font = "70px Arial";
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
    // send user to yay.html
    setTimeout(() => {
        window.location.href = "yey.html";
    }, 10000);

}

document.getElementById("noBtn").addEventListener("click", noBtnClicked);
document.getElementById("yesBtn").addEventListener("click", yesBtnClicked);

function yesBtnClicked() {
    try { document.getElementById("yeyAudioPlayer").play(); } catch (e) {}
    createFireworksEffect();
}

var counterNo = 0;
var maxNo = 5;

function noBtnClicked() {
    counterNo++;
    var noBtn = document.getElementById("noBtn");
    if (counterNo >= maxNo) {
        explode();
        return;
    }

    var intensity = counterNo / maxNo; 

    var r = Math.floor(220 - (120 * intensity));
    var g = Math.floor(53 - (53 * intensity));
    var b = Math.floor(69 - (69 * intensity));
    
    var scale = 1 + (0.4 * intensity);
    
    var shadowBlur = intensity * 25;

    noBtn.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    noBtn.style.borderColor = `rgb(${r - 20}, 0, 0)`;
    noBtn.style.transform = `scale(${scale})`;
    noBtn.style.boxShadow = `0 0 ${shadowBlur}px rgba(255, 0, 0, ${intensity})`;


    document.getElementById("noAudioPlayer").play();
    
    var windowWidth = Math.min(window.innerWidth, 500);
    if (window.innerWidth < 600) {
        windowWidth = window.innerWidth - 20;
    }
    var windowHeight = Math.min(window.innerHeight, 500);
    var btnWidth = noBtn.offsetWidth;
    var btnHeight = noBtn.offsetHeight;
    var randomX = Math.floor(Math.random() * Math.max(1, windowWidth - btnWidth));
    var randomY = Math.floor(Math.random() * Math.max(1, windowHeight - btnHeight));
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

function explode() {
    var card = document.querySelector(".card");
    var noBtn = document.getElementById("noBtn");

    // palette colori e numero di particelle
    // var colors = ["#ff6b6b", "#ffcd69", "#ffd56b", "#7be495", "#7ad7ff", "#d07bff"];
    var colors = ["#ff0000", "#ffaa00", "#ffb700", "#e20606", "#ff7a7a", "#790000"];
    var count = 100;

    var cardRect = card.getBoundingClientRect();
    var btnRect = noBtn.getBoundingClientRect();
    var originX = btnRect.left + btnRect.width / 2 - cardRect.left;
    var originY = btnRect.top + btnRect.height / 2 - cardRect.top;

    for (var i = 0; i < count; i++) {
        var fragment = document.createElement("div");
        fragment.classList.add("no-btn-fragment");

        var size = 6 + Math.random() * 14;
        fragment.style.width = size + "px";
        fragment.style.height = size + "px";

        // posiziona all'origine (centro del pulsante) relativa alla card
        fragment.style.left = (originX - size / 2) + "px";
        fragment.style.top = (originY - size / 2) + "px";

        // calcola destinazione usando angolo e distanza random
        var angle = Math.random() * Math.PI * 2;
        var distance = 80 + Math.random() * 240;
        var tx = Math.cos(angle) * distance;
        var ty = Math.sin(angle) * distance * (0.7 + Math.random() * 0.6);
        var rot = (Math.random() * 720 - 360) + "deg";
        var scale = 0.6 + Math.random() * 1.6;

        fragment.style.setProperty('--tx', tx + 'px');
        fragment.style.setProperty('--ty', ty + 'px');
        fragment.style.setProperty('--rot', rot);
        fragment.style.setProperty('--scale', scale);
        fragment.style.setProperty('--bg', colors[Math.floor(Math.random() * colors.length)]);

        fragment.style.animationDelay = (Math.random() * 200) + 'ms';

        // alcune particelle saranno "spark" più rotonde
        if (Math.random() < 0.25) fragment.classList.add('spark');

        card.appendChild(fragment);

        // rimuovi al termine dell'animazione
        fragment.addEventListener('animationend', function () { this.remove(); });
    }

    // piccolo effetto shake sulla card
    if (card.animate) {
        card.animate([
            { transform: 'translateY(0)' },
            { transform: 'translateY(-8px)' },
            { transform: 'translateY(0)' }
        ], { duration: 360, easing: 'cubic-bezier(.2,.8,.2,1)' });
    }

    try { document.getElementById("explosionAudioPlayer").play(); } catch (e) {}

    noBtn.style.display = "none"; // nascondi il pulsante NO dopo l'esplosione
}

document.getElementById("noBtn").addEventListener("mouseover", () => changeImg("cry"));
document.getElementById("noBtn").addEventListener("mouseout",  () => changeImg("shy"));

document.getElementById("yesBtn").addEventListener("mouseover", () => changeImg("happy"));
document.getElementById("yesBtn").addEventListener("mouseout", () => changeImg("shy"));


window.onload = function() {
    changeImg("shy");
};

// on first click unmute audioplayer
document.addEventListener("click", function() {
    try { document.getElementById("audioPlayer").play(); } catch (e) {}
    audioPlayer.play();
});


function changeImg(type) {
    var randomNum1 = Math.floor(Math.random() * 7) + 1;
    var randomNum2;
    do{
        randomNum2 = Math.floor(Math.random() * 7) + 1;
    }while(randomNum1 == randomNum2);

    document.getElementById("img1").src = "Images/" + type + randomNum1 + ".gif";
    document.getElementById("img2").src = "Images/" + type + randomNum2 + ".gif";
}


