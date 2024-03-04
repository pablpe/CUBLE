
let cubos = [];
let len = 50;
function setup() {
  //createCanvas(windowWidth, windowHeight, WEBGL);
  let a = 0
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        cubos.push(new Cubito(i, j, k,a++));
      }
    }
  }
    //console.log("Solución :");
    //moveArr(["B'","F'","B","D'","U'","U'","F","L'","L'","U'"])
    //moveArrn(122,["U'","U'","U'","R'","R'","B","D'","D'","R","R","L","L","F'","D","F","D'","D'","B","D","B'","D","D'","D'","F","D","F'","B'","D","B","B","D","B'","D'","D'","D'","B'","D","B","D'","D'","D'","B","B'","B","D'","D","D","B'","D","B","D","B'","D'","D'","D","B","D","B'","D","B","D'","D'","B'","B'","F","B'","F","U","B'","F","R'","R'","F'","B","U'","B'","F","B'","F","D'","B'","F","B'","F","U'","U'","B'","F","B'","F"])
    //console.log(analyzeCFOP(["B'","F'","B","D'","U'","U'","F","L'","L'","U'"],["U'","U'","U'","R'","R'","B","D'","D'","R","R","L","L","F'","D","F","D'","D'","B","D","B'","D","D'","D'","F","D","F'","B'","D","B","B","D","B'","D'","D'","D'","B'","D","B","D'","D'","D'","B","B'","B","D'","D","D","B'","D","B","D","B'","D'","D'","D","B","D","B'","D","B","D'","D'","B'","B'","F","B'","F","U","B'","F","R'","R'","F'","B","U'","B'","F","B'","F","D'","B'","F","B'","F","U'","U'","B'","F","B'","F"]))
  }
   function moveArr(arrMoves) {
    for (let i = 0; i < arrMoves.length; i++) {
      moveAN(arrMoves[i])
    }
  }
  window.moveArr = moveArr
  async function moveArrn(n,arrMoves) {
    for (let i = 0; i < n; i++) {
        if(arrMoves.length <= i) return
        await espera300ms();
        moveAN(arrMoves[i])
    }
  }
  function espera300ms() {
    return new Promise(resolve => {
      setTimeout(function() {
        // Este código se ejecutará después de 300ms
        console.log("Han pasado 300ms");
        resolve(); // Resuelve la promesa después de 300ms
      }, 300); // El segundo argumento es el tiempo en milisegundos (en este caso, 300ms)
    });
  }
let colorines = ["white","yellow","green","blue","red","orange"]

