export class RequestError {
  constructor(statusCode, errorMessage) {
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
  }
}
const respondWithSuccess = (res, data) => {
  res.status(200).send(data);
};


const asyncMiddleware = (fn) => (req, res) => Promise.resolve(fn(req, res))
  .then((data) => respondWithSuccess(res, data))
  .catch((error) => {
    if (error instanceof RequestError) {
      res.status(error.statusCode).send(error.errorMessage);
    } else {
      throw error;
    }
  });

export default asyncMiddleware;
