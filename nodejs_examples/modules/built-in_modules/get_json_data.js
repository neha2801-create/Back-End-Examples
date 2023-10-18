import { request } from "https";

const options = {
	"method": "GET",
	"hostname": "weatherbit-v1-mashape.p.rapidapi.com",
	"port": null,
	"path": "/current?lon=-85.14&lat=41.07&units=imperial",
	"headers": {
		"X-RapidAPI-Key": "cdae9db55dmsh258b9fd9710aea9p1597f1jsn02d0f6ee3cf0",
		"X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
		"useQueryString": true
	}
};

const req = request(options, function (res) {
	const chunks = [];

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();