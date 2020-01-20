import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import handleError from './handlers/handleError';
import handleAuth from './handlers/handleAuth';
import cors from 'cors';
// define 1 express to control application
const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// define logger to write log in enviroment dev
app.use(logger('dev'));
// define cors
app.use(cors());
// parse json
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

// define folder public to express can access resource: css, image, ... 
app.use(express.static('public'));

// define header of response
app.use((req, res, next) => {
  // will allow from all cross domain
  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // will allow from methods: GET, POST. PUT, DELETE, OPTIONS
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use('/', handleAuth.authorization, indexRouter, handleError.processError);

export default app;