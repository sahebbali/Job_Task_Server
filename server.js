const express = require('express');
const connectDB = require('./db');
const bodyParser = require ('body-parser')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes/index');
require('dotenv').config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.get('/', (_req, res) => {
	const obj = {
		msg: 'Wellcome to our Application'		
	};
	res.json(obj);
});

app.use((err, _req, res, _next) => {
	console.log(err);
	const message = err.message ? err.message : 'Server Error Occurred';
	const status = err.status ? err.status : 500;

	res.status(status).json({
		message,
	});
});

const port= process.env.DB_PORT || 8080;
connectDB(process.env.DB_HOST)
	.then(() => {
		console.log('Database Connected');
		app.listen(8000, () => {
			console.log(`I'm listening on port: ${port}`);
		});
	})
	.catch((e) => console.log(e));
