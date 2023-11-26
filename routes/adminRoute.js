const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.route("/").get(authController.getLogin).post(authController.postLogin);
router.route("/?*").all(authController.isAuthenticated);

//=============================|ABOUT|=================================//
router
  .get("/abouts/", adminController.readAllAbout)
  .get("/abouts/create", adminController.createGetAbout)
  .post(
    "/abouts/create",
    adminController.uploadPhoto,
    adminController.compressPhoto,
    adminController.createAbout
  )
  .get("/abouts/update/photo/:id", adminController.updateGetAboutPhoto)
  .post(
    "/abouts/update/photo/:id",
    adminController.uploadPhoto,
    adminController.compressPhoto,
    adminController.updateAboutPhoto
  )
  .get("/abouts/update/:id", adminController.updateGetAbout)
  .post("/abouts/update/:id", adminController.updateAbout)
  .post("/abouts/delete/:id", adminController.deleteAbout)
  .get("/abouts/:id", adminController.readAbout);

//=============================|COMMUNITY|=================================//
router
  .get("/communities/", adminController.readAllCommunity)
  .get("/communities/create", adminController.createGetCommunity)
  .post(
    "/communities/create",
    adminController.uploadPhoto,
    adminController.compressPhoto,
    adminController.createCommunity
  )
  .get("/communities/update/photo/:id", adminController.updateGetCommunityPhoto)
  .post(
    "/communities/update/photo/:id",
    adminController.uploadPhoto,
    adminController.compressPhoto,
    adminController.updateCommunityPhoto
  )
  .get("/communities/update/:id", adminController.updateGetCommunity)
  .post("/communities/update/:id", adminController.updateCommunity)
  .post("/communities/delete/:id", adminController.deleteCommunity)
  .get("/communities/:id", adminController.readCommunity);

//=============================|CONTACT|=================================//
router
  .get("/contacts/", adminController.readAllContact)
  .get("/contacts/create", adminController.createGetContact)
  .post("/contacts/create", adminController.createContact)
  .get("/contacts/update/:id", adminController.updateGetContact)
  .post("/contacts/update/:id", adminController.updateContact)
  .post("/contacts/delete/:id", adminController.deleteContact)
  .get("/contacts/:id", adminController.readContact);

//=============================|EVENT|=================================//
router
  .get("/events/", adminController.readAllEvent)
  .get("/events/create", adminController.createGetEvent)
  .post(
    "/events/create",
    adminController.uploadPhotos,
    adminController.compressPhotos,
    adminController.createEvent
  )
  .get("/events/update/photo/:id", adminController.updateGetEventPhoto)
  .post(
    "/events/update/photo/:id",
    adminController.uploadPhotos,
    adminController.compressPhotos,
    adminController.updateEventPhoto
  )
  .get("/events/update/:id", adminController.updateGetEvent)
  .post("/events/update/:id", adminController.updateEvent)
  .post("/events/delete/:id", adminController.deleteEvent)
  .get("/events/:id", adminController.readEvent);

//=============================|FAMOUS|=================================//
router
  .get("/famouses/", adminController.readAllFamous)
  .get("/famouses/create", adminController.createGetFamous)
  .post(
    "/famouses/create",
    adminController.uploadPhoto,
    adminController.compressPhoto,
    adminController.createFamous
  )
  .get("/famouses/update/photo/:id", adminController.updateGetFamousPhoto)
  .post(
    "/famouses/update/photo/:id",
    adminController.uploadPhoto,
    adminController.compressPhoto,
    adminController.updateFamousPhoto
  )
  .get("/famouses/update/:id", adminController.updateGetFamous)
  .post("/famouses/update/:id", adminController.updateFamous)
  .post("/famouses/delete/:id", adminController.deleteFamous)
  .get("/famouses/:id", adminController.readFamous);

//=============================|HERO|=================================//
router
  .get("/heroes/", adminController.readAllHero)
  .get("/heroes/create", adminController.createGetHero)
  .post(
    "/heroes/create",
    adminController.uploadPhoto,
    adminController.compressPhoto,
    adminController.createHero
  )
  .get("/heroes/update/photo/:id", adminController.updateGetHeroPhoto)
  .post(
    "/heroes/update/photo/:id",
    adminController.uploadPhoto,
    adminController.compressPhoto,
    adminController.updateHeroPhoto
  )
  .get("/heroes/update/:id", adminController.updateGetHero)
  .post("/heroes/update/:id", adminController.updateHero)
  .post("/heroes/delete/:id", adminController.deleteHero)
  .get("/heroes/:id", adminController.readHero);

