/* eslint-disable no-compare-neg-zero */

    let cubos = [];
    let len = 50;
    setup = () => {
      createCanvas(250, 250, WEBGL);
      let a = 0
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          for (let k = 0; k < 3; k++) {
            cubos.push(new Cubito(i, j, k,a++));
          }
        }
      }
      
    
    }
    let colorines = [
      "RGB(255, 255, 255)",    // blanco
      "RGB(255, 204, 0)",      // amarillo pastel
      "RGB(0, 255, 0)",        // verde más llamativo
      "RGB(173, 216, 230)",    // azul cielo
      "RGB(255, 105, 97)",     // rosa más rojo
      "RGB(255, 140, 0)"       // naranja más llamativo
    ];
    
    
    
    
    
    function setColorines() {
      function colorRGBAleatorio() {
        const r = Math.floor(Math.random() * 256); // Valor entre 0 y 255 para rojo
        const g = Math.floor(Math.random() * 256); // Valor entre 0 y 255 para verde
        const b = Math.floor(Math.random() * 256); // Valor entre 0 y 255 para azul
        return `rgb(${r}, ${g}, ${b})`;
      }
      colorines = [
        colorRGBAleatorio(),
        colorRGBAleatorio(),
        colorRGBAleatorio(),
        colorRGBAleatorio(),
        colorRGBAleatorio(),
        colorRGBAleatorio()
      ]
    }
    window.setColorines = setColorines
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
            //console.error("Eje no válido. Por favor, usa 'x', 'y' o 'z'.");
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
        push();
        //if ((this.x = 2 && this.y == 2 && this.z == 0) || (this.x = 2 && this.y == 2 && this.z == 2)) {
          translate(this.x * len - len, this.y * len - len, this.z * len - len);
          this.drawFaces()
          //box()
        //}
        pop();
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
    
    function moveOpp(key) {
      if(key.includes("'")) move(key[0])
      else move(key+"'")
    }
    function move(key) {
      if (key === 'y') {
        for (let i = 0; i < cubos.length; i++) {
          cubos[i].rotateUU(true)
        }
      }
      else if(key === "y'"){
        for (let i = 0; i < cubos.length; i++) {
          cubos[i].rotateUU(false)
        }
        return
      }
      //rotate r
      if (key === 'r') {
        for (let i = 0; i < cubos.length; i++) {
          if(cubos[i].x == 2 || cubos[i].x == 1)cubos[i].rotateRR(false)
        }
      }
      else if(key === "r'"){
        for (let i = 0; i < cubos.length; i++) {
          if(cubos[i].x == 2 || cubos[i].x == 1)cubos[i].rotateRR(true)
        }
        return
      }
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
      if (key === 'x') {
        for (let i = 0; i < cubos.length; i++) {
          cubos[i].rotateRR(false)
        }
      }
      else if(key === "x'"){
        for (let i = 0; i < cubos.length; i++) {
          cubos[i].rotateRR(true)
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
      else if (key === 'l') {
        for (let i = 0; i < cubos.length; i++) {
          if(cubos[i].x == 0 || cubos[i].x == 1)cubos[i].rotateLL(false)
        }
        return
      }
      else if (key === "l'") {
        for (let i = 0; i < cubos.length; i++) {
          if(cubos[i].x == 0 || cubos[i].x == 1)cubos[i].rotateLL(true)
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
      else if (key === 'u') {
        for (let i = 0; i < cubos.length; i++) {
          if(cubos[i].y == 0 || cubos[i].y == 1)cubos[i].rotateUU(true)
        }
      }
      else if (key === "u'") {
        for (let i = 0; i < cubos.length; i++) {
          if(cubos[i].y == 0 || cubos[i].y == 1)cubos[i].rotateUU(false)
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
      else if (key === 'd') {
        for (let i = 0; i < cubos.length; i++) {
          if(cubos[i].y == 2 || cubos[i].y == 1)cubos[i].rotateDD(true)
        }
      }
      else if (key === "d'") {
        for (let i = 0; i < cubos.length; i++) {
          if(cubos[i].y == 2 || cubos[i].y == 1)cubos[i].rotateDD(false)
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
      else if (key === 'f') {
        for (let i = 0; i < cubos.length; i++) {
          if(cubos[i].z == 2 || cubos[i].z == 1)cubos[i].rotateFF(false)
        }
      }
      else if (key === "f'") {
        for (let i = 0; i < cubos.length; i++) {
          if(cubos[i].z == 2 || cubos[i].z == 1)cubos[i].rotateFF(true)
        }
      }
    }
    window.movePr = move
    function movePr(move) {
        move(move)
    }
    
    let bgColor = "steelblue"
    draw = () => {
      background(0,0);
      orbitControl()
      rotateX(-0.4)
      rotateY(-0.5)
    
      for (let i = 0; i < cubos.length; i++) {
        cubos[i].draw()
      }
    }
    
    
    function isSolved() {
      let cubeRef = cubos[0]
      let allMatch = true
      for (let i = 0; i < cubos.length; i++) {
        if(i==4 || i == 10 || i==12||i == 13||i==14 || i == 16 || i == 22) continue
        if (!cubeRef.vectorsColor[0].equals(cubos[i].vectorsColor[0]) || !cubeRef.vectorsColor[2].equals(cubos[i].vectorsColor[2])) { //!cubesinSamePosition(cubeRef,cubos[i])
          allMatch = false;
          break;
        }
      }
      return allMatch
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //window.checkWhiteCorners = checkWhiteCorners
    // function checkWhiteCorners() { //metodo antiguo de comprobacion
    //   let whiteCornersMatch = true;
    //   const tolerance = 0.001;
    
    //   for (let i = 1; i < whiteCorners.length; i++) {
    //     const cornerA = whiteCorners[0].vectorsColor;
    //     const cornerB = whiteCorners[i].vectorsColor;
    
    //     for (let j = 0; j < cornerA.length; j++) {
    //       if (
    //         Math.abs(cornerA[j].x - cornerB[j].x) > tolerance ||
    //         Math.abs(cornerA[j].y - cornerB[j].y) > tolerance ||
    //         Math.abs(cornerA[j].z - cornerB[j].z) > tolerance
    //       ) {
    //         whiteCornersMatch = false;
    //         break;
    //       }
    //     }
    
    //     if (!whiteCornersMatch) {
    //       break;
    //     }
    //   }
    
    //   if (whiteCornersMatch) {
    //     bgColor = "lightgreen";
    //   } else {
    //     bgColor = "orangered";
    //   }
    // }
    // function cubesinSamePosition(cube1,cube2) {
    //   let tolerance = 0.001
    //   if (
    //     Math.abs(cube1.vectorsColor[0].x - cube2.vectorsColor[0].x) > tolerance ||
    //     Math.abs(cube1.vectorsColor[0].y - cube2.vectorsColor[0].y) > tolerance ||
    //     Math.abs(cube1.vectorsColor[0].z - cube2.vectorsColor[0].z) > tolerance ||
    //     Math.abs(cube1.vectorsColor[2].x - cube2.vectorsColor[2].x) > tolerance ||
    //     Math.abs(cube1.vectorsColor[2].y - cube2.vectorsColor[2].y) > tolerance ||
    //     Math.abs(cube1.vectorsColor[2].z - cube2.vectorsColor[2].z) > tolerance ||
    //     Math.abs(cube1.vectorsColor[4].x - cube2.vectorsColor[4].x) > tolerance ||
    //     Math.abs(cube1.vectorsColor[4].y - cube2.vectorsColor[4].y) > tolerance ||
    //     Math.abs(cube1.vectorsColor[4].z - cube2.vectorsColor[4].z) > tolerance
    //   ) return false
    //   return true
    // }
    // document.addEventListener("keydown",()=>{
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   move("R")
    //   move("U")
    //   //console.log("op");
    //   isSolved()
    // })