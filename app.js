new Vue({
    el: '#app',
    data: {
        nivel: 1,
        ciegas: [
            { nivel: 1, small: 100, big: 100, ante: 0 },
            { nivel: 2, small: 100, big: 100, ante: 100 },
            { nivel: 3, small: 100, big: 200, ante: 200 },
            { nivel: 4, small: 200, big: 300, ante: 300 },
            { nivel: 5, small: 300, big: 500, ante: 500 },
            { nivel: 6, small: 400, big: 800, ante: 800 },
            { nivel: 7, small: 600, big: 1200, ante: 1200 },
            { nivel: 8, small: 1000, big: 2000, ante: 2000 },
            { nivel: 9, small: 1500, big: 3000, ante: 3000 },
            { nivel: 10, small: 2000, big: 4000, ante: 4000 },
            { nivel: 11, small: 2500, big: 5000, ante: 5000 },
            { nivel: 12, small: 3000, big: 6000, ante: 6000 },
            { nivel: 13, small: 1200, big: 2400, ante: 2400 },
            { nivel: 14, small: 1500, big: 3000, ante: 3000 },
            { nivel: 15, small: 2000, big: 4000, ante: 4000 },
            { nivel: 16, small: 2500, big: 5000, ante: 5000 },
            { nivel: 17, small: 3000, big: 6000, ante: 6000 },
            { nivel: 18, small: 4000, big: 8000, ante: 8000 },
            { nivel: 19, small: 5000, big: 10000, ante: 10000 },
            { nivel: 20, small: 6000, big: 12000, ante: 12000 },
            { nivel: 21, small: 8000, big: 16000, ante: 16000 },
            { nivel: 22, small: 10000, big: 20000, ante: 20000 },
            { nivel: 23, small: 12000, big: 24000, ante: 24000 },
            { nivel: 24, small: 15000, big: 30000, ante: 30000 },
            { nivel: 25, small: 20000, big: 40000, ante: 40000 },
            { nivel: 26, small: 25000, big: 50000, ante: 50000 },
            { nivel: 27, small: 30000, big: 60000, ante: 60000 },
            { nivel: 28, small: 40000, big: 80000, ante: 80000 },
            { nivel: 29, small: 50000, big: 100000, ante: 100000 },
            { nivel: 30, small: 60000, big: 120000, ante: 120000 },
            { nivel: 31, small: 80000, big: 160000, ante: 160000 },
            { nivel: 32, small: 100000, big: 200000, ante: 200000 },
            { nivel: 33, small: 120000, big: 240000, ante: 240000 },
            { nivel: 34, small: 150000, big: 300000, ante: 300000 },
            { nivel: 35, small: 200000, big: 400000, ante: 400000 },
            { nivel: 36, small: 250000, big: 500000, ante: 500000 }
        ],
        tiempoRestante: 15 * 60, // Almacena el tiempo en segundos
        smallBlind: 100,
        bigBlind: 100,
        ante: 0, // Inicialmente es igual al valor del big
        jugadores: 0,
        maxJugadores: 13,
        jugadoresInput: 0,
        recompras: 0,
        addOns: 0,
        premios: 20,
        pausado: true
  },
  computed: {
    tiempoFormateado() {
      const minutos = Math.floor(this.tiempoRestante / 60);
      const segundos = this.tiempoRestante % 60;
      return `${this.pad(minutos)}:${this.pad(segundos)}`;
    },
    siguienteCiegas() {
      return this.nivel < this.ciegas.length 
        ? this.ciegas[this.nivel] 
        : { small: 0, big: 0, ante: 0 }; // En el último nivel, no habrá más ciegas ni ante
    }
  },
  methods: {
    pad(num) {
      return num < 10 ? '0' + num : num; // Añade un cero delante si es menor que 10
    },
    iniciarTemporizador() {
      if (!this.pausado) {
        this.intervalo = setInterval(() => {
          if (this.tiempoRestante > 0) {
            this.tiempoRestante--;
          } else {
            this.aumentarNivel();
          }
        }, 1000);
      }
    },
    aumentarNivel() {
      if (this.nivel < this.ciegas.length) {
        this.nivel++;
        this.smallBlind = this.ciegas[this.nivel - 1].small;
        this.bigBlind = this.ciegas[this.nivel - 1].big;
        this.ante = this.ciegas[this.nivel - 1].ante;
        this.tiempoRestante = 15*60; // Reinicia el temporizador a 15 minutos
    
        // Reproduce el sonido al cambiar de nivel
        const audioNivel = document.getElementById('nivelAudio');
        audioNivel.play();
    
        // Verifica cada segundo si queda 1 minuto
        this.intervalo1Min = setInterval(() => {
          if (this.tiempoRestante === 60) { // Si queda 1 minuto
            const audioPitido = new Audio('pitido_1min.mp3');
            audioPitido.play();
          }
        }, 1000); // Revisa cada segundo
      } else {
        clearInterval(this.intervalo); // Detiene el temporizador si ya no hay más niveles
      }
    },
    bajarNivel(){
      if(this.nivel > 0){
        this.nivel--;
        this.smallBlind = this.ciegas[this.nivel - 1].small;
        this.bigBlind = this.ciegas[this.nivel - 1].big;
        this.ante = this.ciegas[this.nivel - 1].ante;
        this.tiempoRestante = 15 ; // Reinicia el temporizador a 15 minutos
      }
    },
    addJugadores() {
      this.jugadores = this.jugadoresInput;
      this.maxJugadores = this.jugadores;
    },
    removeJugadores() {
      if (this.jugadores > 0) {
        this.jugadores--;
      }
    },
    incrementarRecompras() {
      this.recompras += 1;
      this.premios +=5;
      this.jugadores += 1;
    },
    incrementarRecompras2() {
      this.recompras += 1;
      this.premios +=7;
      this.jugadores += 1;
      this.addOns +=1;
    },
    decrementarRecompras() {
      if (this.recompras > 0) {
        this.recompras -= 1;
        this.premios -=5;
        this.jugadores -=1;
      }
    },
    decrementarRecompras2() {
      if (this.recompras > 0) {
        this.recompras -= 1;
        this.premios -=7;
        this.jugadores -=1;
        this.addOns -=1;
      }
    },
    incrementarAddOn() {
      this.addOns += 1;
      this.premios +=2;
    },
    decrementarAddOn() {
      if (this.addOns > 0) {
        this.addOns -= 1;
        this.premios -=2;
      }
    },

    pausarTemporizador() {
      this.pausado = true;
      clearInterval(this.intervalo); // Detiene el temporizador
    },
    reanudarTemporizador() {
      this.pausado = false;
      this.iniciarTemporizador(); // Reinicia el temporizador
    },
    
      probarAudio() {
        const audio = document.getElementById('nivelAudio');
        audio.play();
      },
    
  },
  mounted() {
    
  },
  beforeDestroy() {
    clearInterval(this.intervalo); // Limpia el intervalo si se destruye el componente
  }
});