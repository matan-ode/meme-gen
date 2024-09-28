'use strict'

var gIsDownload = false
let gElCanvas
let gCtx
let gTextSize = { width: 0, height: 0 }
let gIsLineDrag = false
let gLastPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']



function onInit() {
    gIsFirstRender = true
    gFilteredImgs = []
    gCurrLineIdx = 0
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    
    addListeners()
    // resizeCanvas()
    createImgs()
    keywordsPopularity()
    renderKeywords()


    console.log(gKeywordSearchCountMap)
    console.log(gKeywordsNames)


    renderGallery()

    renderSavedMemes()
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

    const elSearch = document.querySelector('.names-filter')
    elSearch.classList.add('hidden')
    restartSearchInput()

    const elNamesFilter = document.querySelector('.search-names')
    elNamesFilter.classList.add('hidden')

    const elLink = document.querySelector('.main-nav li')
    elLink.classList.remove('clicked')

}

function renderMeme(imgId, isSavedMeme) {
    if (!isSavedMeme) drawImgAndText(imgId)
    else drawImgAndText(imgId, isSavedMeme)
}

function drawImgAndText(imgId, isSavedMeme) {
    const elImg = new Image()
    if (!isSavedMeme) {
        elImg.src = getImgById(imgId).url
    }else{
        elImg.src = getImgById(gSavedMemes[imgId].selectedImgId).url
    }
    elImg.onload = () => {

        // Draw img
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)

        // Func for resizing
        // coverCanvasWithImg(elImg)

        // Draw txt lines
        const linesSettings = getMeme().lines
        for (var i = 0; i < linesSettings.length; i++) {
            if (i === 0) {
                if (linesSettings[i].textAlign !== 'moved') {
                    const centerTop = { x: gElCanvas.width / 2, y: 50 }
                    drawText(linesSettings[i], centerTop.x, centerTop.y)
                    linesSettings[i].pos = centerTop
                    linesSettings[i].width = textWidthMeasure(linesSettings[i].txt)

                    if (linesSettings[i].textAlign === 'left') centerTop.x += (linesSettings[i].width / 2)
                    else if (linesSettings[i].textAlign === 'right') centerTop.x -= (linesSettings[i].width / 2)

                    if (i === getCurrLineIdx() && !gIsDownload) drawRect(centerTop.x, centerTop.y)

                } else {
                    drawText(linesSettings[i], linesSettings[i].pos.x, linesSettings[i].pos.y)
                    if (i === getCurrLineIdx() && !gIsDownload) drawRect(linesSettings[i].pos.x, linesSettings[i].pos.y)
                }
            }
            else if (i === 1) {
                if (linesSettings[i].textAlign !== 'moved') {
                    const centerBottom = { x: gElCanvas.width / 2, y: gElCanvas.height - 50 }
                    drawText(linesSettings[i], centerBottom.x, centerBottom.y)
                    linesSettings[i].pos = centerBottom
                    linesSettings[i].width = textWidthMeasure(linesSettings[i].txt)

                    if (linesSettings[i].textAlign === 'left') centerBottom.x += (linesSettings[i].width / 2)
                    else if (linesSettings[i].textAlign === 'right') centerBottom.x -= (linesSettings[i].width / 2)

                    if (i === getCurrLineIdx() && !gIsDownload) drawRect(centerBottom.x, centerBottom.y)
                } else {
                    drawText(linesSettings[i], linesSettings[i].pos.x, linesSettings[i].pos.y)
                    if (i === getCurrLineIdx() && !gIsDownload) drawRect(linesSettings[i].pos.x, linesSettings[i].pos.y)
                }
            } else {
                if (linesSettings[i].textAlign !== 'moved') {

                    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
                    drawText(linesSettings[i], center.x, center.y)
                    linesSettings[i].pos = center
                    linesSettings[i].width = textWidthMeasure(linesSettings[i].txt)

                    if (linesSettings[i].textAlign === 'left') center.x += (linesSettings[i].width / 2)
                    else if (linesSettings[i].textAlign === 'right') center.x -= (linesSettings[i].width / 2)

                    if (i === getCurrLineIdx() && !gIsDownload) drawRect(center.x, center.y)
                } else {
                    drawText(linesSettings[i], linesSettings[i].pos.x, linesSettings[i].pos.y)
                    if (i === getCurrLineIdx() && !gIsDownload) drawRect(linesSettings[i].pos.x, linesSettings[i].pos.y)
                }
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
    gCtx.font = `bold ${lineSettings.size}px ${lineSettings.fontFamily}`
    gCtx.textAlign = `${lineSettings.textAlign}`
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

function setFontFamily(fontFamily, elInput) {
    const firstLineSettings = getMeme().lines[getCurrLineIdx()]
    firstLineSettings.fontFamily = fontFamily
    renderMeme(getMeme().selectedImgId)
}

function setLineText(text, elInput) {
    const firstLineSettings = getMeme().lines[getCurrLineIdx()]
    firstLineSettings.txt = text
    renderMeme(getMeme().selectedImgId)
}

function setFontSize(fontSize, elInput) {
    const firstLineSettings = getMeme().lines[getCurrLineIdx()]
    firstLineSettings.size = fontSize
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
    updateToolbar()
    //Dom
    renderMeme(getMeme().selectedImgId)
}

function onSwitchLine() {
    //Model
    switchLine()
    //Dom
    renderMeme(getMeme().selectedImgId)
}

function onDeleteLine() {
    //Model
    deleteLine()
    //Dom
    renderMeme(getMeme().selectedImgId)
}

function onAlignText(place) {
    //Model
    alignText(place)
    //Dom
    renderMeme(getMeme().selectedImgId)
}

function onDown(ev) {
    //* Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    // console.log('pos:', pos)

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
    if (!gIsLineDrag) return

    getMeme().lines[getCurrLineIdx()].textAlign = 'moved'

    const pos = getEvPos(ev)
    console.log('pos:', pos)
    console.log('Last pos:', gLastPos)
    // //* Calc the delta, the diff we moved
    const dx = pos.x - gLastPos.x
    const dy = pos.y - gLastPos.y
    moveLine(dx, dy)


    // //* Save the last pos so we will remember where we`ve been and move accordingly
    gLastPos = pos
    // //* The canvas (along with the circle) is rendered again after every move
    renderMeme(getMeme().selectedImgId)
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



function getBase64Image() {

    var dataURL = gElCanvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function onMemeImg(savedMemeIdx) {
    //Model:
    gMeme = gSavedMemes[savedMemeIdx]
    selectSavedMeme(savedMemeIdx)

    //Dom:
    restartToolbar()
    gCurrLineIdx = 0
    const elEditor = document.querySelector('.editor')
    elEditor.classList.remove('none')
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.add('none')
    const elSaved = document.querySelector('.saved')
    elSaved.classList.add('none')

    const elLink = document.querySelector('.main-nav li')
    elLink.classList.remove('clicked')
    const elSavedBtn = document.querySelector('.saved-btn')
    elSavedBtn.classList.remove('clicked')


    console.log(gSavedMemes[savedMemeIdx]);
    
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