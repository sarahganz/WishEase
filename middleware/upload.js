const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();

// Configure AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Create an S3 instance
const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "wishease",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, `diary-entries/${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

module.exports = { upload };
