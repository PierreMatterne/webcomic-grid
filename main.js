"use strict";

// les chemins autorisés :
// UP, RIGHT, DOWN, LEFT
// 1 = passage, 0 = bloquage
let paths = [
[[0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 1, 0]],
[[0, 1, 1, 0], [1, 0, 0, 1], [0, 0, 1, 0], [0, 1, 0, 0], [0, 0, 1, 0]],
[[0, 0, 1, 0], [0, 0, 1, 1], [0, 1, 1, 1], [0, 1, 1, 0], [0, 0, 1, 0]],
[[0, 0, 1, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 1, 0]],
[[0, 1, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]
];


// let temp = paths[posTop][posLeft][0]; 


function initCss(size) {
  let comic = document.getElementById("comic");
  comic.style.width = size * 3 + "px";
  comic.style.height = size * 3 + "px";

  let panels = document.getElementsByClassName("panel");
  for (let i = 0; i < panels.length; i++) {
    panels[i].style.width = size + "px";
    panels[i].style.height = size + "px";
  }

  let grille = document.getElementById("grille");
  grille.style.marginTop = size + "px";
  grille.style.marginLeft = size + "px";

  let pngmask = document.getElementById("pngmask");
  pngmask.style.width = size * 3 + "px";
  pngmask.style.height = size * 3 + "px";

  let arrows = document.getElementById("arrows");
  arrows.style.width = size + "px";
  arrows.style.height = size + "px";

  let buttons = document.getElementsByClassName("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.width = size + "px";
    buttons[i].style.height = size + "px";
  }
}

function activePanels(posTop, posLeft) {
  // position actuelle = posLeft, posTop
  let coordX = "x" + posLeft;
  let coordY = "y" + posTop;
  // on récupère l'élément actif par sa classe
  let elems = document.getElementsByClassName(coordX + " " + coordY);
  // et il reçoit la classe 'available, qui le rend visible'
  elems[0].classList.add("available");

  // les cases connexes sont traitées de la même façon si elles sont accessibles
  for (let i = 0; i < paths[posTop][posLeft].length; i++) {
    let giveAccessTo;
    if (paths[posTop][posLeft][i] === 1) {
      switch (i) {
        case 0:
        giveAccessTo = document.getElementsByClassName("x" + posLeft + " " + "y" + (posTop - 1));
        giveAccessTo[0].classList.add("available");
        break;
        case 1:
        giveAccessTo = document.getElementsByClassName("x" + (posLeft + 1) + " " + "y" + posTop);
        giveAccessTo[0].classList.add("available");
        break;
        case 2:
        giveAccessTo = document.getElementsByClassName("x" + posLeft + " " + "y" + (posTop + 1));
        giveAccessTo[0].classList.add("available");
        break;
        case 3:
        giveAccessTo = document.getElementsByClassName("x" + (posLeft - 1) + " " + "y" + posTop);
        giveAccessTo[0].classList.add("available");
        break;
      }
    }
  }
}

function activeArrows(posTop, posLeft) {
  // arrows est un array [0,0,1,1] qui indique quelles flcèhes activer.
  // ce sont... les mêmes que dans le tableau ci-dessus !!!!!
  let arrows = paths[posTop][posLeft];
  let arrow = document.getElementsByClassName("arrow");
  for (let i = 0; i < arrows.length; i++) {
    if (arrows[i] === 1) {
      switch (i) {
        case 0:
        arrow[0].classList.add("active");
        break;
        case 1:
        arrow[1].classList.add("active");
        break;
        case 2:
        arrow[2].classList.add("active");
        break;
        case 3:
        arrow[3].classList.add("active");
        break;
      }
    }
  }
}

function hideAllPanels() {
  let panels = document.getElementsByClassName("panel");
  for (let i = 0; i < panels.length; i++) {
    panels[i].classList.remove("available");
  }
}

function hideArrows() {
  let arrows = document.getElementsByClassName("arrow");
  for (let i = 0; i < arrows.length; i++) {
    arrows[i].classList.remove("active");
  }
}

function move(dir) {
  hideAllPanels();
  hideArrows();

  let grille = document.getElementById("grille");

  switch (dir) {

    case "down":
    if (posTop < 4 && posTop >= 0 && paths[posTop][posLeft][2] == 1) {
      posTop += 1;
      grille.style.top = -1 * posTop * panelSize + "px";
    }
    break;

    case "up":
    if (posTop > 0 && posTop <= 4 && paths[posTop][posLeft][0] == 1) {
      posTop -= 1;
      grille.style.top = -1 * posTop * panelSize + "px";
    }
    break;

    case "right":
    if (posLeft < 4 && posLeft >= 0 && paths[posTop][posLeft][1] == 1) {
      posLeft += 1;
      grille.style.left = -1 * posLeft * panelSize + "px";
    }
    break;

    case "left":
    if (posLeft > 0 && posLeft <= 4 && paths[posTop][posLeft][3] == 1) {
      posLeft -= 1;
      grille.style.left = -1 * posLeft * panelSize + "px";
    }
    break;

  }

  activePanels(posTop, posLeft);
  activeArrows(posTop, posLeft);
}

function keyMove(e) {
  switch (e.keyCode) {
    case 37:
    move("left");
    break;
    case 38:
    move("up");
    break;
    case 39:
    move("right");
    break;
    case 40:
    move("down");
    break;
  }
}

function reset() {
  posTop = initPosTop;
  posLeft = initPosLeft;
  // il faut encore repositionner le comic.
  let grille = document.getElementById("grille");
  grille.style.top = -1 * posTop * panelSize + "px";
  grille.style.left = -1 * posLeft * panelSize + "px";

  initCss(panelSize);
  activePanels(posLeft, posTop);
  activeArrows(posLeft, posTop);
}

// ============================
// STARTING POINT
// ============================
console.clear();
let posTop = initPosTop;
let posLeft = initPosLeft;
initCss(panelSize);
activePanels(posLeft, posTop);
activeArrows(posLeft, posTop);

window.addEventListener('keydown', keyMove);