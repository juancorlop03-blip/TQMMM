var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos con texto, inicio y fin (en segundos)
var lyricsData = [
  { text: "Apocalypse", start: 14, end: 32 },
  { text: "You leapt from crumbling bridges\n \nWatching cityscapes turn to dust", start: 34, end: 40 },
  { text: "Filming helicopters crashing in the ocean\n\nFrom way above", start: 43.5, end: 51 },
  { text: "Got the music in you, baby, tell me why", start: 54.5, end: 58.5 },
  { text: "Got the music in you, baby, tell me why", start: 60, end: 64 },
  { text: "You've been locked in here forever\n\nAnd you just can't say goodbye", start: 65, end: 71 },
  { text: "Kisses on the foreheads of the lovers\n\nWrapped in your arms", start: 75.5, end: 82 },
  { text: "You've been hiding them in hollowed out pianos\n\nLeft in the dark", start: 85, end: 93 },
  { text: "Got the music in you, baby, tell me why", start: 96, end: 100 },
  { text: "Got the music in you, baby, tell me why", start: 101, end: 105 },
  { text: "You've been locked in here forever\n\nAnd you just can't say goodbye", start: 106, end: 112 },
  { text: "Your lips, my lips", start: 117.5, end: 119 },
  { text: "Apocalypse", start: 120, end: 123.5 },
  { text: "Your lips, my lips", start: 128, end: 129.5 },
  { text: "Apocalypse", start: 130, end: 133 },
  { text: "Go and sneak us through the rivers\nFlood is rising up on your knees", start: 136.5, end: 143 },
  { text: "Oh, please", start: 143.8, end: 146 },
  { text: "Come out and haunt me\n\nI know you want me", start: 147.5, end: 151.5 },
  { text: "Come out and haunt me", start: 153, end: 156 },
  { text: "Sharing all your secrets with each other\n\nSince you were kids", start: 157.5, end: 163 },
  { text: "Sleeping soundly with the locket that she gave you\n\nClutched in your fist", start: 166.5, end: 173 },
  { text: "Got the music in you, baby, tell me why", start: 176.5, end: 181 },
  { text: "Got the music in you, baby, tell me why", start: 182, end: 186 },
  { text: "You've been locked in here forever\n\nAnd you just can't say goodbye", start: 187, end: 193 },
  { text: "You've been locked in here forever\n\nAnd you just can't say goodbye", start: 207, end: 213 },
  { text: "Ooh oh oh", start: 236, end: 238 },
  { text: "When you're all alone", start: 240, end: 243.5 },
  { text: "I will reach for you", start: 245, end: 247.6 },
  { text: "When you're feeling low", start: 250, end: 253 },
  { text: "I will be there too", start: 255, end: 259 },
  { text: "MUUUUACK ♡", start: 261, end: 266 },
];

var activeSpans = []; // Para manejar las líneas activas

function showLine(line) {
  var duration = line.end - line.start;
  var fadeDuration = Math.min(0.8, duration / 4);
  var visibleDuration = duration - 2 * fadeDuration;

  // Dividir el texto por saltos de línea
  var lines = line.text.split("\n");

  lines.forEach((text) => {
    var span = document.createElement("span");
    span.textContent = text;
    span.style.opacity = 0;
    span.style.display = "block";
    span.style.transform = "translateY(-20px)";
    span.style.transition = `opacity ${fadeDuration}s ease, transform ${fadeDuration}s ease`;
    lyrics.appendChild(span);

    // Guardar el span activo
    activeSpans.push({ span, fadeDuration });

    // Fade-in
    setTimeout(() => {
      span.style.opacity = 1;
      span.style.transform = "translateY(0)";
    }, 50);

    // Programar fade-out y desplazamiento hacia abajo al final de la duración
    setTimeout(() => {
      span.style.opacity = 0;
      span.style.transform = "translateY(20px)";
      setTimeout(() => {
        lyrics.removeChild(span);
        // Quitar del array de activos
        activeSpans = activeSpans.filter((s) => s.span !== span);
      }, fadeDuration * 1000);
    }, (fadeDuration + visibleDuration) * 1000);
  });
}

function updateLyrics() {
  var time = audio.currentTime;

  // Mostrar la siguiente línea que aún no se mostró
  for (var i = 0; i < lyricsData.length; i++) {
    var line = lyricsData[i];
    if (time >= line.start && time < line.end && !activeSpans.some(s => s.span.textContent.includes(line.text.split("\n")[0]))) {
      showLine(line);
    }
  }
}

setInterval(updateLyrics, 50);