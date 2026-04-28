import { useState } from "react";

const CLOUD_NAME = 'eventmetro';
const UPLOAD_PRESET = "efoliohub_video";
const CHUNK_SIZE = 6 * 1024 * 1024;

export default function VideoUpload() {
    const [progress, setProgress] = useState(0);
    const [uploadedUrl, setUploadedUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    const uploadChunked = async (file: File) => {
        setUploading(true);
        setProgress(0);
        setError("");
        setUploadedUrl("");

        const totalSize = file.size;
        const totalChunks = Math.ceil(totalSize / CHUNK_SIZE);
        const uniqueUploadId = `uqid-${Date.now()}-${Math.random().toString(36).slice(2)}`;

        console.log(`Starting upload: ${totalChunks} chunks, file size: ${totalSize}, uniqueId ${uniqueUploadId}`);

        let finalResponse: any = null;

        for (let i = 0; i < totalChunks; i++) {
            const start = i * CHUNK_SIZE;
            const end = Math.min(start + CHUNK_SIZE, totalSize);
            const chunk = file.slice(start, end);

            console.log(start, end, chunk);

            setStatus(`Uploading part ${i + 1} of ${totalChunks}...`);

            const formData = new FormData();
            formData.append("file", chunk, file.name); // filename is important!
            formData.append("upload_preset", UPLOAD_PRESET);
            formData.append("resource_type", "video");

            // Content-Range: bytes start-(end-1)/total  ← end is EXCLUSIVE so subtract 1
            const contentRange = `bytes ${start}-${end - 1}/${totalSize}`;

            console.log(`Chunk ${i + 1}: ${contentRange}`);
            console.log(formData);

            let response: Response;
            try {
                response = await fetch(
                    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
                    {
                        method: "POST",
                        headers: {
                            "X-Unique-Upload-Id": uniqueUploadId,
                            "Content-Range": contentRange,
                        },
                        body: formData,
                    }
                );
            } catch (networkErr) {
                setError(`Network error on chunk ${i + 1}. Check your internet connection.`);
                setUploading(false);
                return;
            }

            const data = await response.json();
            console.log(`Chunk ${i + 1} response (${response.status}):`, data);

            // 400 = bad request (wrong preset, wrong range, etc.)
            if (response.status === 400) {
                setError(`Upload failed: ${data?.error?.message || JSON.stringify(data)}`);
                setUploading(false);
                return;
            }

            // 200 = intermediate chunk accepted (not done yet)
            // 200 on the LAST chunk = fully done
            finalResponse = data;

            setProgress(Math.round((end / totalSize) * 100));
        }

        if (finalResponse?.secure_url) {
            setUploadedUrl(finalResponse.secure_url);
            setStatus("✅ Upload complete!");
        } else {
            setError(
                `Upload finished but no URL returned. Last response: ${JSON.stringify(finalResponse)}`
            );
        }

        setUploading(false);
    };

    return (
        <div className="bg-gray-50 text-black" style={{ padding: 20 }}>
            <input
                type="file"
                accept="video/*"
                disabled={uploading}
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadChunked(file);
                }}
            />

            {uploading && (
                <div>
                    <p>{status}</p>
                    <progress value={progress} max={100} style={{ width: "100%" }} />
                    <p>{progress}%</p>
                </div>
            )}

            {error && <p style={{ color: "red" }}>❌ {error}</p>}

            {uploadedUrl && (
                <div>
                    <p>{status}</p>
                    <video src={uploadedUrl} controls width="500" />
                    <p>
                        <a href={uploadedUrl} target="_blank" rel="noreferrer">
                            {uploadedUrl}
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
}