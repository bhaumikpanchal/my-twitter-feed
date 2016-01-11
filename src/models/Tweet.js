window.Tweet = Backbone.Model.extend({
    defaults: {
        "name" : "",
        "screen_name": "",
        "profile_image_url" : null,
        'text' : "",
        "retweet_count" : null
    }
});
