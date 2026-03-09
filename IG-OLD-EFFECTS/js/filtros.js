/**
 * Wr - Filtros Otimizados para iOS
 */

function aplicarEfeitos(results) {
    // Se não houver imagem, interrompe para não travar
    if (!results.image) return;

    canvasCtx.save();
    
    // Limpa o canvas
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // Desenha o vídeo (Sem inverter aqui, deixamos o CSS inverter tudo junto)
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        for (const landmarks of results.multiFaceLandmarks) {
            
            // 1. MALHA COMPLETA (Cobre a testa e todo o rosto)
            // Usamos uma cor suave para não sobrecarregar o visual
            drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION, {
                color: '#C0C0C030', 
                lineWidth: 0.5
            });

            // 2. CONTORNO EXTERNO (Inclui a linha do cabelo/testa)
            drawConnectors(canvasCtx, landmarks, FACEMESH_FACE_OVAL, {
                color: '#00FF00', 
                lineWidth: 2
            });
            
            // 3. OLHOS E SOBRANCELHAS (Dando foco total ao rosto)
            drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYEBROW, {color: '#00FF00', lineWidth: 1});
            drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYEBROW, {color: '#00FF00', lineWidth: 1});
            
            drawConnectors(canvasCtx, landmarks, FACEMESH_LIPS, {
                color: '#FFFFFF', 
                lineWidth: 2
            });
        }
    }
    
    canvasCtx.restore();
}
