document.addEventListener("DOMContentLoaded", function () {
    const character = document.getElementById("character");
    const dialogBox = document.getElementById("dialog-box");
    const dialogText = document.getElementById("dialog-text");
    const typingSound = document.getElementById("typing-sound");
    let touchCount = 0;
    let typingEffect;

    // Biểu cảm và lời thoại
    const expressions = {
        "vui": { img: "images/vui.png", text: "Hihi! Hội chợ vui lắm!" },
        "buon": { img: "images/buon.png", text: "Thôi dừng lại nha..." },
        "ngaingung": { img: "images/ngaingung.png", text: "Ahh, dừng lại đi mà..." },
        "tucgian": { img: "images/tucgian.png", text: "Thôi đi nhé! Mình không vui đâu!" },
        "xuatay": { img: "images/xuatay.png", text: "STOPPPPPPP!" },
        "bonus": { img: "images/bonus.png", text: "Nếu thích chạm vào mình như thế, sao không ghé thăm gian hàng lớp 10B - THPT Nguyễn Văn Cừ đi!" }
    };

    // Xử lý click vào nhân vật
    character.addEventListener("click", function () {
        touchCount++;
        if (touchCount >= 30) {
            character.style.display = "none";
            showDialogue("bonus");
            return;
        }

        // Chọn biểu cảm theo số lần chạm
        let keys = Object.keys(expressions);
        let emotion = expressions[keys[touchCount % keys.length]];

        // Hiển thị biểu cảm và thoại
        character.src = emotion.img;
        showDialogue(emotion.text);

        // Reset biểu cảm sau 2s
        setTimeout(() => {
            character.src = "images/bth.png";
        }, 2000);
    });

    // Hiển thị lời thoại với hiệu ứng chữ chạy
    function showDialogue(text) {
        if (typingEffect) clearInterval(typingEffect);
        dialogText.textContent = "";
        dialogBox.classList.remove("hidden");
        typingSound.play();

        let index = 0;
        typingEffect = setInterval(() => {
            if (index < text.length) {
                dialogText.textContent += text[index++];
            } else {
                clearInterval(typingEffect);
                typingSound.pause();
                typingSound.currentTime = 0;
            }
        }, 50);

        setTimeout(() => {
            dialogBox.classList.add("hidden");
        }, 3000);
    }

    // Hiệu ứng loading rồi vào game
    setTimeout(() => {
        document.getElementById("loading-screen").style.opacity = 0;
        setTimeout(() => {
            document.getElementById("loading-screen").style.display = "none";
            document.getElementById("game-container").style.display = "block";
        }, 1000);
    }, 3000);
});
</script>
</body>
</html>