/* 

$(document).on('pageInit', '.page[data-page="index"]',  function(e){

    console.log("I am here");
//676666666666666666666

}).trigger(); */


// Initialize your app
var myApp = new Framework7(
    { material: true,}
);  

// Export selectors engine
var $$ = Dom7;

var baseURL = 'http://safir.mdawaina.com/';
//var baseURL = 'http://localhost:81/safirweb/';
var captain = baseURL + 'index.php/captain/';
var trips = baseURL + 'index.php/trips/';
var upload_image = baseURL + 'index.php/captain/upload_image/';
var carimage = baseURL + 'images/';
var googleplay = 'https://play.google.com/store/apps/details?id=com.phonegap.safir';
var appstore = '';
var currentVersion = 15;
var isIndexPage = true;
// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});


function onDeviceReady() {


    if (window.localStorage.getItem("current_language") === null) {
        window.localStorage.setItem("current_language","ar");
    }


    document.addEventListener("backbutton", onBackKeyDown, false);

    var deviceType = (navigator.userAgent.match(/iPad/i)) == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i)) == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";

    $$.ajax({
        type: 'GET',
        url: captain + 'version',
        //crossDomain: true,
        /*  data: JSON.stringify({
            
         }), */
        success: function (data) {
            if (data.code == 0) {
                if (currentVersion < data.version) {
                    myApp.popup('.popup-version');
                }
            }

            myApp.hideIndicator();
            console.log(data.code);
        },
        error: function (data) {
            myApp.hideIndicator();

        }
        , dataType: 'json'
    });

} 

function onBackKeyDown() {

    if (window.localStorage.getItem("isIndexPage")){
       alert(isIndexPage);
        //navigator.app.exitApp();
    } 
    else{
      //  isIndexPage = true;
        mainView.router.loadPage({
            url: 'index.html',
            ignoreCache: true,
            reload: true
        });
    }
   
}

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    window.localStorage.setItem("isIndexPage",false);
    isIndexPage = false;
   saveData();
   console.log("after");
   
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});


/* $$(document).on('page:init', '.page[data-page="index"]', function (e) {
   console.log("after");
   // Do something here when page with data-page="about" attribute loaded and initialized
  })   */ 







myApp.onPageInit('index', function (page) {
    setLanguage(window.localStorage.getItem("current_language"));


    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }




//window.sessionStorage
  if(window.localStorage.getItem("loggedIn") == 1) {
        // Logged In
        // Redirect to first page after logged in.
      
        $$(".list-block>ul.captain_menu").show();
        $$(".list-block>ul.guest_menu").hide();

        mainView.router.loadPage({
            url: 'new_trip.html',
            ignoreCache: true,
            reload: true});
        
    }
    else
    {
        $$(".list-block>ul.captain_menu").hide();
        $$(".list-block>ul.guest_menu").show();
        
      
    }


  if (window.localStorage.getItem("agreed")===null){
        myApp.popup('.popup-terms');
  }
   // });

    $$('input[type=checkbox]').change(
        function () {

            if($$('input[type=checkbox]:checked').length > 0)
            {
                $$("#close_terms").removeAttr('disabled');//.prop("disabled", false);
                
                window.localStorage.setItem("agreed",true);

            }else{
                $$("#close_terms").attr("disabled", "disabled");
                
            }
            
        });

  $$(document).on("click",".share_app" , function(){
      var deviceType = (navigator.userAgent.match(/iPad/i)) == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i)) == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
      var sharelink = '';
      if (deviceType == "iPad" || deviceType =="iPhone"){
          sharelink = 'https://itunes.apple.com/sa/app/safer-app/id1323553481?mt=8';
      }
      else if (deviceType == "Android") {
       
          sharelink = 'https://play.google.com/store/apps/details?id=com.phonegap.safir';          
       }        
       var options = {
           message: lng('downloadsafer'), // not supported on some apps (Facebook, Instagram)
           subject: lng('shareapp'), // fi. for email
           files: ['', ''], // an array of filenames either locally or remotely
           url: sharelink,
           chooserTitle: lng('shareappon') // Android only, you can override the default share sheet title
       }

       var onSuccess = function (result) {
           console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
           console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
       }

       var onError = function (msg) {
           console.log("Sharing failed with message: " + msg);
       }

       window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);

   });

   $$(document).on("click",".list-block>ul.captain_menu>.logout", function() {
        window.localStorage.setItem("loggedIn", 0);
       
        window.localStorage.removeItem("email");
        //mainView.router.loadPage("index.html");
       // router.forward("index.html");
       $$(".list-block>ul.captain_menu").hide();
       $$(".list-block>ul.guest_menu").show();
        mainView.router.loadPage({
            url: 'index.html',
            ignoreCache: true,
            reload: true});
       // view.router.navigate("index.html");
    });
}).trigger();






