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
}

function decreaseFontSize() {
    gMeme.lines[gCurrLineIdx].size -= 5
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

    txt.value = ''
    txtColor.value = '#ffffff'
}

function updateToolbar() {
    const txt = document.querySelector('input[name="text"]')
    const txtColor = document.querySelector('input[name="txtColor"]')

    const currLineTxt = gMeme.lines[gCurrLineIdx].txt
    const currLineColor = gMeme.lines[gCurrLineIdx].color

    txt.value = currLineTxt
    txtColor.value = currLineColor
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