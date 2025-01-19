export default function sendChunks(socket, roomId, key, file, updateFileStatus, isCancelled) {
    if (!file) return;

    // Chunk size (64 KB)
    const chunkSize = 64 * 1024;
    let offset = 0;

    const readChunk = () => {
        if (isCancelled) {
            return;
        }

        const slice = file.slice(offset, offset + chunkSize);
        const fileReader = new FileReader();

        fileReader.onload = (e) => {
            socket.emit("send-chunk", {
                id: key,
                chunk: e.target.result,
                filename: file.name,
                size: file.size,
                roomId: roomId,
                offset: offset,
            });

            offset += chunkSize;
            if (offset < file.size) {
                readChunk();
            } else {
                console.log("File upload complete!");
            }
            updateFileStatus(offset);
        };

        fileReader.readAsArrayBuffer(slice);
    };

    readChunk();
}
