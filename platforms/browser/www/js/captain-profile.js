myApp.onPageInit('captain_profile', function (page) {

    myApp.showIndicator();

    $$.ajax
        ({
            type: 'POST',
            url: captain + 'captain_profile/', // + captain_id,
            data: JSON.stringify({ captain_id: window.localStorage.getItem("captain_id") }),
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

                $$("#imgArea").attr("src", carimage + resp.captain_data.image + '#' + new Date().getTime());
                //            $$("#imgArea").attr("src", carimage + resp.captain_data.image + '#'  + new Date().getTime());
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



        $$(".update-butonn-to-be-here").html('<p><a href="#" class="button button-fill color-green" id="update_profile">تحديث</a></p>');
    });


    $$('.update-image-modal').on('click', function () {
        myApp.modal({
            title: 'ارفق صورة',
            text: 'اختر طريقة ارفاق الصورة',
            buttons: [
                {
                    text: 'الكاميرا',
                    onClick: function () {
                        console.log("camera");
                     //   $$('#imgArea').on('click', function () {
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
                                options.fileName = "tmp_name"; //  fileURI.substr(fileURI.lastIndexOf('/') + 1);
                                options.mimeType = "image/jpeg";
                                options.params = {}; // if we need to send parameters to the server request
                                var ft = new FileTransfer();
                                ft.upload(fileURI, encodeURI(upload_image), win, fail, options);

                            }



                       
                    }
                    
                },

                {
                    text: 'الاستوديو',
                    onClick: function () {
                     //   $$('#imgArea').on('click', function () {
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
                                options.fileName = "tmp_name"; //  fileURI.substr(fileURI.lastIndexOf('/') + 1);
                                options.mimeType = "image/jpeg";
                                options.params = {}; // if we need to send parameters to the server request
                                var ft = new FileTransfer();
                                ft.upload(fileURI, encodeURI(upload_image), win, fail, options);

                            }



                      //  });
                    }

                }
            ]
            })
        });



   

    function update_car_image(captain_id) {
        var fileURI = $$('#imgArea').attr('src');

        var options = new FileUploadOptions();
        options.fileKey = "uploadfile";
        options.fileName = 'tmp_name'; // fileURI.substr(fileURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.params = {}; // { captain_id: captain_id }; // if we need to send parameters to the server request
        var ft = new FileTransfer();

        var win = function (r) {
            mainView.router.loadPage({
                url: 'captain_profile.html',
                ignoreCache: true,
                reload: true
            });

            console.log('ppp' + captain_id);
        }

        var fail = function (error) {

            console.log('Ups. Something wrong happens!' + error);
        }

        ft.upload(fileURI, encodeURI(upload_image + '/' + captain_id), win, fail, options);
        console.log("khlas done!");
    }

    //do the update

    $$(document).on('click', '#update_profile', function () {

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


        if (isvalid) {
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
                    if (data.code == 0) {

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