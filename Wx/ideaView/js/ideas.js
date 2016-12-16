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
var nav2LoadEnd = false;
var nav3LoadEnd = false;
var nav4LoadEnd = false;
var itemIndex = 0;
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

//R onclick function
$(".weui_navbar_item").bind("click",function (event) {
    var $this  = $(this);
    itemIndex = $this.index();
    curPage = 0;
    // r1
    if(itemIndex == '0'){
        // 如果数据没有加载完
        if(!nav1LoadEnd){
            // 解锁
            dropload.unlock();
            dropload.noData(false);
        }else{
            // 锁定
            dropload.lock('down');
            dropload.noData();
        }
        // r2
    }else if(itemIndex == '1'){
        if(!nav2LoadEnd){
            // 解锁
            dropload.unlock();
            dropload.noData(false);
        }else{
            // 锁定
            dropload.lock('down');
            dropload.noData();
        }
    }
    //r3
    else if(itemIndex == '2'){
        if(!nav3LoadEnd){
            // 解锁
            dropload.unlock();
            dropload.noData(false);
        }else{
            // 锁定
            dropload.lock('down');
            dropload.noData();
        }
    }
    //r4
    else if(itemIndex == '3'){
        if(!nav4LoadEnd){
            // 解锁
            dropload.unlock();
            dropload.noData(false);
        }else{
            // 锁定
            dropload.lock('down');
            dropload.noData();
        }
    }
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
                    ideasJson = data.data;
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
            panelRight += "                                <a href=\"javascript:;\" class=\"imgContainer\" onclick=\"good("+i+")\">"+
                "                                    <img class=\"imgIcon img1\" src=\"../img/"+ imgGood +".png\" alt=\"\">"+
                "                                </a>"+
                "                                <a href=\"javascript:;\" class=\"imgContainer\" onclick=\"bad("+i+")\">"+
                "                                    <img class=\"imgIcon img2\" src=\"../img/"+ imgBad +".png\" alt=\"\">"+
                "                                </a>";
        }
        else if(itemIndex=='1'){
            panelRight += "<a href=\"javascript:;\" class=\"weui_btn weui_btn_mini weui_btn_default\" onclick='pass('+i+')'>PASS</a>";
        }
        panel +=" <div class=\"weui_panel\" id=\"idea" + i + "\" data-id='" + i +
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
    if(flag==0) $("#nav"+itemIndex+" .panels").html(panel);
    else $("#nav"+itemIndex+" .panels").append(panel);
    return true;
}



// $("#r1").click();
// function test() {
//     $.alert(JSON.stringify(ideasJson));
// }
// test();

