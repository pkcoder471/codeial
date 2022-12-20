const path = require('path');
const nodemailer = require('nodemailer');
const ejs = require('ejs');

let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    sercure:false,
    auth:{
        user:'pklid471',
        pass:'hgzipaoirvtqvkti'
    }

});

let renderTemplate= (data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log('Error in rendering template',err); return ;};
            mailHTML=template;
        }
    )

    return mailHTML;
}

module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}