class Cubito {
  white = createVector(0,1,0)
  yellow = createVector(0,-1,0)
  green = createVector(0,0,1)
  blue = createVector(0,0,-1)
  red = createVector(1,0,0)
  orange = createVector(-1,0,0)
  vectorsColor = [this.white,this.yellow,this.green,this.blue,this.red,this.orange]
  constructor(x, y, z,index) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.color = "steelblue";
    this.index = index
  }
  rotateVector2(vector, axis, prime) {
    let result = createVector();
  
    let angle = (prime) ? -HALF_PI : HALF_PI;
    //console.log(vector.x,vector.y,vector.z);
    switch (axis) {
      case "x":
        result.x = vector.x;
        result.y =Math.round( vector.y * cos(angle) - vector.z * sin(angle));
        result.z =Math.round( vector.y * sin(angle) + vector.z * cos(angle));
        break;
      case "y":
        result.x =Math.round( vector.x * cos(angle) + vector.z * sin(angle));
        result.y = vector.y;
        result.z = Math.round(-vector.x * sin(angle) + vector.z * cos(angle));
        break;
      case "z":
        result.x =Math.round( vector.x * cos(angle) - vector.y * sin(angle));
        result.y =Math.round( vector.x * sin(angle) + vector.y * cos(angle));
        result.z = vector.z;
        break;
      default:
        console.error("Eje no válido. Por favor, usa 'x', 'y' o 'z'.");
        return null;
    }
    if(result.x == -0) result.x = 0
    if(result.y == -0) result.y = 0
    if(result.z == -0) result.z = 0
  
    return result;
  }
  
  rotateRR(prime){
    let vec = createVector(this.y,this.z)
    if (prime) {
      vec.add(-1,-1)
      vec.rotate(-HALF_PI)
      vec.add(1,1)
      this.z = Math.round(vec.y)
      this.y = Math.round(vec.x)
      this.vectorsColor = this.vectorsColor.map(vectorColor => this.rotateVector2(vectorColor, "x", false));
    }else{
      vec.add(-1,-1)
      vec.rotate(HALF_PI)
      vec.add(1,1)
      this.z = Math.round(vec.y)
      this.y = Math.round(vec.x)
      this.vectorsColor = this.vectorsColor.map(vectorColor => this.rotateVector2(vectorColor, "x", true));
    }
  }
  rotateLL(prime){
    let vec = createVector(this.y,this.z)
    if (prime) {
      vec.add(-1,-1)
      vec.rotate(HALF_PI)
      vec.add(1,1)
      this.z = Math.round(vec.y)
      this.y = Math.round(vec.x)
      this.vectorsColor = this.vectorsColor.map(vectorColor => this.rotateVector2(vectorColor, "x", true));
    }else{
      vec.add(-1,-1)
      vec.rotate(-HALF_PI)
      vec.add(1,1)
      this.z = Math.round(vec.y)
      this.y = Math.round(vec.x)
      this.vectorsColor = this.vectorsColor.map(vectorColor => this.rotateVector2(vectorColor, "x", false));
    }
  }
  rotateUU(prime){
    let vec = createVector(this.x,this.z)
    if (prime) {
      vec.add(-1,-1)
      vec.rotate(HALF_PI)
      vec.add(1,1)
      this.z = Math.round(vec.y)
      this.x = Math.round(vec.x)
      this.vectorsColor = this.vectorsColor.map(vectorColor => this.rotateVector2(vectorColor, "y", true));
    }else{
      vec.add(-1,-1)
      vec.rotate(-HALF_PI)
      vec.add(1,1)
      this.z = Math.round(vec.y)
      this.x = Math.round(vec.x)
      this.vectorsColor = this.vectorsColor.map(vectorColor => this.rotateVector2(vectorColor, "y", false));
    }
  }
  rotateDD(prime){
    let vec = createVector(this.x,this.z)
    if (prime) {
      vec.add(-1,-1)
      vec.rotate(-HALF_PI)
      vec.add(1,1)
      this.z = Math.round(vec.y)
      this.x = Math.round(vec.x)
      this.vectorsColor = this.vectorsColor.map(vectorColor => this.rotateVector2(vectorColor, "y", false));
    }else{
      vec.add(-1,-1)
      vec.rotate(HALF_PI)
      vec.add(1,1)
      this.z = Math.round(vec.y)
      this.x = Math.round(vec.x)
      this.vectorsColor = this.vectorsColor.map(vectorColor => this.rotateVector2(vectorColor, "y", true));
    }
  }
  rotateBB(prime) {
    let vec = createVector(this.x,this.y)
    if (prime) {
      vec.add(-1,-1)
      vec.rotate(HALF_PI)
      vec.add(1,1)
      this.x = Math.round(vec.x)
      this.y = Math.round(vec.y)
      this.vectorsColor = this.vectorsColor.map(vectorColor => this.rotateVector2(vectorColor, "z", true));
    }else{
      vec.add(-1,-1)
      vec.rotate(-HALF_PI)
      vec.add(1,1)
      this.x = Math.round(vec.x)
      this.y = Math.round(vec.y)
      this.vectorsColor = this.vectorsColor.map(vectorColor => this.rotateVector2(vectorColor, "z", false));
    }
  }
  rotateFF(prime) {
    let vec = createVector(this.x,this.y)
    if (prime) {
      vec.add(-1,-1)
      vec.rotate(-HALF_PI)
      vec.add(1,1)
      this.x = Math.round(vec.x)
      this.y = Math.round(vec.y)
      this.vectorsColor = this.vectorsColor.map(vectorColor => this.rotateVector2(vectorColor, "z", false));
    }else{
      vec.add(-1,-1)
      vec.rotate(HALF_PI)
      vec.add(1,1)
      this.x = Math.round(vec.x)
      this.y = Math.round(vec.y)
      this.vectorsColor = this.vectorsColor.map(vectorColor => this.rotateVector2(vectorColor, "z", true));
    }
  }
  draw() {
    let pieces = [
      { x: 0, y: 1, z: 0 },
      { x: 0, y: 2, z: 0 },
      { x: 0, y: 2, z: 1 },
      { x: 0, y: 1, z: 2 },
      { x: 0, y: 2, z: 2 },
      { x: 2, y: 1, z: 0 },
      { x: 2, y: 2, z: 0 },
      { x: 2, y: 2, z: 1 },
      { x: 2, y: 1, z: 2 },
      { x: 2, y: 2, z: 2 }
    ];
    let valido = true
    for (let index = 0; index < pieces.length; index++) {
      if(this.x == pieces[index].x && this.y == pieces[index].y && this.z == pieces[index].z){
        valido = true
      }
    }
    if (valido) {
      push();
      translate(this.x * len - len, this.y * len - len, this.z * len - len);
      this.drawFaces()
      pop();
    }
  }
  drawFaces() {
    for (let i = 0; i < this.vectorsColor.length; i++) {
      this.drawFigure(this.vectorsColor[i],len,colorines[i])
    }
  }
  drawFigure(directionVector, len, colorAct) {
    let x = directionVector.x;
    let y = directionVector.y;
    let z = directionVector.z;
  
    let halfLen = len / 2;
  
    push();
    fill(colorAct);
  
    translate(x, y, z);
  
    if (x === 1) {
      rotateY(HALF_PI);
    } else if (x === -1) {
      rotateY(-HALF_PI);
    } else if (y === 1) {
      rotateX(HALF_PI);
    } else if (y === -1) {
      rotateX(-HALF_PI);
    } else if (z === -1) {
      rotateY(PI);
    }
  
    if (x !== 0 || y !== 0 || z !== 0) {
      beginShape();
      vertex(-halfLen, -halfLen, halfLen);
      vertex(halfLen, -halfLen, halfLen);
      vertex(halfLen, halfLen, halfLen);
      vertex(-halfLen, halfLen, halfLen);
      endShape(CLOSE);
    }
  
    pop();
  }
}
function moveAN(key) {
  //console.log(key);
  // Rotate R
  if (key === 'R') {
    for (let i = 0; i < cubos.length; i++) {
      if(cubos[i].x == 2)cubos[i].rotateRR(false)
    }
  }
  else if(key === "R'"){
    for (let i = 0; i < cubos.length; i++) {
      if(cubos[i].x == 2)cubos[i].rotateRR(true)
    }
    return
  }
  // Rotate L
  else if (key === 'L') {
    for (let i = 0; i < cubos.length; i++) {
      if(cubos[i].x == 0)cubos[i].rotateLL(false)
    }
    return
  }
  else if (key === "L'") {
    for (let i = 0; i < cubos.length; i++) {
      if(cubos[i].x == 0)cubos[i].rotateLL(true)
    }
    return
  }
  // Rotate U
  else if (key === 'U') {
    for (let i = 0; i < cubos.length; i++) {
      if(cubos[i].y == 0)cubos[i].rotateUU(true)
    }
  }
  else if (key === "U'") {
    for (let i = 0; i < cubos.length; i++) {
      if(cubos[i].y == 0)cubos[i].rotateUU(false)
    }
  }
  // Rotate D
  else if (key === 'D') {
    for (let i = 0; i < cubos.length; i++) {
      if(cubos[i].y == 2)cubos[i].rotateDD(true)
    }
  }
  else if (key === "D'") {
    for (let i = 0; i < cubos.length; i++) {
      if(cubos[i].y == 2)cubos[i].rotateDD(false)
    }
  }
  // Rotate B
  else if (key === 'B') {
    for (let i = 0; i < cubos.length; i++) {
      if(cubos[i].z == 0)cubos[i].rotateBB(false)
    }
  }
  else if (key === "B'") {
    for (let i = 0; i < cubos.length; i++) {
      if(cubos[i].z == 0)cubos[i].rotateBB(true)
    }
  }
  // Rotate F
  else if (key === 'F') {
    for (let i = 0; i < cubos.length; i++) {
      if(cubos[i].z == 2)cubos[i].rotateFF(false)
    }
  }
  else if (key === "F'") {
    for (let i = 0; i < cubos.length; i++) {
      if(cubos[i].z == 2)cubos[i].rotateFF(true)
    }
  }
}
window.moveAN = moveAN


