const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sidemenu');
const closeMenu = document.getElementById('closeMenu');

hamburger.addEventListener('click', () => {
    sideMenu.classList.add('active');
    setTimeout(() => {
        hamburger.style.display = 'none';
    }, 350);
});
closeMenu.addEventListener('click', () => {
    sideMenu.classList.remove('active');
    hamburger.style.display = 'flex';
});