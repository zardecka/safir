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
// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});


function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);
} 

function onBackKeyDown() {
    mainView.router.loadPage({
        url: 'index.html',
        ignoreCache: true,
        reload: true
    });
}

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
 
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



    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }










    // run createContentPage func after link was clicked
  // var db = window.openDatabase("users","1.0","SafirDB",200000);
   //saveData();


//window.sessionStorage
  if(window.localStorage.getItem("loggedIn") == 1) {
        // Logged In
        // Redirect to first page after logged in.
       // mainView.router.loadPage("index.html");
       // $$("#captain_menu").css({"display":"block"});
        //$$("#guest_menu").css({"display":"none"});
        //alert("I am here");
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
        
      //  $$("#guest_menu").css({"display":"block"});
      //  $$("#captain_menu").css({"display":"none"});
       // mainView.router.loadPage("filter_trip.html");

       /*  mainView.router.loadPage({
            url: 'filter_trip.html',
            ignoreCache: true,
            reload: true}); */
    }

/* 
    $$(".item-link > a.logout").click(function(e){
        //e.preventDefault();
        alert("hello");
    window.localStorage.setItem("loggedIn", 0);
    window.localStorage.removeItem("email");
    mainView.router.loadPage("index.html");
    
   });  */



  $$(document).on("click","#close-panel" , function(){

       var options = {
           message: 'حمل تطبيق سافر واستمتع بتجربة سفر مميزة!', // not supported on some apps (Facebook, Instagram)
           subject: 'مشاركة التطبيق', // fi. for email
           files: ['', ''], // an array of filenames either locally or remotely
           url: 'https://www.website.com/foo/#bar?a=b',
           chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
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
                myApp.alert('', data.message);
                mainView.router.loadPage({
                    url: 'enter_code.html?captain_id=' + data.captain_id,
                    ignoreCache: true,
                    reload: true
                });
            }
            
            else{
              //  $$('.alert-text-title').on('click', function () {
                    myApp.alert('',data.message);
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
                               '<div class="item-media"><img src="' + carimage + item.carimage + '" width="80"></div>' +
                            '<div class="item-inner">' +
                            '<div class="item-title-row">' +
                            '<div class="item-title cityfromto"> ' + item.cfrom + '->' + item.cto + '</div>' +
                            '<!--div class="item-after">$15</div-->' +
                            '</div>' +
                            '<div class="item-subtitle">' + item.car + '</div>' +
                               '<div class="item-text">' + item.captain + '</div>' +
                            '<div class="item-text isfullclass">' + (item.isfull==1?"اكتمل العدد":"")  + '</div>' +
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
                    myApp.alert('', data.messaage);
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
   // alert("hello");
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
                    myApp.alert('', "تم تنشيط حسابك، فضلا سجل الدخول");
                    mainView.router.loadPage({
                        url: 'login.html',
                        ignoreCache: true,
                        reload: true
                    });
                }else{
                    myApp.alert('',data.message);
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
        $ttime = $$('#ttime').val();
        $$.ajax({
            type: 'POST',
            url: trips + 'filter_trip/',
            
            data:  JSON.stringify ({
                tfrom: $trimp_from,
                tto:$trip_to,
                trip_date:$trip_date,
                ttime:$ttime
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
                            '<div class="item-media"><img src="' +carimage+item.carimage+'" width="80"></div>'+
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
                    myApp.alert('',data.messaage);
                }
               
            },
            error: function (data) {
                myApp.hideIndicator();
                console.log('An error occurred.');
                console.log(data);
            }
            ,dataType: 'json'
        }); 
     });
});


