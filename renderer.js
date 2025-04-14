const { getMediaInfo } = require('./fetchmedia');

document.getElementById('play').addEventListener('click', () => {
    console.log('Toggle play/pause');
})

document.getElementById('prev').addEventListener('click', () => {
    console.log('Previous track');
})

document.getElementById('next').addEventListener('click', () => {
    console.log('Next track');
})


setInterval(async () => {
    const info = await getMediaInfo();
    console.log("Now Playing: ", info);
}, 3000)