const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


const playlist = $('.playlist');
const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio') 
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const song = $('.song');
console.log(song);
var listIndex = [];
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,

    songs: [
        {
        name: "Nevada",
        singer: " Vicetone feat Cozi Zuehlsdorff",
        path: "./assets/music/song1.mp3",
        image: "./assets/img/pic1.jpg",
        },
        {
        name: "Mặt mộc",
        singer: "Phạm Nguyên Ngọc x VAnh x Ân Nhi",
        path: "./assets/music/song2.mp3",
        image: "./assets/img/pic2.jpg",
        },
        {
        name: "See tình",
        singer: "Hoàng Thùy Linh",
        path:"./assets/music/song3.mp3",
        image: "./assets/img/pic3.jpg",
        },
        {
        name: "Summertime",
        singer: "Cinnamons x Evening Cinema",
        path: "./assets/music/song4.mp3",
        image:"./assets/img/pic4.jpg",
        },
        {
        name: "Monsters",
        singer: "Katie Sky",
        path: "./assets/music/song5.mp3",
        image: "./assets/img/pic5.jpg",
        },
        {
        name: "Alone",
        singer: "Alan Walker",
        path: "./assets/music/song6.mp3",
        image: "./assets/img/pic6.jpg",    
        },
        {
        name: "Độ tộc 2",
        singer: "MASEW x PHÚC DU x PHÁO x ĐỘ MIXI",
        path: "./assets/music/song7.mp3",
        image:"./assets/img/pic7.jpg",
        },
        {
        name: "Way Back Home",
        singer: "SHAUN feat. Conor Maynard",
        path: "./assets/music/song8.mp3",
        image:"./assets/img/pic8.jpg",       
        },
        {
        name: "Dance Monkey",
        singer: "Tones and I",
        path: "./assets/music/song9.mp3",
        image: "./assets/img/pic9.jpg",
        },
        {
        name: "Beliver",
        singer: "Imagine Dragons",
        path: "./assets/music/song10.mp3",
        image: "./assets/img/pic10.jpg",
        },
        {
        name: "Thunder",
        singer: "Imagine Dragons",
        path: "./assets/music/song11.mp3",
        image:"./assets/img/pic11.jpg",
        },
        {
        name: "Bones",
        singer: "Imagine Dragons",
        path: "./assets/music/song12.mp3",
        image: "./assets/img/pic12.jpg",
        },
        {
        name: "BO XÌ BO",
        singer: "Hoàng Thuỳ Linh",
        path: "./assets/music/song13.mp3",
        image: "./assets/img/pic13.jpg",
        },
        {
        name: "Lily",
        singer: "Selena Gomez, Marshmello, David Guetta",
        path: "./assets/music/song14.mp3",
        image: "./assets/img/pic14.jpg",
        },
        {
        name: "Thị Mầu",
        singer: "Hòa Minzy x Masew",
        path: "./assets/music/song15.mp3",
        image: "./assets/img/pic15.jpg",
        },
        {
        name: "Bán bánh mì",
        singer: "PHÚC DU",
        path: "./assets/music/song16.mp3",
        image: "./assets/img/pic16.jpg",
        },
        {
        name: "Cứ Chill Thôi",
        singer: "Chillies ft Suni Hạ Linh & Rhymastic",
        path: "./assets/music/song17.mp3",
        image: "./assets/img/pic17.jpg",
        },
        {
        name: "MUỘN RỒI MÀ SAO CÒN",
        singer: "SƠN TÙNG M-TP",
        path: "./assets/music/song18.mp3",
        image: "./assets/img/pic18.jpg",
        },
    
    ],

    render: function(){
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index == this.currentIndex? 'active' : ''}" data-index="${index}">
                    <div class="thumb" style="background-image: url('${song.image}')"></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
                `
        })
        $('.playlist').innerHTML = htmls.join('');
    },
    defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex]
            }})
    },
    handleEvents: function(){
        var _this = this;
        const cdWidth = cd.offsetWidth;

    
        // xu li cd quay vong
        const cdThumbAnimate = cdThumb.animate([
            {transform : 'rotate(360deg)'}
         ],{
            duration: 30000,
            iteration: Infinity ,
         })
         cdThumbAnimate.pause();
        //xu li phong to
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth/cdWidth;
        }

        //xu li play
        playBtn.onclick = function(){
            _this.render();
            if(_this.isPlaying){
                audio.pause();
            }else{
                audio.play();
            _this.scrollToActiveSong(); 
            }
        }

        //khi play
        audio.onplay = function(){
            _this.isPlaying = true;
            player.classList.add('playing')
            cdThumbAnimate.play();
        }
        // khi pause
        audio.onpause = function(){
            _this.isPlaying = false;
            player.classList.remove('playing')
            cdThumbAnimate.pause();
        }
        // khi tien do bai hat thay doi
        audio.ontimeupdate = function(){
            const currentTimeLine = audio.currentTime / audio.duration * 100;
            progress.value = currentTimeLine ;
            
        }
        // tu dong chuyen bai
        audio.onended = function(){
            return _this.isRepeat ? audio.play() : nextBtn.click();
        }
        // khi tua bai hat 
        progress.onchange = function(){
            const seek = progress.value * audio.duration / 100;
            audio.currentTime = seek ;
        }
        // khi next bai hat 
        nextBtn.onclick = function(){
            cdThumbAnimate.play();
            if(_this.isRandom){
                _this.nextSongRandom();
            }else{
                _this.nextSong();
            }
        }
         // khi prev bai hat 
        prevBtn.onclick = function(){
            cdThumbAnimate.play();
            if(_this.isRandom){
                _this.prevSongRandom();
            }else{
                _this.prevSong();   
            }
        }
        // khi random bai hat
        randomBtn.onclick = function(e){
            if(_this.isRandom){
                _this.isRandom = false;
                randomBtn.classList.remove("active");
            }else {
                _this.isRandom = true;
                randomBtn.classList.add("active");
            }
        }
        // khi repeat bai hat
        repeatBtn.onclick = function(){
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle("active", _this.isRepeat);
        }

        //lang nghe click vao playlist
        playlist.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)')
            if(songNode || e.target.closest('.option')){
                if(songNode){
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render()
                    audio.play()
                }
            }
        }

    },
    loadCurrentSong: function(){
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        heading.textContent = this.currentSong.name;
        audio.src = this.currentSong.path;
    },
    // listIndexRandom: function(){
    //     var listIndex = [];
    //     var randomIndex;
    //     isSameIndex = false;
    //     for (var i=0; i<this.songs.length; i++){
    //         do{
    //             randomIndex = Math.floor(Math.random() * this.songs.length)
    //                 for (var j=0 ; j<listIndex.length ; j++){
    //                     if(listIndex[j] == randomIndex){
    //                         isSameIndex = true;
    //                         break;
    //                     }else{
    //                         isSameIndex = false;
    //                     }}
    //         }while (isSameIndex);
    //         listIndex.push(randomIndex)
    //     }  
    //     return listIndex;
    // },
    // nextSongRandom : function(listIndex){
    //     if(listIndex.length<= 0){
    //         randomBtn.click();
    //         randomBtn.click();
    //         setTimeout(function(){
    //             nextBtn.click();
    //         },1);
    //     }
    //     var n = listIndex.pop();
    //     this.currentIndex = n;
    //     this.loadCurrentSong();
    //     this.render();
    //     this.scrollToActiveSong();
    //     audio.play();
    //     console.log(listIndex.length,n)
    // },
     

    nextSongRandom : function(){
        var randomIndex;
        isSameIndex = false;
        do{
            randomIndex = Math.floor(Math.random() * this.songs.length)
                    for (var j=0 ; j<listIndex.length ; j++){
                        if(listIndex[j] == randomIndex){
                            isSameIndex = true;
                            break;
                        }else{
                            isSameIndex = false;
                        }}
        }while (isSameIndex);
        this.currentIndex = randomIndex;
        listIndex.push(randomIndex)
        console.log(randomIndex, listIndex)
        if (listIndex.length >= this.songs.length){
            listIndex.length = 0
        }
        this.loadCurrentSong();
        this.render();
        this.scrollToActiveSong();
        audio.play();
    },
    prevSongRandom : function(){
        this.currentIndex = listIndex[listIndex.length - 2]
        listIndex.pop();
        console.log(listIndex)
        this.loadCurrentSong();
        this.render();
        this.scrollToActiveSong();
        audio.play();
    },
    scrollToActiveSong: function(){
        var activeSong = $('.song.active');
        activeSong.scrollIntoView({
            behavior: 'smooth',
            block:'center'
        });
    },
    nextSong: function(){
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0;
        }
        this.loadCurrentSong()
        audio.play();
        this.render();
        this.scrollToActiveSong();
    },
    

    prevSong: function(){
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length;
        }
        this.loadCurrentSong()
        this.scrollToActiveSong();
        this.render();
        audio.play();
    },

    start: function(){
        // đingj nghĩa các thuọc tính
        this.defineProperties()
        //lắng nghe/ xử lí các sự kiện
        this.handleEvents();
        //tải thông tin bài hát đầu tiên vào UI
        this.loadCurrentSong()
        //render playlist
        this.render()
        
        
    },

}

app.start();

