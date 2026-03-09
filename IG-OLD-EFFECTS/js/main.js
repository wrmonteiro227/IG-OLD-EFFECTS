const videoElement = document.getElementById('input_video');
const canvasElement = document.getElementById('output_canvas');
const canvasCtx = canvasElement.getContext('2d');

const faceMesh = new FaceMesh({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
}});

// CONFIGURAÇÃO LEVE PARA NÃO TRAVAR
faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: false, // DESATIVADO: Isso economiza muita CPU
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});

faceMesh.onResults(aplicarEfeitos);

function resizeCanvas() {
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const camera = new Camera(videoElement, {
    onFrame: async () => {
        await faceMesh.send({image: videoElement});
    },
    width: 1280, 
    height: 720
});

camera.start().catch(err => {
    alert("Erro na câmera. Verifique o HTTPS ou permissões.");
});

