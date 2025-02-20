"use strict";

let darkmode = localStorage.getItem('darkmode')
let ascii_img = localStorage.getItem('ascii_img')

const themeswitch = document.getElementById('theme-switch')
const bannerImg = document.getElementById("banner")
const darkmodebanner = "/static/blog/images/8bitimage2.jpg"
const lightmodebanner = "/static/blog/images/WebsitebannerEdited.jpg"
const ascii_image= "/static/blog/images/output.txt";

// USE LOCAL STORAGE TO FIGURE OUT HOW TO KEEEP TEXT ON THE SCREEN
const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')

    if (document.body.contains(bannerImg)) {
        updateBannerDarkMode();
    }
    
}
const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
    let pre = document.getElementById("ascii");

    if (document.body.contains(pre)) {

        updateBannerLightMode();
    }
}

//pre.innerHTML = localStorage.getItem('ascii_img')

// Using fetch with await 
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
    
    function textTyping(preElement, lines, i = 0) {
        
        if (i < lines.length) 
        {  
            preElement.textContent += lines[i] + '\n'
        }
        setTimeout(() => textTyping(preElement, lines, i + 1), 50);

    }
    localStorage.setItem("ascii_img", JSON.stringify(lines));    
    textTyping(preElement, lines);     
    imgElement.parentNode.replaceChild(preElement, imgElement);
}

//Using fetch with .then 
const updateBannerLightMode = () => {
    let preElement1 = document.getElementById("ascii");

    fetch(lightmodebanner)
        .then(response => response.blob())
        .then(blob => {
            let imgElement = document.createElement("img");
            const objectURL = URL.createObjectURL(blob);
            imgElement.src = objectURL;
            preElement1.parentNode.replaceChild(imgElement, preElement1);
            
        })
        .catch(error => console.error("Error loading banner image:", error)); 
}
 

if (darkmode === "active"){
    enableDarkmode()
}

themeswitch.addEventListener("click", () =>{
    darkmode = localStorage.getItem('darkmode')
    if (darkmode !== "active"){
        enableDarkmode()
    } 
    else{
        disableDarkmode();
    }
})
// found from Django website: 
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