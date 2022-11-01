
const User=require('../models/user')

module.exports.profile=function(req,res){
    return res.render("<h1>My Profile<h1>");
}

module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"codeial | SignIn"
    })
}
module.exports.signUp=function(req,res){
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
