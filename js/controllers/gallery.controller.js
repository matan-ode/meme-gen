'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    let strHtml = ''
    gImgs.forEach(img => {
        strHtml += `<img onclick="onImgSelect(${img.id})" src="./img/${img.id}.jpg">`
    })
    elGallery.innerHTML = strHtml
}

function onGallery() {
    const elEditor = document.querySelector('.editor')
    elEditor.classList.add('none')
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.remove('none')

    const elLink = document.querySelector('.main-nav li')
    elLink.classList.add('clicked')

    const elBackdrop = document.querySelector('.backdrop')
    onBackdrop(elBackdrop)
    restartToolbar()
}

function onBurger() {
    const elNav = document.querySelector('.main-nav')
    elNav.style.right = '0'

    const elBackdrop = document.querySelector('.backdrop')
    elBackdrop.classList.add('show')
}

function onBackdrop(elBackdrop) {
    elBackdrop.classList.remove('show')

    const elNav = document.querySelector('.main-nav')
    elNav.style.right = '-100%'

    const elDownload = document.querySelector('.download')
    elDownload.classList.toggle('hidden')

    gIsDownload = false
    renderMeme(getMeme().selectedImgId)
}

function onRandomize() {
    const RandomImgIdx = getRandomInt(1, getImgs().length + 1)
    const randomId = getImgs()[RandomImgIdx].id
    onImgSelect(randomId)
}