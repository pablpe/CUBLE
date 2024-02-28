
//import {move} from "../Cubo3D/sketch2"
let moves = []
var BtCube = (function () {
    // Used for Gikker and Mi Smart Magic Cube
    const GIIKER_SERVICE_UUID = "0000aadb-0000-1000-8000-00805f9b34fb";
    const GIIKER_CHARACTERISTIC_UUID = "0000aadc-0000-1000-8000-00805f9b34fb";

    async function connect() {
        // try {
            device = await window.navigator.bluetooth.requestDevice({
            filters: [{ namePrefix: "G" }],
            optionalServices: [
                GIIKER_SERVICE_UUID
            ]
            });
            var server = await device.gatt.connect();
            if (server.device.name.startsWith("G")) {
                var cubeService = await server.getPrimaryService(GIIKER_SERVICE_UUID);
                var cubeCharacteristic = await cubeService.getCharacteristic(GIIKER_CHARACTERISTIC_UUID);
                cubeCharacteristic.addEventListener("characteristicvaluechanged", onGiikerCubeCharacteristicChanged);
                await cubeCharacteristic.startNotifications();
            }else {
                throw "Unknown device: " + server.device.name;
            }

            device.addEventListener('gattserverdisconnected', ()=>{console.log("desconectado");});
        // } catch (ex) {
        //     device = null;
        // }
    }

    var first = true;
    function onGiikerCubeCharacteristicChanged(event) {
        // try {
            if (first) {
                first = false;
                return; // skip first event
            }
    
            var val = event.target.value;
            var state = [];
    
            if (val.getUint8(18) == 0xa7) { // decrypt
                var key = [176, 81, 104, 224, 86, 137, 237, 119, 38, 26, 193, 161, 210, 126, 150, 81, 93, 13, 236, 249, 89, 235, 88, 24, 113, 81, 214, 131, 130, 199, 2, 169, 39, 165, 171, 41];
                var k = val.getUint8(19);
                var k1 = k >> 4 & 0xf;
                var k2 = k & 0xf;
    
                for (var i = 0; i < 20; i++) {
                    var v = (val.getUint8(i) + key[i + k1] + key[i + k2]) & 0xff;
                    state.push(v >> 4 & 0xf);
                    state.push(v & 0xf);
                }
            } else {
                for (var i = 0; i < 20; i++) {
                    var v = val.getUint8(i);
                    state.push(v >> 4 & 0xf);
                    state.push(v & 0xf);
                }
            }
    
            var face = state[32];
            var amount = state[33];
            var faceName = ["?", "B", "D", "L", "U", "R", "F"][face];
            var amountName = ["", "", "2", "'"][amount == 9 ? 2 : amount];
            var twist = faceName + amountName;
            
            
            moveCalls(twist)
            //checkWhiteCorners()
        // } catch (ex) {
        //     alert("ERROR (K): " + ex.message);
        // }
    }
    return {
        connect: connect // Exponer la función connect fuera del alcance
    };
})();
window.connect = BtCube.connect
const button = document.querySelector('button');
button.addEventListener("click",()=>{
    BtCube.connect();
})
function saluda() {
    console.log("hola");
}
window.saluda = saluda
function moveCalls(move) {
    console.log(move)
    window.move(move)
    // window.scrambleTime(move)
    // window.isSolved()
}