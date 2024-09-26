'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    let strHtml = ''
    gImgs.forEach(img => {
        strHtml += `<img onclick="onImgSelect(${img.id})" src="./img/${img.id}.jpg">`
    })
    elGallery.innerHTML = strHtml
}

function onGallery(){
    const elEditor = document.querySelector('.editor')
    elEditor.classList.add('none')
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.remove('none')
}