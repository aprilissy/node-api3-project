const logger = (req, res, next) => {
  console.log('logger method',req.method);
  console.log('logger url',req.method);
  console.log('logger url',req.method);  
  next();
}
//, req.url, req.timestamp
module.exports = {
  logger
}