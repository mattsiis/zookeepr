const router = require("express").Router();
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require ("../../lib/zookeepers");
const { zookeepers } = require("../../data/zookeepers.json");

router.get('/zookeepers', (req, res) => {
    let results = zookeepers;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get("/zookeepers/:id", (req, res) => {
    console.log("a")
    const result = findById(req.params.id, zookeepers);
    if(result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post("/zookeepers", (req, res) => {
    console.log(req.body.id);
    req.body.id = zookeepers.length.toString();
    console.log(req.body.id);

    if(!validateZookeeper(req.body)) {
        res.status(400).send("The zookeeper is not properly formated.");
    } else {
        const zookeeper = createNewZookeeper(req.body, zookeepers);
        res.json(zookeeper);
    }
});

module.exports = router;