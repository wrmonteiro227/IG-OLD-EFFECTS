function aplicarEfeitos(results) {
    canvasCtx.save();
    
    // Limpa e desenha o vídeo
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    if (results.multiFaceLandmarks) {
        for (const landmarks of results.multiFaceLandmarks) {
            
            // EFEITO 1: Desenhar o contorno do rosto em Neon
            drawConnectors(canvasCtx, landmarks, FACEMESH_FACE_OVAL, {color: '#00FF00', lineWidth: 2});
            
            // EFEITO 2: Desenhar contorno dos olhos
            drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYE, {color: '#FF0000', lineWidth: 1});
            drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYE, {color: '#FF0000', lineWidth: 1});

            // EFEITO 3: Desenhar os lábios
            drawConnectors(canvasCtx, landmarks, FACEMESH_LIPS, {color: '#FFFFFF', lineWidth: 2});
        }
    }
    canvasCtx.restore();
}
