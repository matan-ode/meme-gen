'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    // addListeners()
    // resizeCanvas()
    createImgs()
    createMeme(1)
    renderMeme(getMeme().selectedImgId)
}

function renderMeme(imgId) {
    coverCanvasWithImgAndText(imgId)
}

function coverCanvasWithImgAndText(imgId) {
    const elImg = new Image()
    elImg.src = getImgById(imgId).url    
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
        const centerTop = { x: gElCanvas.width / 2, y: 50 }
        const firstLineSettings = getMeme().lines[0]
        drawText(firstLineSettings, centerTop.x, centerTop.y)
    }
}

function drawText(lineSettings, x, y) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = lineSettings.color
    gCtx.font = `bold ${lineSettings.size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(lineSettings.txt, x, y)
    gCtx.strokeText(lineSettings.txt, x, y)
}

function onChangeColor(color, elInput){
    const firstLineSettings = getMeme().lines[0]
    firstLineSettings.color = color
    renderMeme(getMeme().selectedImgId)
}

function onEditText(text, elInput){
    const firstLineSettings = getMeme().lines[0]
    firstLineSettings.txt = text
    renderMeme(getMeme().selectedImgId)
}

// function renderCanvas() {
//     gCtx.fillStyle = '#ffffff'
//     gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
// }

// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container')
//     gElCanvas.width = elContainer.offsetWidth
//     gElCanvas.height = elContainer.offsetHeight
//     renderCanvas()

// }

// function addListeners() {
//     window.addEventListener('resize', () => {
//         resizeCanvas()
//         renderCanvas()
//     })
// }