type SplitBlobOptions = {
    /**chunk size(byte), prior to `chunks` */
    chunkSize?: number;
    /**chunk count */
    chunkCount?: number;
};
/**
 * split specific blob data to specific chunk num according to chunk size
 * @param blobData the blob data to be splited
 * @param options split options
 */
export function splitBlob(blobData: Blob, options?: SplitBlobOptions) {
    const def: SplitBlobOptions = { chunkSize: 2 * 1024 * 1024 };
    options = options || def;
    let chunkSize: number = def.chunkSize as number;
    if (options.chunkSize) {
        chunkSize = options.chunkSize;
    } else if (options.chunkCount) {
        if (blobData.size % options.chunkCount === 0) {
            chunkSize = blobData.size / options.chunkCount;
        } else {
            chunkSize = Math.floor(blobData.size / (options.chunkCount - 1));
        }
    }
    const blobParts: Blob[] = [];
    let i = 0;
    while (i <= blobData.size) {
        blobParts.push(blobData.slice(i, chunkSize + i, blobData.type));
        i = chunkSize + i;
    }
    return {
        chunks: blobParts,
        chunkSize,
    };
}