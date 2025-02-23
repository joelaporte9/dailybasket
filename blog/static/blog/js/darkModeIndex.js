"use strict";

let darkmode = localStorage.getItem('darkmode')
let ascii_img = localStorage.getItem('ascii_img')

const themeswitch = document.getElementById('theme-switch')
const bannerImg = document.getElementById("banner")
const lightmodebanner = "/static/blog/images/WebsitebannerEdited.jpg"

const enableDarkmode = async ()  => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')

}
const disableDarkmode = async () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
    let pre = document.getElementById("ascii");

    if (document.body.contains(pre)) {

        updateBannerLightMode();
    }
}

// Using fetch with await 
const updateBannerDarkMode = async () => {
    let response = await fetch('/ascii/', {
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
        }
    })

    // getting the response from python view and turningit into text
    // then we get the image banner and create a new pre tag
    // asign the pre tag and ID "ascii" and split text into new lines
    let data = await response.text()
    let imgElement = document.getElementById("banner");
    let preElement = document.createElement("pre");
    preElement.id = "ascii";
    let lines = data.split("\n")
    localStorage.setItem("ascii_img", JSON.stringify(lines));

    // If the banner exists when dark mode is selcted, change it to ascii
    if (imgElement){
        imgElement.parentNode.replaceChild(preElement, imgElement);
    }
    else{ // swithcing back to dark mode after being in light mode. 
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

    // This function handles the typewriter affect of the ascii text rendering
    // takes in the lines from the steps above, and loops through line by line 
    // stores the lines in local stage and reads it as a string
    function textTyping(preElement, lines, i = 0) {
        
        if (i < lines.length) 
        {  
            preElement.textContent += lines[i] + '\n'
            setTimeout(() => textTyping(preElement, lines, i + 1), 30);
        }
        
    }
    textTyping(preElement, lines);

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
    updateBannerDarkMode()
}

// DOMCONTENT LOAD https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event

// add banner switch function 

document.addEventListener("DOMContentLoaded", (event) => {
    ascii_img = localStorage.getItem('ascii_img')

});
// swicth the update banner method and the gewt items 
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

// found from Django website: this is used for asyncronous calls from django to javascript using ajax.
// CRF tokens are for displaying the data in html  
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