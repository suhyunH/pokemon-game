const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

context.fillStyle = 'white'
context.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image()
image.src = './img/Pokemon_Game_Map.png'

const playerImage = new Image()
playerImage.src='./img/playerDown.png'

class Sprite{
    constructor({position,velocity,image}){
        this.position = position
        this.image = image
    }
    draw(){
        context.drawImage(this.image,-500,-340)
    }
}
const background = new Sprite({
    position:{
        x:-500,
        y:-340
    },
    image: image
})

function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    context.drawImage(
        playerImage, 
        0,
        0,
        playerImage.width/4,
        playerImage.height,
        canvas.width/2-playerImage.width/4/2, 
        canvas.height/2-playerImage.height/2,
        playerImage.width/4,
        playerImage.height
        )
}
animate()


window.addEventListener('keydown',(e)=>{
    switch(e.keyCode){
        case 40 : 
            console.log('down') 
            break
        case 38 :
            console.log('up') 
            break
        case 39: 
            console.log('right')
            break
        case 37: 
            console.log('left')
            break
    }
})




