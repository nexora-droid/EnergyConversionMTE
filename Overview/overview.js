const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sidemenu');
const closeMenu = document.getElementById('closeMenu');

hamburger.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
});
closeMenu.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
});