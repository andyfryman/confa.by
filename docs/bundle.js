/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener('scroll', function(e) {
        const element = document.querySelector("header.header");
        const button = document.querySelector(".program_button_wrapper");
    
        if (window.scrollY > 0) {
            element.classList.add("scrolled");
        } else {
            element.classList.remove("scrolled");
        }
    
        if (window.scrollY > 100) {
            button.classList.add("visible");
        } else {
            button.classList.remove("visible");
        }
    });
    
    document.addEventListener('click', function(e) {
        e = e || window.event;
        const target = e.target;
        const elem = document.querySelector(".navigation_mobile_button");
    
        if (target !== elem) {
            const element = document.querySelector("div.navigation_tabs");
            element.classList.remove("visible");
        }
    
    }, false);
    
    function navigationButtonClick() {
        const element = document.querySelector("div.navigation_tabs");
        if (element.classList.contains("visible")) {
            element.classList.remove("visible");
        } else {
            element.classList.add("visible");
        }
    }
    
    const menuButton = document.querySelector("div.navigation_mobile_button")
    menuButton.addEventListener("click", () => navigationButtonClick());
});
/******/ })()
;