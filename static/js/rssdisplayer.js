// Documentation is at: https://developers.google.com/feed/v1/reference
google.load("feeds", "1");

log = function(msg) {
    if (window.console)
        console.log(msg);
};

function rssdisplayer(divid, url, feedlimit) {
    var feedpointer=new google.feeds.Feed(url);
    feedpointer.setNumEntries(feedlimit);
    document.write('<div id="'+divid+'">Loading feed...</div>');
    this.feedcontainer=document.getElementById(divid);
    var displayer=this;
    feedpointer.load(function(r) {
        displayer.formatoutput(r);
    });
}

rssdisplayer.prototype.formatoutput=function(result){
    var rssoutput;
    if (!result.error) {
        var thefeeds=result.feed.entries;
        rssoutput="";
        for (var i=0; i < thefeeds.length; i++) {
            rssoutput += "<div class='post'>";
            rssoutput += "<h3 class='title'>" + thefeeds[i].title + "</h3>";
            var itemdate=new Date(thefeeds[i].publishedDate);
            rssoutput += "<span class='postdate'>" + itemdate.toLocaleString()
                + "</span><p>";
            rssoutput += thefeeds[i].content;
            rssoutput += "</p>";
            rssoutput += "</div>";
        }
    } else {
        rssoutput = "Error fetching feeds: " + result.error.message;
    }
    this.feedcontainer.innerHTML=rssoutput;
};
