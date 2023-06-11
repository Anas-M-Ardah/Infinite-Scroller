// Prompt the User to enter his api key
const apiKey = prompt("Enter your Api_Access_Key to access the Unsplash Api");

// Unsplash Api
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
const loader = document.getElementById("loader");
const imgContainer = document.getElementById("img-container");

//Check if image is loaded
function imageLoaded(){
    console.log(imageLoaded);
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        // console.log("ready = ", ready);
        loader.hidden = true;
        imagesLoaded = 0;
    }
}

// Helper function to Set Attributes on DOM Elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}


// Create elements for links & photos and add them to the DOM
function displayPhotos(){
    totalImages = photosArray.length;
    // console.log("total images = ",totalImages)
    photosArray.forEach((photo)=>{
        // Create <a> to link to Unsplash
        const item = document.createElement("a");
        setAttributes(item,{
            "href": photo.links.html,
            "target": "_blank"
        });
        // Create <img> for photo 
        const img = document.createElement("img");
        setAttributes(img,{
            "src": photo.urls.regular,
            "alt": photo.alt_description,
            "title": photo.alt_description
        });
        // Event Listener, check when each is finished loading
        img.addEventListener("load",imageLoaded);
        // Put <img> inside item and then but them both inside img-container
        item.appendChild(img);
        imgContainer.appendChild(item);
    });
}


// Get photos from Unsplash Api
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
        alert("Visit the link and try to get your API Access key");
    }
}

// Check to see if scrolling near the bottom of the page, Load more photos
window.addEventListener("scroll",()=>{
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready){
        getPhotos();
        ready = false;
        // console.log("load more");
    }
    
});

// On Load
getPhotos();