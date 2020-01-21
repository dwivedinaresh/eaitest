require 'test_helper'

class Api::V1::TweetsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_tweets_index_url
    assert_response :success
  end

  test "should get new" do
    get api_v1_tweets_new_url
    assert_response :success
  end

  test "should get edit" do
    get api_v1_tweets_edit_url
    assert_response :success
  end

end
