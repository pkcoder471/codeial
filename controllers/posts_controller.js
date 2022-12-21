const Post=require('../models/post');
const Comment=require('../models/comments');
const Like = require('../models/like');

module.exports.create= async function(req,res){
    try{
    let post= await Post.create({
        content:req.body.content,
        user:req.user.id
    })

    if(req.xhr){
        return res.status(200).json({
            data:{
                post:post
            },
            message: "Post created!"
        })
    }
    return res.redirect('back'); 
    }
    catch(err){
        console.log('Error',err);
        return ;
    }

}
module.exports.destroy= async function(req,res){
    try{
    let post= await Post.findById(req.params.id);

    
    if(post.user==req.user.id){

        await Like.deleteMany({likeable: post,onModel: 'Post'});
        await Like.deleteMany({_id:{$in: post.comments}});

        post.remove();

        await Comment.deleteMany({post:req.params.id});

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id:req.params.id
                },
                message:"Post deleted"
            });
        }
        
        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
    }
    catch(err){
        console.log('Error',err);
        return ;
    }
}