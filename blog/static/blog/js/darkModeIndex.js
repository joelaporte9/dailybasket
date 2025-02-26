// Snaky Basket
// Last update: 2/25/2025

"use strict";

let darkmode = localStorage.getItem('darkmode')
let ascii_img = localStorage.getItem("ascii_img")

const themeswitch = document.getElementById('theme-switch')
const bannerImg = document.getElementById("banner")
const lightmodebanner = "/static/blog/images/WebsitebannerEdited.jpg"

//Enables the dark mode and stores the state in local storage
const enableDarkmode = ()  => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

// Disables the dark mode and updates the image banner to the right 
// image if the ascii text is visible. 
const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
    let pre = document.getElementById("ascii");

    if (pre) {

        updateBannerLightMode();
    }
} 

// This function grabs the text file created in the view.py/ascii_img function.
// Once the text is loaded then the file is split into seperate lines and
// stored into local storage. This is called when the dark mode button is pressed 
// and it will load the text using the lineRender() function, Giving it the effect of 
// and old terminal.  
const updateBannerDarkMode = async () => {
    let response = await fetch('/ascii/', {
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
        }
    })

    let data = await response.text()
    let imgElement = document.getElementById("banner");
    let preElement = document.createElement("pre");
    preElement.id = "ascii";
    let lines = data.split("\n")
    localStorage.setItem("ascii_img", JSON.stringify(lines));

    // Checks to see if the img banner is present, if it is then replace the image with ascii -
    // if the image is not visable but the tag is still present in the Div container the we need to -
    // replace that img tag with a pre tag so we can load the asiii in the pre tag and append that to the div.
    if (imgElement){
        imgElement.parentNode.replaceChild(preElement, imgElement);
    }
    else{ 
        let imgTag = document.getElementsByTagName("img")
        let divContainer = document.getElementById("contain")
        if (imgTag.length > 0) {
            imgTag[0].parentNode.removeChild(imgTag[0]);
            let preEl = document.createElement("pre");
            preEl.id = "ascii"
            let asciiData = JSON.parse(localStorage.getItem('ascii_img'));
            preEl.textContent = asciiData.join('\n');
            divContainer.append(preEl) 
        }
    }
    lineRender(preElement, lines);
}

// This function creates the lines redering effect when switching to dark mode.
// Takes the length of the lines is less than the index provided(0) -
// then append the lines to the pre tag and incriment by 1, executing in 30ms
function lineRender(preElement, lines, i = 0) {
        
    if (i < lines.length) {  
        preElement.textContent += lines[i] + '\n'
        setTimeout(() => lineRender(preElement, lines, i + 1), 30);
    }
}

// Get the image from static images. 
const updateBannerLightMode = async () => {
    let response = await fetch(lightmodebanner, {
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
        }
    })
    let data = await response.blob()
    let preElement1 = document.getElementById("ascii");
    let imgElement = document.createElement("img");
    const objectURL = URL.createObjectURL(data);
    imgElement.src = objectURL;
    preElement1.parentNode.replaceChild(imgElement, preElement1);
}

// When a user refreshes or loads the page and the ascii banner is not in local storage - load it with 
// updateBannerDarkMode() and that will trigger lineRender(). If it is in local storage, 
// just replace the image with the local storage data(ascii text)
if (darkmode === "active"){
    enableDarkmode()
    let asciiData = JSON.parse(localStorage.getItem('ascii_img'));

    if (!asciiData)
    {
        updateBannerDarkMode()
    }
    else
    {
        let pre = document.getElementById("ascii");
        let divContainer = document.getElementById("contain")

        if (!pre){ 
            let imgElement = document.getElementById("banner");
            imgElement.remove()
            let preEl = document.createElement("pre");
            preEl.id = "ascii"
            let asciiData = JSON.parse(localStorage.getItem('ascii_img'));
            preEl.textContent = asciiData.join('\n');
            divContainer.append(preEl) 
        }
    }
    
}
// this is the event listner that is activated when the dark mode button is clicked
// If dark mode is not active in local storage, it wll hit off the dark mode function
// and dark mode banner to render ascii txt lines. 
themeswitch.addEventListener("click", () =>{
    darkmode = localStorage.getItem('darkmode')
    if (darkmode !== "active"){
        enableDarkmode()
        updateBannerDarkMode()
    }
    else{
        disableDarkmode();
    }
})

// Function is from the django documention. Needed for rendering the Django data in HTML.
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');