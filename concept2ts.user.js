// ==UserScript==
// @name          Concept 2 Log Timestamp
// @namespace     http://yehster.no-ip.org/
// @description   
// @include       http://log.concept2.com/log.asp
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

bind_events();
set_time_event();
