let chai = require('chai')
let expect = chai.expect
let chaiHttp = require('chai-http')
chai.use(chaiHttp)

describe('getting all the data from database', function(){
  it('should get all the data', function(done){
    chai.request('http://localhost:3000').get('/api/users').end(function(err,result){
      expect(result.body[0]).to.have.property('username')
      expect(result.body[0]).to.have.property('bio')
      expect(result.body[0]).to.have.property('profile_picture')
      expect(result.body[0]).to.have.property('full_name')
      expect(result.body[0]).to.have.property('instagram_id')
      expect(result.body[0]).to.have.property('media')
      expect(result.body[0]).to.have.property('follows')
      expect(result.body[0]).to.have.property('followed_by')
      expect(result.body[0]).to.have.property('first_photo')
      expect(result.body[0]).to.have.property('second_photo')
      expect(result.body[0]).to.have.property('third_photo')
      expect(result.body[0]).to.have.property('fourth_photo')
      done()
    })
  })
})
