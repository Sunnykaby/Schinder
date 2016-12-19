/**
 * Created by shidian on 2016/12/13.
 */
var ideasJson;

var total;
var curPage=0;
var pages;
var ideasNum = 0;
var eachPage = 7;
var loaded = false;
var nav1LoadEnd = false;
var itemIndex = 0;
//like this idea
function good(index) {
    if(check(index))
    {
        $.toast("Good");
        //ajax
        //
        ideasJson[index].like = 1;
        $("#1r #idea"+index +" .img1").attr("src","../img/good.png");
        setTimeout(function () {
            $.toast("successful");
        },5000);
        // $("#idea"+index).remove();
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
        $("#1r #idea"+index +" .img2").attr("src","../img/bad.png");
        setTimeout(function () {
            $.toast("successful");
        },5000);
        // $("#idea"+index).remove();
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

//R onclick function
$(".weui_navbar_item").bind("click",function (event) {
    var $this  = $(this);
    itemIndex = $this.index();
    $(".panels").eq(itemIndex).show().siblings('.panels').hide();
    $this.addClass("weui_bar_item_on").siblings(".weui_navbar_item").removeClass("weui_bar_item_on");
    curPage = 0;
    ideasNum = 0;
    //默认点击加载
    $(".panels").eq(itemIndex).html("");
    dropload.unlock();
    dropload.noData(false);
    // 重置
    dropload.resetload();
});

var dropload = $('.content-padded').dropload({
    // scrollArea:window,
    autoLoad:true,
    distance:50,
    // threshold:50,
    domUp:{
        domClass : 'dropload-up',
        domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
        domUpdate : '<div class="dropload-update">↑释放更新</div>',
        domLoad : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
    },
    domDown:{
        domClass : 'dropload-down',
        domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
        domLoad : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
        domNoData : '<div class="dropload-noData">暂无数据</div>'
    },
    loadUpFn:function (me) {
        //first loading
        $.ajax({
            type:'GET',
            url:'../json/page1.json',
            dataType:'json',
            success:function (data) {
                total = data.total;
                pages = data.totalPage;
                curPage = data.currentPage;
                ideasJson = data.data;
                ideasNum = 0;
                setTimeout(function () {

                },3000);
                refreshIdeas(data.data,0);
                me.resetload();
                me.unlock();
                me.noData(false);
            },
            error:function (xhr, type) {
                alert('Ajax Error!');
                me.resetload();
            }
        });
    },
    loadDownFn:function (me) {
        if(curPage==0){
            //if first time
            $.ajax({
                type:'GET',
                url:'../json/page1.json',
                dataType:'json',
                success:function (data) {
                    total = data.total;
                    pages = data.totalPage;
                    curPage = data.currentPage;
                    ideasJson = data.data;
                    ideasNum = 0;
                    setTimeout(function () {

                    },3000);
                    refreshIdeas(data.data,0);
                    me.unlock();
                    me.noData(false);
                    me.resetload();
                },
                error:function (xhr, type) {
                    alert('Ajax Error!');
                    me.resetload();
                }
            });
        }
        //more
        else{
            curPage++;
            if(curPage>pages){
                nav1LoadEnd = true;
                me.lock();
                me.noData();
                me.resetload();
                return;
            }
            $.ajax({
                type:'GET',
                url:'../json/page'+curPage+'.json',
                dataType:'json',
                success:function (data) {
                    // ideasJson = data.data;
                    ideasJson = ideasJson.concat(data.data);
                    // alert(JSON.stringify(ideasJson));
                    setTimeout(function () {

                    },3000);
                    if(refreshIdeas(data.data,1)){
                        loaded = true;
                    }
                    else{
                        me.lock();
                        me.noData();
                    }
                    me.resetload();
                },
                error:function (xhr, type) {
                    alert('Ajax Error!');
                    me.resetload();
                }

            });
        }
    }
});


function refreshIdeas(datas, flag){
    if(datas.length <= 0) return false;
    if(flag == 0){
        //reload
        // $("#nav"+itemIndex+" .panels").empty();
    }
    else{
        //more
    }
    var panel = "";
    $.each(datas,function (i,obj) {
        var panelRight="";
        var imgGood;
        var imgBad;
        if(itemIndex == '0'){
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
            panelRight += "                                <a href=\"javascript:;\" class=\"imgContainer\" onclick=\"good("+(ideasNum)+")\">"+
                "                                    <img class=\"imgIcon img1\" src=\"../img/"+ imgGood +".png\" alt=\"\">"+
                "                                </a>"+
                "                                <a href=\"javascript:;\" class=\"imgContainer\" onclick=\"bad("+ideasNum+")\">"+
                "                                    <img class=\"imgIcon img2\" src=\"../img/"+ imgBad +".png\" alt=\"\">"+
                "                                </a>";
        }
        else if(itemIndex=='1'){
            var dis = "",passed="PASS";
            if(obj.passed == 1) {
                dis = "weui_btn_disabled";
                passed = "PASSED";
            }

            panelRight += "<a href=\"javascript:;\" class=\"weui_btn weui_btn_mini " + dis +
                " weui_btn_default pass\" onclick=\"pass("+ideasNum+")\">" + passed +
                "</a>";
        }
        panel +=" <div class=\"weui_panel\" id=\"idea" + ideasNum + "\" data-id='" + ideasNum +
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
            "                            <div class=\"panelRight\">"+ panelRight
            +
            "                            </div>"+
            "                        </div>"+
            "                    </div>"+
            "                </div>";
        ideasNum++;
    });
    if(flag==0) $(".panels").eq(itemIndex).html(panel);
    else $(".panels").eq(itemIndex).append(panel);
    return true;
}

function pass(index) {

    // alert($("."));
    //ajax
    if(ideasJson[index].passed==0)
        ideasJson[index].passed = 1;
    else return;
    $(".pass").eq(index).addClass("weui_btn_disabled").text("PASSED");
    setTimeout(function () {
        $.toast("successful");
    },5000);
    // $("#2r #idea"+index).remove();
}


