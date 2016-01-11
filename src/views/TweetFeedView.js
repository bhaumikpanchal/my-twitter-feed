window.TweetFeedView = Backbone.View.extend({
    el: $("#tweets"),

    initialize: function () {
        this.collection = new TweetFeed(tweets);

        this.render();
        //this.$el.find("#filter").append(this.createSelect());
        //
        //this.on("change:filterType", this.filterByType, this);
        //this.collection.on("reset", this.render, this);
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

var feed = new TweetFeedView();
