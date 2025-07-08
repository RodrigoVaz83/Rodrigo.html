function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let nave;
let tiros = [];
let asteroides = [];
let pontos = 0;

function setup() {
  createCanvas(600, 400);
  nave = new Nave();
  textAlign(CENTER, CENTER);
  textSize(24);
}

function draw() {
  background(10);

  nave.mostrar();
  nave.mover();

  // Mostrar e mover tiros
  for (let i = tiros.length - 1; i >= 0; i--) {
    tiros[i].mover();
    tiros[i].mostrar();

    // Remove tiros fora da tela
    if (tiros[i].y < 0) {
      tiros.splice(i, 1);
    }
  }

  // Gerar asteroides
  if (frameCount % 50 === 0) {
    asteroides.push(new Asteroide());
  }

  // Mostrar asteroides e detectar colisões
  for (let i = asteroides.length - 1; i >= 0; i--) {
    asteroides[i].mover();
    asteroides[i].mostrar();

    // Verifica colisão com tiros
    for (let j = tiros.length - 1; j >= 0; j--) {
      if (asteroides[i].atingido(tiros[j])) {
        asteroides.splice(i, 1);
        tiros.splice(j, 1);
        pontos += 1;
        break;
      }
    }

    // Game over se colidir com a nave (opcional)
    if (dist(asteroides[i].x, asteroides[i].y, nave.x, nave.y) < 30) {
      noLoop(); // Para o jogo
      fill(255, 0, 0);
      text("GAME OVER", width / 2, height / 2);
    }
  }

  // Mostrar pontuação
  fill(255);
  text("Pontos: " + pontos, width / 2, 30);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    nave.direcao = -1;
  } else if (keyCode === RIGHT_ARROW) {
    nave.direcao = 1;
  } else if (key === ' ') {
    tiros.push(new Tiro(nave.x, nave.y));
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    nave.direcao = 0;
  }
}

// Classe da nave
class Nave {
  constructor() {
    this.x = width / 2;
    this.y = height - 30;
    this.direcao = 0;
  }

  mostrar() {
    fill(0, 255, 255);
    triangle(this.x - 15, this.y + 15, this.x + 15, this.y + 15, this.x, this.y - 20);
  }

  mover() {
    this.x += this.direcao * 5;
    this.x = constrain(this.x, 15, width - 15);
  }
}

// Classe dos tiros
class Tiro {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  mover() {
    this.y -= 7;
  }

  mostrar() {
    stroke(255, 255, 0);
    line(this.x, this.y, this.x, this.y - 10);
  }
}

// Classe dos asteroides
class Asteroide {
  constructor() {
    this.x = random(20, width - 20);
    this.y = -20;
    this.vel = random(2, 4);
  }

  mover() {
    this.y += this.vel;
  }

  mostrar() {
    fill(150);
    ellipse(this.x, this.y, 40, 40);
  }

  atingido(tiro) {
    return dist(this.x, this.y, tiro.x, tiro.y) < 20;
  }
}
