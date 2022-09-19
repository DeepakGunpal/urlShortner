const express = require("express")
const router = express.Router();

const { urlShorten, getUrlCode } = require("../controller/urlController")

router.post("/shorten", urlShorten);

router.get("/:urlCode", getUrlCode);
router.post("/:urlCode", getUrlCode);

router.get('/test', (req, res) => {
    res.status(200).send({ status: true, data: "succeeded" });
})




module.exports = router;