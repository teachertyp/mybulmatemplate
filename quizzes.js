    "use strict"
    var question_id;//id питання яке прийшло для тесту
    var checkboxes = []; //коли клацаємо по checkbox сюди пишемо іди
    var radioansw;
    var shba = "";//коротка відповідь
    var rid;//це змінна у яку запишемо ід вибраної відповіді
    var qid;//це ід запитання
    var xtimer,spileft,spiright;
$(function () {
    var h = $("#quizheader");
    var c = $("#quizcontent");
    var n = 0;

    $(document).off("click").on("click","#startbtnnew", function () {
        var t=$("#selt").val();
        if(t>0||typeof t=="undefined"){
           ajax2.post("https://typatest.pp.ua/quizz/quizzquizz.html", {"id": quizzid, "qnum": "0","teacher":t});
        }else{
            alert("Виберіть учителя");
        }
    });

    $(document).on("click", ".nextq", function () {
        var tid = this.id;
        sender[tid]();
        $(".qvariants").html('<div class="loader"></div>');
    });

    $(document).on("click", ".radioansw", function () {
        radioansw = this.id;
        $(".pretty").css("border","none");
        $(".nextq").removeClass("disabled");
        $(".nextq").attr('disabled', false);
        $("#"+radioansw).parent().css("border","1px dotted green");
        
    });

    $(document).on("click", "#setpassw", function () {
        var passw = $("#passw").val();
        ajax2.post("https://typatest.pp.ua/quizz/quizzquizz.html", {"id": quizzid, "quizzpassw": passw});
    });



    $(document).on("input", ".shbansw", function () {
        //console.log("inputs");
        shba = $(this).val();

        if (shba.length > 0) {
            $(".nextq").removeClass("disabled");
            $(".nextq").attr('disabled', false);
        } else {
            $(".nextq").attr('disabled', true);
            $(".nextq").addClass("disabled");
        }
    });

    $(document).on("change", ".chbansw", function (e) {
        var tid = this.id.split("-");
        if ($(this).is(":checked")) {
            checkboxes.push(tid[2]);
        } else {
            for (var i = checkboxes.length - 1; i >= 0; i--) {
                if (checkboxes[i] === tid[2]) {
                    checkboxes.splice(i, 1);
                }
            }
        }
        if (checkboxes.length > 0) {
            $(".nextq").removeClass("disabled");
            $(".nextq").attr('disabled', false);
        } else {
            $(".nextq").attr('disabled', true);
            $(".nextq").addClass("disabled");
        }
    });

    var quizz = {
        setcontent: function (n, q, v) {
            $("#quizzcontent").html("<h4>Запитання №" + n + "</h4><div class='qtitle'>" + q + "</div><div class='qvariants'>" + quizz.decodeHtml(v) + "</div>");
        },
        fin: function (data) {
            var strtime=document.getElementById("timetimer");
                
                clearInterval(xtimer);
                strtime.style.display="none";
                
            $("#quizzcontent").html('<h4>' + data.text + '</h4><p>Ви набрали ' + data.res + '% правильних відповідей. Ваша оцінка <strong> ' + data.o + '</strong></p>');
        },
        passwok:function(){
            
        },
        setpasswform: function () {
            $("#quizzcontent").html('<h4>Потрібен пароль!</h4><div class="jumbotron"><form id="form_newquiz" onsubmit="return false"><div class="form-group">' +
                    '<label for="quizname">Введіть пароль доступу:</label>' +
                    '<input type="password" name="passw" class="form-control input" value="" id="passw"></div>' +
                    '<a href="#" class="savebtn button is-success" id="setpassw" >Продовжити</a>' +
                    '</form></div>');
        },
        one: function (data) {

            question_id = Object.keys(data)[0];
            var key;
            var cont = '';
            var img = '';
            for (var key in data[question_id]["answ"]) {

                if (data[question_id]["answ"][key]["img"] != "") {
                    img = '<img  class="imageansw" src="' + data[question_id]["answ"][key]["img"] + '">';
                } else {
                    img = '';
                }
                cont += '<div class="pretty p-icon p-round">' +
                        '<input type="radio" name="answ" class="radioansw" id="a-' + question_id + '-' + data[question_id]["answ"][key]["id"] + '" />' +
                        '<div class="state p-success">' +
                        '<i class="icon mdi mdi-check"></i>' +
                        '<label><div>' +  (data[question_id]["answ"][key]["text"]) + '</div></label>'  +img+
                        '</div>' +
                        '</div>';
            }
            cont += '<div class="nextprevdiv"><button id="sendone" disabled class="disabled nextq btn btn-success btn-md">Наступне питання</button></div>'
            this.setcontent(n, data[question_id]["q"], cont);
        },
        chb: function (data) {

            question_id = Object.keys(data)[0];
            var cont = '';
            var img = '';
            for (var key in data[question_id]["answ"]) {

                if (data[question_id]["answ"][key]["img"] != "") {
                    img = '<img class="imageansw" src="' + data[question_id]["answ"][key]["img"] + '">';
                } else {
                    img = '';
                }
                cont += '<div class="pretty p-icon p-rotate">' +
                        '<input type="checkbox" name="answ" class="chbansw" id="a-' + question_id + '-' + data[question_id]["answ"][key]["id"] + '" />' +
                        '<div class="state p-success">' +
                        '<i class="icon mdi mdi-check"></i>' +
                        '<label><div>' +img+  (data[question_id]["answ"][key]["text"]) + '</div></label>'  +
                        '</div>' +
                        '</div>';
            }
            cont += '<div class="nextprevdiv"><button id="sendchb" disabled class="disabled nextq btn btn-success btn-md">Наступне питання</button></div>'
            this.setcontent(n, data[question_id]["q"], cont);
        },
        shb: function (data) {
            question_id = Object.keys(data)[0];
            var cont = '<div class="shbtd form-group">' +
                    '<input type="text" name="answ" class="shbansw form-control" id="a-' + question_id + '-1" />' +
                    '</div>';

            cont += '<div class="nextprevdiv"><button id="sendshb" disabled class="disabled nextq btn btn-success btn-md">Наступне питання</button></div>';
            this.setcontent(n, data[question_id]["q"], cont);
        },
        spi: function (data) {
            question_id = Object.keys(data)[0];
//            console.log(data);
            var contleft = '';
            var contright = '';
            var img = '';
            var key;
            for (key in data[question_id]["answ"]) {

//                if (data[id]["answ"][key]["img"] != "") {
//                    img = '<img src="/uploads/' + data[id]["answ"][key]["img"] + '">';
//                } else {
//                    img = '';
//                }
                contleft += '<li class="spileft" id="a-' + question_id + '-' + data[question_id]["answ"][key]["id"] + '" >' +
                        (data[question_id]["answ"][key]["text1"]) +
                        '</li>';
                contright += '<li class="spiright" >' + (data[question_id]["answ"][key]["text2"]) + '</li>';
            }
            contleft = '<div class="span4"><ol id="spileft" class="simple_with_animation vertical">' + contleft + '</ol></div>';
            contright = '<div class="span4"><ol id="spiright" class="simple_with_animation vertical">' + contright + '</ol></div>';
            var cont = '<div class="row">' + contleft + contright + '</div>';
            cont += '<div class="nextprevdiv"><button id="sendspi" class="nextq btn btn-success btn-md">Наступне питання</button></div>'
            this.setcontent(n, data[question_id]["q"], cont);
            spileft = document.getElementById("spileft");
            spiright = document.getElementById("spiright");
            Sortable.create(spiright, {group: "omega"});
        },
        startime: function (h, m) {
            var d1 = new Date(),
                d2 = new Date(d1);

            var countDownDate = d2.setMinutes(d1.getMinutes() + h*60+m);

// Update the count down every 1 second
            xtimer = setInterval(function () {

                // Get todays date and time
                var now = new Date().getTime();

                // Find the distance between now an the count down date
                var distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Output the result in an element with id="demo"
                var strtime=document.getElementById("timetimer");
                strtime.style.display="block";
                strtime.innerHTML = days + "d " + hours + "h "
                        + minutes + "m " + seconds + "s ";

                // If the count down is over, write some text 
                if (distance < 0) {
                    ajax2.post("/quizz/expire.html", {"id": quizzid, "expire": 1});
                    strtime.style.display="none";
                    clearInterval(xtimer);
                }
            }, 1000);
        },
        decodeHtml: function (str) {
            
            return str
                    .replace(/&amp;/g, '&')
                    .replace(/&lt;/, '<')
                    .replace(/&gt;/, '>')
                    .replace(/&quot;/g, '"')
                    .replace(/&#039;/g, "'");
        }

    };




    var sender = {
        sendone: function () {
            var selid = radioansw.split("-");
            var rid = selid[2];
            var qid = selid[1];
            ajax2.post("https://typatest.pp.ua/quizz/quizzquizz.html", {"id": quizzid, "qid": qid, "qnum": n, "r": rid, "type": 1});
        },
        sendchb: function () {
            ajax2.post("https://typatest.pp.ua/quizz/quizzquizz.html", {"id": quizzid, "qid": question_id, "qnum": n, "r": checkboxes, "type": 2});

        },
        sendshb: function () {
            ajax2.post("https://typatest.pp.ua/quizz/quizzquizz.html", {"id": quizzid, "qid": question_id, "qnum": n, "r": shba, "type": 3});
        },
        sendspi: function () {
            var hspileft=document.getElementById("spileft");
            var hspiright=document.getElementById("spiright");
            var spileft=hspileft.childNodes; 
            var spiright=hspiright.childNodes; 
            var aspil = [], aspir = [];

            for (var i = 0; i < spileft.length; i++) {
                aspil[i] = spileft[i].innerText;
                aspir[i] = spiright[i].innerText;

            }
            ajax2.post("https://typatest.pp.ua/quizz/quizzquizz.html", {"id": quizzid, "qid": question_id, "qnum": n, "r": 1, "aspil": aspil, "aspir": aspir, "type": 4});
        }
        

    };



    var ajax2 = {
        post: function (url, data) {

            $.post(url, data, function (answer) {
  
                try {
                    console.log(answer);
                    var quizdata = JSON.parse(answer);
                    if(quizdata.wrongclass=="1"){
                       alert("Цей тест не для Вашої паралелі");
                    }else{
                    if (quizdata.quizzpassw == "1") {
                        quizz.setpasswform();
                    } else {

                        if (quizdata.fin == "1") {
                            quizz.fin(quizdata);
                        } else {
                            n = quizdata.qnum+1;
                            

                            if(quizdata.qnum==1&&(quizdata.h!=null||quizdata.m!=null)){
                               quizz.startime(parseInt(quizdata.h),parseInt(quizdata.m)); 
                            }
                            var id = Object.keys(quizdata)[0];
                            //console.log(quizdata[id]["t"]);
                            quizz[quizdata[id]["t"]](quizdata);
                            checkboxes = [];
                        }
                    }}
                } catch (e) {
                    console.log(e);
                    alert("Помилка даних! Перезавантажте сторінку!");
                }
            });
        }
    };
});

