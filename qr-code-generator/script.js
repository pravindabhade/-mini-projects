const qrText = document.getElementById("qrText");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const qrImage = document.getElementById("qrImage");

// Generate QR Code
function generateQR() {

    const text = qrText.value.trim();

    if (text === "") {
        alert("Please enter text or URL!");
        qrText.focus();
        return;
    }

    generateBtn.innerHTML = "Generating...";
    generateBtn.disabled = true;

    // Free QR Code API
    const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(text)}`;

    qrImage.src = qrURL;

    qrImage.onload = () => {
        qrImage.style.display = "block";
        downloadBtn.style.display = "block";

        generateBtn.innerHTML = "Generate QR";
        generateBtn.disabled = false;
    };

    qrImage.onerror = () => {
        alert("Failed to generate QR Code.");

        generateBtn.innerHTML = "Generate QR";
        generateBtn.disabled = false;
    };
}

// Generate Button
generateBtn.addEventListener("click", generateQR);

// Press Enter
qrText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        generateQR();
    }
});

// Download QR
downloadBtn.addEventListener("click", async () => {

    try {

        const response = await fetch(qrImage.src);
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "QRCode.png";

        document.body.appendChild(a);
        a.click();

        a.remove();
        window.URL.revokeObjectURL(url);

    } catch (error) {
        alert("Unable to download QR Code.");
    }

});