myApp.onPageInit('new_trip', function (page) {

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

                myApp.alert('',data.message);
                mainView.router.loadPage({
                    url: 'my_trips.html',
                    ignoreCache: true,
                    reload: true
                }); 
            }

            else{
                myApp.alert('',data.message);
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
            myApp.alert('', "الاسم مطلوب");
            isvalid = false;
            myApp.hideIndicator();
        }

        if ($email === '') {
            myApp.alert('', "البريد الالكتروني مطلوب");
            isvalid = false;
            myApp.hideIndicator();
        }

        if ($password === '') {
            myApp.alert('', "كلمة المرور مطلوبة");
            isvalid = false;
            myApp.hideIndicator();
        }

        if ($mobile === '') {
            myApp.alert('', "رقم الجوال مطلوب");
            isvalid = false;
            myApp.hideIndicator();
        }

        if ($brand === '') {
            myApp.alert('', "العلامة التجارية للسيارة مطلوبة");
            isvalid = false;
            myApp.hideIndicator();
        }

        if ($model === '') {
            myApp.alert('', "موديل السيارة مطلوب");
            isvalid = false;
            myApp.hideIndicator();
        }

        if ($year === '') {
            myApp.alert('', "سنة الصنع مطلوبة");
            isvalid = false;
            myApp.hideIndicator();
        }

        if ($fileURI === ''){
            myApp.alert('', "ارفق صورة للسيارة الخاصة بك");
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
                        myApp.alert('', data.message);
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
        options.fileName ='myimage444'; // fileURI.substr(fileURI.lastIndexOf('/') + 1);
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
        var fileURI = $$('#imgArea').attr('src');
       
        var options = new FileUploadOptions();
        options.fileKey = "uploadfile";
        options.fileName = 'myimage444'; // fileURI.substr(fileURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.params = { captain_id: captain_id}; // if we need to send parameters to the server request
        var ft = new FileTransfer();

        var win = function (r) {
            mainView.router.loadPage({
                url: 'enter_code.html?captain_id=' + captain_id,
                ignoreCache: true,
                reload: true
            });
        }

        var fail = function (error) {
         
            console.log('Ups. Something wrong happens!' + error);
        }

        ft.upload(fileURI, encodeURI(upload_image), win, fail, options);
        console.log("khlas done!");
    }
   
     $$('#btnCam').on('click', function () {
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

            $$("#imgArea").attr("src", fileURI);
            
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
            options.fileName = "tttyy6"; //  fileURI.substr(fileURI.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";
            options.params = {}; // if we need to send parameters to the server request
            var ft = new FileTransfer();
            ft.upload(fileURI, encodeURI(upload_image), win, fail, options);
        
        }



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

 myApp.onPageInit('trips', function (page) {
    $$("#tripsul").html(page.context['trip_context']);   
});
 


myApp.onPageInit('trips1', function (page) {
    
    
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
                 '</div>'+
               '</a>'+
             '</li>');
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
                        $$("#done_button").html('<p style="font-size: 10px;color:red;">اكتمل العدد</p>');
                    }else{
                    $$("#done_button").html('<a href="#"  class="button button-fill color-red button-round mark-full">تم</a>');
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
                    $$("#done_button").html('<p style="font-size: 10px;color:red;">اكتمل العدد</p>');
                    
                    
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




myApp.onPageInit('captain_profile', function (page) {

    myApp.showIndicator();

   
    $$.ajax
    ({
        type: 'POST',
        url: captain + 'captain_profile/', // + captain_id,
        data: JSON.stringify({ captain_id: window.localStorage.getItem("captain_id")}),        
        success: function (resp) {
            myApp.hideIndicator();
            console.log(resp.captain_data.name);
            $$("#name").val(resp.captain_data.name);
            $$("#email").val(resp.captain_data.email);
            $$("#password").val(resp.captain_data.password);
            $$("#mobile").val(resp.captain_data.mobile);
            $$("#brand").val(resp.captain_data.brand);
            $$("#model").val(resp.captain_data.model);
            $$("#year").val(resp.captain_data.year);
            
            $$("#imgArea").attr("src", carimage + resp.captain_data.image);
        },
        error: function (data) {
            myApp.hideIndicator();
            console.log('An error occurred.');
            console.log(data);
        }           
        , dataType: 'json'
    });



    $$(document).on('click', '.edit-profile', function () {

        //event.preventDefault();
        $$('#name').removeAttr("disabled");
        $$('#email').removeAttr("disabled");
        $$('#password').removeAttr("disabled");
        $$('#mobile').removeAttr("disabled");
        $$('#brand').removeAttr("disabled");
        $$('#model').removeAttr("disabled");
        $$('#year').removeAttr("disabled");

       
        
        $$(".update-butonn-to-be-here").html('<p><a href="#" class="button button-fill color-green update-profile">تحديث</a></p>');
    });

    $$('#imgArea').on('click', function () {
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

            $$("#imgArea").attr("src", fileURI);

            var win = function (r) {
                clearCache();
                retries = 0;
                //alert('Done!');
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
            options.fileName = "tttyy6"; //  fileURI.substr(fileURI.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";
            options.params = {}; // if we need to send parameters to the server request
            var ft = new FileTransfer();
            ft.upload(fileURI, encodeURI(upload_image), win, fail, options);

        }



    });

    function update_car_image(captain_id) {
        var fileURI = $$('#imgArea').attr('src');

        var options = new FileUploadOptions();
        options.fileKey = "uploadfile";
        options.fileName = 'myimage444'; // fileURI.substr(fileURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.params = { captain_id: captain_id }; // if we need to send parameters to the server request
        var ft = new FileTransfer();

        var win = function (r) {
           /*  mainView.router.loadPage({
                url: 'captain_profile.html',
                ignoreCache: true,
                reload: true
            });  */

            console.log('ppp'+captain_id);
        }

        var fail = function (error) {

            console.log('Ups. Something wrong happens!' + error);
        }

        ft.upload(fileURI, encodeURI(upload_image), win, fail, options);
        console.log("khlas done!");
    }

    //do the update

    $$(document).on('click', '.update-profile', function () {

        myApp.showIndicator();
        $captain_id = window.localStorage.getItem("captain_id");
        $name = $$('#name').val();
        $email = $$('#email').val();
        $password = $$('#password').val();
        $mobile = $$('#mobile').val();
        $brand = $$('#brand').val();
        $model = $$('#model').val();
        $year = $$('#year').val();

        var isvalid = true;

        if ($name === '') {
            myApp.alert('', "الاسم مطلوب");
            isvalid = false;
            myApp.hideIndicator();
        }

        if ($email === '') {
            myApp.alert('', "البريد الالكتروني مطلوب");
            isvalid = false;
            myApp.hideIndicator();
        }

        if ($password === '') {
            myApp.alert('', "كلمة المرور مطلوبة");
            isvalid = false;
            myApp.hideIndicator();
        }

        if ($mobile === '') {
            myApp.alert('', "رقم الجوال مطلوب");
            isvalid = false;
            myApp.hideIndicator();
        }

        if ($brand === '') {
            myApp.alert('', "العلامة التجارية للسيارة مطلوبة");
            isvalid = false;
            myApp.hideIndicator();
        }

        if ($model === '') {
            myApp.alert('', "موديل السيارة مطلوب");
            isvalid = false;
            myApp.hideIndicator();
        }

        if ($year === '') {
            myApp.alert('', "سنة الصنع مطلوبة");
            isvalid = false;
            myApp.hideIndicator();
        }

       /*  if ($fileURI === '') {
            myApp.alert('', "ارفق صورة للسيارة الخاصة بك");
            isvalid = false;
            myApp.hideIndicator();
        } */

      
       if(isvalid){
        $$.ajax({
            type: 'POST',
            url: captain + 'update_captain/',
            
            data: JSON.stringify({
                id: $captain_id,
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
                if(data.code == 0){

                    update_car_image($captain_id);
                   
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




    });



});

myApp.onPageInit('rating', function (page) {

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