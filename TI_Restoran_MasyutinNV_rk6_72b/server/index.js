const express = require('express');
const app = express();
const { readData, writeData } = require('./utils');

const port = 3001;
const hostname = 'localhost';

let rests = [];

// Middleware для разрешения CORS-запросов
app.use((request, response, next) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// Middleware для разрешения CORS-запросов
app.use((request, response, next) => {
	console.log(
		(new Date()).toISOString(),
		request.method,
		request.originalUrl
	);
	next();
});

// Middleware для правильного представления request.body
app.use(express.json());

//-------- Routes - пути, по которым идут запросы ----------

app.options('/*', (request, response) => {
	response.statusCode = 200;
	response.send('OK');
});

app.get('/rests', async (request, response) => {
	rests = await readData();
	response.setHeader('Content-Type', 'application/json');
	response.json(rests);
});

app.post('/rests', async (request, response) => {
	rests.push(request.body);
	await writeData(rests);

	response.setHeader('Content-Type', 'application/json');
	response.status(200).json({
		info: `Rest '${request.body.restName}' was successfully added`
	});
});

app.post('/rests/:restId/rekvestes', async (request, response) => {
	const { rekvestName } = request.body;
	const restId = Number(request.params.restId);

	rests[restId].rekvestes.push(rekvestName);
	await writeData(rests);

	response.setHeader('Content-Type', 'application/json');
	response.status(200).json({
		info: `Rekvest '${rekvestName}' was successfully added in rest '${rests[restId].restName}'`
	});
});

app.patch('/rests/:restId/rekvestes/:rekvestId', async (request, response) => {
	const { newRekvestName } = request.body;
	const restId = Number(request.params.restId);
	const rekvestId = Number(request.params.rekvestId);

	rests[restId].rekvestes[rekvestId] = newRekvestName;
	await writeData(rests);

	response.setHeader('Content-Type', 'application/json');
	response.status(200).json({
		info: `Rekvest '${rekvestId}' in '${rests[restId].restName}' was successfully renamed`
	});
});

app.delete('/rests/:restId/rekvestes/:rekvestId', async (request, response) => {
	const restId = Number(request.params.restId);
	const rekvestId = Number(request.params.rekvestId);

	const removedRekvest = rests[restId].rekvestes[rekvestId];
	rests[restId].rekvestes = rests[restId].rekvestes.filter(
		(rekvest, index) => index !== rekvestId
	);
	await writeData(rests);

	response.setHeader('Content-Type', 'application/json');
	response.status(200).json({
		info: `Rekvest '${removedRekvest}' was successfully removed`
	});
});

app.patch('/rests/:restId', async (request, response) => {
	const { rekvestId, destRestId } = request.body;
	const restId = Number(request.params.restId);

	if (destRestId < 0 || destRestId >= rests.lenght) {
		response.setHeader('Content-Type', 'application/json');
		response.status(400).json({
			error: `Wrong destination rest ID: ${destRestId}`
		});
	}

	const movedRekvest = rests[restId].rekvestes[rekvestId];
	rests[restId].rekvestes = rests[restId].rekvestes.filter(
		(rekvest, index) => index !== rekvestId
	);
	rests[destRestId].rekvestes.push(movedRekvest);
	await writeData(rests);

	response.setHeader('Content-Type', 'application/json');
	response.status(200).json({
		info: `Rekvest '${movedRekvest}' was successfully moved`
	});
});

app.listen(port, hostname, (err) => {
	if (err) {
		console.log('Error: ', err);
	}

	console.log(`Server is working on '${hostname}:${port}'`);
});