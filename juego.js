// Clase base Personaje
class Personaje {
  constructor(nombre, vida, ataque, defensa, velocidad) {
      this.nombre = nombre;
      this.vida = vida;
      this.ataque = ataque;
      this.defensa = defensa;
      this.velocidad = velocidad;
}

saludar() {
  console.log(`¡${this.nombre} está listo para la batalla!`);
}

recibirDanio(danio) {
  this.vida -= danio;
  if (this.vida <= 0) {
      this.vida = 0;
      console.log(`${this.nombre} ha caído en batalla.`);
  } else {
      console.log(`${this.nombre} ahora tiene ${this.vida} puntos de vida.`);
  }
}

calcularDanio(defensa) {
  const ataqueReal = Math.floor(Math.random() * this.ataque);
  const defensaReal = Math.floor(Math.random() * defensa);
  let danio = ataqueReal - defensaReal;
  return danio > 0 ? danio : 0;
}

atacar(objetivo) {
  console.log(`${this.nombre} ataca a ${objetivo.nombre}`);
  const danio = this.calcularDanio(objetivo.defensa);
  console.log(`${objetivo.nombre} recibe ${danio} puntos de danio.`);
  objetivo.recibirDanio(danio);
}
}

class Mago extends Personaje {
  constructor(nombre, vida, ataque, defensa, velocidad, hechizos) {
  super(nombre, vida, ataque, defensa, velocidad);
  this.hechizos = hechizos;
}

lanzarHechizo(objetivo) {
  const hechizo = this.hechizos[Math.floor(Math.random() * this.hechizos.length)];
  console.log(`${this.nombre} lanza el hechizo ${hechizo.nombre} contra ${objetivo.nombre}`);
  const danio = hechizo.danio - Math.floor(Math.random() * objetivo.defensa);
  console.log(`${objetivo.nombre} recibe ${danio > 0 ? danio : 0} de danio.`);
  objetivo.recibirDanio(danio > 0 ? danio : 0);
}
}

class Guerrero extends Personaje {
  constructor(nombre, vida, ataque, defensa, velocidad, armas) {
  super(nombre, vida, ataque, defensa, velocidad);
  this.armas = armas;
}

atacarConArma(objetivo) {
  const arma = this.armas[Math.floor(Math.random() * this.armas.length)];
  console.log(`${this.nombre} usa ${arma.nombre} contra ${objetivo.nombre}`);
  const danio = arma.danio - Math.floor(Math.random() * objetivo.defensa);
  console.log(`${objetivo.nombre} recibe ${danio > 0 ? danio : 0} de danio.`);
  objetivo.recibirDanio(danio > 0 ? danio : 0);
}
}

class Arquero extends Personaje {
  constructor(nombre, vida, ataque, defensa, velocidad, flechas) {
  super(nombre, vida, ataque, defensa, velocidad);
      this.flechas = flechas;
}

dispararFlecha(objetivo) {
  if (this.flechas.length > 0) {
      console.log(`${this.nombre} dispara una flecha contra ${objetivo.nombre}`);
      const flecha = this.flechas.pop();
      const danio = this.ataque - Math.floor(Math.random() * objetivo.defensa);
      console.log(`${objetivo.nombre} recibe ${danio > 0 ? danio : 0} de danio.`);
      objetivo.recibirDanio(danio > 0 ? danio : 0);
  } else {
      console.log(`${this.nombre} se quedó sin flechas.`);
  }
}
}

// personajes
const personajes = [
  new Mago("Merlín", 100, 50, 20, 10, [{ nombre: "Fuego", danio: 50 }, { nombre: "Hielo", danio: 40 }]),
  new Mago("Gandalf", 110, 45, 25, 12, [{ nombre: "Rayo", danio: 55 }, { nombre: "Tierra", danio: 35 }]),
  new Guerrero("Atila", 150, 60, 40, 8, [{ nombre: "Espada", danio: 30 }, { nombre: "Maza", danio: 35 }]),
  new Guerrero("Leonidas", 140, 55, 45, 7, [{ nombre: "Lanza", danio: 40 }, { nombre: "Escudo", danio: 25 }]),
  new Arquero("Legolas", 90, 35, 15, 15, ["flecha", "flecha", "flecha"])
];

// pelea entre los personajes

function iniciarBatalla(personajes) {
  while (personajes.filter(p => p.vida > 0).length > 1) {
      personajes.forEach(atacante => {
      if (atacante.vida > 0) {
          const oponente = personajes[Math.floor(Math.random() * personajes.length)];
      if (oponente !== atacante && oponente.vida > 0) {
              const accion = Math.floor(Math.random() * 3);
          if (accion === 0) {
              atacante.atacar(oponente);
          } else if (accion === 1 && atacante instanceof Mago) {
              atacante.lanzarHechizo(oponente);
          } else if (accion === 1 && atacante instanceof Guerrero) {
              atacante.atacarConArma(oponente);
          } else if (accion === 1 && atacante instanceof Arquero) {
              atacante.dispararFlecha(oponente);
          }
      }
      }
});

// Filtrar los personajes vivos

  personajes = personajes.filter(p => p.vida > 0);
}

  const ganador = personajes.find(p => p.vida > 0);
  console.log(`\n¡El ganador de la batalla es ${ganador.nombre} con ${ganador.vida} puntos de vida restantes!`);
}

// Iniciar la batalla
iniciarBatalla(personajes);
