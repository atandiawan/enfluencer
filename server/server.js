let express = require('express')
let app = express()
let port = process.env.PORT || 3000
let config = require('./config/instagram_auth.js')
let routes_api = require('./routes/routes_api.js')
let querystring = require('querystring')
let cors = require('cors')

app.use(cors())
app.use('/api', routes_api)

app.listen(port, function(req,res,next){
  console.log('listening on', port)
})
