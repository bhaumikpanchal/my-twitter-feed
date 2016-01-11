window.TweetView = Backbone.View.extend({
    tagName: "tweet",
    className: "tweet-container",
    template: _.template($("#tweetTemplate").html()),

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});
