
const bindSpaLinks = function () {

    const links = document.getElementsByClassName("spaLink");

    for(let i=0; i<links.length; i++){

        const href = links[i].getAttribute("href");
        const fragment = extractFragment(href);

        links[i].onclick = () => toPage(fragment);
    }
};

const toPage = function(fragment){

    const url = window.location.href;
    const sharp = url.indexOf("#");

    let base;
    if(sharp < 0){
        base = url;
    } else {
        base = url.substring(0, sharp);
    }

    const redirected = base + "#" + fragment;
    history.pushState(null, null, redirected);

    routePages();
};

const extractFragment = function (url) {

    const sharp = url.indexOf("#");

    if(sharp < 0){
        return "";
    } else {
        return url.substring(sharp + 1);
    }
};

const routePages = function () {

    const pages = document.getElementsByClassName("spaPage");

    const url = window.location.href;

    const current = extractFragment(url);


    for(let i=0; i<pages.length; i++){

        const path = pages[i].getAttribute("path");

        const fragment = extractFragment(path);

        if(fragment === current){
            pages[i].style.display="block";
        } else {
            pages[i].style.display="none";
        }
    }
};


bindSpaLinks();
routePages();