let express = require('express')
let app2 = express()
app2.set('view-engine','ejs')
app2.set('views', __dirname + '/views')
app2.use('/',express.static(__dirname + '/'))

//homepage to submit profile
app2.get('/', function(req,res,next){
  res.render('index.ejs')
})

app2.get('/submit', function(req,res,next){
  res.render('index.ejs')
})

app2.listen(8000, function(){
  console.log("listening on 8000")
})

console.log('halo')
