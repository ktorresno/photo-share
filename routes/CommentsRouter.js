const express = require("express");
const CommentsRouter = express.Router();
const db = require("../models");

CommentsRouter.use(express.static("public"));

CommentsRouter.route('/:photoId')
.get((request, response)=>{
    const photoId = request.params.photoId;
    db.comment
    .findAll({ where: { photoId: photoId } })
    .then(comment => {
        //response.send(comment)
        console.log("From the router: ", JSON.stringify(comment));
        db.photo.findAll({ where: { Id: photoId } }) 
        .then((photo) =>{
            response.render("comment", { photo: photo, comment: comment, requestURL: request.url});
        });
    })
    .catch(err => {
        response.send(err);
    });
});

CommentsRouter.route('/:photoId')
.post((request, response)=>{
    const userId = request.session.userId;
    const photoId = request.params.photoId;
    const content = request.body.comment;
    db.comment.create({
        userId: userId, 
        photoId:photoId, 
        content:content
    }).then((comment)=> {
      response.redirect(`/comments${request.url}`);
    }).catch((err )=> {
        response.send(err)
    });
});



module.exports = CommentsRouter;