import express from "express";
import employeeRouter from "#api/employees"
const app = express();
export default app;

// TODO: this file!
app.use(express.json())
app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
})
app.use('/employees', employeeRouter)
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send("Sorry! Something went wrong :(")
})