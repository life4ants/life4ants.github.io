$().ready(function(){
  var navHeight = $("nav").outerHeight()

  $(".tab").click(function(){
    $(".active").removeClass("active")
    $(this).addClass("active")
  })

  $("a").on('click', function(event) {

    if (this.hash !== "") {
      event.preventDefault()
      var hash = this.hash
      $('html, body').animate({
        scrollTop: $(hash).offset().top-navHeight
      }, 300, function(){
        window.location.hash = hash;
      })
    }

  })

  $(window).scroll(function(){
    var fromTop = $("body").scrollTop()
    $(".active").removeClass("active")

    if (fromTop >= $("#contact").offset().top-navHeight){
      $("#contactTab").addClass("active")
    }
    else if (fromTop >= $("#projects").offset().top-navHeight){
      $("#projectsTab").addClass("active")
    }
    else if (fromTop >= $("#about").offset().top-navHeight){
      $("#aboutTab").addClass("active")
    }
    else if (fromTop >= $("#landing").offset().top-navHeight){
      $("#landingTab").addClass("active")
    }
  })

})