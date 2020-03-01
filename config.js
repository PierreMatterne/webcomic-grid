"use strict";

const title = "Une mort";


// les chemins autorisés :
// UP, RIGHT, DOWN, LEFT
// 1 = passage, 0 = bloquage
const possiblePaths = [
[[0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 1, 0]],
[[0, 1, 1, 0], [1, 0, 0, 1], [0, 0, 1, 0], [0, 1, 0, 0], [0, 0, 1, 0]],
[[0, 0, 1, 0], [0, 0, 1, 1], [0, 1, 1, 1], [0, 1, 1, 0], [0, 0, 1, 0]],
[[0, 0, 1, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 1, 0]],
[[0, 1, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]
];


// Largeur d'un panneau
// minimal size : 80
const panelSize = 200;

// position de départ
const initPosTop = 0;
const initPosLeft = 0;

// chemin vers les images
const pathToPanels = "webco-unemort";