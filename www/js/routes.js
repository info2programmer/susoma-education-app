routes = [
  {
    path: "/",
    url: "./index.html"
  },
  {
    path: "/about/",
    url: "./pages/about.html"
  },
  {
    path: "/form/",
    url: "./pages/form.html"
  },
  // Left View Pages
  {
    path: "/left-page-1/",
    url: "./pages/left-page-1.html"
  },
  {
    path: "/left-page-2/",
    url: "./pages/left-page-2.html"
  },
  // Page Loaders & Router
  {
    path: "/page-loader-template7/:user/:userId/:posts/:postId/",
    templateUrl: "./pages/page-loader-template7.html"
  },
  {
    path: "/page-loader-component/:user/:userId/:posts/:postId/",
    componentUrl: "./pages/page-loader-component.html"
  },
  {
    path: "/notification/",
    async: function(routeTo, routeFrom, resolve, reject) {
      let router = this;
      let unique = router.app;

      unique.preloader.show();
      setTimeout(function() {
        phonegapApp.getNotification();
        unique.preloader.hide();
        resolve({
          componentUrl: "./pages/notification.html"
        });
      }, 1000);
    }
  },
  {
    path: "/notice-board/",
    async: function(routeTo, routeFrom, resolve, reject) {
      let router = this;
      let unique = router.app;

      unique.preloader.show();
      setTimeout(function() {
        phonegapApp.noticeBoard();
        unique.preloader.hide();
        resolve({
          componentUrl: "./pages/notice-board.html"
        });
      }, 1000);
    }
  },
  {
    path: "/profile/",
    async: function(routeTo, routeFrom, resolve, reject) {
      let router = this;
      let unique = router.app;
      unique.preloader.show();
      setTimeout(function() {
        phonegapApp.profile();
        unique.preloader.hide();
        resolve({
          componentUrl: "./pages/dashbord.html"
        });
      }, 1000);
    }
  },
  {
    path: "/magazine/",
    async: function(routeTo, routeFrom, resolve, reject) {
      let router = this;
      let unique = router.app;
      unique.preloader.show();
      setTimeout(function() {
        phonegapApp.magazine();
        unique.preloader.hide();
        resolve({
          componentUrl: "./pages/magazine.html"
        });
      }, 1000);
    }
  },

  {
    path: "/institute/",
    async: function(routeTo, routeFrom, resolve, reject) {
      let router = this;
      let unique = router.app;

      unique.preloader.show();
      setTimeout(function() {
        phonegapApp.institutesDetails();
        unique.preloader.hide();
        resolve({
          componentUrl: "./pages/institutes.html"
        });
      }, 1000);
    }
  },

  {
    path: "/course/",
    async: function(routeTo, routeFrom, resolve, reject) {
      let router = this;
      let unique = router.app;

      unique.preloader.show();
      setTimeout(function() {
        phonegapApp.courses();
        unique.preloader.hide();
        resolve({
          componentUrl: "./pages/course.html"
        });
      }, 1000);
    }
  },

  {
    path: "/course-details/:courseId",
    async: function(routeTo, routeFrom, resolve, reject) {
      let router = this;
      let unique = router.app;
      let courseId = routeTo.params.courseId;

      unique.preloader.show();
      setTimeout(function() {
        // app.getChat(parseInt(id));
        phonegapApp.courseDetails(courseId);
        unique.preloader.hide();
        resolve({
          componentUrl: "./pages/course-details.html"
        });
      }, 1000);
    }
  },

  {
    path: "/review/",
    async: function(routeTo, routeFrom, resolve, reject) {
      let router = this;
      let unique = router.app;

      unique.preloader.show();
      setTimeout(function() {
        phonegapApp.reviewLists();
        unique.preloader.hide();
        resolve({
          componentUrl: "./pages/review.html"
        });
      }, 1000);
    }
  },

  {
    path: "/marksheet-list/:userId",
    async: function(routeTo, routeFrom, resolve, reject) {
      let router = this;
      let unique = router.app;

      unique.preloader.show();
      setTimeout(function() {
        phonegapApp.markSheetList();
        unique.preloader.hide();
        resolve({
          componentUrl: "./pages/marksheet-list.html"
        });
      }, 1000);
    }
  },
  {
    path: "/certificate-list/:userId",
    async: function(routeTo, routeFrom, resolve, reject) {
      let router = this;
      let unique = router.app;

      unique.preloader.show();
      setTimeout(function() {
        phonegapApp.certificateList();
        unique.preloader.hide();
        resolve({
          componentUrl: "./pages/certificate-list.html"
        });
      }, 1000);
    }
  },

  {
    path: "/submit-review/",
    componentUrl: "./pages/give-review.html"
  },

  {
    path: "/enquiry/",
    async: function(routeTo, routeFrom, resolve, reject) {
      let router = this;
      let unique = router.app;

      unique.preloader.show();
      setTimeout(function() {
        unique.preloader.hide();
        resolve({
          componentUrl: "./pages/submit-enquiry.html"
        });
      }, 1000);
    }
  },

  {
    path: "/assesment/",
    async: function(routeTo, routeFrom, resolve, reject) {
      let router = this;
      let unique = router.app;

      unique.preloader.show();
      setTimeout(function() {
        phonegapApp.assessmentList();
        unique.preloader.hide();
        resolve({
          componentUrl: "./pages/assesment.html"
        });
      }, 1000);
    }
  },

  {
    path: "/policy/",
    async: function(routeTo, routeFrom, resolve, reject) {
      let router = this;
      let unique = router.app;

      unique.preloader.show();
      setTimeout(function() {
        phonegapApp.privacy();
        unique.preloader.hide();
        resolve({
          componentUrl: "./pages/policy.html"
        });
      }, 1000);
    }
  },

  {
    path: "/contact/",
    async: function(routeTo, routeFrom, resolve, reject) {
      let router = this;
      let unique = router.app;

      unique.preloader.show();
      setTimeout(function() {
        phonegapApp.studentDetails();
        unique.preloader.hide();
        resolve({
          componentUrl: "./pages/conatct-us.html"
        });
      }, 1000);
    }
  },

  {
    path: "/application/",
    componentUrl: "./pages/application.html"
  },

  {
    path: "/login/:navigateTo",
    componentUrl: "./pages/login.html"
  },

  {
    path: "/contact-details/",
    componentUrl: "./pages/contact.html"
  },

  {
    path: "/course-user/",
    async: function(routeTo, routeFrom, resolve, reject) {
      let router = this;
      let unique = router.app;

      unique.preloader.show();
      setTimeout(function() {
        phonegapApp.profile();
        unique.preloader.hide();
        resolve({
          componentUrl: "./pages/course-user.html"
        });
      }, 1000);
    }
  },

  {
    path: "/course-content/:courseId",
    async: function(routeTo, routeFrom, resolve, reject) {
      let router = this;
      let unique = router.app;
      let courseId = routeTo.params.courseId;
      unique.preloader.show();
      setTimeout(function() {
        phonegapApp.courseContent(courseId);
        unique.preloader.hide();
        resolve({
          componentUrl: "./pages/course-content.html"
        });
      }, 1000);
    }
  },

  // Default route (404 page). MUST BE THE LAST
  {
    path: "(.*)",
    url: "./pages/404.html"
  }
];
