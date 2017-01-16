const fs = require('fs');
const server = require('diet');
const app = server();

app.listen('http://localhost:1337');

const html = fs.readFileSync('index.html', 'UTF8');

var users = [];

app.get('/', function ($) {
	$.header('content-type', 'text/html');
  $.end(html);
});

app.get('/main.css', function ($) {
	$.header('content-type', 'text/css');
	const css = fs.readFileSync('main.css', 'UTF8');
  $.end(css);
});

app.post('/data', function ($) {
	var user = JSON.parse($.body);

	users.push(user);
	console.log("User #" + users.length + ": ");
	console.log("Имя: " + user.name);
	console.log("Телефон: " + user.phone);
	console.log("E-mail: " + user.mail);
	if (user.comment != "") console.log("Комментарий: " + user.comment);
});