function saveData(e){
    var db = window.openDatabase("users","1.0","SafirDB",200000);
    db.transaction(function SaveRecord(transaction){
        var name = "mdawaina";
        var email = "mdawaina@yahoo.com";
        transaction.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL, email TEXT NOT NULL)');
        var sql = "INSERT INTO users(NAME,EMAIL) VALUES ('"+name+"','"+email+"')";
        console.log(sql);
        transaction.executeSql(sql);
    },function onSuccess(){
        console.log("Record Saved");
    },function onError(error){
        console.log("SQL ERROR "+ error);
    });
}







// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}

myApp.onPageInit('login',function(page){
    window.localStorage.setItem("isIndexPage", false);
    isIndexPage = false;
    setLanguage(window.localStorage.getItem("current_language"));
$$("#password").attr('placeholder', lng('Password'));
$$("#email").attr('placeholder', lng('Email'));
$$("#login_button").val(lng('ok'));

$$("#login_button").click(function(data){
    myApp.showIndicator();
    $email = $$('#email').val();
    $password = $$('#password').val();


    $$.ajax({
        type: 'POST',
        url: captain + 'login_captain/',
        //crossDomain: true,
        data:  JSON.stringify ({           
            email:$email,
            password:$password 
        }),
        success: function(data) {
            if(data.code == 0){
               // alert("Error occured");
                window.localStorage.setItem("loggedIn", 1);
                window.localStorage.setItem("email", data.captain_email);
                window.localStorage.setItem("captain_id", data.captain_id);
                
                myApp.removeFromCache('login.html');
                 mainView.router.loadPage({
                     url: 'new_trip.html',
                    ignoreCache: true,
                    reload: true}); 
                   // mainView.router.loadPage("index.html");
            } else if(data.code == 2){
                
                myApp.alert('', lng('msg2'));
                mainView.router.loadPage({
                    url: 'enter_code.html?captain_id=' + data.captain_id,
                    ignoreCache: true,
                    reload: true
                });
            }
            
            else{
              //  $$('.alert-text-title').on('click', function () {
                myApp.alert('', lng('msg107'));
              //  });
            }

            myApp.hideIndicator();
            console.log(data.code);
        },
        error: function (data) {
            myApp.hideIndicator();
            console.log('An error occurred.');
            console.log(data);
        }//,
       // contentType: "application/json"//,
        ,dataType: 'json'
    }); 

   
});

});


myApp.onPageInit('my_trips', function (page) {
    window.localStorage.setItem("isIndexPage", false);
    isIndexPage = false;
    setLanguage(window.localStorage.getItem("current_language"));
   // alert("I am here2");
        $$.ajax({
            type: 'POST',
            url: trips + 'my_trips/',

            data: JSON.stringify({ captain_id: window.localStorage.getItem("captain_id")}),
            success: function (data) {


                myApp.hideIndicator();

                console.log(data.code);
                if (data.code == 0) {
                 //   alert("I am here");
                 //   var trip_context = '';

                    $$.each(data.trips, function (i, item) {
                        console.log(item);
                           $$('#tripsul').append('<li>'+
                      //  trip_context = trip_context + '<li>' +
                            '<a href="trip_detail.html?tripid=' + item.id + '" data-reload="true" class="item-link item-content">' +
                               '<div class="item-media"><img src="' + carimage + item.carimage  + '?=' + new Date().getTime() +'" width="80"></div>' +
                            '<div class="item-inner">' +
                            '<div class="item-title-row">' +
                            '<div class="item-title cityfromto"> ' +lng(item.cfrom) + '->' + lng(item.cto) + '</div>' +
                            '<!--div class="item-after">$15</div-->' +
                            '</div>' +
                            '<div class="item-subtitle">' + item.car + '</div>' +
                               '<div class="item-text">' + item.captain + '</div>' +
                               '<div class="item-text isfullclass">' + (item.isfull == 1 ? lng('fullpassengers'):"")  + '</div>' +
                            '</div>' +
                            '</a>' +
                           // '</li>';
                           '</li>' );
                    });

                    //  console.log(trip_context);

                   /*  mainView.router.loadPage({
                        url: 'mytrips.html',
                        ignoreCache: true,
                        reload: false,
                        context: { trip_context: trip_context }
                    }); */
                } else {
                    myApp.alert('',lng('msg101'));
                }

            },
            error: function (data) {
                myApp.hideIndicator();
                console.log('An error occurred.');
                console.log(data);
            }
            , dataType: 'json'
        });
    });

