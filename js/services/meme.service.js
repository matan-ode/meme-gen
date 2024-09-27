'use strict'

// var gMemes
var gMeme
var gCurrLineIdx = 0


function setImg(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'I sometimes eat Falafel',
                size: 40,
                color: '#ffffff',
                isCurrLine: true,
                // pos,
                width: textWidthMeasure('I sometimes eat Falafel'),
                fontFamily: 'Impact',
                textAlign: 'center'
            },
            {
                txt: 'Second line!!',
                size: 40,
                color: '#ffffff',
                isCurrLine: false,
                // pos,
                width: textWidthMeasure('Second line!!'),
                fontFamily: 'Impact',
                textAlign: 'center'
            }
        ]
    }
    renderMeme(gMeme.selectedImgId)
}

function getMeme() {
    return gMeme
}

function increaseFontSize() {
    gMeme.lines[gCurrLineIdx].size += 5
    updateToolbar()
}

function decreaseFontSize() {
    gMeme.lines[gCurrLineIdx].size -= 5
    updateToolbar()
}

function alignText(place) {
    gMeme.lines[gCurrLineIdx].textAlign = place
}


function addLine() {
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }

    gMeme.lines.push({
        txt: 'Add Text',
        size: 40,
        color: '#ffffff',
        isCurrLine: true,
        pos: center,
        width: textWidthMeasure('Add Text'),
        fontFamily: 'Impact',
        textAlign: 'center'
    })
}

function switchLine() {
    const currLineIdx = gMeme.lines.findIndex(line => line.isCurrLine)
    gMeme.lines[currLineIdx].isCurrLine = false
    if (currLineIdx + 1 === gMeme.lines.length) {
        gMeme.lines[0].isCurrLine = true
        gCurrLineIdx = 0
    }
    else {
        gMeme.lines[currLineIdx + 1].isCurrLine = true
        gCurrLineIdx = currLineIdx + 1
    }
    updateToolbar()
}

function deleteLine(){
    gMeme.lines.splice(gCurrLineIdx, 1)
    restartToolbar()
}

function selectLine() {
    gMeme.lines.forEach(line => line.isCurrLine = false)

    gMeme.lines[gCurrLineIdx].isCurrLine = true
    updateToolbar()
}

function chooseLine(lineIdx) {
    const currLineIdx = gMeme.lines.findIndex(line => line.isCurrLine)
    gMeme.lines[currLineIdx].isCurrLine = false

    const newLine = gMeme.lines[lineIdx].isCurrLine = true
    gCurrLineIdx = lineIdx
}

function getCurrLineIdx() {
    return gCurrLineIdx
}

function restartToolbar() {
    const txt = document.querySelector('input[name="text"]')
    const txtColor = document.querySelector('input[name="txtColor"]')
    const fontSize = document.querySelector('input[name="fontSize"]')
    const fontFamily = document.querySelector('select[name="fontFamily"]')

    txt.value = ''
    txtColor.value = '#ffffff'
    fontSize.value = 40
    fontFamily.value = 'Impact'
}

function updateToolbar() {
    const txt = document.querySelector('input[name="text"]')
    const txtColor = document.querySelector('input[name="txtColor"]')
    const fontSize = document.querySelector('input[name="fontSize"]')
    const fontFamily = document.querySelector('select[name="fontFamily"]')


    const currLineTxt = gMeme.lines[gCurrLineIdx].txt
    const currLineColor = gMeme.lines[gCurrLineIdx].color
    const currFontSize = gMeme.lines[gCurrLineIdx].size
    const currFontFamily = gMeme.lines[gCurrLineIdx].fontFamily

    txt.value = currLineTxt
    txtColor.value = currLineColor
    fontSize.value = currFontSize
    fontFamily.value = currFontFamily
    console.log(currLineTxt);

    if (currLineTxt === 'I sometimes eat Falafel' || currLineTxt === 'Second line!!' || currLineTxt === 'Add Text') {
        txt.value = ''
    }
}

//* Check if the line was clicked
function isLineClicked(clickedPos) {
    for (var i = 0; i < gMeme.lines.length; i++) {
        const { pos, width, size } = gMeme.lines[i]
        //* Calc the distance between two dots
        if (clickedPos.x >= pos.x - (width / 2) && clickedPos.x <= pos.x + (width / 2)) {
            if (clickedPos.y >= pos.y - (size / 2) && clickedPos.y <= pos.y + (size) / 2) {
                gCurrLineIdx = i
                return true
            }
        }
    }
    return false
}