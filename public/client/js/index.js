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
                let fvr = false
                const heartIcon = data.status
                    ? `<i class="fa-solid fa-heart" style="color: red;"></i>`
                    : `<i class="fa-regular fa-heart"></i>`;

                document.querySelector('#footer-song-info').innerHTML = `
                    <div class="song-thumb">
                        <img src="${data.avatar}" alt="${data.title}">
                    </div>
                    <div class="song-info">
                        <div class="song-title">${data.title}</div>
                        <div class="song-artist">${data.singer || 'Ca sĩ'}</div>
                    </div>
                    <div class="song-actions">
                        <button class="btn-icon" fvr_song_id="${songId}">
                            ${heartIcon}
                        </button>
                        <button class="btn-icon">
                            <i class="fa-solid fa-ellipsis"></i>
                        </button>
                    </div>`;
                const footer_fvr = document.querySelector("[fvr_song_id]")
                if (footer_fvr) {
                    const icon = footer_fvr.querySelector("i")
                    const idSong = footer_fvr.getAttribute("fvr_song_id")
                    let isFavorite = icon.classList.contains("fa-solid")
                    footer_fvr.addEventListener("click", () => {
                        isFavorite = !isFavorite
                        if (isFavorite) {
                            icon.style.color = 'red';
                            icon.classList.replace('fa-regular', 'fa-solid');
                        } else {
                            icon.style.color = '';
                            icon.classList.replace('fa-solid', 'fa-regular');
                        }
                        fetch(`/favorite/${idSong}`, {
                            method: "POST", headers: {
                                "Content-Type": "application/json"
                            }, body: JSON.stringify({ status: isFavorite })
                        })
                            .then(res => res.json())
                            .then(data => {
                                isFavorite = data.isFavorite
                            })
                    })
                }
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
const imagebtn = document.querySelector(".avatar")
if (imagebtn) {
    imagebtn.addEventListener("click", () => {
        const url = new URL(window.location.href)
        url.pathname = ""
        const nexturl = url.href + "detail"
        window.location.href = nexturl
    })
}
const favorite = document.querySelector(".tab-item.tab-favorite")
if (favorite) {
    favorite.addEventListener("click", () => {
        const url = new URL(window.location.href)
        url.pathname = "" // đường dẫn trang chủ sau /  = "" 
        const nexturl = url.href + "favorite"
        window.location.href = nexturl
    })
}
const history = document.querySelector(".tab-item.tab-recent")
if (history) {
    history.addEventListener("click", () => {
        const url = new URL(window.location.href)
        url.pathname = "" // đường dẫn trang chủ sau /  = "" 
        const nexturl = url.href + "history"
        window.location.href = nexturl
    })
}
const uploaded = document.querySelector(".tab-item.tab-uploaded")
if (uploaded) {
    uploaded.addEventListener("click", () => {
        const url = new URL(window.location.href)
        url.pathname = "" // đường dẫn trang chủ sau /  = "" 
        const nexturl = url.href + "uploaded"
        window.location.href = nexturl
    })
}
const footer = document.querySelector(".footer-player")
const fvrSong = footer.querySelector("[fvr_song_id]")
if (fvrSong) {
    console.log(fvrSong)
}