//=============================|IMAGE|=================================//
router
  .get("/images/", adminController.readAllImage)
  .get("/images/create", adminController.createGetImage)
  .post(
    "/images/create",
    adminController.uploadPhoto,
    adminController.compressPhoto,
    adminController.createImage
  )
  .get("/images/update/photo/:id", adminController.updateGetImagePhoto)
  .post(
    "/images/update/photo/:id",
    adminController.uploadPhoto,
    adminController.compressPhoto,
    adminController.updateImagePhoto
  )
  .get("/images/update/:id", adminController.updateGetImage)
  .post("/images/update/:id", adminController.updateImage)
  .post("/images/delete/:id", adminController.deleteImage)
  .get("/images/:id", adminController.readImage);

//=============================|MEMBERS|=================================//
router
  .get("/members/", adminController.readAllMember)
  .post("/members/delete/:id", adminController.deleteMember)
  .get("/members/:id", adminController.readMember);

//=============================|MISSIONS|=================================//
router
  .get("/missions/", adminController.readAllMission)
  .get("/missions/create", adminController.createGetMission)
  .post(
    "/missions/create",
    adminController.uploadPhoto,
    adminController.compressPhoto,
    adminController.createMission
  )
  .get("/missions/update/photo/:id", adminController.updateGetMissionPhoto)
  .post(
    "/missions/update/photo/:id",
    adminController.uploadPhoto,
    adminController.compressPhoto,
    adminController.updateMissionPhoto
  )
  .get("/missions/update/:id", adminController.updateGetMission)
  .post("/missions/update/:id", adminController.updateMission)
  .post("/missions/delete/:id", adminController.deleteMission)
  .get("/missions/:id", adminController.readMission);

//=============================|NEW|=================================//
router
  .get("/news/", adminController.readAllNew)
  .get("/news/create", adminController.createGetNew)
  .post(
    "/news/create",
    adminController.uploadPhotos,
    adminController.compressPhotos,
    adminController.createNew
  )
  .get("/news/update/photo/:id", adminController.updateGetNewPhoto)
  .post(
    "/news/update/photo/:id",
    adminController.uploadPhotos,
    adminController.compressPhotos,
    adminController.updateNewPhoto
  )
  .get("/news/update/:id", adminController.updateGetNew)
  .post("/news/update/:id", adminController.updateNew)
  .post("/news/delete/:id", adminController.deleteNew)
  .get("/news/:id", adminController.readNew);

//=============================|SOCIAL|=================================//
router
  .get("/socials/", adminController.readAllSocial)
  .get("/socials/create", adminController.createGetSocial)
  .post("/socials/create", adminController.createSocial)
  .get("/socials/update/:id", adminController.updateGetSocial)
  .post("/socials/update/:id", adminController.updateSocial)
  .post("/socials/delete/:id", adminController.deleteSocial)
  .get("/socials/:id", adminController.readSocial);

//=============================|USER|=================================//
router.route("/users").get(adminController.readAllUser);
router
  .route("/users/update/:id")
  .get(adminController.updateGetUser)
  .post(adminController.updateUser);
router.route("/users/delete/:id").post(adminController.deleteUser);
router.route("/users/:id").get(adminController.readUser);

//=============================|VIDEO|================================//
router
  .get("/videos/", adminController.readAllVideo)
  .get("/videos/create", adminController.createGetVideo)
  .post(
    "/videos/create",
    adminController.uploadPhoto,
    adminController.compressPhoto,
    adminController.createVideo
  )
  .get("/videos/update/photo/:id", adminController.updateGetVideoPhoto)
  .post(
    "/videos/update/photo/:id",
    adminController.uploadPhoto,
    adminController.compressPhoto,
    adminController.updateVideoPhoto
  )
  .get("/videos/update/:id", adminController.updateGetVideo)
  .post("/videos/update/:id", adminController.updateVideo)
  .post("/videos/delete/:id", adminController.deleteVideo)
  .get("/videos/:id", adminController.readVideo);

//=============================|AUTHENTICATION|================================//
//==================================|AREA|=====================================//

router
  .route("/signup")
  .get(authController.getSignup)
  .post(authController.postSignup);

module.exports = router;
