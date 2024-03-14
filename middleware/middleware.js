const fs = require("fs");

exports.middleware = (req, res, next) => {
  console.log(`Request received at ${new Date()}`);
  next();
};

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/tours-simple.json`)
);

exports.controlMiddleware = (req, res, next) => {
  const found = tours.find((t) => t.id === req.params.id);
  if (!found) return next(res.status(404).json({ status: "not found" }));
  req.tour = found;
  next();
};
