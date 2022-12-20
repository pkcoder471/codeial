
const User=require('../models/user')
const fs = require('fs');
const path = require('path');
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('profile',{
            title:'user_profile',
            profile_user:user
        });
    })
    
}

module.exports.update= async function(req,res){
    if(req.user.id==req.params.id){
        try{
        let user = await User.findByIdAndUpdate(req.params.id);
        User.uploadedAvatar(req,res,function(err){
            if(err){console.log('****Multer Error',err)}
            
            user.name= req.body.name;
            user.email= req.body.email;

            if(req.file){
                if(user.avatar){
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                }
                user.avatar= User.avatarPath+'/'+req.file.filename;
            }
            user.save();
            return res.redirect('back');
        })
        }
        catch(err){
            return res.redirect('back');
        }
    }
    else{
        res.status(401).send('unauthorized');
    }
}

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"codeial | SignIn"
    })
}
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"codeial | SignUp"
    })
}

module.exports.create=function(req,res){
     if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
     }

     User.findOne({email:req.body.email},function(err,user){
          if(err){ console.log(`error in finding user :${err}`); return;}

          if(!user){
              User.create(req.body,function(err,user){
                if(err){ console.log(`error in creating user :${err}`); return;}

                return res.redirect('/users/sign-in');
              })
          }
          else{
            return res.redirect('back');
          }
     })
}
module.exports.createSession=function(req,res){
    console.log("hello");
    req.flash('success','logged in Successfully')
    return res.redirect('/');
}
module.exports.destroySession=function(req,res,next){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success','You have logged out');
        res.redirect('/');
    })
}
