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
    if(keys.down.pressed){
        background.position.y = background.position.y-3
    }else if(keys.up.pressed){
        background.position.y = background.position.y+3
    }else if(keys.right.pressed){
        background.position.x = background.position.x-3
    }else if(keys.left.pressed){
        background.position.x = background.position.x+3
    }
}
animate()


window.addEventListener('keydown',(e)=>{
    switch(e.keyCode){
        case 40 : 
            keys.down.pressed = true
            console.log('down') 
            break
        case 38 :
            keys.up.pressed=true
            console.log('up') 
            break
        case 39: 
            keys.right.pressed=true
            console.log('right')
            break
        case 37: 
            keys.left.pressed =true
            console.log('left')
            break
    }
    console.log(keys);
})

window.addEventListener('keyup',(e)=>{
    switch(e.keyCode){
        case 40 : 
            keys.down.pressed = false
            console.log('down') 
            break
        case 38 :
            keys.up.pressed= false
            console.log('up') 
            break
        case 39: 
            keys.right.pressed= false
            console.log('right')
            break
        case 37: 
            keys.left.pressed = false
            console.log('left')
            break
    }
})



