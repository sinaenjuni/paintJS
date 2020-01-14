// const canvas = document.querySelector(".jsCanvas")
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsButtonRange");
const mode = document.getElementById("jsButtonMode");
const save = document.getElementById("jsButtonSave");


const INITIAL_COLOR = "#000000";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let isPainting = false;
let isFilling = false;

function startPainting(){
    isPainting = true;
}

function stopPainting(){
    isPainting = false;
}

function onMouseMove(event){
    const X = event.offsetX;
    const Y = event.offsetY;
    if(!isFilling){
        if(!isPainting){
            ctx.beginPath();
            ctx.moveTo(X, Y);
        }else {
            ctx.lineTo(X, Y);
            ctx.stroke();
        }
    }
}

function onCanvasClickListener(){
    if(isFilling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);

    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);

    canvas.addEventListener("click", onCanvasClickListener);
}

function onColorsClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; 
    ctx.fillStyle = color;

}

Array.from(colors).forEach(color => color.addEventListener("click", onColorsClick))

function onRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

if(range){
    range.addEventListener("input", onRangeChange);
}

function onButtomModeClick(event){
    if(isFilling){
        isFilling = false;
        mode.innerText = "Fill"
    }else{
        isFilling = true;
        mode.innerText = "Paint"
    }
}

if(mode){
    mode.addEventListener("click", onButtomModeClick)
}

function onButtonSaveClick(){
    const image = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = image;
    a.download = "PaintJS[EXPORT]";
    a.click();
}

if(save){
    save.addEventListener("click", onButtonSaveClick);
}