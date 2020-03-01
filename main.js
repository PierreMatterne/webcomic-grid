"use strict";


/** 
* Create the link to all the "ynxn.png" images
* @param {String} path - the path to the file
* @param {number} numX - the number of columns (X axis)
* @param {number} numY - the number of rows (Y axis)
*/
function composeHtmlGrid(path, numX, numY){
  let html = "";
  for (let j = 0; j< numX; j++){
    for (let i = 0; i< numY; i++){

      html += '<div class="panel x' + i + ' y' + j + '" style="background-image: url(' + path + '/y' + j + 'x' + i + '.png); background-size:cover;"></div>';
    }
  }
  return html;
}




/**
* Inject content into a DOM ID target
* @param {String} html - the content to add
* @param {String} target - the id of the target
*/
function injectPanels(html, target){
  document.getElementById(target).innerHTML = html;
}




/**
* Adapt all style to the size of the panels.
*/
function initCss(size) {
  let comic = document.getElementById("comic");
  comic.style.width = size * 3 + "px";
  comic.style.height = size * 3 + "px";

  // add a style in the DOM
  document.getElementById('style').innerHTML = '.panel {width:'+size+'px; height:'+size+'px;}';

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




/** 
* Active a certain panel, show the next available paths 
*/
function activePanels(posTop, posLeft) {
  // position actuelle = posLeft, posTop
  let coordX = "x" + posLeft;
  let coordY = "y" + posTop;
  // on récupère l'élément actif par sa classe
  let elems = document.getElementsByClassName(coordX + " " + coordY);
  // et il reçoit la classe 'available, qui le rend visible'
  elems[0].classList.add("available");

  // les cases connexes sont traitées de la même façon si elles sont accessibles
  for (let i = 0; i < possiblePaths[posTop][posLeft].length; i++) {
    let giveAccessTo;
    if (possiblePaths[posTop][posLeft][i] === 1) {
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




/**
* Display arrows when needed
*/
function activeArrows(posTop, posLeft) {
  // get the possible path from the config
  let arrows = possiblePaths[posTop][posLeft];
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




/** 
* Hide all the panels to show only thoses who are necessary
*/
function hideAllPanels() {
  let panels = document.getElementsByClassName("panel");
  for (let i = 0; i < panels.length; i++) {
    panels[i].classList.remove("available");
  }
}




/** 
* Hide all the arrows to show only thoses who are necessary
*/
function hideArrows() {
  let arrows = document.getElementsByClassName("arrow");
  for (let i = 0; i < arrows.length; i++) {
    arrows[i].classList.remove("active");
  }
}





/** 
* Move inside the grid in a given direction
* @param {String} dir - the direction to follow ("down", "up", "left", "right")
*/
function move(dir) {
  hideAllPanels();
  hideArrows();

  let grille = document.getElementById("grille");

  switch (dir) {

    case "down":
    if (posTop < 4 && posTop >= 0 && possiblePaths[posTop][posLeft][2] == 1) {
      posTop += 1;
      grille.style.top = -1 * posTop * panelSize + "px";
    }
    break;

    case "up":
    if (posTop > 0 && posTop <= 4 && possiblePaths[posTop][posLeft][0] == 1) {
      posTop -= 1;
      grille.style.top = -1 * posTop * panelSize + "px";
    }
    break;

    case "right":
    if (posLeft < 4 && posLeft >= 0 && possiblePaths[posTop][posLeft][1] == 1) {
      posLeft += 1;
      grille.style.left = -1 * posLeft * panelSize + "px";
    }
    break;

    case "left":
    if (posLeft > 0 && posLeft <= 4 && possiblePaths[posTop][posLeft][3] == 1) {
      posLeft -= 1;
      grille.style.left = -1 * posLeft * panelSize + "px";
    }
    break;

  }

  activePanels(posTop, posLeft);
  activeArrows(posTop, posLeft);
}




/**
* Keypress send a String to the move() function
*/
function moveTile(e) {
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



/**
* Initialize or reset the webcomic
*/
function init(reset){
  posTop = 0;
  posLeft = 0;
  if (reset){
    let grille = document.getElementById("grille");
    grille.style.top = -1 * posTop * panelSize + "px";
    grille.style.left = -1 * posLeft * panelSize + "px";
  }else{
    initCss(panelSize);
    injectPanels(composeHtmlGrid(pathToPanels,5,5), 'grille');
  } 
  activePanels(posLeft, posTop);
  activeArrows(posLeft, posTop);
}


// ============================
// STARTING POINT
// ============================
var posTop = initPosTop;
var posLeft = initPosLeft;

/** Display title */
document.getElementsByTagName('title')[0].innerHTML = title;
document.getElementsByTagName('h1')[0].innerHTML = title;

/** init the webcomics */
init(false);

/** listen to keydown */
window.addEventListener('keydown', moveTile);