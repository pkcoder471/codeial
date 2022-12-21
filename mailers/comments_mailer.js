const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    console.log("inside newComment mailer");
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from:'pklid471@gmial.com',
        to: comment.user.email,
        subject:"New Comment published!",
        html:htmlString,
    },(err,info) => {
        if(err){
            console.log(err);
            return;
        }
        console.log('Message Sent',info);
        return;
    })
}