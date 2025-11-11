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

const scrollElement = document.querySelectorAll('.animimg');

scrollElement.forEach((el) => {
    el.style.transform = 'translateY(100px) rotate(0deg)';
});
const elementInView = (el, percentageScroll=100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight * (percentageScroll/100))
    );
}

const displayScrollElement = (elment) => {
    elment.classList.add('scrolled');

    setTimeout(() => {
        elment.style.transition = 'transform 800ms ease-out';
        elment.style.transform = 'translateY(0) rotate(-11.66deg)';
    }, 100);
};
const handleScrollAnimation = () => {
    scrollElement.forEach((el) => {
        if(elementInView(el, 200)){
            displayScrollElement(el);
        }
    })
};
const hideScrollElement = (elment) => {
    elment.classList.remove('scrolled');
}
window.addEventListener('scroll', () => {
    handleScrollAnimation();
});