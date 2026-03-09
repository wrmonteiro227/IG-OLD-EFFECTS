/**
 * Lógica de Captura e Salvamento Local
 */

let mediaRecorder;
let recordedChunks = [];

const btnFoto = document.getElementById('btn-foto');
const btnVideo = document.getElementById('btn-video');

// --- FUNÇÃO PARA TIRAR FOTO ---
btnFoto.onclick = () => {
    const dataUrl = canvasElement.toDataURL("image/png");
    const link = document.createElement('a');
    link.download = `wr-snap-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
};

// --- LÓGICA DE VÍDEO ---
btnVideo.onclick = () => {
    if (btnVideo.classList.contains('recording')) {
        pararGravacao();
    } else {
        iniciarGravacao();
    }
};

function iniciarGravacao() {
    recordedChunks = [];
    // Captura o stream do Canvas a 30 FPS
    const stream = canvasElement.captureStream(30);
    
    mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm; codecs=vp9' 
    });

    mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunks.push(e.data);
    };

    mediaRecorder.onstop = salvarVideo;

    mediaRecorder.start();
    btnVideo.innerText = "⏹ Parar";
    btnVideo.classList.add('recording');
}

function pararGravacao() {
    mediaRecorder.stop();
    btnVideo.innerText = "🔴 Gravar";
    btnVideo.classList.remove('recording');
}

function salvarVideo() {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `wr-video-${Date.now()}.webm`;
    document.body.appendChild(link);
    link.click();
    
    // Limpar memória
    setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }, 100);
}