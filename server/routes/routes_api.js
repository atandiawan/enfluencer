let express = require('express')
let router = express.Router()
let instagram_api = require('../controller/instagram_api.js')
let config = require('../config/instagram_auth')
let Users = require('../models/users.js')

router.get('/test', function(req,res,next){
  res.json({message:"test"})
})

router.get('/submit', function(req,res,next){
  res.redirect(`https://api.instagram.com/oauth/authorize/?client_id=${config.clientID}&redirect_uri=${config.redirectURI}&response_type=code`)
})

router.get('/submit/callback', function(req,res,next){
  if(req.body){

  } else {
    instagram_api.sendCode(config.clientID, config.clientSecret, config.redirectURI, req.query.code, function(result){
      instagram_api.getMedia(result.access_token, function(media){
        instagram_api.getSelf(result.access_token, function(self){
          instagram_api.isUserExistInDB(result.user.username, function(is){
            if(is==true){
              instagram_api.updateDatabase(result,media,self,function(hasil){
                res.redirect("http://localhost:8000/submit")
                // location.reload(true)
                // window.location.href = "http://localhost:8000/"
              })
            } else {
              instagram_api.saveToDatabase(result,media,self, function(hasil){
                res.redirect("http://localhost:8000/submit")
                // location.reload(true)
                // window.location.href = "http://localhost:8000/"
              })
            }
          })
        })
      })
    })
  }
})

router.get('/users', function(req,res,next){
  instagram_api.getAllUsers(function(users){
    res.json(users)
  })
})

module.exports = router
