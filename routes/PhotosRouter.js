const PhotosRouter = require('express').Router();
const db = require('../models');
const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, "./public/images");
    },
    filename: (request, file, callback) => {
      callback(null, Date.now() + "--" + file.originalname);
    },
  });

  const uploadFilter = function (request, file, callback) {
      
      const fileType = file.mimetype.split('/');
      if (fileType[0] === "image") {
        callback(null, true)
      }else{
        callback("You are trying to upload a file that is not an image. Go back and try again", false)
      }
  };
  
  const upload = multer({ 
    fileFilter: uploadFilter,
    storage: fileStorageEngine
  });

  PhotosRouter.route("/")
  .get((request, response) => {
    db.photo
      .findAll()
      .then((photos) => {
        console.log("GET IMAGES");
        response.send(photos);
        //response.redirect('/');
      })
      .catch((error) => {
        response.send(error);
      });
  })

  PhotosRouter.route("/")
  .post(upload.single("photo"), (request, response) => {
    const title = request.body.title;
    const mediaLocation = request.file.filename;
    const ext = request.file.filename.split('.')[1];
    console.log('********File extension:',ext);
    if (ext !== "png" && ext !== "jpg" && ext !== "gif" && ext !== "jpeg") {
      response.send("Only photos are allowed, press go back to try again")
    }else{
    db.photo
      .create({ title: title, mediaLocation: mediaLocation })
      .then((photo) => {
        console.log("POST IMAGES");
        //response.send(photo);
        response.redirect('/');
      })
      .catch((error) => {
        response.send(error);
      });
  }});

  module.exports = PhotosRouter;