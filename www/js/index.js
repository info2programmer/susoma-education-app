var url = 'http://susomaias.com/susoma/index.php/manage_api/'
var user = localStorage.getItem('susomauser')
var phonegapApp = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('backbutton', this.onBackKeyDown, false);
        document.addEventListener("offline", this.onOffline, false);
    },

    /******* When Device Is Ready Then This Block Will Execute ******/
    onDeviceReady: function() {
        app.statusbar.show()
        phonegapApp.fcmGetToken()
        phonegapApp.institutes()
        phonegapApp.courseHome()
        if (user == "" || user == null){
            $("#linkHyper").prop("href", "/login/")
            $("#linkCourse").prop("href", "/login/")
            $("#lblReview").prop("href", "/login/")
            $("#linkNotification").prop("href", "/login/")
        }
        else{
            $("#linkHyper").prop("href", "/profile/")
            $("#linkCourse").prop("href", "/course/")
            $("#lblReview").prop("href", "/review/")
            $("#linkNotification").prop("href", "/notification/")
        }
    },

    /******* Back Button Function ******/
    onBackKeyDown: function(){
        if (mainView.router.url=='/'){
            app.dialog.confirm('Are you sure you want to exit?', function () {
                console.log('Exiting');
                navigator.app.exitApp();
            });
        }
        else{
            let pageHistoryLength = mainView.history.length

            // Get Previous URL 
            let previousURL = mainView.history[pageHistoryLength - 2]

            // Get Current URL 
            let currentURL = mainView.history[pageHistoryLength - 1]

            if (pageHistoryLength == 1) {
                
                app.dialog.confirm('Are you sure you want to exit?',  function () {
                    console.log('Exiting');
                    navigator.app.exitApp();
                });
            }
            else {
                if (pageHistoryLength > 3) {
                    mainView.history.length = 0
                    window.location.href = "index.html"
                }
                else {
                    if (previousURL == '/') {
                        window.location.href = "index.html"
                    }
                    else {
                        app.router.navigate(previousURL)
                    }
                }

            }

        }
    },

    /******* When App Ofiline Then This Block Will Execute ******/
    onOffline:function(){
        app.popup.open('#my-login-screen');
    },

    /*******  When Try Again Button Tap Then This Block Will Execute  ******/
    tryAgainInternet:function(){
        navigator.app.loadUrl("file:///android_asset/www/index.html", { wait: 2000, loadingDialog: "Wait,Loading App", loadUrlTimeoutValue: 60000 });
    },

    /*******  FCM PLUGIN  ******/
    fcmGetToken: function () {
        FCMPlugin.getToken(function (token) {
            let postDatas = { 'device_uuid': device.uuid, 'token': token, 'type': 'get_token', userid : user }
            $.ajax({
                type: "POST",
                url: url + "DeviceLog",
                data: postDatas,
                dataType: "JSON"
            }).done(function (rply) {
                $('#notificationCount').html(rply.notify)
            });
        });
    },

    /*******  This Function For Get Institutes Home Page  ******/
    institutes: function(){
        let institute = ''
        let instituteDetails = ''
        $.ajax({
            type: "post",
            url: url+'institute',
            dataType: "JSON"
        }).done(function (rply){
            for (list in rply.insdetails){
                institute += '<div class="swiper-slide">'
                institute += '<a href="" class="color-black">'
                institute += '<div class="row" >'
                institute += '<div class="col"><img src="http://susomaias.com/susoma/uploads/' + rply.insdetails[list].logo + '" alt="" width="72"></div>'
                institute += '</div>'
                institute += '<div class="row">'
                institute += '<div class="col" style="font-size: 14px;">' + rply.insdetails[list].name+'</div>'
                institute += '</div>'
                institute += '</a>'
                institute += '</div>'

                instituteDetails = '<div class="card card-outline slideInRight">'
                instituteDetails = '<div class="card-content">'
                instituteDetails = '<div class="row">'
                instituteDetails = 'div class="col-20" style="text-align: center;margin-top: 4%;">'
                instituteDetails = '<div class="col-20" style="text-align: center;margin-top: 4%;">'
                instituteDetails = '<img src="img/logouser.jpg" width="70">'
                instituteDetails = '</div>'
                instituteDetails = '<div class="col-80">'
                instituteDetails = '<br>'
                instituteDetails = '<div class="title" style="font-size: 20px;"><strong>ABC DACNCE ACADEMY</strong></div>'
                instituteDetails = '<div>Address : Lorem ipsum, dolor sit amet consectetur adipisicing elit.</div>'
                instituteDetails = '<div>Mobile : 98765435434 | Email : abcd@gmail.com</div>'
                instituteDetails = '<br>'
                instituteDetails = '</div>'
                instituteDetails = '</div>'
                instituteDetails = '</div>'
                instituteDetails = '</div>'
                $('#lblInstituteDetails').html(instituteDetails)
                
                $('#lblInstitute').html(institute)
            }
            
        });
    },

    /*******  This Function For Get Institutes Details Page  ******/
    institutesDetails: function () {
        let instituteDetails = ''
        $.ajax({
            type: "post",
            url: url + 'institute',
            dataType: "JSON"
        }).done(function (rply) {
            for (list in rply.insdetails) {
                instituteDetails += '<div class="card card-outline slideInRight">'
                instituteDetails += '<div class="card-content">'
                instituteDetails += '<div class="row">'
                instituteDetails += '<div class="col-20" style="text-align: center;margin-top: 4%;">'
                instituteDetails += '<img src="http://susomaias.com/susoma/uploads/' + rply.insdetails[list].logo + '" width="70">'
                instituteDetails += '</div>'
                instituteDetails += '<div class="col-80">'
                instituteDetails += '<br>'
                instituteDetails += '<div class="title" style="font-size: 20px;"><strong>' + rply.insdetails[list].name +'</strong></div>'
                instituteDetails += '<div>Address : ' + rply.insdetails[list].address +'</div>'
                instituteDetails += '<div>Mobile : ' + rply.insdetails[list].phone + ' | Email : ' + rply.insdetails[list].email +'</div>'
                instituteDetails += '<br>'
                instituteDetails += '</div>'
                instituteDetails += '</div>'
                instituteDetails += '</div>'
                instituteDetails += '</div>'
                $('#lblInstituteDetails').html(instituteDetails)
            }
        });
    },

    /*******  This Function For Get Courses Page  ******/
    courses : function(){
        let courses = ''
        $.ajax({
            type: "post",
            url: url+'courses',
            dataType: "JSON"
        }).done(function(rply){
            let count = 0
            courses += '<div class="row" style="text-align:center;margin-bottom:20px;">'
            for (list in rply.crsdetails){
                count=count+1
                courses += '<div class="col">'
                courses += '<a href="/course-details/' + rply.crsdetails[list].course_id +'" class="color-black">'
                courses += '<div class="row">'
                courses += '<div class="col"><img src="http://susomaias.com/susoma/uploads/' + rply.crsdetails[list].logo + '" alt="" width="72"></div>'
                courses += '</div>'
                courses += '<div class="row">'
                courses += '<div class="col" style="font-size: 14px;">' + rply.crsdetails[list].name+'</div>'
                courses += '</div>'
                courses += '</a>'
                courses += '</div>'
                if(count==3 || count%3==0 ){
                    courses += '</div>' 
                    courses += '<div class="row"  style="text-align:center;margin-bottom:20px;">' 
                }
                
            }
            courses += '</div>'
            $('#coursesInner').html(courses)
        });
    },

    /*******  This Function For Get Courses Home Page  ******/
     courseHome : function(){
        let courses = ''
        $.ajax({
            type: "post",
            url: url+'courses',
            dataType: "JSON"
        }).done(function(rply){
            let count = 0
            courses += '<div class="row" style="text-align:center;margin-bottom:20px;">'
            for (list in rply.crsdetails){
                count=count+1
                courses += '<div class="col">'
                courses += '<a href="/course-content/' + rply.crsdetails[list].course_id +'" class="color-black">'
                courses += '<div class="row">'
                courses += '<div class="col"><img src="http://susomaias.com/susoma/uploads/' + rply.crsdetails[list].logo + '" alt="" width="72"></div>'
                courses += '</div>'
                courses += '<div class="row">'
                courses += '<div class="col" style="font-size: 14px;">' + rply.crsdetails[list].name+'</div>'
                courses += '</div>'
                courses += '</a>'
                courses += '</div>'
                if(count==3 || count%3==0 ){
                    courses += '</div>' 
                    courses += '<div class="row"  style="text-align:center;margin-bottom:20px;">' 
                }
                
            }
            courses += '</div>'
            $('#courses').html(courses)
        });
    },

    /*******  This Function For Get Banner Home Page  ******/
    // banner: function () {
    //     let banner = ''
    //     $.ajax({
    //         type: "post",
    //         url: url + 'banner',
    //         dataType: "JSON"
    //     }).done(function (rply) {
    //         for (list in rply.bnrdetails) {
    //             banner += '<div class="swiper-slide">'
    //             banner += '<img src="http://susomaias.com/susoma/uploads/' + rply.bnrdetails[list].brochure + '" alt="" srcset="" style="width: 100%;">'
    //             banner += '</div>'
    //             $('#lblBanner').html(banner)
    //         }
    //         // console.log(rply)
    //     });
    // },

    /*******  This Function For Get Privacy Policy   ******/
    privacy : function(){
        $.ajax({
            type: "post",
            url: url +'privacy',
            dataType: "JSON"
        }).done(function(rply){
            $('#lblPolicy').text(rply.privdetails[0].policy)
        });
    },

    /*******  This Function For Request For OTP  ******/
    sendOTPRequest : function(){
        $.ajax({
            type: "post",
            url: url+'loginCheck',
            data: { userid: $('#txtUserName').val()},
            dataType: "JSON"
        }).done(function(rply){
            if (rply.status==1){
                otpsuccessmsg.open()
                $('#blockOTP').show()
                $('#blockOTPButton').show()
                $('#blockGetOTPButton').hide()
            }
            else{
                $('#txtUserName').val("")
                invalidUserIdMsg.open()
            }
        });
        // $('#blockOTP').show()
        // $('#blockOTPButton').show()
        // $('#blockGetOTPButton').hide()
        // console.log($('#txtUserName').val())
    },

    /*******  This Function For Check OTP  ******/
    uservalidation : function(){
        $.ajax({
            type: "post",
            url: url+'verify',
            data: { userid: $('#txtUserName').val(), otp: $('#txtOTP').val(), type: 'login'  },
            dataType: "json"
        }).done(function(rply){
            if (rply.status==1){
                app.popup.close("#login-screen")
                localStorage.setItem('susomauser', $('#txtUserName').val())
                phonegapApp.fcmGetToken()
                phonegapApp.institutes()
                phonegapApp.courses()
                $("#linkHyper").prop("href", "/profile/")
                $("#linkCourse").prop("href", "/course/")
                $("#lblReview").prop("href", "/review/")
                $("#linkNotification").prop("href", "/notification/")
                window.location.href="index.html"
            }
        });
    },

    /*******  This Function For Check OTP  ******/
    profile:function(){
        $.ajax({
            type: "post",
            url: url+'profile',
            data: {userid : user},
            dataType: "json"
        }).done(function(rply){ 
            let courseDetails = ''
            for (list in rply.othdtl){
                courseDetails += '<div class="card card-outline slideInRight">'
                courseDetails += '<div class="card-content">'
                courseDetails += '<div class="row">'
                courseDetails += '<div class="col-30" style="text-align: center;margin-top: 1%;">'
                courseDetails += '<img src="img/iconset/cou.png" width="60">'
                courseDetails += '</div>'
                courseDetails += '<div class="col-70">'
                courseDetails += `<div class="title" style="font-size: 20px;"><strong>${rply.othdtl[list].name}</strong></div>`
                courseDetails += `<div>${rply.othdtl[list].grp_name}</div>`
                courseDetails += `<div><strong>Total Fees : </strong> ${rply.payment_dtl[list].tamt} <strong>Due Amount : </strong> ${rply.payment_dtl[list].tamt - rply.othdtl[list].fees}</div>`
                courseDetails += '</div>'
                courseDetails += '</div>'
                courseDetails += '</div>'
                courseDetails += '</div>'
                courseDetails += '</div>'
                $('#lblCourseUser').html(courseDetails);
            }
            $("#lblCandidateProfile").attr("src", "http://susomaias.com/susoma/uploads/photo/" + rply.candprof[0].cimage+".jpg");
            $('#lblCandidateName').html(rply.candprof[0].cname +'&nbsp;<i class="icon f7-icons md-only color-green">check_round_fill</i>');
            $('#lblCandidatePhone').html(rply.candprof[0].c_mobile);
        });
    },

    /*******  This Function For Course Detaails  ******/
    courseDetails : function(courseID){
        let count = 0
        let groupDetails = ''
        let meterialDetails = ''
        $.ajax({
            type: "post",
            url: url+"coursesDetails",
            data: { courseid: courseID, userid : user},
            dataType: "json"
        }).done(function(rply){
            console.log(rply)
            $('#lblCourseName').text(rply.crsdetails[0][0].name);
            $('#lblCourseDetails').text(rply.crsdetails[0][0].dtl);
            for (list in rply.crsdetails[1]){
                groupDetails += '<li class="accordion-item ripple-color-green"><a href="#" class="item-content item-link">'
                groupDetails += '<div class="item-inner">'
                switch (rply.crsdetails[1][list].group[0].grp_name) {
                    case 'BLUE':
                        groupDetails += '<div class="item-title text-color-blue">' + rply.crsdetails[1][list].group[0].grp_name + '</div>'
                        break;
                    
                    case 'RAINBOW':
                        groupDetails += '<div class="item-title text-color-green">' + rply.crsdetails[1][list].group[0].grp_name + '</div>'
                        break;

                    case 'YELLOW':
                        groupDetails += '<div class="item-title text-color-yellow">' + rply.crsdetails[1][list].group[0].grp_name + '</div>'
                        break;

                    case 'RED':
                        groupDetails += '<div class="item-title text-color-red">' + rply.crsdetails[1][list].group[0].grp_name + '</div>'
                        break;
                
                    default:
                        break;
                }
                
                groupDetails += '</div></a>'
                groupDetails += '<div class="accordion-item-content">'
                groupDetails += '<div class="block">'
                // groupDetails += '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, distinctiomollitia facere, non amet modi maiores, provident veniam fugit expedita laboriosam delectus nihil.Eius id autem temporibus assumenda expedita ducimus!</p>'

                groupDetails += '<div class="row">'
                for (meterialList in rply.crsdetails[1][list].material){
                    count = count + 1

                    switch (rply.crsdetails[1][list].material[meterialList].dctype) {
                        case 'video':
                            groupDetails += '<button class="col button button-fill color-pink ripple-color-white" onclick="phonegapApp.rquestDownloadOTP(' + rply.crsdetails[1][list].material[meterialList].mat_id + ')"><i class="f7-icons" style="font-size: 18px;padding-right: 6px;">videocam</i>Download</button>'
                            break;

                        case 'audio':
                            groupDetails += '<button class="col button button-fill color-yellow ripple-color-white" onclick="phonegapApp.rquestDownloadOTP(' + rply.crsdetails[1][list].material[meterialList].mat_id + ')"><i class="f7-icons" style="font-size: 18px;padding-right: 6px;">tune</i>Download</button>'
                            break;

                        case 'pdf':
                            groupDetails += '<button class="col button button-fill color-blue ripple-color-white" onclick="phonegapApp.rquestDownloadOTP(' + rply.crsdetails[1][list].material[meterialList].mat_id + ')"><i class="f7-icons" style="font-size: 18px;padding-right: 6px;">list</i>Download</button>'
                            break;
                    
                        default:
                            break;
                    }

                    if (count == 3 || count % 3 == 0) {
                        groupDetails += '</div>'
                        groupDetails += '<div class="row" style=" margin-top: 10px;">'
                    }
                }
                groupDetails += '</div>'
                groupDetails += '</div>'
                groupDetails += '</div>'
                groupDetails += '</li>'

                $('#groupDetails').html(groupDetails);
            }
        })
    },

    /*******  This Function For Requresting OTP Password For File Download  ******/
    rquestDownloadOTP : function(meterialId){
        app.preloader.show()
        $.ajax({
            type: "post",
            url: url + "downloadCheck",
            data: { meterialid: meterialId, userid : user},
            dataType: "JSON"
        }).done(function (rply){
            app.preloader.hide()
            if (rply.status){
                app.dialog.password('Enter your OTP', function (password) {
                    if (password == "") {
                        openOTPdialog()
                    }
                    else{
                        phonegapApp.validateDownloadOTP(password, meterialId)
                    }
                    // console.log(`OTP is ${password}`)
                })
            }
            else{
                notificationCourseMissmach.open()
            }
            
        })
    },

    /*******  This Function For Requresting OTP Password For File Download  ******/
    validateDownloadOTP: function (otp, meterialId){
        $.ajax({
            type: "post",
            url: url + "verifyDownload",
            data: { meterialid: meterialId, otp: otp, userid: user },
            dataType: "json"
        }).done(function (rply){
            if (rply.status){
                // let fileTransfer = new FileTransfer();
                // let uri = encodeURI(`${rply.url}`);
                // let fileURL = 'download'
                app.preloader.show();
                // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                //     let fileURL = fs.root.fullPath + "/logo.png"; // full file path
                //     fileTransfer.download(
                //         uri,
                //         fileURL,
                //         function (entry) {
                //             console.log("download complete: " + entry.toURL());
                //         },
                //         function (error) {
                //             console.log("download error source " + error.source);
                //             console.log("download error target " + error.target);
                //             console.log("download error code" + error.code);
                //         },
                //         false,
                //         {
                //             headers: {
                //                 "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                //             }
                //         }
                //     );
                    
                // })
                // fileTransfer.abort();
                
                downloader.init({ folder: "Susoma" })
                downloader.get(`${rply.url}`)
                fileDownloadCompleteNotification.open()
                downloader.abort()
                app.preloader.hide();
            }
            else{
                notificationCourseMissmach.open()
            }
            // console.log(rply)
        })
    },


    /*******  This Function For Requresting OTP Password For Application Form  ******/
    requestOTPforApplicationForm:function(){
        let applicationFormData = app.form.convertToData('#application-form')
        
        if (applicationFormData){
            $.ajax({
                type: "post",
                url: url + "ApplicationCheck",
                data: { userid: user, otptype: 'application' },
                dataType: "JSON"
            }).done(function (rply) {
                if(rply.status){
                    app.dialog.password('Enter your OTP', function (password) {
                        
                        if (password == "") {
                            openOTPdialog()
                        }
                        else {
                            
                            $.ajax({
                                type: "post",
                                url: url + "ApplicationSubmit",
                                data: {
                                    applyname: $('#applyname').val(),
                                    applyteacher: $('#applyteacher').val(),
                                    applyaccountno: $('#applyaccountno').val(),
                                    applybranch: $('#applybranch').val(),
                                    applyphone: $('#applyphone').val(),
                                    applydepartment: $('#applydepartmnet').val(),
                                    applypreclasstime: $('#applypreclasstime').val(),
                                    applycoursechange: $('#applycoursechange').val(),
                                    applynewclasstime: $('#applynewclasstime').val(),
                                    applyclassbranch: $('#applyclassbranch').val(),
                                    applylastmonthfee: $('#applylastmonthfee').val(),
                                    userid : user,
                                    otp : password
                                },
                                dataType: "json"
                            }).done(function(rply){
                                if(rply.status){
                                    applicationRequestNotification.open()
                                }
                            })
                        }
                        // console.log(`OTP is ${password}`)
                    })
                }
                else{
                    notificationCourseMissmach.open()
                }
            })
        }
        
    },

    splashredirection: function(){
        window.location.href = "index.html"
    },

    /*******  This Function For Requresting OTP Password For Enquiry Form  ******/
    requestOTPforEnquiryForm: function () {
        let applicationFormData = app.form.convertToData('#enquiry-form')
        if (applicationFormData) {
            $.ajax({
                type: "post",
                url: url + "EnquiryCheck",
                data: { userid: $('#enqphone').val() },
                dataType: "JSON"
            }).done(function (rply) {
                if (rply.status) {
                    app.dialog.password('Enter your OTP', function (password) {

                        if (password == "") {
                            openOTPdialog()
                        }
                        else {
                            // dob = new Date(dob);
                            // var today = new Date();
                            // var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
                            // $('#age').html(age + ' years old');

                            $.ajax({
                                type: "post",
                                url: url + "EnquirySubmit",
                                data: {
                                    enqname: $('#enqname').val(),
                                    enqgurdianname: $('#enqgurdianname').val(),
                                    enqphone: $('#enqphone').val(),
                                    enqdob: $('#enqdob').val(),
                                    enqage: $('#enqage').val(),
                                    enqclass: $('#enqclass').val(),
                                    enqschool: $('#enqschool').val(),
                                    ddlMedium: $('#ddlMedium').val(),
                                    enqprevious: $('#enqprevious').val(),
                                    ddlSubject1: $('#ddlSubject1').val(),
                                    ddlSubject2: $('#ddlSubject2').val(),
                                    ddlSubject3: $('#ddlSubject3').val(),
                                    otp: password
                                },
                                dataType: "json"
                            }).done(function (rply) {
                                if (rply.status) {
                                    $('#enqname').val('')
                                    $('#enqprevious').val('')
                                    $('#ddlSubject1').val('')
                                    $('#ddlSubject2').val('')
                                    $('#ddlSubject3').val('')
                                    $('#enqschool').val('')
                                    $('#ddlMedium').val('')
                                    $('#enqclass').val('')
                                    $('#enqage').val('')
                                    $('#enqdob').val('')
                                    $('#enqphone').val('')
                                    $('#enqgurdianname').val('')
                                    $('#enqname').val('')
                                    applicationRequestNotification.open()
                                }
                            })
                        }
                        // console.log(`OTP is ${password}`)
                    })
                }
                else {
                    notificationCourseMissmach.open()
                }
            })
        }

    },

    /*******  This Function For Requresting Age Range  ******/
    getEnquiryAge : function(){
        let ageOption = ''
        $.ajax({
            type: "post",
            url: url + "EnquiryAgeRange",
            dataType: "JSON"
        }).done(function (rply){
            console.log(rply)
            ageOption += '<option value="" hidden selected>Select</option>'
            for (list in rply.ages){
                ageOption += `<option value="${rply.ages[list].group_id}">${rply.ages[list].age}</option>`
                $('#enqage').html(ageOption)
            }
        })
    },

    /*******  This Function For Get Enquiry Group  ******/
    getEnquiryGroup : function (val){ 
        app.preloader.show()
        $.ajax({
            type: "post",
            url: url + "EnquiryGetGroup",
            data: { grupid: val },
            dataType: "json"
        }).done(function (rply){
            $('#enqgroup').val(rply.ages)
            app.preloader.hide()
        })
    },

    /*******  Get Notification  ******/
    getNotification : function(){
        let notification = ''
        $.ajax({
            type: "post",
            url: url + "AllNotification",
            data: { 'device_uuid': device.uuid },
            dataType: "JSON"
        }).done(function (rply){
            for (list in rply.details){
                notification += '<div class="card card-outline slideInRight" >'
                notification += '<div class="card-content">'
                notification += '<div class="row">'
                notification += '<div class="col-30" style="text-align: center;margin-top: 4%;">'
                notification += '<img src="img/iconset/not.png" width="60">'
                notification += '</div>'
                notification += '<div class="col-70">'
                notification += `<div class="title" style="font-size: 20px;"><strong>${rply.details[list].push_title}</strong></div>`
                notification += `<div>${rply.details[list].push_msg}</div>`
                notification += `<div>${rply.details[list].sent_date}&nbsp;${rply.details[list].sent_time}</div>`
                notification += '</div>'
                notification += '</div>'
                notification += '</div>'
                notification += '</div>'
                $('#notification').html(notification)
            }
            
        })
    },

    /*******  Calculate Age  ******/
    calculateAge : function(age) {
        let mdate = age.toString()
        let yearThen = parseInt(mdate.substring(0, 4), 10)
        let monthThen = parseInt(mdate.substring(5, 7), 10)
        let dayThen = parseInt(mdate.substring(8, 10), 10)

        let today = new Date();
        let birthday = new Date(yearThen, monthThen - 1, dayThen)

        let differenceInMilisecond = today.valueOf() - birthday.valueOf()

        let year_age = Math.floor(differenceInMilisecond / 31536000000)
        let day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000)

        // if ((today.getMonth() == birthday.getMonth()) && (today.getDate() == birthday.getDate())) {
        //     alert("Happy B'day!!!");
        // }

        var month_age = Math.floor(day_age / 30)

        day_age = day_age % 30

        if (isNaN(year_age) || isNaN(month_age) || isNaN(day_age)) {
            // $("#exact_age").text("Invalid birthday - Please try again!");
            return
        }
        else {
            $("#enqage").val(year_age + " years " + month_age + " months " + day_age + " days old")
        }
    },

    /*******  Calculate Content  ******/
    courseContent : function(courseId){
        let courseContent = ''
        $.ajax({
            type: "post",
            url: url + "courseContent",
            data: { courseid: courseId },
            dataType: "json"
        }).done(function(rply){
            console.log(rply)
            for (list in rply.crsdetails){
                courseContent += '<div class="card">'
                courseContent += `<div class="card-content"><img src="http://susomaias.com/susoma/uploads/${rply.crsdetails[list].brochure}" style="width:100%"></div>`
                courseContent += '</div>'
                $('#contentCourseNew').html(courseContent)
            }
            $('#lblCourseContentNameNew').html(rply.crsdetails[0].name)
        })
    },

    /*******  Review List  ******/
    reviewLists : function(){
        let reviewList = ''
        $.ajax({
            type: "post",
            url: url + "reviewList",
            data: {userid : user},
            dataType: "json"
        }).done(function(rply){
           for(list in rply.review){
               reviewList += '<div class="card card-outline slideInRight">'
               reviewList += '<div class="card-content">'
               reviewList += '<div class="row">'
               reviewList += '<div class="col-30" style="text-align: center;margin-top: 4%;">'
               reviewList += '<img src="img/iconset/rev.png" width="60">'
               reviewList += '</div>'
               reviewList += '<div class="col-70">'
               reviewList += `<div class="title" style="font-size: 20px;"><strong>${rply.review[list].review_title}</strong></div>`
               reviewList += `<div>${rply.review[list].review}</div>`
               reviewList += `<div>${rply.review[list].date} &nbsp; ${rply.review[list].time}</div>`
               reviewList += '</div>'
               reviewList += '</div>'
               reviewList += '</div>'
               reviewList += '</div>'
               $('#lblReviewLists').html(reviewList)
           }
        })
    },

    /*******  Review Submit  ******/
    submitReview : function(){
        if ($('#txtReviewTitle').val() == "" || $('#txtReviewComment').val() == ""){
            notificationValidationError.open()
        }
        else{
            $.ajax({
                type: "post",
                url: url + "submitReview",
                data: { userid: user, title: $('#txtReviewTitle').val(), comment: $('#txtReviewComment').val() },
                dataType: "json"
            }).done(function () {
                reviewSubmitMessage.open()
                $('#txtReviewTitle').val('')
                $('#txtReviewComment').val('')
                phonegapApp.reviewLists()
            }) 
        }
    },


    /*******  Contact Student Details  ******/
    studentDetails : function(){
        $.ajax({
            type: "post",
            url: url + "GetContactDetails",
            data: {userid : user},
            dataType: "json"
        }).done(function(rply){
            $('#studentId').val(rply.details[0].reg_id)
            $('#studentNameContact').val(rply.details[0].cname)
            $('#conactSubject').val(rply.details[0].name)
            $('#conatctGroupName').val(rply.details[0].grp_name)
            $('#contactPhone').val(rply.details[0].c_mobile)
        })
    },

    /*******  Contact Student Details  ******/
    contactSubmit : function(){
        let message = $('#txtContactMessage').val()
        if (message){
            $.ajax({
                type: "post",
                url: url + "ContactSubmit",
                data: {userid : user,msg : message},
                dataType: "json"
            }).done(function(){
                contactSubmitMessage.open()
            })
        }
        else{
            notificationValidationError.open()
        }
        
    },
    
};  
