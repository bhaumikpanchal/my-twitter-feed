<?php
namespace twitterFeedApi\tests\library;

class TwitterAPIExchangeTest extends \PHPUnit_Framework_TestCase
{
    private $api;

    public function setUp()
    {
        $settings = [
            'oauth_access_token'        => "123",
            'oauth_access_token_secret' => "456",
            'consumer_key'              => "789",
            'consumer_secret'           => "111"
        ];

        $this->api = new \twitterFeedApi\library\TwitterAPIExchange($settings);
    }

    /**
     * @test
     */
    public function testInstanceOf()
    {
        $this->assertInstanceOf('\twitterFeedApi\library\TwitterAPIExchange', $this->api);
    }

}