const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');

// Configure Multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

async function uploadImages(req, res) {
    try {
        // Use multer.array() to handle files sent in the request body
        upload.array(req.body.images)(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }

            // Process uploaded files
            const uploadedFiles = req.files.map(async (file) => {
                // Generate a unique filename
                const uniqueFileName = `${Date.now()}-${file.originalname}`;

                // Save the file to a directory (for example, 'uploads')
                const filePath = path.join(__dirname, 'uploads', uniqueFileName);
                try {
                    await fs.writeFile(filePath, file.buffer);
                } catch (error) {
                    console.error(error);
                    return res.status(500).json({ message: 'Error saving file.' });
                }

                // Return an object with filename and path for further processing/storage
                return { filename: uniqueFileName, path: filePath };
            });

            const processedFiles = await Promise.all(uploadedFiles);

            // Return information about uploaded files
            return res.status(200).json({ files: processedFiles });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error!' });
    }
}

module.exports = { uploadImages };
