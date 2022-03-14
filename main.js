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
        context.drawImage(this.image, this.position.x,this.position.y)
    }
}
const background = new Sprite({
    position:{
        x:-500,
        y:-340
    },
    image: image
})

const keys ={
    down:{
        pressed:false
    },
    up:{
        pressed:false
    },
    right:{
        pressed:false
    },
    left:{
        pressed:false
    }
}

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
    if(keys.down.pressed && lastKey===40){
        background.position.y -= 3
    }else if(keys.up.pressed && lastKey===38){
        background.position.y += 3
    }else if(keys.right.pressed && lastKey===39){
        background.position.x -= 3
    }else if(keys.left.pressed && lastKey===37){
        background.position.x += 3
    }
}
animate()
let lastKey = 0

window.addEventListener('keydown',(e)=>{
    switch(e.keyCode){
        case 40 : 
            keys.down.pressed = true
            lastKey=40
            break
        case 38 :
            keys.up.pressed=true
            lastKey=38
            break
        case 39: 
            keys.right.pressed=true
            lastKey=39
            break
        case 37: 
            keys.left.pressed =true
            lastKey=37
            break
    }
})

window.addEventListener('keyup',(e)=>{
    switch(e.keyCode){
        case 40 : 
            keys.down.pressed = false
            break
        case 38 :
            keys.up.pressed= false
            break
        case 39: 
            keys.right.pressed= false
            break
        case 37: 
            keys.left.pressed = false
            break
    }
})



