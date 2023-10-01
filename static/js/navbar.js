const nav = document.querySelector(".navbar");
window.onscroll = function () { 
    if (document.documentElement.scrollTop >= 240)
        nav.classList.add("scrolled");
    else
        nav.classList.remove("scrolled");
};