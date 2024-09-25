'use strict'

var gImgs

// var gMemes
var gMeme

var gKeywordSearchCountMap



function createMeme(imgId) {
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
}

function getMeme() {
    return gMeme
}

function getImgById(imgId){
    return gImgs.find(img => img.id === imgId)
}





function createImgs() {
    gImgs = []
    // if(gMemes && gMemes.length !== 0) return
    gImgs.push(createImg(1, ['funny', 'politics']))
    gImgs.push(createImg(2, ['dog']))
    gImgs.push(createImg(3, ['dog', 'baby']))
    gImgs.push(createImg(4, ['cat']))
    gImgs.push(createImg(5, ['funny', 'baby']))
    gImgs.push(createImg(6, ['crazy']))
    gImgs.push(createImg(7, ['funny', 'baby']))
    gImgs.push(createImg(8, ['crazy']))
    gImgs.push(createImg(9, ['funny', 'baby']))
    gImgs.push(createImg(10, ['funny', 'politics']))
    gImgs.push(createImg(11, ['crazy', 'sport']))
    gImgs.push(createImg(12, ['israeli', 'funny']))
    gImgs.push(createImg(13, ['movie', 'funny']))
    gImgs.push(createImg(14, ['movie', 'serious']))
    gImgs.push(createImg(15, ['movie', 'serious']))
    gImgs.push(createImg(16, ['movie', 'funny']))
    gImgs.push(createImg(17, ['funny', 'politics']))
    gImgs.push(createImg(18, ['movie', 'funny']))
}

function createImg(id, keywords) {
    return {
        id,
        url: `/img/${id}.jpg`,
        keywords
    }
}