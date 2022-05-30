console.log("Welcome to Amusify")

// Initialise the variables
let songIndex = 0; // Index of the song being played, starts with 0
let item; // The variable 'item' will be used to retrieve the element 'i' which corresponds to the song which is currently being played
let audioElement = new Audio(`songs/${songIndex+1}.mp3`); // The song
let masterPlay = document.getElementById('masterPlay'); // The play button at the bottom
let myProgressBar = document.getElementById('myProgressBar'); // The progress bar
let gif = document.getElementById('gif'); // The playing gif
let masterSongName = document.getElementById('masterSongName'); // The song name at the bottom
let songItems = Array.from(document.getElementsByClassName('songItem')); // Song items
let playedTime = document.getElementById('playedTime'); // Time of a song

let songs = [
    {songName: "Tere Sang Yaara", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Mai Rang Sharbaton Ka", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Paniyon Sa", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Tu Har Lamha", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Zindagi Kuch Toh Bata", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
]

// Displaying the cover image and the name of each song
songItems.forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    
    // Play the song if it has been paused or if it hasn't started playing
    if (audioElement.paused || audioElement.currentTime <= 0) {
        
        audioElement.play();

        // Replace the bottom play button with the pause botton
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        
        gif.style.opacity = 1; // Start playing the gif
        
        // Replace the play button corresponding to a song with its pause botton
        item = document.getElementById(`${songIndex}`);
        item.classList.remove('fa-play-circle');
        item.classList.add('fa-pause-circle');

    }

    // Otherwise, pause the song
    else{
        
        audioElement.pause();
        
        // Replace the bottom pause button with the play botton
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        
        gif.style.opacity = 0; // Stop playing the gif

        // Replace the pause button corresponding to a song with its play botton
        item = document.getElementById(`${songIndex}`);
        item.classList.remove('fa-pause-circle');
        item.classList.add('fa-play-circle');

    }
})

// Listen to events

// Listen to 'timeupdate' event
audioElement.addEventListener('timeupdate', ()=>{
    // Update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); // Progress of a song in %
    myProgressBar.value = progress;

    // Update the time (at the bottom of the page)
    playedTime.innerText = '0' + parseInt(audioElement.currentTime / 60) + ' : ' + ((parseInt(audioElement.currentTime % 60) < 10) ?  ('0' + parseInt(audioElement.currentTime % 60)) : parseInt(audioElement.currentTime % 60));
})

// Jump to the part of the song which the user seeks using the progress bar
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

// Function to replace the play/pause button corresponding to each song with a play button
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
} 

// Actions to be performed when the play/pause button corresponding to a song is clicked
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        
        // If it is a play button
        if (e.target.classList.contains('fa-play-circle')) {
            makeAllPlays();
            songIndex = parseInt(e.target.id); // Change the song index to the one which corresponds to the play button
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle'); // Replace the play button with pause button
            audioElement.src = `songs/${songIndex+1}.mp3`; // Change the source of the song which corresponds to the current song index
            masterSongName.innerText = songs[songIndex].songName; // Display the name of the new song at the bottom
            audioElement.currentTime = 0;
            audioElement.play(); // Play the song
            gif.style.opacity = 1; // Play the gif
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle'); // Replace the play button at the bottom with a pause button
        } 
        
        // If it is a pause button
        else {
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle'); // Replace the pause button with play button
            audioElement.pause(); // Pause the song
            gif.style.opacity = 0; // Stop playing the gif
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle'); // Replace the pause button at the bottom with a play button
        }

    })
})

// When the previous button is clicked
document.getElementById('previous').addEventListener('click', ()=>{
    if (songIndex <= 0) {
        songIndex = 0; // Make the song index 0 if it becomes negative
    } else {
        songIndex--; // Decrement the song index so that it points to the previous song
    }

    makeAllPlays();
    item = document.getElementById(`${songIndex}`);
    item.classList.remove('fa-play-circle');
    item.classList.add('fa-pause-circle'); // Change the play button of the song to be played to pause button

    audioElement.src = `songs/${songIndex+1}.mp3`; // Change the source of the song which corresponds to the current song index
    masterSongName.innerText = songs[songIndex].songName; // Display the name of the new song at the bottom
    audioElement.currentTime = 0;
    audioElement.play(); // Play the song
    gif.style.opacity = 1; // Play the gif
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle'); // Replace the play button at the bottom with a pause button
})

// When the next button is clicked
document.getElementById('next').addEventListener('click', ()=>{
    if (songIndex >= 4) {
        songIndex = 0; // Make the song index 0 if it reaches or exceeds the highest value
    } else {
        songIndex++; // Increment the song index so that it points to the next song
    }

    makeAllPlays();
    item = document.getElementById(`${songIndex}`);
    item.classList.remove('fa-play-circle');
    item.classList.add('fa-pause-circle'); // Change the play button of the song to be played to pause button

    audioElement.src = `songs/${songIndex+1}.mp3`; // Change the source of the song which corresponds to the current song index
    masterSongName.innerText = songs[songIndex].songName; // Display the name of the new song at the bottom
    audioElement.currentTime = 0;
    audioElement.play();  // Play the song
    gif.style.opacity = 1; // Play the gif
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle'); // Replace the play button at the bottom with a pause button
})

// When a song ends, the next song has to be played. The actions performed are same as those performed when the next button is clicked.
audioElement.addEventListener('ended', ()=>{
    if (songIndex >= 4) {
        songIndex = 0;
    } else {
        songIndex++;
    }

    makeAllPlays();
    item = document.getElementById(`${songIndex}`);
    item.classList.remove('fa-play-circle');
    item.classList.add('fa-pause-circle');

    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

