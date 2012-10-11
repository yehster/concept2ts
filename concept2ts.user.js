// ==UserScript==
// @name          Concept 2 Log Timestamp
// @namespace     http://yehster.no-ip.org/
// @description   
// @include       http://log.concept2.com/log.asp*
// @exclude       
// @exclude       
// @require http://code.jquery.com/jquery-1.8.2.min.js
// ==/UserScript==
function set_time_event(evt)
{
    var comments_box=$("#rr_comments");
    var current_time=new Date();
    var minutes=current_time.getMinutes();
    if(minutes<10) { minutes= "0"+minutes}
    var comment=current_time.getHours()+":"+minutes;
    comments_box.text(comment);
    
}

function bind_events()
{
    $("#rr_time_tenths").on({click: set_time_event});
}

function highlight_today()
{
    var log_table=$("#logtable");
    var current_time=new Date();
    var day_string=(current_time.getMonth()+1)+"/"+current_time.getUTCDate()+"/"+current_time.getFullYear();
    var today_td=log_table.find("td:contains('"+day_string+"')");
    var today_tr=today_td.parent("tr");
    var total=0;
    today_tr.each(function(idx,elem)
    {
        var current_row=$(this);
        var distance=current_row.find("td:first");
        var data=distance.text();
        var number=data.replace("m","").replace(",","");
        total=total+parseInt(number);
        current_row.addClass("today");
    });
    var header=log_table.find("thead>tr:first>td>div:first").text(total+"m");
    header.addClass("total_header");
//    window.alert(total);
}
function add_css()
{
    var style=$("<style>.today {background-color: lightblue;} .total_header{font-size: 3em; background-color:darkgreen;}</style>");
    $("head").append(style);
    
}
function getWeeklyResults()
{
    $.post("http://log.concept2.com/results_rsummary.asp?season=2013",{},
        function(data)
        {
            var summary=$(data);
            var summary_table=summary.find("#content div div table");
            var Max=0;
            var summary_distance;
            summary_table.find("tr").each(function(idx,elem){
                var num=parseInt($(elem).find("td:first").text()); 
                if(!isNaN(num))
                {
                    if(num>Max)
                    {
                        Max=num;
                        summary_distance=$(elem).find("td:nth-child(2)").text();
                    }
                }
            });
            var log_table=$("#logtable");
            var header=log_table.find("thead>tr:first>td>div:first");
            header.text(header.text()+"/"+summary_distance);
        }
    );
}
bind_events();
set_time_event();
$("#info").hide();
var C2Info=$("<button>C2 Info</button>");
C2Info.on({click: function(){$("#info").toggle();}});
$("#logtable").after(C2Info);
$("#rr_comments").attr("rows","1");
$("#navbar").hide();
highlight_today();
getWeeklyResults();
add_css();