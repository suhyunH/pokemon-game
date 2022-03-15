const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const collisionsMap =[]
for(let i =0; i<collisions.length; i+=70){
    collisionsMap.push(collisions.slice(i,70+i))
}

class Boundary{
    static width = 48
    static height = 48
    constructor({position}){
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw(){
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []
const offset ={
    x: -500,
    y: -340
}
collisionsMap.forEach((row, i)=>{
    row.forEach((symbol,j) =>{
        if(symbol ===1025)
        boundaries.push(new Boundary({position:{
            x:j*Boundary.width +offset.x,
            y:i*Boundary.height +offset.y
        }}))
    })
})
console.log(boundaries);

context.fillStyle = 'white'
context.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image()
image.src = './img/Pokemon_Game_Map.png'

const playerImage = new Image()
playerImage.src='./img/playerDown.png'

class Sprite{
    constructor({position,velocity,image, frames={max:1}}){
        this.position = position
        this.image = image
        this.frames = frames
        this.image.onload = ()=>{
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
            console.log(this.width)
            console.log(this.height)
        }
    }
    draw(){
        context.drawImage(
            this.image, 
            0,
            0,
            this.image.width/ this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width/this.frames.max,
            this.image.height
            )
    }
}


const player = new Sprite({
    position:{
        x: canvas.width/2-192/4/2, 
        y: canvas.height/2-68/2
    },
    image: playerImage,
    frames:{
        max:4
    }
})
const background = new Sprite({
    position:{
        x: offset.x,
        y: offset.y
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

const movalbes = [background, ...boundaries]
function rectangularCollision({rec1, rec2}){
    return (
        rec1.position.x + rec1.width >= rec2.position.x 
        &&rec1.position.x <= rec2.position.x+rec2.width
        && rec1.position.y <= rec2.position.y + rec2.height
        && rec1.position.y + rec1.height >= rec2.position.y
    )
}
function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary=>{
        boundary.draw()
    })
    player.draw()

    let moving = true
    if(keys.down.pressed && lastKey===40){
        for(let i=0; i<boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rec1: player,
                    rec2: {...boundary, position:{
                        x:boundary.position.x,
                        y:boundary.position.y -3
                    }}
                })
            ){
                console.log("whhh");
                moving = false
                break
            }    
        }
        if(moving){
            movalbes.forEach(item=>{item.position.y-=3})
        }
    }else if(keys.up.pressed && lastKey===38){
        for(let i=0; i<boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rec1: player,
                    rec2: {...boundary, position:{
                        x:boundary.position.x,
                        y:boundary.position.y +3
                    }}
                })
            ){
                console.log("whhh");
                moving = false
                break
            }    
        }
        if(moving){
            movalbes.forEach(item=>{item.position.y+=3})
        }
    }else if(keys.right.pressed && lastKey===39){
        for(let i=0; i<boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rec1: player,
                    rec2: {...boundary, position:{
                        x:boundary.position.x-3,
                        y:boundary.position.y
                    }}
                })
            ){
                console.log("whhh");
                moving = false
                break
            }    
        }
        if(moving){
            movalbes.forEach(item=>{item.position.x-=3})
        }
        
    }else if(keys.left.pressed && lastKey===37){
        for(let i=0; i<boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rec1: player,
                    rec2: {...boundary, position:{
                        x:boundary.position.x+3,
                        y:boundary.position.y
                    }}
                })
            ){
                console.log("whhh");
                moving = false
                break
            }    
        }
        if(moving){
            movalbes.forEach(item=>{item.position.x+=3})
        }
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



