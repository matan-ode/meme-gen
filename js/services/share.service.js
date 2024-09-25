'use strict'

function downloadImg(elLink) {
    gIsDownload = true
    renderMeme(getMeme().selectedImgId)
    
    console.log(elLink)
    var imgContent = gElCanvas.toDataURL();
    elLink.href = imgContent

    gIsDownload = false
    renderMeme(getMeme().selectedImgId)

}