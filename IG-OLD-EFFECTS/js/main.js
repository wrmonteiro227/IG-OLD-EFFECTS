const videoElement = document.getElementById('input_video');
const canvasElement = document.getElementById('output_canvas');
const canvasCtx = canvasElement.getContext('2d');

const faceMesh = new FaceMesh({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
}});

faceMesh.setOptions({
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

// Esta função roda a cada frame do vídeo
faceMesh.onResults(aplicarEfeitos); 

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await faceMesh.send({image: videoElement});
  },
  width: 1280,
  height: 720
});
camera.start();

// Ajustar tamanho do canvas ao carregar
window.onload = () => {
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
};