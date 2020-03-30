const fs = require('fs')
const http = require('http');
const hostname = '127.0.0.1';
const port = 8080;
var qs = require('querystring');

http.createServer(function (request, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<form action="/message" method="POST">');
  res.write('<label for="message">');
  res.write('<input type="text" name="message" require>');
  res.write('<button type="submit" id="submit">Submit</button>');
  res.write('</form>');


    if (request.method == 'POST') {
        var body = '';

        request.on('data', function (data) {
            body += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });
        request.on('end', function () {
            var post = qs.parse(body);
			const writeMe= fs.writeFileSync('message.txt', post.message)
        });
    }

}).listen(port);

