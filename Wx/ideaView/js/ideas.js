/**
 * Created by shidian on 2016/12/13.
 */
var ideasJson;
var total;
var curPage;
var pages;
//like this idea
function good(index) {
    if(check(index))
    {
        $.toast("Good");
        //ajax
        //
        ideasJson[index].like = 1;
        $("#idea"+index +" .img1").attr("src","../img/good.png");
    }
    else {
        $.toast("Unchangable");
    }
}
//unlike this idea
function bad(index) {
    if(check(index))
    {
        $.toast("Bad");
        //ajax
        //
        ideasJson[index].like = 2;
        $("#idea"+index +" .img2").attr("src","../img/bad.png");
    }
    else {
        $.toast("Unchangable");
    }
}
//    check whether this idea evaluated
function check(index) {
    if(ideasJson[index].like == 0) return true;
    else return false;
}

//R1 onclick function
$("#r1").bind("click",function (event) {
    //ajax for data
    $.ajax({
        type:'GET',
        url:'../json/ideas.json',
        dataType:'json',
        success:function (data) {
            ideasJson = data.data;
            curPage = data.currentPage;
            pages = data.totalPage;
            total = data.total;

            $("#panels").empty();
            //dynamic loading the data
            $.each(ideasJson,function (i,obj) {
                var imgGood;
                var imgBad;
                if(obj.like == 0){
                    //no option
                    imgBad = "badn";
                    imgGood = "goodn";
                }
                else if(obj.like == 1){
                    //like
                    imgBad = "badn";
                    imgGood = "good";
                }
                else if(obj.like == 2){
                    //unlike
                    imgBad = "bad";
                    imgGood = "goodn";
                }
                var panel =" <div class=\"weui_panel\" id=\"idea" + i + "\" data-id='" + i +
                    "'\">"+
                    "                    <div class=\"weui_panel_bd\">"+
                    "                        <div class=\"weui-row weui-no-gutter\">"+
                    "                            <div class=\"panelLeft\">"+
                    "                                <div class=\"weui_media_box weui_media_text\">"+
                    "                                    <p class=\"weui_media_desc\"><a href=\"idea.html\">" + obj.idea +
                    "                                       </a></p><ul class=\"weui_media_info\">"+
                    "                                        <li class=\"weui_media_info_meta\">" + obj.name +
                    "                                        </li><li class=\"weui_media_info_meta\">"+ obj.time +"</li>"+
                    "                                        <li class=\"weui_media_info_meta weui_media_info_meta_extra\"><a href=\"idea.html\">详细信息</a></li>"+
                    "                                    </ul>"+
                    "                                </div>"+
                    "                            </div>"+
                    "                            <div class=\"panelRight\">"+
                    "                                <a href=\"javascript:;\" class=\"imgContainer\" onclick=\"good("+i+")\">"+
                    "                                    <img class=\"imgIcon img1\" src=\"../img/"+ imgGood +".png\" alt=\"\">"+
                    "                                </a>"+
                    "                                <a href=\"javascript:;\" class=\"imgContainer\" onclick=\"bad("+i+")\">"+
                    "                                    <img class=\"imgIcon img2\" src=\"../img/"+ imgBad +".png\" alt=\"\">"+
                    "                                </a>"+
                    "                            </div>"+
                    "                        </div>"+
                    "                    </div>"+
                    "                </div>";
                $("#panels").append(panel);
            });
        },
        error:function (xhr, type) {
            alert('Ajax Error!');

        }
    });
});




$("#r1").click();
   function test() {
       $.alert(JSON.stringify(ideasJson));
   }
   test();

