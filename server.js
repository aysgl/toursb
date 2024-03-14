const express = require("express");
const {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require("./controllers/tourController");
const { middleware, controlMiddleware } = require("./middleware/middleware");

const app = express();
const port = 8080;

app.use(express.json());

app.use(middleware);
app.route("/api/tours").get(getTours).post(createTour);

app
  .route("/api/tours/:id")
  .get(controlMiddleware, getTour)
  .patch(controlMiddleware, updateTour)
  .delete(controlMiddleware, deleteTour);

app.listen(port, "127.0.0.1", () => {
  console.log(`Server running on port ${port}`);
});
