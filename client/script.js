$(document).ready(function(){
  console.log("ready READY")
  loadUsers()

  $("#join-update").click(function(){
    refresh()
  })

  $("#refresh").click(function(){
    loadUsers()
  })
})

let refresh = function(callback){
  window.location.href="http://localhost:3000/api/submit"
  // $.ajax({
  //   url:"http://localhost:3000/api/submit",
  //   method:"GET",
  //   success: function(result){
  //     loadUsers()
  //   }
  // })
}


let loadUsers = function(){
  $.ajax({
    url: "http://localhost:3000/api/users",
    method: 'GET',
    success: function(result){
      let users = ""

      for (let i in result){
        users = users + `
        <div class="row baris">
          <div class="col-lg-4">
            <div class="row">
              <div class="col-lg-5">
                <img src="${result[i].profile_picture}" width="150px" height="150px">
              </div>
              <div class="col-lg-7">
                <p>Username: ${result[i].username}<br>
                Media Posted: ${result[i].media}<br>
                Followers: ${result[i].followed_by}<br>
                Following: ${result[i].follows}<br><br>
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-8">
            <div class="row">
              <p><img class="portfolio" src="${result[i].first_photo}" width="150px" height="150px"><img class="portfolio" src="${result[i].second_photo}" width="150px" height="150px"><img class="portfolio" src="${result[i].third_photo}" width="150px" height="150px"><img class="portfolio" src="${result[i].fourth_photo}" width="150px" height="150px"></p>
            </div>
          </div>
        </div>
        `
      }
      $("#users").html(users)
    }
  })
}
