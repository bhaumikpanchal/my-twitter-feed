(function ($) {

    var tweets = buildData();

    $("#searchText").keyup(function() {
        var filter = $(this).val();

        $("tweet").each(function() {
            if ($(this).children("div").text().search(new RegExp(filter, "i")) < 0) {
                $(this).fadeOut();
 
            // Show the list item if the phrase matches
            } else {
                $(this).show();
            }
        });
    });

    function buildData() {
        var rawData = '';
        var tweets = [];

        $.ajax({
            async: false,
            type: "GET",
            url: window.location.href + "twitterfeedapi/twitter-feed/salesforce/10",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                rawData = data;
            },

            error: function () {
                alert("Whoops, there was error returned while retrieving data");
            }
        });

        rawData.forEach( function (item){
            var tweet = {};
            tweet['name'] = item.user.name;
            tweet['screen_name'] = item.user.screen_name;
            tweet['profile_image_url'] = item.user.profile_image_url;
            tweet['text'] = item.text;
            tweet['retweet_count'] = item.retweet_count;

            tweets.push(tweet);
        });
        return tweets;
    }

    //define tweet list view
    var TweetFeedView = Backbone.View.extend({
        el: $("#tweets"),

        initialize: function () {
            this.collection = new TweetFeed(tweets);

            this.render();
        },

        render: function () {
            this.$el.find("tweet").remove();

            _.each(this.collection.models, function (item) {
                this.renderTweet(item);
            }, this);
        },

        renderTweet: function (item) {
            var tweetView = new TweetView({
                model: item
            });
            this.$el.append(tweetView.render().el);
        }
    });

    //create instance of master view
    var feed = new TweetFeedView();

    //set interval of 60 seconds to get updated set of tweets
    setInterval(buildData, 60000);

} (jQuery));