myApp.onPageInit('enter_code', function (page) {
    window.localStorage.setItem("isIndexPage", false);
    isIndexPage = false;
   // alert("hello");
    setLanguage(window.localStorage.getItem("current_language"));
  
    $$("#activation_code").attr('placeholder', lng('activationcode'));
    var values = page.query;   
    var captain_id = values.captain_id;

    $$("#verify_code_button").click(function (data) {
        myApp.showIndicator();
        $$.ajax({
            type: 'POST',
            url: captain + 'verify_code/',

            data: JSON.stringify({
                activation_code: $$("#activation_code").val(),
                captain_id: captain_id
               
            }),
            success: function (data) {
                myApp.hideIndicator();
                if(data.code == 0){
                    myApp.alert('', lng('accountactivated'));
                    mainView.router.loadPage({
                        url: 'login.html',
                        ignoreCache: true,
                        reload: true
                    });
                }else{
                    myApp.alert('', lng('msg106'));
                }

            },
            error: function (data) {
                myApp.hideIndicator();
                console.log('An error occurred.');
                console.log(data);
            }
            , dataType: 'json'
        
        
        });
    
    });
});
myApp.onPageInit('filter_trip', function (page) {
    window.localStorage.setItem("isIndexPage", false);
    isIndexPage = false;
    setLanguage(window.localStorage.getItem("current_language"));
    $$("#trip_date").attr('placeholder', lng('tripdate'));
    $$("#submit_button").val(lng('ok'));
    $$(".Riyadh").html(lng('Riyadh'));
    $$(".Jeddah").html(lng('Jeddah'));
    $$(".Mecca").html(lng('Mecca'));
    $$(".Dammam").html(lng('Dammam'));
    $$(".Madina").html(lng('Madina'));
    $$(".Zahran").html(lng('Zahran'));
    $$(".Jubail").html(lng('Jubail'));
    $$(".Alkhobar").html(lng('Alkhobar'));
    $$(".Qassim").html(lng('Qassim'));
    $$(".Taif").html(lng('Taif'));
    $$(".Ihsaa").html(lng('Ihsaa'));
    $$(".Aseer").html(lng('Aseer'));
    $$(".Jazan").html(lng('Jazan'));
    $$(".Najran").html(lng('Najran'));
    $$(".Tabook").html(lng('Tabook'));
    $$(".Beesha").html(lng('Beesha'));
    $$(".Alkharj").html(lng('Alkharj'));
    $$(".WadiAldawasir").html(lng('WadiAldawasir'));
    $$(".KhameesMushet").html(lng('KhameesMushet'));
    $$(".Hail").html(lng('Hail'));
    $$(".Bahrain").html(lng('Bahrain'));
    $$(".Yanbu").html(lng('Yanbu'));
    $$(".Baha").html(lng('Baha'));
   
    
      //function today(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        
        if(dd<10) {
            dd = '0'+dd
        } 
        
        if(mm<10) {
            mm = '0'+mm
        } 
        
      
        today = yyyy + '-' + mm + '-' + dd;
        
        $$("#trip_date").val(today);
     
     $$("#submit_button").click(function (data) {
        myApp.showIndicator();
        $trimp_from = $$('#tfrom').val();
        $trip_to = $$('#tto').val();
        $trip_date = $$('#trip_date').val();


         if ($trip_date === '') {
             myApp.alert('', lng(determin_tripdate));
             isvalid = false;
             myApp.hideIndicator();
         }

         else{
            // $ttime = $$('#ttime').val();
                $$.ajax({
                    type: 'POST',
                    url: trips + 'filter_trip/',
                    
                    data:  JSON.stringify ({
                        tfrom: $trimp_from,
                        tto:$trip_to,
                        trip_date:$trip_date
                       
                    }),
                    success: function(data) {
                    

                        myApp.hideIndicator();
                        
                        console.log(data.code);
                        if(data.code == 0){

                            var trip_context = '';

                            $$.each(data.trips, function(i, item) {            
                                console.log(item);                
                                //   $$('#tripsul').append('<li>'+
                                trip_context = trip_context + '<li>'+
                                '<a href="trip_detail.html?tripid='+item.id+'" data-reload="true" class="item-link item-content">'+
                                    '<div class="item-media"><img src="' + carimage + item.carimage + '?=' +new Date().getTime()+'" width="80"></div>'+
                                    '<div class="item-inner">'+
                                    '<div class="item-title-row">'+
                                        '<div class="item-title cityfromto"> '+item.cfrom+'->'+item.cto+'</div>'+
                                        '<!--div class="item-after">$15</div-->'+
                                    '</div>'+
                                    '<div class="item-subtitle">'+item.car+'</div>'+
                                    '<div class="item-text">' + item.trip_date_name + ' ' + item.trip_date + '</div>' +
                                    '<div class="item-text">' + item.trip_time + '</div>' +
                                    '<div class="item-text">'+item.captain+'</div>'+
                                    '</div>'+
                                '</a>'+
                                '</li>';
                                });

                            //  console.log(trip_context);

                                mainView.router.loadPage({
                                    url: 'trips.html',
                                    ignoreCache: true,
                                    reload: false,
                                    context:{trip_context:trip_context}
                                }); 
                        }else{
                            myApp.alert('',lng('msg102'));
                        }
                    
                    },
                    error: function (data) {
                        myApp.hideIndicator();
                        console.log('An error occurred.');
                        console.log(data);
                    }
                    ,dataType: 'json'
                }); 
        } // else close
     });
});


