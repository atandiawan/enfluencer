var querystring = require('querystring')
let https = require('https')
let http = require('http')
let Users = require('../models/users.js')

let sendCode = function(clientID, clientSecret, redirectURI, code, callback){
  let postData = querystring.stringify({client_id: clientID, client_secret: clientSecret, grant_type: "authorization_code", code: code, redirect_uri: redirectURI})

  let request =
  https.request({
    method:'POST',
    host:'api.instagram.com',
    path:"/oauth/access_token",
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    },
  }, function(response){
    let hasil = ""
    response.on('data', function(d){
      hasil+=d
    })
    response.on('end', function(){
      hasilJSON = JSON.parse(hasil)
      callback(hasilJSON)
    })
  })
  request.write(postData)
  request.end()
}

let getMedia = function(access_token, callback){
  console.log('masuk minta media')
  console.log(access_token)
  let request =
  https.request({
    method:'GET',
    host:'api.instagram.com',
    path:`/v1/users/self/media/recent/?access_token=${access_token}&count=4`,
  }, function(response){
    let hasil = ""
    response.on('data', function(d){
      hasil+=d
    })
    response.on('end', function(){
      let hasilJSON = JSON.parse(hasil)
      callback(hasilJSON)
    })
  })
  request.end()
}

let getSelf = function(access_token, callback){
  let request =
  https.request({
    method:'GET',
    host:'api.instagram.com',
    path:`/v1/users/self/?access_token=${access_token}`,
  }, function(response){
    let hasil = ""
    response.on('data', function(d){
      hasil+=d
    })
    response.on('end', function(){
      let hasilJSON = JSON.parse(hasil)
      callback(hasilJSON)
    })
  })
  request.end()
}

let saveToDatabase = function(user_information, media,self,callback){
  let newuser = new Users({username:user_information.user.username, bio:user_information.user.bio, website:user_information.user.website,profile_picture: user_information.user.profile_picture, full_name: user_information.user.full_name, instagram_id: user_information.user.id, media: self.data.counts.media, follows: self.data.counts.follows, followed_by: self.data.counts.followed_by, first_photo: media.data[0].images.low_resolution.url,second_photo: media.data[1].images.low_resolution.url, third_photo: media.data[2].images.low_resolution.url, fourth_photo: media.data[3].images.low_resolution.url}).save(function(err, result){
    if(err){
      callback({message: "error", details: err})
    } else {
      callback(result)
    }
  })
}

let updateDatabase = function(user_information, media,self,callback){
  Users.update({username: user_information.user.username},{username:user_information.user.username, bio:user_information.user.bio, website:user_information.user.website,profile_picture: user_information.user.profile_picture, full_name: user_information.user.full_name, instagram_id: user_information.user.id, media: self.data.counts.media, follows: self.data.counts.follows, followed_by: self.data.counts.followed_by, first_photo: media.data[0].images.low_resolution.url,second_photo: media.data[1].images.low_resolution.url, third_photo: media.data[2].images.low_resolution.url, fourth_photo: media.data[3].images.low_resolution.url},function(err, result){
    if(err){
      callback({message: "error", details: err})
    } else {
      callback(result)
    }
  })
}


let getAllUsers = function(callback){
  Users.find({}).sort({"username":-1}).exec(function(err, result){
    if(err){
      callback({message:"error", details: err})
    } else {
      callback(result)
    }
  })
}

let isUserExistInDB = function(username, callback){
  console.log("masuk sininiiii", username)
  Users.findOne({username: username}, function(err, result){
    if(result == null){
      console.log("tidak ada", result)
      callback(false)
    } else {
      console.log("ada",result)
      callback(true)
    }
  })
}

module.exports = {updateDatabase,sendCode, getMedia, saveToDatabase, getAllUsers, getSelf, isUserExistInDB}
