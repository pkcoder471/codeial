const like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.togglelike = async function(req,res){
    try{
        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }
        
        let existinglike = await like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        })

        if(existinglike){
            likeable.likes.pull(existinglike._id);
            likeable.save();
            existinglike.remove();
            deleted = true;
        }else{
            let newLike = await like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();
        }

        return res.json(200,{
            message: "Request Successful",
            data:{
                deleted: deleted
            }
        })
    }catch(err){
        console.log(err);
    }
}