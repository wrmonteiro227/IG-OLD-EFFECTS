let mediaRecorder;
let recordedChunks = [];

const btnFoto = document.getElementById('btn-foto');
const btnVideo = document.getElementById('btn-video');

btnFoto.onclick = () => {
    const dataUrl = canvasElement.toDataURL("image/png");
    const link = document.createElement('a');
    link.download = `wr-snap-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
};

btnVideo.onclick = () => {
    if (btnVideo.classList.contains('recording')) {
        pararGravacao();
    } else {
        iniciarGravacao();
    }
};

function iniciarGravacao() {
    recordedChunks = [];
    const stream = canvasElement.captureStream(30);
    
    // Lista de formatos compatíveis (tentando MP4 primeiro para abrir no celular)
    const tipos = [
        'video/mp4;codecs=h264',
        'video/webm;codecs=h264',
        'video/webm'
    ];
    
    let tipoSuportado = tipos.find(t => MediaRecorder.isTypeSupported(t));

    mediaRecorder = new MediaRecorder(stream, { mimeType: tipoSuportado });

    mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunks.push(e.data);
    };

    mediaRecorder.onstop = salvarVideo;
    mediaRecorder.start();
    
    btnVideo.innerText = "⏹ PARAR";
    btnVideo.classList.add('recording');
}

function pararGravacao() {
    mediaRecorder.stop();
    btnVideo.innerText = "🔴 GRAVAR";
    btnVideo.classList.remove('recording');
}

function salvarVideo() {
    const blob = new Blob(recordedChunks, { type: mediaRecorder.mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    // Força a extensão .mp4 para o celular identificar como vídeo
    link.download = `wr-video-${Date.now()}.mp4`;
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }, 100);
}
