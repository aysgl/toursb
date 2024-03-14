const fs = require("fs");
const crypto = require("crypto");

let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/tours-simple.json`)
);
exports.getTours = (req, res) => {
  res
    .status(200)
    .json({ status: "success", results: tours.length, tours: tours });
};

exports.getTour = (req, res) => {
  res.status(200).json({ status: "found id", tour: req.tour });
};
exports.createTour = (req, res) => {
  const newTour = { ...req.body, id: crypto.randomBytes(16).toString("hex") };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../data/tours-simple.json`,
    JSON.stringify(tours),
    () => res.status(201).json({ status: "success", tours: newTour })
  );
};

exports.updateTour = (req, res) => {
  const updateData = req.body;
  const updatedTour = { ...req.tour, ...updateData };

  const index = tours.findIndex((tour) => tour.id === req.params.id);

  tours[index] = updatedTour;

  fs.writeFile(
    `${__dirname}/../data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(200).json({ status: "success", tour: updatedTour });
    }
  );
};

exports.deleteTour = (req, res) => {
  const newTours = tours.filter((t) => t.id !== req.params.id);

  fs.writeFile(
    `${__dirname}/../data/tours-simple.json`,
    JSON.stringify(newTours),
    () => res.status(204).send()
  );
};
