const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    console.log("inside newComment mailer");

    nodeMailer.transporter.sendMail({
        from:'pklid471@gmial.com',
        to: comment.user.email,
        subject:"New Comment published!",
        html:'<h1> Yup,your comment is now published!</h1>',
    },(err,info) => {
        if(err){
            console.log(err);
            return;
        }
        console.log('Message Sent',info);
        return;
    })
}