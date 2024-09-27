'use strict'

function onShareImg(elLink) {
    if (gIsDownload) gIsDownload = false
    else gIsDownload = true
    renderMeme(getMeme().selectedImgId)

    const elDownload = document.querySelector('.download')
    elDownload.classList.toggle('hidden')

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
}