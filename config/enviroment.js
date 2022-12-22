const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key:'blahsomething',
    db:'codeial_development',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        sercure:false,
        auth:{
            user:'pklid471',
            pass:'hgzipaoirvtqvkti'
        }
    
    },
    google_clientID:"85653991578-mvs3jjhudok8mko6vpub4agc08ur65kn.apps.googleusercontent.com",
    google_clientSecret:"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",
    google_callbackURL:"http://localhost:8000/users/auth/google/callback",
    jwt_secret:'codeial',
}

const production = {
    name: 'production',
}


module.exports = development;