const aplayer = document.querySelector('#aplayer');
if (aplayer) {
    const ap = new APlayer({
        container: aplayer,
        audio: [],
        autoplay: false,
        loop: 'all',
        order: 'list',
        theme: '#1db954'
    });

    const songElements = document.querySelectorAll('[data-song-id]');
    songElements.forEach(songItem => {
        songItem.addEventListener('click', () => {
            const songId = songItem.getAttribute('data-song-id');
            fetch(`/song/${songId}`).then(res => res.json()).then(data => {
                ap.list.clear();
                ap.list.add({
                    name: data.title,
                    artist: data.singer || 'Ca sĩ',
                    url: data.audio,
                    cover: data.avatar
                });
                ap.play();
                document.querySelector('#footer-song-info').innerHTML = `
                    <div class="song-thumb">
                        <img src="${data.avatar}" alt="${data.title}">
                    </div>

                    <div class="song-info">
                        <div class="song-title">${data.title}</div>
                        <div class="song-artist">${data.singer || 'Ca sĩ'}</div>
                    </div>

                    <div class="song-actions">
                        <button class="btn-icon">
                            <i class="fa-regular fa-heart"></i>
                        </button>

                        <button class="btn-icon">
                            <i class="fa-solid fa-ellipsis"></i>
                        </button>
                    </div>
                    `;
            });
        });
    });
}
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const closeAlert = showAlert.querySelector("[close-alert]")
    const time = parseInt(showAlert.getAttribute("data-time"));
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time)
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    })
}