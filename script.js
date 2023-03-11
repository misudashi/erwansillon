const changingTextEn = document.getElementById("changing-text-en");
const changingTextFr = document.getElementById("changing-text-fr");

const suffixesEn = ["Resoluteness", "Self-Confidence", "Humility", "Stoicism", "Drive", "Confidence"];
const suffixesFr = ["Détermination", "Confiance en soi", "Humilité", "Stoïcisme", "Impulsion", "Confiance"];

let i = 0;

function typeWriter(text, i, fnCallback) {
  if (i < (text.length)) {
    document.getElementById("changing-text").innerHTML = text.substring(0, i+1) +'<span id="cursor"></span>';
    setTimeout(function() {
      typeWriter(text, i + 1, fnCallback)
    }, 100);
  } else if (typeof fnCallback == 'function') {
    setTimeout(fnCallback, 700);
  }
}

function untypeWriter(text, i, fnCallback) {
  if (i > 0) {
    document.getElementById("changing-text").innerHTML = text.substring(0, i) +'<span id="cursor"></span>';
    setTimeout(function() {
      untypeWriter(text, i - 1, fnCallback)
    }, 50);
  } else if (typeof fnCallback == 'function') {
    setTimeout(fnCallback, 700);
  }
}

function animateTyping() {
  setTimeout(function() {
    changingTextEn.style.display = "inline-block";
    changingTextFr.style.display = "inline-block";
  }, 1000);

  let textEn = suffixesEn[i];
  let textFr = suffixesFr[i];
  i++;
  if (i == suffixesEn.length) {
    i = 0;
  }

  let lang = document.documentElement.lang;
  if (lang === 'fr') {
    changingTextEn.style.display = "none";
    changingTextFr.style.display = "block";
    typeWriter(textFr, 0, function(){
      setTimeout(untypeWriter, 1500, textFr, textFr.length, animateTyping);
    });
  } else {
    changingTextFr.style.display = "none";
    changingTextEn.style.display = "block";
    typeWriter(textEn, 0, function(){
      setTimeout(untypeWriter, 1500, textEn, textEn.length, animateTyping);
    });
  }
}

animateTyping();
