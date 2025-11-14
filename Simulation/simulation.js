const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sidemenu');
const closeMenu = document.getElementById('closeMenu');
const overlay = document.getElementById('overlay');

function openMenu(){
    sideMenu.classList.add('active');
    setTimeout(() => {
        hamburger.style.display = 'none';
    }, 350);
    overlay.classList.add('active');
}
function closeMenuFunc(){
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
    setTimeout(() => {
        hamburger.style.display = 'flex';
    }, 350);
}
hamburger.addEventListener('click', openMenu);
closeMenu.addEventListener('click', closeMenuFunc);
overlay.addEventListener('click', closeMenuFunc);  


// SIMULATION

const canvas = document.getElementById('sim-canvas');
const ctx = canvas.getContext('2d');
const buttons = document.querySelectorAll('.sim-button');
const speedSlider = document.getElementById('speedSlider');
const controls = document.getElementById('controls');

let mode = "null";
let gearSpeed = "5";
let gearAngle = 0;
let animationId;


buttons.forEach(button => {
    button.addEventListener("click", () => {
        mode = button.dataset.type;

        buttons.forEach (b => {
            if (b === button) {
                b.classList.add("active");
                b.classList.remove("faded");
            } else {
                b.classList.add("faded");
                b.classList.remove("active");
            }
        });

        controls.style.display = "block";

        startAnimation();
    });
});

speedSlider.addEventListener("input", () => {
    gearSpeed = Number(speedSlider.value);
});

function clear(){ 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawGear(x, y, radius) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(gearAngle);

    ctx.beginPath();
    ctx.arc(0, 0, 0.8 * radius, 0, Math.PI * 2);
    ctx.fillStyle = '#222';
    ctx.fill();
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 4;
    ctx.stroke();
    
    const teeth = 12;
    for (let i = 0; i < teeth; i++) {
        const a = (i/teeth) * Math.PI * 2;
        const tx = Math.cos(a) * radius;
        const ty = Math.cos(a) * radius;
        ctx.save();
        ctx.translate(tx, ty);
        ctx.rotate(a);
        ctx.fillStyle = "#333";
        ctx.fillRect(-6, -6, 12, 12);
        ctx.restore();
    }

    ctx.restore();
}
function drawWire(){
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(400, 300);
    ctx.lineTo(1000, 300);
    ctx.stroke();
}

function drawOutput(){
    const x = 1000, y = 300;
    if (mode === "electric") {
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI*2);
        ctx.strokeStyle = "#fff";
        ctx.stroke();

        if (gearSpeed > 6) {
            ctx.fillStyle = "yellow";
            ctx.globalAlpha = 0.3;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    } else if (mode == "thermal") {
        ctx.fillStyle("orange");
        ctx.beginPath();
        ctx.ellipse(x, y, 30, 60, 0, 0, Math.PI * 2);
        ctx.fil();
    } else if (mode == "kinetic"){
        ctx.save();
        ctx.translate(x,y);
        ctx.rotate(gearAngle);
        ctx.fillStyle = "#ccc";
        for (let i = 0; i < 4; i++){
            ctx.rotate(Math.PI / 2);
            ctx.fillRect(0, -10, 80, 20);
        }
        ctx.restore();
    }
}
