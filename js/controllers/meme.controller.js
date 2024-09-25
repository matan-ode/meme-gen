'use strict'

var gIsDownload = false
let gElCanvas
let gCtx
let gTextSize = {width:0, height:0}


function onInit() {
    gCurrLineIdx = 0
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    // addListeners()
    // resizeCanvas()
    createImgs()
    renderGallery()
    setImg(1)
    renderMeme(getMeme().selectedImgId)
}

function onImgSelect(imgId) {
    restartToolbar()
    gCurrLineIdx = 0
    setImg(imgId)
}

function renderMeme(imgId) {
    coverCanvasWithImgAndText(imgId)
}

function coverCanvasWithImgAndText(imgId) {
    const elImg = new Image()
    elImg.src = getImgById(imgId).url
    elImg.onload = () => {
        // Draw img
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)

        // Draw txt lines
        const linesSettings = getMeme().lines
        for (var i = 0; i < linesSettings.length; i++) {
            if (i === 0) {
                const centerTop = { x: gElCanvas.width / 2, y: 50 }
                drawText(linesSettings[i], centerTop.x, centerTop.y)
                if (i === getCurrLineIdx() && !gIsDownload) drawRect(centerTop.x, centerTop.y)
            }
            else if (i === 1) {
                const centerBottom = { x: gElCanvas.width / 2, y: gElCanvas.height - 50 }
                drawText(linesSettings[i], centerBottom.x, centerBottom.y)
                if (i === getCurrLineIdx() && !gIsDownload) drawRect(centerBottom.x, centerBottom.y)
            }
            else {
                const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
                drawText(linesSettings[i], center.x, center.y)
                if (i === getCurrLineIdx() && !gIsDownload) drawRect(center.x, center.y)
            }
        }
        // linesSettings.forEach(lineSettings => {
        //     drawText(lineSettings, centerTop.x, centerTop.y)
        //     centerTop.y
        // })
        // const firstLineSettings = getMeme().lines[0]
        // drawText(firstLineSettings, centerTop.x, centerTop.y)
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

    gTextSize.width = gCtx.measureText(lineSettings.txt).width    
    gTextSize.height = lineSettings.size
    
}

function drawRect(offsetX, offsetY) {
    gCtx.strokeStyle = 'white'
    gCtx.strokeRect(offsetX - (gTextSize.width / 2), offsetY - (gTextSize.height / 2), gTextSize.width, gTextSize.height)
    // gCtx.fillStyle = ''
    // gCtx.fillRect(offsetX, offsetY, 120, 120)
}

function setTextColor(color, elInput) {
    const firstLineSettings = getMeme().lines[getCurrLineIdx()]
    firstLineSettings.color = color
    renderMeme(getMeme().selectedImgId)
}

function setLineText(text, elInput) {
    const firstLineSettings = getMeme().lines[getCurrLineIdx()]
    firstLineSettings.txt = text
    renderMeme(getMeme().selectedImgId)
}

function onIncreaseFontSize() {
    //Model
    increaseFontSize()
    //Dom
    renderMeme(getMeme().selectedImgId)
}

function onDecreaseFontSize() {
    //Model
    decreaseFontSize()
    //Dom
    renderMeme(getMeme().selectedImgId)
}

function onAddLine() {
    //Model
    addLine()
    chooseLine(getMeme().lines.length-1)
    //Dom
    renderMeme(getMeme().selectedImgId)
}

function onSwitchLine() {
    //Model
    switchLine()
    //Dom
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