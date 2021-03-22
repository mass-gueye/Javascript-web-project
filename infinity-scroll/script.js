const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');
let photos = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
let count = 5;
const apiKey = "Xg0i70i0YP5B9iEotReA8cvPjY5jI__Utleky2P1Vpc";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&SameSite=Lax`;

// Set attributes funcion helper
const setAttributes = (el, attrs) => {
    for (const key in attrs) {
        el.setAttribute(key, attrs[key])
    }
}

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;

    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = ready;
        count += 30;
    }
}


// Get photos from unsplash API
const getPhotos = async () => {
    try {
        const response = await fetch(apiUrl);
        photos = await response.json();
        totalImages = photos.length;
        imagesLoaded=0;
        
        photos.forEach(photo => {

            // Creating html elements
            // anchor tag and attribute
            let a = document.createElement('a');

            setAttributes(a, {
                href: photo.links.html,
                target: '_blank'
            })

            // adding image to the image container
            imageContainer.appendChild(a);
            // image tag and attributes
            let img = document.createElement('img');
            setAttributes(img, {
                src: photo.urls.regular,
                alt: photo.alt_description,
                title: photo.alt_description
            })
            // adding image to the anchor tag
            a.appendChild(img);

            // Event listener, check when each is finished loading
            img.addEventListener('load', imageLoaded)
        })
    } catch (error) {
        // Catch error here
        console.log(error);
    }
}

// Check to see if scrolling near the bottom of our page to load more images
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        loader.hidden = ready;
        getPhotos();
    }
});

// on Load
getPhotos();