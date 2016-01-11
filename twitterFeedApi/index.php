<?php

require 'vendor/autoload.php';

$app = new \Slim\Slim([
	'debug' => false,
]);
$apiKeys = fetchAPIKeys();

$twitterAPI = new mytwitterfeed\library\TwitterAPIExchange($apiKeys);

$app->get('/twitter-feed/:screen_name/:count', function($screen_name, $count) use ($twitterAPI) {
	$url = "https://api.twitter.com/1.1/statuses/user_timeline.json";
	$requestMethod = "GET";
	$getField = "?screen_name={$screen_name}&count={$count}";

	$resultData = $twitterAPI->setGetfields($getField)
							->buildOauth($url, $requestMethod)
							->performRequest();

	echo $resultData;
});

$app->error(function (\Exception $e) use ($app) {
	echo $e->getCode();
	echo $e->getMessage();
});

$app->run();