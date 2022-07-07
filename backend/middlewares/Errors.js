export default (error, req, res, next) => {
  res.json({ code: res.statusCode, message: error.message });
};
