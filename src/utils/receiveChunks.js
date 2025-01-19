const fileBuffers = {};

export default function receiveChunks({ chunk, filename, offset, roomId, size, sender }, chunkSize) {
    if (!fileBuffers[filename]) {
        fileBuffers[filename] = [];
    }

    fileBuffers[filename].push(new Uint8Array(chunk));

    if (offset + chunkSize >= size) {
        // Reconstruct file
        const blob = new Blob(fileBuffers[filename]);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();

        delete fileBuffers[filename];

        console.log(`File "${filename}" received and downloaded!`);
    }
}
