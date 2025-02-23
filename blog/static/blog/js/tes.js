
const asciiLocalStorage = (imgElement) => {

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
        else{
            updateBannerLightMode()
        }
    }
   
}
 