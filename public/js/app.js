$(document).ready(function () {
  $(".user-image-box").on("click", function () {
    $("#profile-box").slideToggle();
    $("#message-box").slideUp();
    $("#notification-box").slideUp();
  });

  $(".message-icon").on("click", function () {
    $("#message-box").slideToggle();
    $("#profile-box").slideUp();
    $("#notification-box").slideUp();
  });

  $(".bell-icon").on("click", function () {
    $("#notification-box").slideToggle();
    $("#profile-box").slideUp();
    $("#message-box").slideUp();
  });

  $(".toggle-navbar-list-1").on("click", function () {
    $(".leftNavbar-section-3-toggle").slideToggle();
    $(".leftNavbar-section-3-toggle-4").slideUp();
    $(".leftNavbar-section-3-toggle-4-5").slideUp();
    $(".leftNavbar-section-3-toggle-4-5-6").slideUp();
  });

  $(".toggle-navbar-list-1-4").on("click", function () {
    $(".leftNavbar-section-3-toggle-4").slideToggle();
    $(".leftNavbar-section-3-toggle-4-5").slideUp();
    $(".leftNavbar-section-3-toggle-4-5-6").slideUp();
    $(".leftNavbar-section-3-toggle").slideUp();
  });

  $(".toggle-navbar-list-1-4-5").on("click", function () {
    $(".leftNavbar-section-3-toggle-4-5").slideToggle();
    $(".leftNavbar-section-3-toggle-4-5-6").slideUp();
    $(".leftNavbar-section-3-toggle-4").slideUp();
    $(".leftNavbar-section-3-toggle").slideUp();
  });

  $(".toggle-navbar-list-1-4-5-6").on("click", function () {
    $(".leftNavbar-section-3-toggle-4-5-6").slideToggle();
    $(".leftNavbar-section-3-toggle-4-5").slideUp();
    $(".leftNavbar-section-3-toggle-4").slideUp();
    $(".leftNavbar-section-3-toggle").slideUp();
  });

  $(".hamburger-icon").on("click", function () {
    $("#leftNavbar").show();
  });

  $("#main-wrapper").on("click", function () {
    $("#profile-box").slideUp();
    $("#message-box").slideUp();
    $("#notification-box").slideUp();
    $(".leftNavbar-section-3-toggle").slideUp();
    $(".leftNavbar-section-3-toggle-4").slideUp();
    $(".leftNavbar-section-3-toggle-4-5").slideUp();
    $(".leftNavbar-section-3-toggle-4-5-6").slideUp();
  });

  if (window.screen.width < 700) {
    $("#main-wrapper").on("click", function () {
      $("#leftNavbar").hide();
      $("#profile-box").slideUp();
      $("#message-box").slideUp();
      $("#notification-box").slideUp();
      $(".leftNavbar-section-3-toggle").slideUp();
      $(".leftNavbar-section-3-toggle-4").slideUp();
      $(".leftNavbar-section-3-toggle-4-5").slideUp();
      $(".leftNavbar-section-3-toggle-4-5-6").slideUp();
    });
  }

  new WOW().init();

  $('.projects-card-box, .gallery-box').magnificPopup({
    delegate: 'a', // child items selector, by clicking on it popup will open
    type: 'image',
    gallery: {
      enabled: true
    }
  });

  // Scroll certain amounts from current position
  window.scrollBy({
    top: 0, // could be negative value
    left: 0,
    behavior: 'smooth'
  });

  const lunchDate = new Date("jun 4, 2019 00:00:00").getTime();

  setInterval(() => {
    const now = new Date().getTime();
    const remainingTime = lunchDate - now;
    const days = Math.floor(remainingTime / (1000*60*60*24));
    const hours = Math.floor(remainingTime % (1000*60*60*24) / (1000*60*60));
    const minutes = Math.floor(remainingTime % (1000*60*60) / (1000*60));
    const seconds = Math.floor(remainingTime % (1000*60) / (1000));
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  }, 1000)

  $(".project-add-disk").on("click", () => {
    $("#projects-add-model").slideToggle();
  })

  $(".left-btn").on("click", () => {
    $("#projects-add-model").slideUp(200);
  })

  $(".input-file").on("change", () => {
    $('#label').text("1 file selected...");
  })

  tinymce.init({
    selector: '.addPost-inner-textarea',
    theme: 'modern',
    plugins: [
      'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
      'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
      'save table contextmenu directionality emoticons template paste textcolor'
    ],
    content_css: 'css/content.css',
    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons'
  });

  $(".post-image-input").on("change", () => {
    $('.post-image').text("1 file selected...");
  })
});
