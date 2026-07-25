// ======================================================
// Birthday Website - Script
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("🎉 Birthday Website Loaded Successfully! 💖");

    // ==========================================
    // Fade In Animation
    // ==========================================

    const fadeElements = document.querySelectorAll(
        ".welcome-card, .letter-card, .memory, .photo-card, .quiz-card, .final-card"
    );

    if (fadeElements.length) {

        const observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("loaded");
                }

            });

        }, {
            threshold: 0.2
        });

        fadeElements.forEach(el => observer.observe(el));
    }


    // ==========================================
    // Gallery Popup
    // ==========================================

    const galleryImages = document.querySelectorAll(".photo-card img");

    if (galleryImages.length) {

        const popup = document.createElement("div");
        popup.className = "popup";
        popup.innerHTML = `<img src="">`;

        document.body.appendChild(popup);

        const popupImg = popup.querySelector("img");

        galleryImages.forEach(img => {

            img.addEventListener("click", () => {

                popup.style.display = "flex";
                popupImg.src = img.src;

            });

        });

        popup.addEventListener("click", () => {

            popup.style.display = "none";

        });

    }


    // ==========================================
    // Quiz
    // ==========================================

    document.querySelectorAll(".quiz-btn").forEach(btn => {

        btn.addEventListener("click", () => {

            const parent = btn.parentElement;

            parent.querySelectorAll(".quiz-btn").forEach(button => {

                button.disabled = true;

            });

            if (btn.classList.contains("correct")) {

                btn.innerHTML = "✔ Correct ❤️";
                btn.style.background = "#7dd87d";

            } else {

                btn.innerHTML = "✖ Oops 😂";
                btn.style.background = "#ff7b9c";

            }

        });

    });


    // ==========================================
    // Music
    // ==========================================
// ==========================================
// Background Music
// ==========================================

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

if (bgMusic && musicBtn) {

    bgMusic.volume = 0.4;

    // Restore previous position
    const savedTime = sessionStorage.getItem("musicTime");

    if(savedTime){

        bgMusic.currentTime = parseFloat(savedTime);

    }

    // Restore play/pause state
    const isPlaying = sessionStorage.getItem("musicPlaying");

    if(isPlaying !== "false"){

        bgMusic.play().catch(()=>{});

        musicBtn.innerHTML =
        '<i class="fa-solid fa-volume-high"></i>';

    }

    else{

        musicBtn.innerHTML =
        '<i class="fa-solid fa-volume-xmark"></i>';

    }

    // Save current position every second
    setInterval(()=>{

        sessionStorage.setItem(
            "musicTime",
            bgMusic.currentTime
        );

    },1000);

    // Toggle play/pause
    musicBtn.addEventListener("click",()=>{

        if(bgMusic.paused){

            bgMusic.play();

            sessionStorage.setItem("musicPlaying","true");

            musicBtn.innerHTML =
            '<i class="fa-solid fa-volume-high"></i>';

        }

        else{

            bgMusic.pause();

            sessionStorage.setItem("musicPlaying","false");

            musicBtn.innerHTML =
            '<i class="fa-solid fa-volume-xmark"></i>';

        }

    });

}


    // ==========================================
    // Surprise Gift
    // ==========================================

    const giftBox = document.querySelector(".surprise-box");
    const giftMessage = document.querySelector(".gift-message");

    if (giftBox && giftMessage) {

        giftBox.addEventListener("click", () => {

            giftBox.style.display = "none";

            giftMessage.style.display = "block";

            confetti();

            if (bgMusic) {

                bgMusic.volume = 0;

                bgMusic.play().catch(() => {});

                let fade = 0;

                const fadeMusic = setInterval(() => {

                    fade += 0.05;

                    bgMusic.volume = Math.min(fade, 1);

                    if (fade >= 1) {

                        clearInterval(fadeMusic);

                    }

                }, 150);

            }

        });

    }


    // ==========================================
    // Typewriter
    // ==========================================

    const typing = document.querySelector(".typing");

    if (typing) {

        const text = typing.innerHTML;

        typing.innerHTML = "";

        let i = 0;

        function write() {

            if (i < text.length) {

                typing.innerHTML += text.charAt(i);

                i++;

                setTimeout(write, 35);

            }

        }

        write();

    }


    // ==========================================
    // Scroll To Top
    // ==========================================

    const topBtn = document.querySelector(".top-btn");

    if (topBtn) {

        window.addEventListener("scroll", () => {

            topBtn.classList.toggle("show", window.scrollY > 300);

        });

        topBtn.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

});


// ==========================================
// Confetti
// ==========================================

function confetti() {

    const emojis = ["🎉", "🎊", "✨", "💖"];

    for (let i = 0; i < 80; i++) {

        const piece = document.createElement("div");

        piece.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

        piece.style.position = "fixed";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.top = "-20px";
        piece.style.fontSize = (18 + Math.random() * 15) + "px";
        piece.style.pointerEvents = "none";
        piece.style.zIndex = "9999";
        piece.style.transition = "transform 3s linear, opacity 3s";

        document.body.appendChild(piece);

        setTimeout(() => {

            piece.style.transform =
                `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`;

            piece.style.opacity = "0";

        }, 50);

        setTimeout(() => {

            piece.remove();

        }, 3000);

    }

}


// ==========================================
// Heart Cursor
// ==========================================

document.addEventListener("mousemove", (e) => {

    const heart = document.createElement("span");

    heart.className = "cursor-heart";

    heart.innerHTML = "❤";

    heart.style.left = e.pageX + "px";

    heart.style.top = e.pageY + "px";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 1000);

});