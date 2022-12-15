module.exports.createSession=function(req,res){
    req.flash('success','logged in Successfully')
    return res.redirect('/');
}