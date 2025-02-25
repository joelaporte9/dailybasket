"use strict";

let darkmode = localStorage.getItem('darkmode')
let ascii_img = localStorage.getItem("ascii_img")

const themeswitch = document.getElementById('theme-switch')
const bannerImg = document.getElementById("banner")
const lightmodebanner = "/static/blog/images/WebsitebannerEdited.jpg"


const enableDarkmode = ()  => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
    let pre = document.getElementById("ascii");

    if (pre) {

        updateBannerLightMode();
    }
} 

const getasciiData = async () => {
    let response = await fetch('/ascii/', {
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
        }
    })

    return await response.text()
}

function textTyping(preElement, lines, i = 0) {
        
    if (i < lines.length) 
    {  
        preElement.textContent += lines[i] + '\n'
        setTimeout(() => textTyping(preElement, lines, i + 1), 30);
    }
}

const loadAscii = async () => {
    let data = await getasciiData()
    let imgElement = document.getElementById("banner");
    let preElement = document.createElement("pre");
    preElement.id = "ascii";
    let lines = data.split("\n")
    let localStoageData = localStorage.setItem("ascii_img", JSON.stringify(lines));

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

}

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
// THIS IS WHERE I NEED T MAKE THE ASCII ART STAY OIN THEME SWITCH AND LOAD
if (darkmode === "active"){
    enableDarkmode()
    loadAscii()



    //updateBannerDarkMode()
    // let pre = document.getElementById("ascii");
    // let divContainer = document.getElementById("contain")

    // if (!pre){   

    //     let preEl = document.createElement("pre");
    //     preEl.id = "ascii"
    //     let asciiData = JSON.parse(localStorage.getItem('ascii_img'));
    //     preEl.textContent = asciiData.join('\n');
    //     divContainer.append(preEl) 
    // }
  
}

themeswitch.addEventListener("click", () =>{
    darkmode = localStorage.getItem('darkmode')
    if (darkmode !== "active"){
        enableDarkmode()
        loadAscii()

        //updateBannerDarkMode()
    }
    else{
        disableDarkmode();
    }
})

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