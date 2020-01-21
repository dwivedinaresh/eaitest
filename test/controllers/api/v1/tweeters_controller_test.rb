require 'test_helper'

class Api::V1::TweetersControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_tweeters_index_url
    assert_response :success
  end

end
