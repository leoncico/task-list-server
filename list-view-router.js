const { Router } = require("express");
const router = Router();

router.get("/", function (req, res) {
  res.send("Lista de las tareas");
});

router.get("/:id", function (req, res) {
    res.send("Tarea " + req.params.id);
});

router.get("/", function (req, res) {
    const state = req.query.isCompleted;
    if (state) {
        res.send("Lista de las tareas completadas");
    } else {
        res.send("Lista de las tareas no completadas");
    }
});

module.exports = router;