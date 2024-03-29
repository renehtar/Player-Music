import db from './db.js'

let nextdb = Math.floor(Math.random() * db.length)

export default {
  // váriaveis globais
  img: document.querySelector('img'),
  background: document.querySelector('.bgImage'),
  musicName: document.querySelector('.nameMusic'),
  progress: document.querySelector('.progressBar'),
  autor: document.querySelector('.autor'),
  iconVolume: document.querySelector('.iconVolume'),
  volume: document.querySelector('.volume'),
  arrowLeft: document.querySelector('.arrowLeft'),
  playPause: document.querySelector('.playPause'),
  arrowRight: document.querySelector('.arrowRight'),
  repeat: document.querySelector('.repeat'),
  audio: new Audio(db[nextdb].song),
  isPlaying: false,
  isRepeating: false,
  isMute: false,
  // funções
  start() {
    this.img.src = db[nextdb].img
    this.background.style.backgroundImage = `url(${db[nextdb].img})`
    this.musicName.innerText = db[nextdb].nameMusic
    this.autor.innerText = db[nextdb].autor
    this.audio.volume = this.volume.value / 100
    this.progress.max = this.audio.duration
    this.actions()
  },
  actions() {
    this.audio.onloadeddata = () => {
      this.start()
    }
    this.arrowLeft.onclick = () => this.previousMusic()
    this.playPause.onclick = () => this.togglePayPause()
    this.arrowRight.onclick = () => this.nextMusic()
    this.progress.oninput = () => this.progressBar()
    this.audio.ontimeupdate = () => this.updateProgress()
    this.audio.onended = () => this.nextMusic()
    this.repeat.onclick = () => this.toggleRepeat()
    this.iconVolume.onclick = () => this.toggleMute()
    this.volume.oninput = () => this.setVolume()
  },
  play() {
    this.isPlaying = true
    this.audio.play()
    this.playPause.classList.replace('fa-play', 'fa-pause')
  },
  pause() {
    this.isPlaying = false
    this.audio.pause()
    this.playPause.classList.replace('fa-pause', 'fa-play')
  },
  togglePayPause() {
    this.isPlaying ? this.play() : this.pause()
  },
  previousMusic() {
    nextdb--
    if (nextdb < 0) nextdb = db.length - 1

    this.img.src = db[nextdb].img
    this.musicName.innerText = db[nextdb].nameMusic
    this.autor.innerText = db[nextdb].autor
    this.audio.src = db[nextdb].song

    this.isPlaying ? this.play() : this.pause()
  },
  nextMusic() {
    nextdb++
    if (nextdb === db.length) nextdb = 0

    this.img.src = db[nextdb].img
    this.musicName.innerText = db[nextdb].nameMusic
    this.autor.innerText = db[nextdb].autor
    this.audio.src = db[nextdb].song

    this.isPlaying ? this.play() : this.pause()
  },
  repeating() {
    this.isRepeating = true
    this.audio.loop = true
    this.repeat.style.color = '#7bffed'
  },
  notRepeating() {
    this.isRepeating = false
    this.audio.loop = false
    this.repeat.style.color = '#fff'
  },
  toggleRepeat() {
    this.isRepeating ? this.notRepeating() : this.repeating()
  },
  setVolume() {
    this.audio.volume = this.volume.value / 100
    if (this.audio.volume === 0) {
      this.mute()
    } else {
      this.iconVolume.classList.replace('fa-volume-xmark', 'fa-volume-high')
      this.isMute = false
    }
  },
  mute() {
    this.isMute = true
    this.audio.volume = 0
    this.volume.value = 0
    this.iconVolume.classList.replace('fa-volume-high', 'fa-volume-xmark')
  },
  noMute() {
    this.isMute = false
    this.audio.volume = 50 / 100
    this.volume.value = 50
    this.iconVolume.classList.replace('fa-volume-xmark', 'fa-volume-high')
  },
  toggleMute() {
    this.isMute ? this.noMute() : this.mute()
  },
  progressBar() {
    this.audio.currentTime = this.progress.value
  },
  updateProgress() {
    this.progress.value = this.audio.currentTime
  }
}
