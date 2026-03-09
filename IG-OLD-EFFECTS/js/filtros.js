/**
 * Wr - Lógica de Renderização e Filtros Consolidados
 * Este arquivo controla o que é desenhado sobre o rosto.
 */

function aplicarEfeitos(results) {
    canvasCtx.save();
    
    // Limpa o frame anterior
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // INVERSÃO DE COORDENADAS (Para alinhar com o CSS espelhado)
    canvasCtx.translate(canvasElement.width, 0);
    canvasCtx.scale(-1, 1);

    // Desenha o vídeo da câmera (fundo)
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    // Verifica se há rostos detectados
    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        for (const landmarks of results.multiFaceLandmarks) {
            
            // 1. Contorno do Rosto (Verde Neon)
            drawConnectors(canvasCtx, landmarks, FACEMESH_FACE_OVAL, {
                color: '#00FF00', 
                lineWidth: 2
            });
            
            // 2. Olhos (Vermelho Neon)
            drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYE, {
                color: '#FF0000', 
                lineWidth: 1
            });
            drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYE, {
                color: '#FF0000', 
                lineWidth: 1
            });

            // 3. Lábios (Branco Neon)
            drawConnectors(canvasCtx, landmarks, FACEMESH_LIPS, {
                color: '#FFFFFF', 
                lineWidth: 2
            });

            // 4. Íris/Pupilas (Azul) - Para detalhamento extra
            drawConnectors(canvasCtx, landmarks, FACEMESH_IRIS, {
                color: '#00FFFF', 
                lineWidth: 1
            });
        }
    }
    
    canvasCtx.restore();
}
