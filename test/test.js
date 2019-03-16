'use strict'; 

const { ServiceError, HttpErrors } = require('../index.js');

const dumpError = err => console.log(ServiceError.dumpError(err), "\n\n\n");


const err1 = new ServiceError('catagory', 'code-101', 'message-ttt', null);
dumpError(err1);

const err2 = new Error('other error');
dumpError(err2);

const err3 = { type: 'not error'}
dumpError(err3);


const err4 = new ServiceError('catagory', 'code', 'based on err1', err1);
dumpError(err4);

const err5 = new ServiceError('catagory', 'code', 'based on err2', err2);
dumpError(err5);

const err6 = new ServiceError('catagory', 'code', 'based on err3', err3);
dumpError(err6);

const err7 = new ServiceError('catagory', 'code', 'based on err4', err4);
dumpError(err7);

const err8 = new ServiceError('catagory', 'code', 'based on err5', err5);
dumpError(err8);

const err9 = new ServiceError('catagory', 'code', 'based on err6', err6);
dumpError(err9);


const httpError1 = new HttpErrors.BadRequestError('40010', 'test message', err1);
console.log(`recoverable: ${httpError1.recoverable}`);
console.log('httpCode', httpError1.httpCode);
dumpError(httpError1);

const httpError2 = new HttpErrors.TooManyRequestsError('40011', 'test message', 30, err1);
console.log(`recoverable: ${httpError2.recoverable}`);
console.log('headers', httpError2.headers);
console.log('httpCode', httpError2.httpCode);
dumpError(httpError2);


const httpError3 = new HttpErrors.InternalError('40012', 'test message', err1);
console.log(`recoverable: ${httpError3.recoverable}`);
console.log('httpCode', httpError3.httpCode);
dumpError(httpError3);
