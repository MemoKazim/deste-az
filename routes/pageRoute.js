//=====================|REQUIREMENTS|===========================
const express = require("express");
const router = express.Router();
const controller = require("../controllers/pageController");

//========================|ROUTES|==============================

router.get("/", controller.getHome);
router.get("/news", controller.getNews);
router.get("/new/:id", controller.getNew);
router.get("/events", controller.getEvents);
router.get("/event/:id", controller.getEvent);
router.get("/famouses", controller.getFamousPeople);
router.get("/famous/:id", controller.getFamousPerson);
router.get("/heroes", controller.getHeroes);
router.get("/hero/:id", controller.getHero);
router.get("/galery-photo", controller.getPhoto);
router.get("/galery-video", controller.getVideo);
router.get("/contact", controller.getContact);
router.get("/membership", controller.getMembership);
router.post("/membership", controller.saveMember);
router.get("/:collection", controller.getCollection);
module.exports = router;
