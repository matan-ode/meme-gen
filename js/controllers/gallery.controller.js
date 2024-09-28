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
    const elSaved = document.querySelector('.saved')
    elSaved.classList.add('none')
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.remove('none')

    const elLink = document.querySelector('.main-nav li')
    elLink.classList.add('clicked')
    const elSavedBtn = document.querySelector('.saved-btn')
    elSavedBtn.classList.remove('clicked')

    // onBackdrop(elBackdrop)
    const elBackdrop = document.querySelector('.backdrop')
    elBackdrop.classList.remove('show')

    const elNav = document.querySelector('.main-nav')
    elNav.style.right = '-100%'

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

    const elSave = document.querySelector('.save')
    elSave.classList.toggle('hidden')

    gIsDownload = false
    renderMeme(getMeme().selectedImgId)
}

function onRandomize() {
    const elSaved = document.querySelector('.saved')
    elSaved.classList.add('none')
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.add('none')

    const elSavedBtn = document.querySelector('.saved-btn')
    elSavedBtn.classList.remove('clicked')
    const elGalleryBtn = document.querySelector('.gallery-btn')
    elGalleryBtn.classList.remove('clicked')

    const elNav = document.querySelector('.main-nav')
    elNav.style.right = '-100%'
    const elBackdrop = document.querySelector('.backdrop')
    elBackdrop.classList.remove('show')

    const RandomImgIdx = getRandomInt(1, getImgs().length)
    const randomId = getImgs()[RandomImgIdx].id
    onImgSelect(randomId)
}