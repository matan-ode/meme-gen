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
                color: 'white',
                isCurrLine: true
            },
            {
                txt: 'Second line!!',
                size: 40,
                color: 'white',
                isCurrLine: false
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
    gMeme.lines.push({
        txt: 'Add Text',
        size: 40,
        color: 'white'
    })
    restartToolbar()
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
    restartToolbar()
}

function chooseLine(lineIdx){
    const currLineIdx = gMeme.lines.findIndex(line => line.isCurrLine)
    gMeme.lines[currLineIdx].isCurrLine = false
    
    const newLine = gMeme.lines[lineIdx].isCurrLine = true
    gCurrLineIdx = lineIdx
}

function getCurrLineIdx(){
    return gCurrLineIdx
}

function restartToolbar() {
    const txt = document.querySelector('input[name="text"]')
    const txtColor = document.querySelector('input[name="txtColor"]')

    txt.value = ''
    txtColor.value = '#ffffff'
}