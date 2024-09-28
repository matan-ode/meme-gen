'use strict'

var gImgs
var gKeywordSearchCountMap = {}
var gKeywordsNames = []
var gIsFirstRender = true



function getImgById(imgId) {
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
        url: `./img/${id}.jpg`,
        keywords
    }
}

function getImgs() {
    return gImgs
}

function keywordsPopularity() {
    // Count Popularity of Keywords
    // gKeywordsNames = []
    gImgs.forEach(img => {
        img.keywords.forEach(keyword => {
            if (!gKeywordSearchCountMap[keyword]) gKeywordSearchCountMap[keyword] = 0
            gKeywordSearchCountMap[keyword]++
            if (!gKeywordsNames.includes(`${keyword}`)) gKeywordsNames.push(keyword)
        })
    })
}

function renderKeywords() {
    console.log(gKeywordsNames);

    const searchNames = document.querySelector('.search-names')
    var strHtml = ''
    gKeywordsNames.forEach(keywordName => {
        strHtml += `<span onclick="onWordClick('${keywordName}', this)" class="keyword-${keywordName}">${keywordName} </span>`
    })
    searchNames.innerHTML = strHtml

    for (var i = 0; i < gKeywordsNames.length; i++) {
        if (gIsFirstRender) gKeywordSearchCountMap[gKeywordsNames[i]] += 8
        const fontSize = (gKeywordSearchCountMap[gKeywordsNames[i]])
        const elWord = document.querySelector(`.keyword-${gKeywordsNames[i]}`)
        elWord.style.fontSize = `${fontSize}px`
    }
    gIsFirstRender = false

    console.log('hiiiii', gKeywordSearchCountMap);
    console.log('hiiiii', strHtml);
}

// function keywordsCounter() {

// }

function onWordClick(word, elWord) {
    // const strSize = elWord.style.fontSize
    // let currSize = parseInt(strSize)
    // currSize *= 1.2
    // elWord.style.fontSize = currSize + 'px'
    gKeywordSearchCountMap[word] *=1.1
    console.log(gKeywordSearchCountMap[word]);

    onNamesInput(word)
}