myApp.onPageInit('new_trip', function (page) {
    window.localStorage.setItem("isIndexPage", false);
    isIndexPage = false;
    setLanguage(window.localStorage.getItem("current_language"));
    $$("#submit_button").val(lng('ok'));

    $$(".Riyadh").html(lng('Riyadh'));
    $$(".Jeddah").html(lng('Jeddah'));
    $$(".Mecca").html(lng('Mecca'));
    $$(".Dammam").html(lng('Dammam'));
    $$(".Madina").html(lng('Madina'));
    $$(".Zahran").html(lng('Zahran'));
    $$(".Jubail").html(lng('Jubail'));
    $$(".Alkhobar").html(lng('Alkhobar'));
    $$(".Qassim").html(lng('Qassim'));
    $$(".Taif").html(lng('Taif'));
    $$(".Ihsaa").html(lng('Ihsaa'));
    $$(".Aseer").html(lng('Aseer'));
    $$(".Jazan").html(lng('Jazan'));
    $$(".Najran").html(lng('Najran'));
    $$(".Tabook").html(lng('Tabook'));
    $$(".Beesha").html(lng('Beesha'));
    $$(".Alkharj").html(lng('Alkharj'));
    $$(".WadiAldawasir").html(lng('WadiAldawasir'));
    $$(".KhameesMushet").html(lng('KhameesMushet'));
    $$(".Hail").html(lng('Hail'));
    $$(".Bahrain").html(lng('Bahrain'));
    $$(".Yanbu").html(lng('Yanbu'));
    $$(".Baha").html(lng('Baha'));


    if (window.localStorage.getItem("loggedIn") == 1) {
        $$(".list-block>ul.captain_menu").show();
        $$(".list-block>ul.guest_menu").hide();
    }
    else {
        $$(".list-block>ul.captain_menu").hide();
        $$(".list-block>ul.guest_menu").show();
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();    
    if(dd<10) {dd = '0'+dd} 
    
    if(mm<10) {mm = '0'+mm} 
    
  //  today = mm + '/' + dd + '/' + yyyy;
    today = yyyy + '-' + mm + '-' + dd;
   // alert(today);
    $$("#tdate").val(today);
   
$$("#submit_button").click(function(){
    myApp.showIndicator();

    $trimp_from = $$('#tfrom').val();
    $trip_to = $$('#tto').val();
    $trip_date = $$('#tdate').val();
    $trip_time = $$('#ttime').val();
    console.log($$('#ttime').val());


    $$.ajax({
        type: 'POST',
        url: trips + 'new_trip/',
        //crossDomain: true,
        data:  JSON.stringify ({
            captain: window.localStorage.getItem("captain_id"),
            tfrom: $trimp_from,
            tto:$trip_to,
            trip_date:$trip_date,
            trip_time:$trip_time   
        }),
        success: function(data) {
            myApp.hideIndicator();

           // console.log(data.code);
            if(data.code == 0){

                myApp.alert('', lng('msg111'));
                mainView.router.loadPage({
                    url: 'my_trips.html',
                    ignoreCache: true,
                    reload: true
                }); 
            }

            else{
                myApp.alert('',lng('msg'+ data.code));
            }
           
        },
        error: function (data) {
            myApp.hideIndicator();
            console.log('An error occurred.');
            console.log(data);
        }//,
       
        ,dataType: 'json'
    }); 
});
});


myApp.onPageInit('form', function (page) {
    window.localStorage.setItem("isIndexPage", false);
    isIndexPage = false;
    setLanguage(window.localStorage.getItem("current_language"));
    $$("#submit_button").val(lng('register'));
    $$("#name").attr('placeholder', lng('yourname'));
    $$("#email").attr('placeholder', lng('youremail'));
    $$("#password").attr('placeholder', lng('password'));
    $$("#brand").attr('placeholder', lng('brand'));
    $$("#model").attr('placeholder', lng('carname'));
    $$("#year").attr('placeholder', lng('madeyear'));
    $$("#btnTakePicture1").attr('placeholder', lng('edit_car_image'));
    $$('.open-image-modal').on('click', function () {
        myApp.modal({
            title: lng('attach_image'),
            text: lng('chap'),
            buttons: [
                {
                    text: lng('camera'),
                    onClick: function () {
                        console.log("hello");

                        var options = {
                            quality: 50,
                            destinationType: Camera.DestinationType.FILE_URI,
                            encodingType: Camera.EncodingType.JPEG,
                            mediaType: Camera.MediaType.PICTURE,
                            targetWidth: 600,
                            targetHeight: 400,
                            correctOrientation: true,
                            // sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY // not originally included
                            sourceType: Camera.PictureSourceType.CAMERA //Camera.PictureSourceType.PHOTOLIBRARY,
                        }
                        navigator.camera.getPicture(onSuccess, onFail, options);

                        function onFail(message) {
                            alert('Failed because: ' + message);
                        }

                        function clearCache() {
                            navigator.camera.cleanup();
                        }

                        var retries = 0;
                        function onSuccess(fileURI) {

                        /*     $$("#imgArea").attr("src", fileURI);

                            var win = function (r) {
                                clearCache();
                                retries = 0;
                                // alert('Done!');
                            }

                            var fail = function (error) {
                                if (retries == 0) {
                                    retries++
                                    setTimeout(function () {
                                        onSuccess(fileURI)
                                    }, 1000)
                                } else {
                                    retries = 0;
                                    clearCache();
                                    alert('Ups. Something wrong happens!');
                                }
                            }

                            var options = new FileUploadOptions();
                            options.fileKey = "uploadfile";
                            options.fileName = "tmp_name"; //  fileURI.substr(fileURI.lastIndexOf('/') + 1);
                            options.mimeType = "image/jpeg";
                            options.params = {}; // if we need to send parameters to the server request
                            var ft = new FileTransfer();
                            ft.upload(fileURI, encodeURI(upload_image), win, fail, options);
 */
                        }



                    }
                },
                {
                    text: lng('gallery'),
                    onClick: function () {
                        console.log("hello");

                        var options = {
                            quality: 50,
                            destinationType: Camera.DestinationType.FILE_URI,
                            encodingType: Camera.EncodingType.JPEG,
                            mediaType: Camera.MediaType.PICTURE,
                            targetWidth: 600,
                            targetHeight: 400,
                            correctOrientation: true,
                             sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY // not originally included
                           // sourceType: Camera.PictureSourceType.CAMERA //Camera.PictureSourceType.PHOTOLIBRARY,
                        }
                        navigator.camera.getPicture(onSuccess, onFail, options);

                        function onFail(message) {
                            alert('Failed because: ' + message);
                        }

                        function clearCache() {
                            navigator.camera.cleanup();
                        }

                        var retries = 0;
                        function onSuccess(fileURI) {

                            $$("#imgArea").attr("src", fileURI);
/* 
                            var win = function (r) {
                                clearCache();
                                retries = 0;
                                // alert('Done!');
                            }

                            var fail = function (error) {
                                if (retries == 0) {
                                    retries++
                                    setTimeout(function () {
                                        onSuccess(fileURI)
                                    }, 1000)
                                } else {
                                    retries = 0;
                                    clearCache();
                                    alert('Ups. Something wrong happens!');
                                }
                            }

                            var options = new FileUploadOptions();
                            options.fileKey = "uploadfile";
                            options.fileName = "tmp_name"; //  fileURI.substr(fileURI.lastIndexOf('/') + 1);
                            options.mimeType = "image/jpeg";
                            options.params = {}; // if we need to send parameters to the server request
                            var ft = new FileTransfer();
                            ft.upload(fileURI, encodeURI(upload_image), win, fail, options);
 */
                        }



                    }
                },
              
            ]
        })
    });

      

//$$('form.ajax-submit').on('form:success', function (e) {
   // $$('form.ajax-submit').submit(function(e){
    $$("#submit_button").click(function (data) {
       
        var isvalid = true;
   // var xhr = e.detail.xhr; // actual XHR object
   myApp.showIndicator();
  //  var data = e.detail.data; // Ajax response from action file
    // do something with response data
    $name = $$('#name').val();
    $email = $$('#email').val();
    $password = $$('#password').val();
    $mobile = $$('#mobile').val();
    $brand = $$('#brand').val();
    $model = $$('#model').val();
    $year = $$('#year').val();
    $fileURI = $$('#imgArea').attr('src');
//$image = $$('#image').val();

        if ($name===''){
            myApp.alert('', lng('namerequired'));
            isvalid = false;
            myApp.hideIndicator();
        }

        if ($email === '') {
            myApp.alert('', lng('emailrequired'));
            isvalid = false;
            myApp.hideIndicator();
        }

        if ($password === '') {
            myApp.alert('', lng('passwordrequired'));
            isvalid = false;
            myApp.hideIndicator();
        }

        if ($mobile === '') {
            myApp.alert('', lng('mobilerequired'));
            isvalid = false;
            myApp.hideIndicator();
        }

        if ($brand === '') {
            myApp.alert('', lng('brandrequired'));
            isvalid = false;
            myApp.hideIndicator();
        }

        if ($model === '') {
            myApp.alert('', lng('modelrequired'));
            isvalid = false;
            myApp.hideIndicator();
        }

        if ($year === '') {
            myApp.alert('', lng('yearrequired'));
            isvalid = false;
            myApp.hideIndicator();
        }

        if ($fileURI === ''){
            myApp.alert('', lng('photorequired'));
            isvalid = false;
            myApp.hideIndicator();
        }

        if (isvalid) {
            $$.ajax({
                type: 'POST',
                url: captain + 'register_captain/',
                //crossDomain: true,
                data: JSON.stringify({
                    name: $name,
                    email: $email,
                    password: $password,
                    mobile: $mobile,
                    brand: $brand,
                    model: $model,
                    year: $year

                }),
                success: function (data) {
                    myApp.hideIndicator();
                    if (data.code == 0) {
                       upload_car_image(data.captain_id);

                     /*    mainView.router.loadPage({
                            url: 'enter_code.html?captain_id=' + data.captain_id,
                            ignoreCache: true,
                            reload: true
                        }); */
                    } else {
                        myApp.alert('', lng('msg'+data.code));
                    }
                    console.log(data.code);

                },
                error: function (data) {
                    myApp.hideIndicator();
                    console.log('An error occurred.');
                    console.log(data);
                }//,

                , dataType: 'json'
            });
        }
   // e.preventDefault();





    // take a photo with the camera

    



  });





    $$('#fortest').on('click',function(){
      
        var fileURI = $$('#imgArea').attr('src');
       // alert(encodeURI(fileURI))
        var options = new FileUploadOptions();
        options.fileKey = "uploadfile";
        options.fileName ='tmp_name'; // fileURI.substr(fileURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.params = {}; // if we need to send parameters to the server request
        var ft = new FileTransfer();
       
        var win = function (r) {          
            console.log("Done: Response = " + r.response);
        }

        var fail = function (error) {           
            alert('Ups. Something wrong happens!' + error);           
        }

        ft.upload(fileURI, encodeURI(upload_image), win, fail, options);
        console.log("khlas done!");

    });


   
    function upload_car_image(captain_id){

        alert(captain_id);

        var fileURI = $$('#imgArea').attr('src');
       
        var options = new FileUploadOptions();
        options.fileKey = "uploadfile";
        options.fileName = 'tmp_name'; // fileURI.substr(fileURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.params = {}; // { captain_id: captain_id}; // if we need to send parameters to the server request
        var ft = new FileTransfer();

        var win = function (r) {
            mainView.router.loadPage({
                url: 'enter_code.html?captain_id=' + captain_id,
                ignoreCache: true,
                reload: true
            });
        }

        var fail = function (error) {
           // alert('Ups. Something wrong happens!' + error);
           // console.log('Ups. Something wrong happens!' + error);

            mainView.router.loadPage({
                url: 'enter_code.html?captain_id=' + captain_id,
                ignoreCache: true,
                reload: true
            });

        }

        ft.upload(fileURI, encodeURI(upload_image + '/' + captain_id), win, fail, options);
        console.log("khlas done!");
    }
   
     $$('#btnCam').on('click', function () {
     
    });
       
    $$("#btnCam22").click(function(data){
        data.preventDefault();
      console.log("HII");
      console.log("I am here");      
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            targetWidth: 600,
            targetHeight: 400,
           // sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY // not originally included
            sourceType: navigator.camera.PictureSourceType.CAMERA //Camera.PictureSourceType.PHOTOLIBRARY,
        }  
        navigator.camera.getPicture(onSuccess, onFail, options);
    
        
    function onSuccess(thePicture) {
        alert("Picture Uploaded");      
       $$("#imgArea").attr("src", thePicture);
    }
        
    function onFail(e) {
        alert("Image failed: " + e.message);
    }


  }); 



});

 myApp.onPageInit('trips1', function (page) {
    $$("#tripsul").html(page.context['trip_context']);   
});
 


