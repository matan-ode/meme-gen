'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    let strHtml = ''
    gImgs.forEach(img => {
        strHtml += `<img onclick="onImgSelect(${img.id})" src="/img/${img.id}.jpg">`
    })
    elGallery.innerHTML = strHtml
}