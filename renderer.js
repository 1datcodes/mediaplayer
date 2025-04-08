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
    const info = await window.media.getMediaInfo().then(console.log);
    console.log(window.media)
}, 3000);