myApp.onPageInit('trips', function (page) {
    window.localStorage.setItem("isIndexPage", false);
    isIndexPage = false;
    setLanguage(window.localStorage.getItem("current_language"));
    
         $$.ajax({
            type: 'POST',
            url: trips + 'triplist/',
            //crossDomain: true,
            data:  JSON.stringify ({data:'no data'}),
            success: function(data) {             
              $$.each(data, function(i, item) {            
            console.log(item);                
               $$('#tripsul').append('<li>'+
               '<a href="trip_detail.html?tripid='+item.id+'" class="item-link item-content">'+
                   '<div class="item-media"><img src="' + carimage + item.carimage+'" width="80"></div>'+
                 '<div class="item-inner">'+
                   '<div class="item-title-row">'+
                     '<div class="item-title cityfromto"> '+item.cfrom+'->'+item.cto+'</div>'+
                     '<!--div class="item-after">$15</div-->'+
                   '</div>'+
                   '<div class="item-subtitle">'+item.car+'</div>'+
                   '<div class="item-text">'+item.captain+'</div>'+
                   '<div class="item-text">' + item.trip_date_name+'  '+item.trip_time + '</div>' +
                 '</div>'+
               '</a>'+
             '</li>');
              });

                 mainView.router.loadPage({
                        url: 'trips.html',
                        ignoreCache: true,
                        reload: false,
                        context: { trip_context: trip_context }
                    }); 

            },
            error: function (data) {
                console.log('An error occurred.');
                console.log(data);
            }//,           
            ,dataType: 'json'
        }); 
    
      
    //  });
    
    });







