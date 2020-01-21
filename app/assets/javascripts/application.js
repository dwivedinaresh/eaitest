// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require rails-ujs
//= require activestorage
//= require twitter/bootstrap
//= require_tree .

var TweetForm = function($form) {
  var tweet_form = this;
  this.$form = $form;
  this.as_json = function() {
    return {
      tweet: {
        tweet_message: this.$form.find("#tweet_tweet_message").val()
      }
    }
  }
  this.save = function() {
    $.ajax({
      url: this.$form.attr("action"),
      data: this.as_json(),
      type: 'post',
      success: function(response) {
        if(response.status == "success") {
          prepend_tweet(response.tweet);
          setTimeout(function() {
            tweet_form.$form.find("input[type='submit']").prop("disabled", false);
            tweet_form.$form[0].reset();
          }, 1000);
        }
      }
    })
  }
}

$(document).on("submit", ".new_tweet", function(e) {
  e.preventDefault();
  var tweet_form = new TweetForm($(this));
  tweet_form.save();
});

$(document).on("ready", function() {
  if($('.tweets-list').length != 0) {
    $.ajax({
      url: tweets_api_url,
      type: 'get',
      success: function(response) {
        $.each(response.tweets, function() {
          var tweet = this;
          prepend_tweet(tweet);
        });
      }
    })
  }
  
  if($(".followers-list").length != 0) {
    fetch_followers();
  }

  if($(".followings-list").length != 0) {
    fetch_followings();
  }

  if($(".tweeters-list").length != 0) {
    fetch_tweeters();
  }
});

function prepend_tweet(tweet) {
  $(".tweets-list").prepend(`<div class='tweet-item'>${tweet.tweet_message}</div>`);
}

function fetch_followers() {
  $(".followers-list").html("");
  $.ajax({
    url: followers_api_url,
    type: 'get',
    success: function(response) {
      $.each(response.followers, function() {
        var follower = this;
        fill_followers(follower);
      });
    }
  })
}

function fetch_tweeters() {
  $(".tweeters-list").html("");
  $.ajax({
    url: tweeters_api_url,
    type: 'get',
    success: function(response) {
      $.each(response.tweeters, function() {
        var tweeter = this;
        fill_tweeters(tweeter);
      });
    }
  })
}

function fetch_followings() {
  $(".followings-list").html("");
  $.ajax({
    url: followings_api_url,
    type: 'get',
    success: function(response) {
      $.each(response.followings, function() {
        var following = this;
        fill_followings(following);
      });
    }
  })
}

function fill_followers(follower) {
  var htm = "<div class='row parent-container'>";
  htm += "<div class='col-sm-12'>";
  htm += "<div class=''>" + follower.email + "</div>";
  htm += "<div class='btn btn-primary follow' data-id='" + follower.id + "'>Follow</div>";
  htm += "</div>"
  htm += "</div>"
  htm += "</div>"
  $(".followers-list").append(htm);
}

function fill_followings(following) {
  var htm = "<div class='row parent-container'>";
  htm += "<div class='col-sm-12'>";
  htm += "<div class=''>" + following.email + "</div>";
  htm += "<div class='btn btn-primary unfollow' data-id='" + following.id + "'>Unfollow</div>";
  htm += "</div>"
  htm += "</div>"
  htm += "</div>"
  $(".followings-list").append(htm);
}

function fill_tweeters (tweeter) {
  var htm = "<div class='row parent-container'>";
  htm += "<div class='col-sm-12'>";
  htm += "<div class=''>" + tweeter.email + "</div>";
  htm += "<div class='btn btn-primary follow' data-id='" + tweeter.id + "'>Follow</div>";
  htm += "</div>"
  htm += "</div>"
  htm += "</div>"
  $(".tweeters-list").append(htm);
}

$(document).on("click", ".follow", function() {

  var $follow_link = $(this);
  $.ajax({
    url: follow_api_url.replace("__user_id__", $(this).data("id")),
    type: 'post',
    success: function(response) {
      fetch_tweeters();
      fetch_followings();
    }
  })
});

$(document).on("click", ".unfollow", function() {
  var $unfollow_link = $(this);
  $.ajax({
    url: unfollow_api_url.replace("__user_id__", $(this).data("id")),
    type: 'post',
    data: {_method: 'delete'},
    success: function(response) {
      $unfollow_link.closest(".parent-container").remove();
      fetch_tweeters();
      fetch_followings();
    }
  })
});

function show_alert(status, message) {
  if($('body').find(".alert").length == 0) {
    $('body').prepend("<div class='alert'></div>");
  }
  $('body').find(".alert").removeClass("alert-success").removeClass("alert-danger").addClass(`alert-${status}`);
  $('body').find(".alert").html(message);
}