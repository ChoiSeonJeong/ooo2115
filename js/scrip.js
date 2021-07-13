$(document).ready(function () {//html문서를 모두 로딩한 후에 jquery코드를 실행
    var scrollEvent = true;//스크롤 이벤트가 중복으로 적용되지 않고 한번씩만 실행될 수 있도록 해주기 위한 변수
    var delta; //마우스 휠 이벤트가 발생했을때 반환되는 값을 담기 위한 변수
    //(위 = 120,아래 = -120)
    var count = 0;//페이지순번
    var secMax = $("section").length - 1; //section의 갯수를 변수에 할당.
    $("section").on("mousewheel DOMMouseScroll", function (e) {
        //section에 마우스휠 이벤트 생성
        e.preventDefault();//브라우저 기능을 차단, 스크립트와 브라우전 간의 휠기능 간섭을 막아줌.
        var E = e.originalEvent;//변수에 mousewheel이벤트의 originalEvent값을 할당.

        if (E.detail) {//파이어폭스 용
            delta = E.detail * -40;//파이어폭스외 브라우저는 값이 120,-120으로 반환되지만 파이어폭스의 경우 -3,3으로 반환됩니다.
            //값을 동일하게 맞춰주기 위해 -40을 곱하여 delta변수에 할당 합니다.
        } else {
            delta = E.wheelDelta;//그외 브라우저 용
        }
        //console.log(delta)

        //마우스 휠을 위로 올렸을 경우
        if (delta > 1 && scrollEvent == true && count >= 1) {
            //조건식이 모두 참일 경우에만 코드실행
            scrollEvent = false;
            //scrollEvent변수를 false로 할당하여 animate함수가 종료되기 전까지 중복 적용되지 않도록 해준다.
            count--;//count변수값에 1을 빼서 다시 count변수에 할당합니다.
            var ht = $("section").height();//변수ht에 콘텐츠영역의 높이를 할당(=section의 높이)
            $("html,body").animate({ "scrollTop": ht * count }, 1300, "easeInOutExpo", function () {
                scrollEvent = true;
            });//html과 body를 선택하여 animate함수로 scrollTop위치를 ht(브라우저의 높이)곱하기 count(페이지순번)위치로 1초동안 이동하고 위치이동이 끝난 후 scrollEvent변수값을 다시 true로 변경하여 이벤트가 실행될 수 있도록 해준다.
        }
        //마우스 휠을 아래로 내렸을 경우
        if (delta < 1 && scrollEvent == true && count < secMax) {
            //조건식이 모두 참일 경우 코드실행
            scrollEvent = false;
            count++;//count변수값에 1을 더해서 다시 count변수에 할당.
            var ht = $("section").height();
            $("html,body").animate({ "scrollTop": ht * count }, 1000, "easeInOutExpo", function () {
                scrollEvent = true;
            });//위와 동일
        }

    });

    //스크롤top
    $(window).scroll(function () {//브라우저 내에서 스크롤이벤트 발생시
        var scroll = $(window).scrollTop();//변수scroll에 스크롤 이동값을 할당.
        console.log(scroll);
        if (scroll > 50) {//스크롤 이동값이 50보다 클때
            $(".top").addClass("on");//header에 on클래스를 추가
        } else {//스크롤 이동값이 50보다 작을때
            $(".top").removeClass("on");//header에 on클래스를 제거
        }
    })

    //
    const toggleBtn = document.querySelector(".navbar i");
    const menu = document.querySelector(".navbar .right");
    toggleBtn.addEventListener("click", () => {
        menu.classList.toggle("active");
        link.classList.toggle("active");
    });


    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            $(".btntop > i").css({ "opacity": "1", "pointer-events": "auto" });

        } else {
            $(".btntop > i").css({ "opacity": "0", "pointer-events": "none" });
        }
    });
    $(".btntop > i").click(function () {
        $("html").animate({ scrollTop: 0 }, 500);
    });//top버튼 END

});//doucument.