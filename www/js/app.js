// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'com.susomaias', // App bundle ID
  name: 'Susoma', // App name
  theme: 'md', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },

  // Dialog
  dialog: {
    // set default title for all dialog shortcuts
    title: 'Susoma',
  },

 

  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },

  
  // App routes
  routes: routes,
  
  // Enable panel left visibility breakpoint
  panel: {
    swipe: 'left',
    leftBreakpoint: 960,
  },

  // Enable Notification
  notification: {
    title: 'My App',
    closeTimeout: 3000,
    swipeToClose : true
  },

  statusbar: {
    enabled:true
  },
});

var swiper = app.swiper.create('.swiper-container-banner', {
  speed: 1200,
  spaceBetween: 10,
  autoplay: true,
}); 

// Init/Create left panel view
var mainView = app.views.create('.view-left', {
  url: '/'
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});


/*=== Standalone Dark ===*/
var myPhotoBrowserDark = app.photoBrowser.create({
  photos: [
    'http://susomaias.com/susoma/uploads/brochure/b1.jpg',
    'http://susomaias.com/susoma/uploads/brochure/b2.jpg',
    'http://susomaias.com/susoma/uploads/brochure/b3.jpg',
    'http://susomaias.com/susoma/uploads/brochure/b4.jpg',
    'http://susomaias.com/susoma/uploads/brochure/b5.jpg',
    'http://susomaias.com/susoma/uploads/brochure/b6.jpg',
  ],
  theme: 'dark'
});
$$('.pb-standalone-dark').on('click', function () {
  myPhotoBrowserDark.open();
});

var myPhotoBrowserDarkAssessment = app.photoBrowser.create({
  photos: [
    'http://susomaias.com/susoma/uploads/20180918_112902.png',
    'http://susomaias.com/susoma/uploads/20180918_113007.png',
  ],
  theme: 'dark'
});
$$('.pb-standalone-dark-assessment').on('click', function () {
  myPhotoBrowserDarkAssessment.open();
});




var notificationWithButton = app.notification.create({
  icon: '<i class="icon f7-icons color-red">bell_fill</i>',
  title: 'Susoma',
  subtitle: 'coming soon',
  text: 'This Section Coming Soon Shortly',
  closeButton: true,
});

var invalidUserIdMsg = app.notification.create({
  icon: '<i class="icon f7-icons color-red">close_round_fill</i>',
  title: 'Susoma',
  subtitle: 'Opps',
  text: 'Please Enter Valid Candidate Id Or you reached maximum login limit',
  closeButton: true,
});

var otpsuccessmsg = app.notification.create({
  icon: '<i class="icon f7-icons color-green">check_round_fill</i>',
  title: 'Susoma',
  subtitle: 'Success',
  text: 'OTP sms sent to your mobile number',
  closeButton: true,
});

var reviewSubmitMessage = app.notification.create({
  icon: '<i class="icon f7-icons color-green">check_round_fill</i>',
  title: 'Susoma',
  subtitle: 'Success',
  text: 'Your Review Submit Successfully',
  closeButton: true,
});

var contactSubmitMessage = app.notification.create({
  icon: '<i class="icon f7-icons color-green">check_round_fill</i>',
  title: 'Susoma',
  subtitle: 'Success',
  text: 'Your Contact Submit Successfully',
  closeButton: true,
});

var notificationCourseMissmach = app.notification.create({
  icon: '<i class="icon f7-icons color-red">close_round_fill</i>',
  title: 'Susoma',
  subtitle: 'Opps',
  text: 'You are not able to download this content',
  closeButton: true,
});

var notificationValidationError = app.notification.create({
  icon: '<i class="icon f7-icons color-red">close_round_fill</i>',
  title: 'Susoma',
  subtitle: 'Opps',
  text: 'Please fill up all the mandatory fields',
  closeButton: true,
});


var applicationRequestNotification = app.notification.create({
  icon: '<i class="icon f7-icons color-green">check_round_fill</i>',
  title: 'Susoma',
  subtitle: 'Success',
  text: 'Your request submit successfully',
  closeButton: true,
});

var applicationErrorRequestNotification = app.notification.create({
  icon: '<i class="icon f7-icons color-red">close_round_fill</i>',
  title: 'Susoma',
  subtitle: 'Error',
  text: 'Your are note allow to submit request',
  closeButton: true,
});


var fileDownloadCompleteNotification = app.notification.create({
  icon: '<i class="icon f7-icons color-green">check_round_fill</i>',
  title: 'Susoma',
  subtitle: 'Success',
  text: '<strong>File downloaded. Search in Susoma Folder In Your Intarnal Storage.</strong>',
  closeButton: true,
  closeTimeout: 30000,
});

// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  // Close login screen
  app.loginScreen.close('#my-login-screen');

  // Alert username and password
  app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
});
