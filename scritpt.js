import player from './player.js'
window.addEventListener('load', ()=>{
  player.start() // iniciar o player

  document.onkeydown = function(e) {
    switch (e.keyCode) { // comandos de teclas pressionadas
      case(13) : // ativa o elemento em foco
        document.activeElement.click();
      break;
      case(38) : // aumenta o volume
        player.volume.value = Number(player.volume.value) + 5
        player.setVolume()
      break;
      case(40) : // diminui o volume
        player.volume.value -= 5
        player.setVolume()
      break;
      case(32) : // tocar música / pausar música
        player.togglePayPause()
      break;
      case(37) : // música anterior
      player.previousMusic()
      break;
      case(39) : // música seguinte
      player.nextMusic()
      break;
      case(76) : // repetir música / não repetir
      player.toggleRepeat()
      break;
    }
  };
})