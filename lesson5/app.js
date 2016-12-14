var async = require('async')

var concurrencyCount = 0;
var fetchUrl = function (url, callback) {
	var delay = parseInt((Math.random() * 1000000) % 2000, 10)
	concurrencyCount ++
	console.log('now concurrency count is ', concurrencyCount, url, ', is being crawled', ',time' + delay + 'ms')
	setTimeout(function () {
		concurrencyCount --
		callback(null, url + ' html content')
	}, delay)
}

var urls = []
for (var i = 0; i < 30; i++) {
	urls.push('http://datasourece_' + i)
}

async.mapLimit(urls, 5, function (url, callback) {
	fetchUrl(url, callback)
}, function (err, result) {
	console.log('final:')
	console.log(result)
})