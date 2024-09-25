'use strict'

// var gMemes
var gMeme


function setImg(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'I sometimes eat Falafel',
                size: 40,
                color: 'white'
            }
        ]
    }
    renderMeme(gMeme.selectedImgId)
}

function getMeme() {
    return gMeme
}

function increaseFontSize() {
    gMeme.lines[0].size += 5
}

function decreaseFontSize() {
    gMeme.lines[0].size -= 5
}