/**
 * Wr - Filtros Otimizados (Versão Fluida)
 */

function aplicarEfeitos(results) {
    if (!results.image) return;

    canvasCtx.save();
    
    // Limpa o canvas
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // Desenha o vídeo base (O CSS cuida do espelhamento)
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        for (const landmarks of results.multiFaceLandmarks) {
            
            // 1. CONTORNO COMPLETO (Inclui a testa e queixo)
            drawConnectors(canvasCtx, landmarks, FACEMESH_FACE_OVAL, {
                color: '#00FF00', 
                lineWidth: 2
            });
            
            // 2. SOBRANCELHAS (Ajuda a fechar o desenho da testa)
            drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYEBROW, {color: '#00FF00', lineWidth: 1});
            drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYEBROW, {color: '#00FF00', lineWidth: 1});

            // 3. OLHOS
            drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYE, {color: '#FF0000', lineWidth: 1});
            drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYE, {color: '#FF0000', lineWidth: 1});

            // 4. BOCA
            drawConnectors(canvasCtx, landmarks, FACEMESH_LIPS, {
                color: '#FFFFFF', 
                lineWidth: 2
            });
        }
    }
    
    canvasCtx.restore();
}
