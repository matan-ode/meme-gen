'use strict'

function onShareImg(elLink) {
    if (gIsDownload) gIsDownload = false
    else gIsDownload = true
    renderMeme(getMeme().selectedImgId)

    const elDownload = document.querySelector('.download')
    elDownload.classList.toggle('hidden')

    const elSave = document.querySelector('.save')
    elSave.classList.toggle('hidden')

    const elBackdrop = document.querySelector('.backdrop')
    elBackdrop.classList.toggle('show')

}

function onDownloadImg(elLink) {
    console.log(elLink)
    var imgContent = gElCanvas.toDataURL();
    elLink.href = imgContent

    gIsDownload = false
    renderMeme(getMeme().selectedImgId, elLink)

    const elBackdrop = document.querySelector('.backdrop')
    elBackdrop.classList.remove('show')
    elBackdrop.style.opacity = 0
    elBackdrop.style.pointerEvents = 'none'

    onGallery()

}

function onSaveMeme() {
    //Model
    const imgData = getBase64Image()
    saveToStorage(`imgData${gSavedMemes.length}`, imgData)

    // getMeme().url = `data:image/png;base64,${imgData}`
    gSavedMemes.push(getMeme())
    saveToStorage('savedMemes', gSavedMemes)

    const elEditor = document.querySelector('.editor')
    elEditor.classList.remove('none')
    const elSaved = document.querySelector('.saved')
    elSaved.classList.add('none')

    //Dom
    renderSavedMemes()
    onGallery()
    const elBackdrop = document.querySelector('.backdrop')
    elBackdrop.classList.remove('show')
    elBackdrop.style.opacity = 0
    elBackdrop.style.pointerEvents = 'none'

}

function renderSavedMemes() {
    if (loadFromStorage('savedMemes')) {
        gSavedMemes = loadFromStorage('savedMemes')
    }

    const savedPage = document.querySelector('.saved')

    console.log(savedPage);
    console.log(gSavedMemes);

    var strHtml = ''
    for (var i = 0; i < gSavedMemes.length; i++) {
        const currImgData = loadFromStorage(`imgData${i}`)
        strHtml += `<img class="meme-img" onclick="onMemeImg(${i})" src="data:image/png;base64,${currImgData}"/>`
    }
    console.log(strHtml);

    savedPage.innerHTML = strHtml
}

function onSaved() {
    const elEditor = document.querySelector('.editor')
    elEditor.classList.add('none')
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.add('none')

    const elSaved = document.querySelector('.saved')
    elSaved.classList.remove('none')

    const elNav = document.querySelector('.main-nav')
    elNav.style.right = '-100%'
    const elBackdrop = document.querySelector('.backdrop')
    elBackdrop.classList.remove('show')

    const elGalleryBtn = document.querySelector('.gallery-btn')
    elGalleryBtn.classList.remove('clicked')
    const elSavedBtn = document.querySelector('.saved-btn')
    elSavedBtn.classList.add('clicked')

}