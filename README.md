# WishEase

Welcome to WishEase, a personalized travel diary app designed to help you document and cherish your travel experiences.

## Description

WishEase allows users to create and manage a travel diary where they can document their travel experiences through photos and notes. Users can capture their favorite moments, destinations, and adventures, and relive them whenever they want.

## Website Images

![Welcome](/public/photos/welcome.png)
**Welcome Page:** Begin your journey with Wishease, an app that helps you realize your travel dreams. Discover amazing destinations and capture your memories in one place.
![AboutPage](/public/photos/about.png)
**About Page:** Dive deeper into Wishease's world. Learn about our vision to make your travel dreams a reality, and explore the features that make your journey unforgettable.
![home](/public/photos/home.png)
**Homepage:** Your travel achievements come to life on the Wishease homepage.
![wishlist](/public/photos/wishlist.png)
**Wishlist Page:** Curate your travel aspirations on your very own Wishlist Page. Add and mark off destinations you dream of visiting.
![diary](/public/photos/diary.png)
**Add Diary Page:** Relive your travel moments with Wishease. Create diary entries for your achieved wishes, capturing dates, dining experiences, anecdotes, and cherished photos.
![details](/public/photos/details.png)
**Details Page:** Immerse yourself in the heart of each travel memory. Wishease's Details Page showcases the essence of your achieved wishes, encapsulating your experiences with vivid imagery and captivating stories.

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Styling: CSS, Bootstrap
- Deployment: Heroku

## Challenging Code Parts

```javascript
const s3Client = new S3Client();
const s3Storage = multerS3({
  s3: s3Client,
  bucket: "wishease",
  acl: "public-read",
  metadata: (req, file, cb) => {
    cb(null, { fieldname: file.fieldname });
  },
  key: (req, file, cb) => {
    const fileName =
      req.params.folder +
      "/" +
      req.params.id +
      "/" +
      uuid.v4() +
      "_" +
      file.originalname;
    cb(null, fileName);
  },
});
function sanitizeFile(file, cb) {
  const fileExts = [".png", ".jpg", ".jpeg", ".gif"];
  const isAllowedExt = fileExts.includes(
    path.extname(file.originalname.toLowerCase())
  );
  const isAllowedMimeType = file.mimetype.startsWith("image/");
  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true);
  } else {
    cb("Error: File type not allowed!");
  }
}
const uploadImage = multer({
  storage: s3Storage,
  fileFilter: (req, file, callback) => {
    sanitizeFile(file, callback);
  },
  limits: {
    fileSize: 1024 * 1024 * 20,
  },
});
```

The most challenging code part of Wishease was likely the integration of the image upload and handling feature for diary entries. This involves managing the client-side interface for selecting and uploading images, as well as handling server-side processing of these images and associating them with the corresponding diary entries.

## Link to Website

Check out the live website here: [WishEase](https://wishease-edf811998b26.herokuapp.com/)

## Next Steps

As WishEase continues to evolve, we have several exciting features and improvements planned to enhance your experience:

- Enhanced Photo Gallery: We aim to provide you with a comprehensive photo gallery, where you can easily view and relive your travel memories through a stunning collection of photos.

- Advanced Filtering Options: We are working on incorporating powerful filtering options that allow you to organize and navigate your gallery based on specific criteria. You'll be able to filter photos by dates and locations, making it effortless to find and enjoy your cherished moments.

- Integration with Restaurants API: Our upcoming integration with a restaurants API will allow you to seamlessly discover nearby dining options during your travels. Easily explore local cuisine and enhance your travel experiences.

- Editable Trip Diaries: We understand the importance of preserving accurate travel narratives. Therefore, we are developing a feature that enables you to edit and update your trip diaries, ensuring your memories are accurately captured and detailed.

These upcoming enhancements reflect our commitment to continually improving WishEase and providing you with a seamless and delightful platform to document and relive your travel adventures. Your feedback and suggestions are invaluable in shaping the future of WishEase, and we look forward to bringing these features to life. Stay tuned for more exciting updates!
