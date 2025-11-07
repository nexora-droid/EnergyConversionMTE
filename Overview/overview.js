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
    }, 100);
}
hamburger.addEventListener('click', openMenu);
closeMenu.addEventListener('click', closeMenuFunc);
overlay.addEventListener('click', closeMenuFunc);  