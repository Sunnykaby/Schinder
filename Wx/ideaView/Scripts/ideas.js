/**
 * Created by shidian on 2016/12/13.
 */
var ideasJson;

var total;
var curPage=0;
var pages;
var ideasNum = 0;
// var eachPage = 7;
var loaded = false;
var nav1LoadEnd = false;
var itemIndex = 0;
//like this idea
function like(index) {
    //ajax
    $.ajax({
        type:'GET',
        url:'Contents/idea.json',
        dataType:'json',
        success:function (data) {
            // ideasJson[index].like = !ideasJson[index].like;
            // ideasJson[index].status = data.status;
            // ideasJson[index].likes = data.likes;
            ideasJson[index].like = !ideasJson[index].like;
            ideasJson[index].status = 2;
            ideasJson[index].likes = "a,b,c,d,e,f";
            freshIdea(index,ideasJson[index].status,ideasJson[index].likes,ideasJson[index].like)
        },
        error:function (xhr, type) {
            alert('Ajax Error!');
        }
    });

    //
    // setTimeout(function () {
    //     $.toast("successful");
    // },5000);
    // $("#idea"+index).remove();

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
    // reload
    dropload.resetload();
});

var dropload = $('.content-padded').dropload({
    // scrollArea:window,
    autoLoad:true,
    distance:50,
    // threshold:50,
    domUp:{
        domClass : 'dropload-up',
        domRefresh : '<div class="dropload-refresh">↓Refresh</div>',
        domUpdate : '<div class="dropload-update">↑Refresh</div>',
        domLoad : '<div class="dropload-load"><span class="loading"></span>Loading...</div>'
    },
    domDown:{
        domClass : 'dropload-down',
        domRefresh : '<div class="dropload-refresh">↑More</div>',
        domLoad : '<div class="dropload-load"><span class="loading"></span>Loading...</div>',
        domNoData : '<div class="dropload-noData">No More</div>'
    },
    loadUpFn:function (me) {
        //first loading
        $.ajax({
            type:'GET',
            url:'Contents/page0.json',
            dataType:'json',
            success:function (data) {
                total = data.total;
                pages = data.totalPage;
                curPage = data.currentPage;
                ideasJson = data.data;
                ideasNum = 0;
                refreshIdeas(data.data,0);
                me.resetload();
                if(ideasNum>=total){
                    me.lock();
                    me.noData();
                }
                else {
                    me.unlock();
                    me.noData(false);
                }
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
                url:'Contents/page0.json',
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
                    if(ideasNum>=total){
                        me.lock();
                        me.noData();
                    }
                    else {
                        me.unlock();
                        me.noData(false);
                    }
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
                url:'Contents/page'+curPage+'.json',
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
        var panelBottom="";
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
            panelRight += "                                <a href=\"javascript:;\" class=\"imgContainer\" onclick=\"like("+(ideasNum)+")\">"+
                "                                    <img class=\"imgIcon img1\" src=\"Contents/"+ imgGood +".png\" alt=\"\">"+
                "                                </a>"+
                "                                <p id='status' href=\"javascript:;\" class=\"imgContainer\">"+
                "R1"+
                "                                </p>";
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
        else if(itemIndex=='2'){
            var dis = "",passed="PASS";
            if(obj.passed == 1) {
                dis = "weui_btn_disabled";
                passed = "PASSED";
            }

            panelRight += "<a href=\"javascript:;\" class=\"weui_btn weui_btn_mini " + dis +
                " weui_btn_default pass\" onclick=\"pass("+ideasNum+")\">" + passed +
                "</a>";
        }
        panelBottom = "<div class=\"weui_cell\">"+
            "                            <div class=\"weui_cell_hd\"><img class=\"like-img\" src=\"Contents/good.png\"></div>"+
            "                            <div class=\"weui_cell_bd weui_cell_primary\">"+
            "                                <p id=\"likes\">" +obj.likes+
            "</p>"+
            "                            </div>"+
            "                        </div>";
        panel +=" <div class=\"weui_panel\" id=\"idea" + ideasNum + "\" data-id='" + obj.id +
            "'\">"+
            "                    <div class=\"weui_panel_bd\">"+
            "                        <div class=\"weui-row weui-no-gutter\">"+
            "                            <div class=\"panelLeft\">"+
            "                                <div class=\"weui_media_box weui_media_text\">"+
            "                                    <p class=\"weui_media_desc\"><a href=\"idea.html?idea=" + obj.id +
            "\">" + obj.idea +
            "                                       </a></p><ul class=\"weui_media_info\">"+
            "                                        <li class=\"weui_media_info_meta\">" + obj.name +
            "                                        </li><li class=\"weui_media_info_meta\">"+ obj.time +"</li>"+
            "                                    </ul>"+
            "                                </div>"+
            "                            </div>"+
            "                            <div class=\"panelRight\">"+ panelRight
            +
            "                            </div>"+
            "                        </div>"+panelBottom+
            "                    </div>"+
            "                </div>";
        ideasNum++;
    });
    if(flag==0) $(".panels").eq(itemIndex).html(panel);
    else $(".panels").eq(itemIndex).append(panel);
    return true;
}

function pass(index) {
    if(ideasJson[index].passed==1){
        $.toast("Already Passed")
    }
    // alert($("."));
    //ajax
    $.ajax({
        type:'GET',
        url:'Contents/idea.json',
        dataType:'json',
        success:function (data) {
            ideasJson[index].passed = 1;
            $(".pass").eq(index).addClass("weui_btn_disabled").text("PASSED");
        },
        error:function (xhr, type) {
            alert('Ajax Error!');
        }
    });
}

function freshIdea(index, status, likes, like) {
    // var likeHtml = "", likesHtml = "",
    //     status = "";
    if(like) $("#1r #idea"+index +" .img1").attr("src","Contents/good.png");
    else $("#1r #idea"+index +" .img1").attr("src","Contents/goodn.png");

    if(status==2) $("#1r #idea"+index +" #status").text("R2");

    $("#1r #idea"+index +" #likes").text(likes);
}