myApp.onPageInit('trip_detail', function (page) {
    window.localStorage.setItem("isIndexPage", false);
    isIndexPage = false;
    setLanguage(window.localStorage.getItem("current_language"));
        var values = page.query;
        myApp.showIndicator();
       var tripid =  values.tripid;

        $$.ajax({
            type: 'GET',
            url: trips + 'TripDetail/'+tripid,
           
            success: function(item) {
                myApp.hideIndicator();             
                $$("#distination").html('<span> '+item.cfrom+'->'+item.cto+'</span>');
                if (window.localStorage.getItem("loggedIn") == 1) {
                    $$("#captain").html('<span>'+item.captain+'</span>');
                    if(item.isfull == 1){
                        $$("#done_button").html('<p style="font-size: 10px;color:red;">' + lng('fullpassengers')+'</p>');
                    }else{
                        $$("#done_button").html('<a href="#"  class="button button-fill color-red button-round mark-full">' + lng('done')+'</a>');
                    }
                }else{
                    $$("#captain").html('<span><a href="rating.html?captain_id=' + item.captain_id + '" data-reload="true"> ' + item.captain + '</a></span>');
                    
                }
                $$("#trip_time").html('<span> </span>');
                $$("#car").html('<span> '+item.car+'</span>');
                $$("#mobile_number").html('<span>'+item.mobile+'</span>');
                $$("#trip_date  ").html('<span>' + item.trip_date_name + ' ' +item.trip_date+'</span>');
                $$("#trip_time").html('<span>'+item.trip_time+'</span>');
//                $$("#datetime").html('<span>'+item.datetime+'</span>');
                $$("#carimage").attr('src',carimage+item.carimage);
               // console.log(item.carimage);
            },
            error: function (data) {
                myApp.hideIndicator();    
                console.log('An error occurred.');
                console.log(data);
            }//,           
            ,dataType: 'json'
        }); 
    
      
    //  });


        $$(document).on('click', '.mark-full', function () {

            myApp.showIndicator();
            $$.ajax({
                type: 'POST',
                url: trips + 'set_isfull/',
                //crossDomain: true,
                data: JSON.stringify({ trip_id: tripid, captain_id: window.localStorage.getItem("captain_id")}),
                success: function (data) {
                    myApp.hideIndicator();
                    $$("#done_button").html('<p style="font-size: 10px;color:red;">' + lng('fullpassengers')+'</p>');
                    
                    
                },
                error: function (data) {
                    myApp.hideIndicator();
                    console.log('An error occurred.');
                    console.log(data);
                }//,           
                , dataType: 'json'
            }); 


           
        });

    
    
    });




