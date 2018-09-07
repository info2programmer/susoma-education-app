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
        app.statusbar.show();
        if (user == "" || user == null){
            app.popup.open("#login-screen")
        }
        else{
            phonegapApp.institutes()
            phonegapApp.courses()
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
                console.log(rply);
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

    /*******  This Function For Get Courses Home Page  ******/
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
                courseDetails += '<div class="title" style="font-size: 20px;"><strong>Music</strong></div>'
                courseDetails += '<div> Rainbow Group</div>'
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
                downloader.init({ folder: "Susoma" })
                downloader.get(`${rply.url}`)
                fileDownloadCompleteNotification.open()
                downloader.abort()
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

                            $.ajax({
                                type: "post",
                                url: url + "EnquirySubmit",
                                data: {
                                    enqname: $('#enqname').val(),
                                    enqphone: $('#enqphone').val(),
                                    enqage: $('#enqage').val(),
                                    enqgroup: $('#enqgroup').val(),
                                    applyphone: $('#applyphone').val(),
                                    enqcomment: $('#enqcomment').val(),
                                    userid: user,
                                    otp: password
                                },
                                dataType: "json"
                            }).done(function (rply) {
                                if (rply.status) {
                                    $('#enqname').val('')
                                    $('#enqphone').val('')
                                    $('#enqage').val('')
                                    $('#enqgroup').val('')
                                    $('#applyphone').val('')
                                    $('#enqcomment').val('')
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
        $.ajax({
            type: "post",
            url: url + "AllNotification",
            dataType: "JSON"
        }).done(function (rply){
            console.log(rply)
        })
    }


};  
