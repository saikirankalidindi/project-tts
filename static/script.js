document.addEventListener('DOMContentLoaded', function() {
    const convertButton = document.getElementById('convertButton');
    const inputText = document.getElementById('inputText');
    const audioPlayer = document.getElementById('audioPlayer');

    convertButton.addEventListener('click', function() {
        const text = inputText.value;
        fetch('/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        })
        .then(response => response.blob())
        .then(blob => {
            const audioUrl = URL.createObjectURL(blob);
            audioPlayer.src = audioUrl;
            audioPlayer.play();
        });
    });
});
