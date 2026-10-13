import { createEmployee, deleteEmployee, getEmployee, getEmployees, updateEmployee } from "#db/queries/employees";
import express from "express";
const router = express.Router();
export default router;

router.route('/')
  .get(async (req, res, next) => {
    try {
      const employees = await getEmployees()
      res.send(employees)
    } catch (e) {
      next(e)
    }
  })
  .post(async (req, res, next) => {
    try {
      if (!req.body) return res.status(400).send("Request must have a body.")
      if (!req.body.name) return res.status(400).send("You must supply a name.")
      if (!req.body.birthday) return res.status(400).send("You must supply a birthday.")
      if (!req.body.salary) return res.status(400).send("You must supply a salary.")
      const employees = await createEmployee(req.body)
      res.status(201).send(employees)
    } catch (e) {
      next(e)
    }
  })

router.param("id", async (req, res, next, id) => {
  const employees = await getEmployee(id)
  if (!employees) return res.status(404).send("No employees with this ID.")
  req.employees = employees
  next()
})

router.route('/:id')
  .get(async (req, res, next) => {
    try {
      res.send(req.employees)
    } catch (e) {
      next(e)
    }
  })
  .put(async (req, res, next) => {
    try {
      if (!req.body) return res.status(400).send("Request must have a body.")
      if (!req.body.name) return res.status(400).send("You must supply a name.")
      if (!req.body.birthday) return res.status(400).send("You must supply a birthday.")
      if (!req.body.salary) return res.status(400).send("You must supply a salary.")
      const employees = await updateEmployee({ ...req.body, id: req.employees.id})
      res.send(employees)
    } catch (e) {
      next(e)
    }
  })
  .delete(async (req, res, next) => {
    try {
      await deleteEmployee(req.employees.id)
      res.sendStatus(204)
    } catch (e) {
      next(e)
    }
  })