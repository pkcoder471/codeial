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