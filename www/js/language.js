var langTrans = {
    "ID_APP_TITLE": {en:"3 Tires Calc",ar:"3й Шинный Кальк"},
    "Tires Calc": {ar:"3 Шинный Кальк"},
    "Manage topics": {ar:"Управление темами"},
    "Login":{en:"Login",ar:"تسجيل الدخول"},
    "Email":{en:"Email",ar:"البريد الإلكتروني "},
    "Password":{en:"Password",ar:"كلمة المرور "},
    "cancel":{en:"Cancel",ar:"الغاء"},
    "ok":{en:"OK",ar:"موافق"}
    

};

var defaultLanguage = "ar";
var curreguage = "en";

function getSystemLanguage() {
    var sysLang = "en";
    var systemLang = navigator.language || navigator.browserLanguage || ""; 
    if (systemLang.indexOf("ar") > -1) {
        sysLang = "ar";

    } else {
        sysLang = "en";
        
    }

    return sysLang;
}

function setLanguage(lng, block) {
    lng = lng || defaultLanguage;

    currentLanguage = lng;
    if(!block) {
        block = "lng";
    } else {
        block = block + " > lng";
    }

    $$(block).each(function () {

        var item = $$(this);
        var text = item.html();
        var id;
        var trans = "";

        //keep default value
        if (!item.attr("orig")) {
            item.attr("orig", text);
        }

        //if item has id use it to get translation
        id = item.attr("id");

        if(!id) {
            id = item.attr("orig");
        }

        console.log(id);

        console.log(text + item.attr("orig"));
            //trans = langTrans[item.attr("orig")];
            trans = item.attr("orig");
            //console.log("Trans: " + trans);
            if(langTrans[id] !== undefined) {
                if(langTrans[id][currentLanguage] !== undefined) {
                    trans = langTrans[id][currentLanguage];
                } else {
                    if(langTrans[id][defaultLanguage] !== undefined) {
                        trans = langTrans[id][defaultLanguage];
                    }

                }
            }

        if (typeof trans !== "undefined") {
            item.html(trans);
        }

    });
}

function lng(id) {

    var trans;
    //if (currentLanguage !== defaultLanguage) {
        if(langTrans[id] !== undefined) {
            if(langTrans[id][currentLanguage] !== undefined) {
                trans = langTrans[id][currentLanguage];
            } else {
                if(langTrans[id][defaultLanguage] !== undefined) {
                    trans = langTrans[id][defaultLanguage];
                }
            }
        }

        if (trans) {
            id = trans;
        }
    //}
    return id;

}