myApp.onPageInit('rating', function (page) {
    window.localStorage.setItem("isIndexPage", false);
    isIndexPage = false;
    setLanguage(window.localStorage.getItem("current_language"));
    var values = page.query;

    var captain_id = values.captain_id;

    var rating_val = 0;
     myApp.showIndicator();
    $$.ajax({
        type: 'POST',
        url: captain + 'captain_review',
        data: JSON.stringify({ captain_id: captain_id}),
        success: function (data) {
            myApp.hideIndicator();
          if(data.code == 0){
         //   $$("#car").html('<span> ' + item.car + '</span>');
              $$.each(data.captain_data, function (i, item) {
                 
                console.log(item);
                $$('#ratingsul').append('<li>' +
                    '<a href="#" class="item-link item-content">' +
                    // '<div class="item-media"><img src="img/' + item.comment + '" width="80"></div>' +
                    '<div class="item-inner">' +
                    '<div class="item-title-row">' +
                    '<div class="item-title cityfromto"> ' + starsDrawer(item.rating) + '</div>' +
                    '<!--div class="item-after">$15</div-->' +
                    '</div>' +
                    '<div class="item-subtitle">' + item.comment + '</div>' +
                    '<div class="item-text">' + item.datetime + '</div>' +
                    '</div>' +
                    '</a>' +
                    '</li>');
            });
          }
          else {
              myApp.alert('', item.message);
          }
        },
        error: function (data) {
            myApp.hideIndicator();
            console.log('An error occurred.');
            console.log(data);
        }//,           
        , dataType: 'json'
    }); 




    $$("#submit-rating").click(function () {

        alert("This is Mohamed Dawaina");
   
    });


    $$(document).on('click', '.rstar', function () {
        rating_val = $$(this).attr("rval");
        $$("#selected-stars").text(rating_val + " نجوم");
        $$("#hidden-stars").text(rating_val);
       
        myApp.popup('.popup-rating');
       // alert(rating_val);
    });



    $$('.popup-rating').on('popup:closed', function () {

        myApp.showIndicator();
        $$.ajax({
            type: 'POST',
            url: captain + 'add_captain_review',
            data: JSON.stringify({ captain_id: captain_id, rating: $$("#hidden-stars").text().trim(), comment: $$("#comment").val().trim() }),
            success: function (data) {
                myApp.hideIndicator();
                if (data.code == 0) {
                   

                     //   console.log(item);
                        $$('#ratingsul').append('<li>' +
                            '<a href="#" class="item-link item-content">' +
                            // '<div class="item-media"><img src="img/' + item.comment + '" width="80"></div>' +
                            '<div class="item-inner">' +
                            '<div class="item-title-row">' +
                            '<div class="item-title cityfromto"> ' + starsDrawer($$("#hidden-stars").text().trim()) + '</div>' +
                            '<!--div class="item-after">$15</div-->' +
                            '</div>' +
                            '<div class="item-subtitle">' +  $$("#comment").val() + '</div>' +
                            '<div class="item-text">' + data.rating.datetime + '</div>' +
                            '</div>' +
                            '</a>' +
                            '</li>');
                   
                }
                else {
                    myApp.alert('', item.message);
                }
            },
            error: function (data) {
                myApp.hideIndicator();
                console.log('An error occurred.');
                console.log(data);
            }//,           
            , dataType: 'json'
        }); 
    });//

});


    function uploadPhoto(imageURI) {
        var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1)+'.png';
        options.mimeType="text/plain";    //  options.mimeType="image/jpeg";     
        var params = new Object();        
        options.params = params;        
        var ft = new FileTransfer();
        ft.upload(imageURI, encodeURI(upload_image+"upload_image"), win, fail, options);
    }

    function win(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
    }

    function fail(error) {
        alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }



    function starsDrawer(rating){
        var stars = '';
        for(i = 0;i < rating; i++){
            stars += '<span style="color:gold;">☆</span>';
        }
        for (i = rating; i < 5; i++) {
            stars += '<span>☆</span>';
        }

        return stars;
        
    }


myApp.onPageInit('settings', function (page) {
    window.localStorage.setItem("isIndexPage", false);
    isIndexPage = false;
    setLanguage(window.localStorage.getItem("current_language"));

    if (window.localStorage.getItem("current_language") == 'ar'){
        $$(".currentlanguage").html(lng('arabic'));
    }else{
       
        $$(".currentlanguage").html(lng('english'));
    }
  //  alert(window.localStorage.getItem("loggedIn"));
    $$('.lang-popup').on('click', function () {
        myApp.modal({
            title: lng('language'),
            text: lng('language'),
            buttons: [
                {
                    text: lng('arabic'),
                    onClick: function () { 

                        window.localStorage.setItem("current_language", "ar");
                        setLanguage("ar");
                        mainView.router.loadPage({
                            url: 'index.html',
                            ignoreCache: true,
                            reload: true
                        });
                    }


                },
            {
                text: lng('english'),
                onClick: function () {  

                    window.localStorage.setItem("current_language", "en");
                    setLanguage("en");
                    mainView.router.loadPage({
                        url: 'index.html',
                        ignoreCache: true,
                        reload: true
                    });
                 }
            },

            ]
        });
    });
});