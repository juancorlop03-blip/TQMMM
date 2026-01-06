const words = document.querySelectorAll(".word");
const button = document.querySelector(".btn-animado");

const letterDelay = 0.4;
const wordPause = 1.0;
const cyclePause = 4000;

function startAnimation() {
    let globalDelay = 0;

    words.forEach(word => {
        const text = word.dataset.text;
        word.innerHTML = "";

        [...text].forEach((letter, index) => {
            const span = document.createElement("span");
            span.textContent = letter;

            // Corazones: glow rojo + latido
            if (letter === "♡") {
                span.classList.add("heart");
                span.style.setProperty("--glow-color", "#ff4d6d");
            }

            span.style.animationDelay =
                `${globalDelay + index * letterDelay}s`;

            word.appendChild(span);
        });

        globalDelay += text.length * letterDelay + wordPause;
    });

    // Mostrar y parpadear el botón al terminar el ciclo
    setTimeout(() => {
        button.style.opacity = 1;      // hace visible el botón
        button.classList.add("blink"); // parpadeo inicial

        setTimeout(() => {
            button.classList.remove("blink"); // quita la animación
        }, 3000);
    }, globalDelay * 1000);

    setTimeout(startAnimation, globalDelay * 1000 + cyclePause);
}

button.addEventListener("click", () => {
    window.location.href = "floresita.html";
});

startAnimation();