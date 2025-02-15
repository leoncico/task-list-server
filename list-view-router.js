const { Router } = require("express");
const router = Router();

function validateParams(req, res, next) {
    const id = req.params.id;
    if (typeof id !== "string" || isNaN(Number(id))) {
        return res.status(400).json({ error: "El parámetro 'id' debe ser un número válido." });
    }
    next();
}

router.get("/:id", validateParams, (req, res) => {
    res.send("Tarea " + req.params.id);
});

router.get("/", (req, res) => {
    res.send("Lista de las tareas");
});

router.get("/", (req, res) => {
    const state = req.query.isCompleted;
    if (state) {
        res.send("Lista de las tareas completadas");
    } else {
        res.send("Lista de las tareas no completadas");
    }
});

module.exports = router;