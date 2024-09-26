'use strict'

function onShareImg(elLink) {
    if (gIsDownload) gIsDownload = false
    else gIsDownload = true
    renderMeme(getMeme().selectedImgId, elLink)

    const elDownload = document.querySelector('.download')
    elDownload.classList.toggle('hidden')

}

function onDownloadImg(elLink) {
    console.log(elLink)
    var imgContent = gElCanvas.toDataURL();
    elLink.href = imgContent

    gIsDownload = false
    renderMeme(getMeme().selectedImgId, elLink)
}