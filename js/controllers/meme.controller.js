'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    // addListeners()
    // resizeCanvas()
    createImgs()
    renderGallery()
    setImg(1)
    renderMeme(getMeme().selectedImgId)
}

function onImgSelect(imgId){
    restartToolbar()
    setImg(imgId)
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

function setTextColor(color, elInput){
    const firstLineSettings = getMeme().lines[0]
    firstLineSettings.color = color
    renderMeme(getMeme().selectedImgId)
}

function setLineText(text, elInput){
    const firstLineSettings = getMeme().lines[0]
    firstLineSettings.txt = text
    renderMeme(getMeme().selectedImgId)
}

function onIncreaseFontSize(){
    //Model
    increaseFontSize()
    //Dom
    renderMeme(getMeme().selectedImgId)
}

function onDecreaseFontSize(){
    //Model
    decreaseFontSize()
    //Dom
    renderMeme(getMeme().selectedImgId)
}

function restartToolbar(){
    const txt = document.querySelector('input[name="text"]')
    const txtColor = document.querySelector('input[name="txtColor"]')
    
    txt.value = ''
    txtColor.value = '#ffffff'
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