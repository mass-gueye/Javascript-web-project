const video = document.querySelector('#video');
const buttonContainer = document.querySelector('.button-container');
const button = document.querySelector('#button');



// Prompt to select media screen, pass to video element then play
const selectMediaStream = async () => {
    try {
        const mediaStrem = await navigator.mediaDevices.getDisplayMedia();
        video.srcObject = mediaStrem;
        video.onloadedmetadata = () => {
            video.play();
        }
    } catch (error) {
        // catch error
        console.log('====================================');
        console.log('Error into the media stream function', error);
        console.log('====================================');
    }
}


button.addEventListener('click', async () => {
    // Disable button
    button.disabled = true;
    // start picture in picture
    await video.requestPictureInPicture();
    // reset button
    button.disabled = false;
});

// on load
selectMediaStream()