'use strict'

var gIsDownload = false
let gElCanvas
let gCtx
let gTextSize = { width: 0, height: 0 }
let gIsLineDrag = false
let gLastPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']



function onInit() {
    gCurrLineIdx = 0
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()
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
    const elEditor = document.querySelector('.editor')
    elEditor.classList.remove('none')
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.add('none')

    const elLink = document.querySelector('.main-nav li')
    elLink.classList.remove('clicked')

}

function renderMeme(imgId) {
    drawImgAndText(imgId)
}

function drawImgAndText(imgId) {

    const elImg = new Image()
    elImg.src = getImgById(imgId).url
    
    elImg.onload = () => {

        // Draw img
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
        
        // Func for resizing
        // coverCanvasWithImg(elImg)

        // Draw txt lines
        const linesSettings = getMeme().lines
        for (var i = 0; i < linesSettings.length; i++) {
            if (i === 0) {
                const centerTop = { x: gElCanvas.width / 2, y: 50 }
                drawText(linesSettings[i], centerTop.x, centerTop.y)
                linesSettings[i].pos = centerTop
                linesSettings[i].width = textWidthMeasure(linesSettings[i].txt)
                if (i === getCurrLineIdx() && !gIsDownload) drawRect(centerTop.x, centerTop.y)
            }
            else if (i === 1) {
                const centerBottom = { x: gElCanvas.width / 2, y: gElCanvas.height - 50 }
                drawText(linesSettings[i], centerBottom.x, centerBottom.y)
                linesSettings[i].pos = centerBottom
                linesSettings[i].width = textWidthMeasure(linesSettings[i].txt)
                if (i === getCurrLineIdx() && !gIsDownload) drawRect(centerBottom.x, centerBottom.y)
            }
            else {
                const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
                drawText(linesSettings[i], center.x, center.y)
                linesSettings[i].pos = center
                linesSettings[i].width = textWidthMeasure(linesSettings[i].txt)
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

// function coverCanvasWithImg(elImg) {
//     gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
//     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
// }

function drawText(lineSettings, x, y) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = lineSettings.color
    gCtx.font = `bold ${lineSettings.size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(lineSettings.txt, x, y)
    gCtx.strokeText(lineSettings.txt, x, y)


    gTextSize.width = textWidthMeasure(lineSettings.txt)
    gTextSize.height = lineSettings.size

}

function textWidthMeasure(txt) {
    return gCtx.measureText(txt).width
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
    chooseLine(getMeme().lines.length - 1)
    //Dom
    renderMeme(getMeme().selectedImgId)
}

function onSwitchLine() {
    //Model
    switchLine()
    //Dom
    renderMeme(getMeme().selectedImgId)
}


function onDown(ev) {
    //* Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    console.log('pos:', pos)

    if (!isLineClicked(pos)) return
    selectLine()
    renderMeme(getMeme().selectedImgId)
    const clickedLine = gMeme.lines[getCurrLineIdx()]
    gIsLineDrag = true

    //* Switch to the selected line

    //* Save the pos we start from
    gLastPos = pos
    const elCanvasCont = document.querySelector('canvas')
    elCanvasCont.style.cursor = 'grabbing'
}

function onMove(ev) {
    // if (!gIsLineDrag) return

    // const pos = getEvPos(ev)
    // //* Calc the delta, the diff we moved
    // const dx = pos.x - gLastPos.x
    // const dy = pos.y - gLastPos.y
    // moveCircle(dx, dy)
    // //* Save the last pos so we will remember where we`ve been and move accordingly
    // gLastPos = pos
    // //* The canvas (along with the circle) is rendered again after every move
    // renderCanvas()
    // // renderCircle()
}

function onUp() {
    gIsLineDrag = false
    const elCanvasCont = document.querySelector('canvas')
    elCanvasCont.style.cursor = 'grab'
}

//* Handle the listeners
function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        //* Prevent triggering the mouse screen dragging event
        ev.preventDefault()
        //* Gets the first touch point
        ev = ev.changedTouches[0]
        //* Calc the right pos according to the touch screen
        pos = {
            x: ev.clientX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.clientY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
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