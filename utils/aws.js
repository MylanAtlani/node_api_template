const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: "Your access key",
    secretAccessKey: "Your secret key",
        });

exports.uploadFile = async (filename, file) => {
    // Read content from the file
    const params = {
        Bucket: "", // pass your bucket name
        Key: filename, // file will be saved as filename pass to function
        Body: file.buffer,
        ContentType: file.mimeType
    };

    let data = await s3.upload(params).promise();
    return data.Location
};