let bgColor = "steelblue"
function draw() {
  //   background(bgColor);
  //   orbitControl();
  //   rotateX(-0.4)
  //   rotateY(-0.5)
  //  for (let i = 0; i < cubos.length; i++) {
  //    cubos[i].draw()
  //  }
}

function isSolved() {
  let cubeRef = cubos[0]
  let allMatch = true
  for (let i = 0; i < cubos.length; i++) {
    if(i==4 || i == 10 || i==12||i == 13||i==14 || i == 16 || i == 22) continue
    if (!cubeRef.vectorsColor[0].equals(cubos[i].vectorsColor[0]) || !cubeRef.vectorsColor[2].equals(cubos[i].vectorsColor[2])) { //!cubesInSamePosition(cubeRef,cubos[i])
      allMatch = false;
      break;
    }
  }
  if (allMatch) {
    console.log("resuelto");
  }
}

    window.analyzeCFOP = analyzeCFOP
  function analyzeCFOP(scramble,movements) {
    moveArr([...scramble])
      let moveIndex = 0
      let rotationPosition = { rotate : ()=>{}, rerotate : ()=>{}}
      let infoSolve = {
          cross : 0,
          f2l : 0,
          oll : 0,
          pll : 0,
      }
      let rotations = [
        {
          rotate : () => {
            
          },
          rerotate : () => {
            
          }
        },
          {
            rotate : () => {
              for (let i = 0; i < cubos.length; i++) {
                cubos[i].rotateRR(false)
              }
            },
            rerotate : () => {
              for (let i = 0; i < cubos.length; i++) {
                cubos[i].rotateRR(true)
              }
            }
          },
          {
            rotate : () => {
              for (let i = 0; i < cubos.length; i++) {
                cubos[i].rotateRR(false)
                cubos[i].rotateRR(false)
              }
            },
            rerotate : () => {
              for (let i = 0; i < cubos.length; i++) {
                cubos[i].rotateRR(true)
                cubos[i].rotateRR(true)
              }
            }
          },
          {
            rotate : () => {
              for (let i = 0; i < cubos.length; i++) {
                cubos[i].rotateRR(true)
              }
            },
            rerotate : () => {
              for (let i = 0; i < cubos.length; i++) {
                cubos[i].rotateRR(false)
              }
            }
          },
          {
            rotate : () => {
              for (let i = 0; i < cubos.length; i++) {
                cubos[i].rotateFF(false)
              }
            },
            rerotate : () => {
              for (let i = 0; i < cubos.length; i++) {
                cubos[i].rotateFF(true)
              }
            }
          },
          {
            rotate : () => {
              for (let i = 0; i < cubos.length; i++) {
                cubos[i].rotateFF(true)
              }
            },
            rerotate : () => {
              for (let i = 0; i < cubos.length; i++) {
                cubos[i].rotateFF(false)
              }
            }
          }
      ]
      let spins = [
        {
          spin : () => {
            
          },
          respin : () => {
            
          }
        },
        {
          spin : () => {
            for (let i = 0; i < cubos.length; i++) {
              cubos[i].rotateFF(true)
            }
          },
          respin : () => {
            for (let i = 0; i < cubos.length; i++) {
              cubos[i].rotateFF(false)
            }
          }
        },
        {
          spin : () => {
            for (let i = 0; i < cubos.length; i++) {
              cubos[i].rotateFF(false)
            }
          },
          respin : () => {
            for (let i = 0; i < cubos.length; i++) {
              cubos[i].rotateFF(true)
            }
          }
        },
        {
          spin : () => {
            for (let i = 0; i < cubos.length; i++) {
              cubos[i].rotateFF(true)
              cubos[i].rotateFF(true)
            }
          },
          respin : () => {
            for (let i = 0; i < cubos.length; i++) {
              cubos[i].rotateFF(false)
              cubos[i].rotateFF(false)
            }
          }
        }
      ]
      function cross() {
        findCross();
        if (infoSolve.cross == 0 && moveIndex < movements.length) {moveAN(movements[moveIndex++]);cross();};
      }
      function findCross() {
        for (let j = 0; j < rotations.length; j++) {
          rotations[j].rotate();
          for (let k = 0; k < spins.length; k++) {
            spins[k].spin()
          let pieces = [
            { x: 1, y: 2, z: 2 },
            { x: 1, y: 2, z: 0 },
            { x: 0, y: 2, z: 1 },
            { x: 2, y: 2, z: 1 },
          ];
    
          let validCross = true
          let pieceBase = cubos.find((cubo) => cubo.x === pieces[0].x && cubo.y === pieces[0].y && cubo.z === pieces[0].z);
          for (let i = 1; i < pieces.length; i++) {
            let pieceAct = cubos.find((cubo) => cubo.x === pieces[i].x && cubo.y === pieces[i].y && cubo.z === pieces[i].z);
            if (!(pieceBase.vectorsColor[0].equals(pieceAct.vectorsColor[0]) && pieceBase.vectorsColor[2].equals(pieceAct.vectorsColor[2]))) {
                  validCross = false
                  break
              }
          }
          if (validCross) {
              infoSolve.cross = moveIndex + 1
              rotationPosition = rotations[j]
              spins[k].respin()
              rotations[j].rerotate()
              return
          }
          spins[k].respin()
          }
          rotations[j].rerotate()
        }
      }
      function f2l() {
        findF2l()
        if (infoSolve.f2l == 0 && moveIndex < movements.length) {moveAN(movements[moveIndex++]);f2l();};
      }
      function findF2l() {
        for (let j = 0; j < rotations.length; j++) {
          rotations[j].rotate();
          for (let k = 0; k < spins.length; k++) {
            spins[k].spin()
        let pieces = [
          { x: 1, y: 2, z: 2 },
          { x: 1, y: 2, z: 0 },
          { x: 0, y: 2, z: 1 },
          { x: 2, y: 2, z: 1 },

          { x: 2, y: 2, z: 2 },
          { x: 2, y: 1, z: 2 },

          { x: 0, y: 2, z: 0 },
          { x: 0, y: 1, z: 0 },

          { x: 2, y: 2, z: 0 },
          { x: 2, y: 1, z: 0 },

          { x: 0, y: 2, z: 2 },
          { x: 0, y: 1, z: 2 },
        ];

        let validF2l = true
        let pieceBase = cubos.find((cubo) => cubo.x === pieces[0].x && cubo.y === pieces[0].y && cubo.z === pieces[0].z);
        for (let i = 1; i < pieces.length; i++) {
          let pieceAct = cubos.find((cubo) => cubo.x === pieces[i].x && cubo.y === pieces[i].y && cubo.z === pieces[i].z);
          if (!(pieceBase.vectorsColor[0].equals(pieceAct.vectorsColor[0]) && pieceBase.vectorsColor[2].equals(pieceAct.vectorsColor[2]))) {
                validF2l = false
                break
            }
        }
        if (validF2l) {
            infoSolve.f2l = moveIndex - infoSolve.cross
            rotations[j].rerotate()
            spins[k].respin()
            return
        }
        spins[k].respin()
          }
          rotations[j].rerotate()
        }
      }
      function oll() {
        findOll();
        if (infoSolve.oll == 0 && moveIndex < movements.length) {moveAN(movements[moveIndex++]);oll()}
      }
      function findOll() {
        for (let j = 0; j < rotations.length; j++) {
          rotations[j].rotate();
          for (let k = 0; k < spins.length; k++) {
            spins[k].spin()
        let pieces = [
          { x: 0, y: 0, z: 0 },
          { x: 0, y: 0, z: 1 },
          { x: 0, y: 0, z: 2 },
          { x: 1, y: 0, z: 0 },
          { x: 1, y: 0, z: 2 },
          { x: 2, y: 0, z: 0 },
          { x: 2, y: 0, z: 1 },
          { x: 2, y: 0, z: 2 },
          
          { x: 0, y: 2, z: 0 },
          { x: 0, y: 2, z: 1 },
          { x: 0, y: 2, z: 2 },
          { x: 1, y: 2, z: 0 },
          { x: 1, y: 2, z: 2 },
          { x: 2, y: 2, z: 0 },
          { x: 2, y: 2, z: 1 },
          { x: 2, y: 2, z: 2 },
        ];
        let validOll = true
        let pieceCenterTop = cubos.find((cubo) => cubo.x === 1 && cubo.y === 0 && cubo.z === 1);
        let indexColorTop = 0
        pieceCenterTop.vectorsColor.forEach((vec,index) => {
          if(vec.x == 0 && vec.y == 1 && vec.z == 0) indexColorTop = index
        });
        //indexColorTop = 1 // hay q borrarlo
        for (let i = 0; i < pieces.length; i++) {
          let pieceAct = cubos.find((cubo) => cubo.x === pieces[i].x && cubo.y === pieces[i].y && cubo.z === pieces[i].z);
          if (!(pieceAct.vectorsColor[indexColorTop].x == 0 && pieceAct.vectorsColor[indexColorTop].y == 1 && pieceAct.vectorsColor[indexColorTop].z == 0)) {
                validOll = false
                break
            }
        }
        if (validOll) {
            infoSolve.oll = moveIndex - infoSolve.f2l - infoSolve.cross
            spins[k].respin()
            rotations[j].rerotate()
            return
        }
        spins[k].respin()
          }
          rotations[j].rerotate()
        } 
      }
      cross()
      f2l()
      oll()
      infoSolve.pll = movements.length - infoSolve.oll - infoSolve.f2l - infoSolve.cross
      //console.log(movements.length, infoSolve.cross, infoSolve.f2l ,infoSolve.oll, infoSolve.pll, infoSolve.cross+infoSolve.f2l+infoSolve.oll+infoSolve.pll);
      resetCube()
      return infoSolve
  }


  window.analyzeROUX = analyzeROUX
  function analyzeROUX(scramble, movements) {
    moveArr([...scramble])
      let moveIndex = 0
      let rotationPosition = {}
      let spinPosition = {}
      let infoSolve = {
          fb : 0,
          sb : 0,
          cmll : 0,
          lse : 0,
      }
      let rotations = [
        {
          rotate : () => {
            
          },
          rerotate : () => {
            
          }
        },
          {
            rotate : () => {
              for (let i = 0; i < cubos.length; i++) {
                cubos[i].rotateRR(false)
              }
            },
            rerotate : () => {
              for (let i = 0; i < cubos.length; i++) {
                cubos[i].rotateRR(true)
              }
            }
          },
          {
            rotate : () => {
              for (let i = 0; i < cubos.length; i++) {
                cubos[i].rotateRR(false)
                cubos[i].rotateRR(false)
              }
            },
            rerotate : () => {
              for (let i = 0; i < cubos.length; i++) {
                cubos[i].rotateRR(true)
                cubos[i].rotateRR(true)
              }
            }
          },
          {
            rotate : () => {
              for (let i = 0; i < cubos.length; i++) {
                cubos[i].rotateRR(true)
              }
            },
            rerotate : () => {
              for (let i = 0; i < cubos.length; i++) {
                cubos[i].rotateRR(false)
              }
            }
          },
          {
            rotate : () => {
              for (let i = 0; i < cubos.length; i++) {
                cubos[i].rotateFF(false)
              }
            },
            rerotate : () => {
              for (let i = 0; i < cubos.length; i++) {
                cubos[i].rotateFF(true)
              }
            }
          },
          {
            rotate : () => {
              for (let i = 0; i < cubos.length; i++) {
                cubos[i].rotateFF(true)
              }
            },
            rerotate : () => {
              for (let i = 0; i < cubos.length; i++) {
                cubos[i].rotateFF(false)
              }
            }
          }
      ]
      let spins = [
        {
          spin : () => {
            
          },
          respin : () => {
            
          }
        },
        {
          spin : () => {
            for (let i = 0; i < cubos.length; i++) {
              cubos[i].rotateFF(true)
            }
          },
          respin : () => {
            for (let i = 0; i < cubos.length; i++) {
              cubos[i].rotateFF(false)
            }
          }
        },
        {
          spin : () => {
            for (let i = 0; i < cubos.length; i++) {
              cubos[i].rotateFF(false)
            }
          },
          respin : () => {
            for (let i = 0; i < cubos.length; i++) {
              cubos[i].rotateFF(true)
            }
          }
        },
        {
          spin : () => {
            for (let i = 0; i < cubos.length; i++) {
              cubos[i].rotateFF(true)
              cubos[i].rotateFF(true)
            }
          },
          respin : () => {
            for (let i = 0; i < cubos.length; i++) {
              cubos[i].rotateFF(false)
              cubos[i].rotateFF(false)
            }
          }
        }
      ]
      function fb() {
        findFb();
        if (infoSolve.fb == 0 && moveIndex < movements.length) {moveAN(movements[moveIndex++]);fb();}
      }
      function findFb() {
        for (let j = 0; j < rotations.length; j++) {
          rotations[j].rotate();
          for (let k = 0; k < spins.length; k++) {
            spins[k].spin()
            let pieces = [
              { x: 0, y: 1, z: 0 },
              { x: 0, y: 2, z: 0 },
              { x: 0, y: 2, z: 1 },
              { x: 0, y: 1, z: 2 },
              { x: 0, y: 2, z: 2 }
            ];
      
            let validFb = true
            let pieceBase = cubos.find((cubo) => cubo.x === pieces[0].x && cubo.y === pieces[0].y && cubo.z === pieces[0].z);
            for (let i = 1; i < pieces.length; i++) {
              let pieceAct = cubos.find((cubo) => cubo.x === pieces[i].x && cubo.y === pieces[i].y && cubo.z === pieces[i].z);
              if (!(pieceBase.vectorsColor[0].equals(pieceAct.vectorsColor[0]) && pieceBase.vectorsColor[2].equals(pieceAct.vectorsColor[2]))) {
                    validFb = false
                    break
                }
            }
            if (validFb) {
                infoSolve.fb = moveIndex + 1
                rotationPosition = rotations[j]
                spinPosition = spins[k]
                spins[k].respin()
                rotations[j].rerotate()
                return
            }
            spins[k].respin()
          }
          rotations[j].rerotate()
        }
      }
      function sb() {
        findSb();
        if (infoSolve.sb == 0 && moveIndex < movements.length) {moveAN(movements[moveIndex++]);sb()}
      }
      function findSb() {
        for (let j = 0; j < rotations.length; j++) {
          rotations[j].rotate();
          for (let k = 0; k < spins.length; k++) {
            spins[k].spin()
        let pieces = [
          { x: 0, y: 1, z: 0 },
          { x: 0, y: 2, z: 0 },
          { x: 0, y: 2, z: 1 },
          { x: 0, y: 1, z: 2 },
          { x: 0, y: 2, z: 2 },
          { x: 2, y: 1, z: 0 },
          { x: 2, y: 2, z: 0 },
          { x: 2, y: 2, z: 1 },
          { x: 2, y: 1, z: 2 },
          { x: 2, y: 2, z: 2 }
        ];
  
        let validSb = true
        let pieceBase = cubos.find((cubo) => cubo.x === pieces[0].x && cubo.y === pieces[0].y && cubo.z === pieces[0].z);
        for (let i = 1; i < pieces.length; i++) {
          let pieceAct = cubos.find((cubo) => cubo.x === pieces[i].x && cubo.y === pieces[i].y && cubo.z === pieces[i].z);
          if (!(pieceBase.vectorsColor[0].equals(pieceAct.vectorsColor[0]) && pieceBase.vectorsColor[2].equals(pieceAct.vectorsColor[2]))) {
                validSb = false
                break
            }
        }
        if (validSb) {
          infoSolve.sb = moveIndex - infoSolve.fb 
          spins[k].respin()
          rotations[j].rerotate()
          return
        }
        spins[k].respin()
          }
          rotations[j].rerotate()
        }
      }
      function cmll() {
        findCMLL();
        if (infoSolve.cmll == 0 && moveIndex < movements.length) {moveAN(movements[moveIndex++]);cmll();}
      }
      function findCMLL() {
        for (let j = 0; j < rotations.length; j++) {
          rotations[j].rotate();
          for (let k = 0; k < spins.length; k++) {
            spins[k].spin()
        let pieces = [
          { x: 0, y: 0, z: 0 },
          { x: 0, y: 0, z: 2 },
          { x: 2, y: 0, z: 0 },
          { x: 2, y: 0, z: 2 },
          { x: 0, y: 2, z: 0 },
          { x: 0, y: 2, z: 2 },
          { x: 2, y: 2, z: 0 },
          { x: 2, y: 2, z: 2 },
        ];
  
        let validCmll = true
        let pieceBase = cubos.find((cubo) => cubo.x === pieces[0].x && cubo.y === pieces[0].y && cubo.z === pieces[0].z);
        for (let i = 1; i < pieces.length; i++) {
          let pieceAct = cubos.find((cubo) => cubo.x === pieces[i].x && cubo.y === pieces[i].y && cubo.z === pieces[i].z);
          if (!(pieceBase.vectorsColor[0].equals(pieceAct.vectorsColor[0]) && pieceBase.vectorsColor[2].equals(pieceAct.vectorsColor[2]))) {
                validCmll = false
                break
            }
        }
        if (validCmll) {
          infoSolve.cmll = moveIndex - infoSolve.sb - infoSolve.fb 
          spins[k].respin()
          rotations[j].rerotate()
          return
        }
        spins[k].respin()
          }
          rotations[j].rerotate()
        }
      }
      fb()
      sb()
      cmll()
      infoSolve.lse = movements.length  - infoSolve.cmll - infoSolve.sb - infoSolve.fb 
      console.log(movements.length, infoSolve.fb, infoSolve.sb ,infoSolve.cmll, infoSolve.lse, infoSolve.fb+infoSolve.sb+infoSolve.cmll+infoSolve.lse);
      resetCube()
      return infoSolve
  }
  function resetCube() {
    let white = createVector(0,1,0)
    let yellow = createVector(0,-1,0)
    let green = createVector(0,0,1)
    let blue = createVector(0,0,-1)
    let red = createVector(1,0,0)
    let orange = createVector(-1,0,0)
    for (let index = 0; index < cubos.length; index++) {
      cubos[index].vectorsColor = [white,yellow,green,blue,red,orange]
    }
  }
  window.resetCube = resetCube