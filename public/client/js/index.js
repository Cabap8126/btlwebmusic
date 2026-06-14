const aplayer = document.querySelector('#aplayer')
if (aplayer) {
    const ap = new APlayer({
        container: aplayer,
        audio: [{
            name: 'tên 1',
            artist: 'ca sĩ',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            cover: 'https://backend.daca.vn/assets/images/cat-doi-noi-sau.jpg',
            lrc: '[00:00.00] Lời bài hát dòng 1\n[00:04.00] Lời bài hát dòng 2'
        }],
        autoplay: true
    });
}