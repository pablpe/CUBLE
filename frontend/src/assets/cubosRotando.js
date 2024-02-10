const sketch = (p) => {
    let width = window.innerWidth;
    let height = window.innerHeight;
  
    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      // Llama a resizeCanvas para ajustar el tamaño del canvas dinámicamente
      p.resizeCanvas(width, height);
    });
    
    class Cubito {
      constructor(x, y, z, angleT, angleR, color) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.angleT = angleT;
        this.angleR = angleR;
        this.color = color;
      }
  
      draw() {
        p.push();
        this.angleT = this.angleT + 0.1;
        this.angleR = this.angleR + 0.6;
        p.rotateY(this.angleT);
        p.translate(this.x, this.y, this.z);
        p.rotateZ(this.angleR);
        p.rotateY(this.angleR + 10);
        p.fill(this.color[0], this.color[1], this.color[2]);
        p.strokeWeight(0);
        p.stroke(63, 2, 60);
        p.box(70);
        p.pop();
      }
    }
  
    p.setup = () => {
      p.createCanvas(width, height, p.WEBGL);
      p.angleMode(p.DEGREES);
    };
  
    const coloresRubikPastel = [
      [255, 100, 100], // Rosa pastel
      [255, 215, 0],   // Amarillo pastel
      [152, 251, 152], // Verde pastel
      [173, 216, 230], // Azul pastel
      [234, 128, 36], // Salmon pastel
      [255, 192, 203]  // Rosa claro pastel
    ];
  
    let cubos = [];
  
    for (let i = 0; i < 6; i++) {
      cubos.push(new Cubito(window.innerHeight/3.5, 0, window.innerHeight/3.5, (360 / 6) * (i + 1), 12 * i * i, coloresRubikPastel[i]));
    }
  
    p.draw = () => {
      p.camera(1, 600, 1);
      p.background(0, 50);
      p.ambientLight(150);
      p.pointLight(150, 150, 150, 0, 0 ,0);
      for (let i = 0; i < cubos.length; i++) {
        cubos[i].draw();
      }
    };
  };
  
  export default sketch;
  