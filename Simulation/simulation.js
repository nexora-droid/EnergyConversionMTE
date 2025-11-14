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

function startAnimation(){
    cancelAnimationFrame(animationId);
    function animate(){
        clear();

        gearAngle += gearSpeed * 0.03;
        
        drawGear(300, 300, 100);
        drawWire();

        if (mode) drawOutput();

        animationId = requestAnimationFrame(animate);
    }
    animate();
}

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
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#222';
    ctx.fill();
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 4;
    ctx.stroke();
    
    const teeth = 12;
    const toothLength = 12;
    const toothWidth = 30;
    for (let i = 0; i < teeth; i++) {
        const a = (i/teeth) * Math.PI * 2;
        ctx.save();
        ctx.rotate(a);
        ctx.fillStyle = "#333";
        ctx.fillRect(-toothWidth/2, radius - 1, toothWidth, toothLength);
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

       let alpha = gearSpeed / 10;
       ctx.globalAlpha = alpha;

       ctx.fillStyle = "yellow";
       ctx.fill();

       ctx.globalAlpha = 1;
       
    } else if (mode == "thermal") {
        for (let i = 0; i < 5; i++){
            ctx.beginPath();
            let size = 10 + gearSpeed * 2 + Math.random() * 10;
            ctx.globalAlpha = 0.2 + Math.random() * 0.3;
            ctx.fillStyle = "orange";
            ctx.ellipse(x+Math.random() * 20 - 10, y - Math.random() * 30, 15, size, 0, 0, Math.PI*2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
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