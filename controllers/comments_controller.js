const Comment=require('../models/comments');
const commentMailer = require('../mailers/comments_mailer');
const Post=require('../models/post');
const Like = require('../models/like');


module.exports.create= async function(req,res){
    try{
    let post = await Post.findById(req.body.post)
    if(post){
        let comment = await Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id
        })
        post.comments.push(comment);
        post.save();
        console.log(comment);
        comment = await comment
        .populate('user');
        commentMailer.newComment(comment);
        res.redirect('/');   
            
    }
    }
    catch(err){
        console.log('Error',err);
        return;
    }
}
module.exports.destroy= async function(req,res){
    try{
    
    let comment = Comment.findById(req.params.id);
    
        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.remove();

            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
            
            let post = Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
                
            return res.redirect('back');
            
        }
        else{
            res.redirect('back');
        }
    }catch(err){
        console.log(err);
    }
}