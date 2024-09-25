function downloadImg(elLink) {
    console.log(elLink)
    var imgContent = gElCanvas.toDataURL();
    elLink.href = imgContent
}