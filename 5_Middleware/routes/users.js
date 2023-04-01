const router = require("express").Router();

router.post("/login", (_req, res) => {
	res.status(201).json({ id: 1, firstName: "Semen", lastName: "Semenov" });
});

module.exports = router;