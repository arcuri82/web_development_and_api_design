
/*
    On each tag marked with the CSS class "spaLink" we do
    dynamically add a "onClick" handler
 */
const bindSpaLinks = function () {

    const links = document.getElementsByClassName("spaLink");

    for(let i=0; i<links.length; i++){

        const href = links[i].getAttribute("href");
        const fragment = extractFragment(href);

        links[i].onclick = () => toPage(fragment);
    }
};

/*
    Change the content on the address bar in the browser, by updating
    the fragment content # of the URL.
    Then, re-draw the page based on the URL.
 */
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

/*
    Given a URL, return the content of the # fragment part,
    or an empty string otherwise
 */
const extractFragment = function (url) {

    const sharp = url.indexOf("#");

    if(sharp < 0){
        return "";
    } else {
        return url.substring(sharp + 1);
    }
};

/*
    Use JavaScript to decide which components in the page should
    be displayed based on the # fragment in the URL
 */
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

/*
    Start by binding all the links, and display page based
    on the URL in the address bar (dynamically with JavaScript)
 */
bindSpaLinks();
routePages();