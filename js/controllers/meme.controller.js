'use strict'

// let gElCanvas
// let gCtx

function onInit() {
    // gElCanvas = document.querySelector('canvas')
    // gCtx = gElCanvas.getContext('2d')
    // addListeners()
    // resizeCanvas()
    createImgs()
}

function renderMeme(imgId) {
    
    createMeme(imgId)
    getMeme()
}

// function renderCanvas() {
//     gCtx.fillStyle = '#ffffff'
//     gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
// }

// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container')
//     gElCanvas.width = elContainer.offsetWidth
//     gElCanvas.height = elContainer.offsetHeight
//     renderCanvas()

// }

// function addListeners() {
//     window.addEventListener('resize', () => {
//         resizeCanvas()
//         renderCanvas()
//     })
// }