//=============================|MODELS|===============================//
const Community = require("../models/communityModel");
const Mission = require("../models/missionModel");
const Contact = require("../models/contactModel");
const Social = require("../models/socialModel");
const Famous = require("../models/famousModel");
const Member = require("../models/memberModel");
const About = require("../models/aboutModel");
const Event = require("../models/eventModel");
const Image = require("../models/imageModel");
const Video = require("../models/videoModel");
const Hero = require("../models/heroModel");
const User = require("../models/userModel");
const New = require("../models/newModel");
const models = {
  community: Community,
  mission: Mission,
  contact: Contact,
  famous: Famous,
  social: Social,
  about: About,
  event: Event,
  image: Image,
  video: Video,
  hero: Hero,
  new: New,
};
//=============================|MODULES|===============================//
const fs = require("fs");
const { exec } = require("child_process");
const multer = require("multer");
const uniqid = require("uniqid");
const sharp = require("sharp");
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      res.status(400).redirect(req.path, { message: "Only image allowed!" }),
      false
    );
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
//=============================|CUSTOM FUNCTIONS|===============================//

const endPoint = (endpoint, collection) => {
  endpoint = endpoint
    .toLowerCase()
    .replaceAll("ü", "u")
    .replaceAll("ə", "e")
    .replaceAll("ı", "i")
    .replaceAll("ö", "o")
    .replaceAll("ğ", "g")
    .replaceAll("ş", "s")
    .replaceAll("ç", "c")
    .replaceAll(" ", "_");
  return `${collection}-${endpoint}`;
};
const createTemplate = (template, newFile) => {
  fs.link(
    `views/public/${template}.ejs`,
    `views/public/${newFile}.ejs`,
    (err) => {
      if (err) console.log(err);
    }
  );
};
const deletePhoto = async (collectionName, id) => {
  const currentCollection = await models[collectionName].findById(id);
  const imagePath = `${__dirname}/../assets/images/${currentCollection.image}`;
  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) console.log(err);
  });
  fs.unlink(imagePath, (err) => {
    if (err) console.log(err);
  });
  console.log("photo successfully deleted");
};
const deletePhotos = async (collectionName, id, column) => {
  const currentCollection = await models[collectionName].findById(id);
  const imageName = currentCollection[column];
  const imagePath1 = `${__dirname}/../assets/images/${imageName}`;
  fs.access(imagePath1, fs.constants.F_OK, (err) => {
    if (err) console.log(err);
  });
  fs.unlink(imagePath1, (err) => {
    if (err) console.log(err);
  });
  console.log("photo successfully deleted");
};
const deleteTemplate = async (collectionName, id) => {
  const currentCollection = await models[collectionName].findById(id);
  const filePath = `${__dirname}/../views/public/${currentCollection.endpoint}.ejs`;
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) console.log(err);
  });
  fs.unlink(filePath, (err) => {
    if (err) console.log(err);
  });
  console.log("template successfully deleted");
};

//=========================================================================//
//=============================|CONTROLLERS|===============================//
//=========================================================================//

//=============================|ABOUT|===============================//
exports.readAllAbout = async (req, res) => {
  const allAbout = await About.find().catch((err) => {
    throw err;
  });
  res.status(200).render("admin/_about", { result: allAbout, title: "About" });
};
exports.readAbout = async (req, res) => {
  const singleAbout = await About.findById(req.params.id);
  res.status(200).render("admin/readAbout", {
    result: singleAbout,
    title: "About Details",
    nav: "abouts",
  });
};
exports.createGetAbout = async (req, res) => {
  await res
    .status(200)
    .render("admin/createAbout", { nav: "abouts", title: "Create About" });
};
exports.createAbout = async (req, res) => {
  let newAbout;
  if (req.body.templateType == 1) {
    newAbout = await new About({
      name: req.body.name,
      title: req.body.title,
      content: req.body.content,
      templateType: req.body.templateType,
      endpoint: endPoint(req.body.name, "about"),
    });
  } else {
    newAbout = await new About({
      name: req.body.name,
      title: req.body.title,
      content: req.body.content,
      templateType: req.body.templateType,
      endpoint: endPoint(req.body.name, "about"),
      image: req.file.filename,
    });
  }
  createTemplate(req.body.templateType, endPoint(req.body.name, "about"));
  await newAbout
    .save()
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      res.status(201).redirect("/admin/abouts");
    });
};
exports.updateGetAbout = async (req, res) => {
  const singleAbout = await About.findById(req.params.id).catch((err) => {
    console.log(err);
  });
  res.status(200).render("admin/updateAbout", {
    result: singleAbout,
    title: "Update About",
    nav: "abouts",
  });
};
exports.updateAbout = async (req, res) => {
  let update = {};
  let bluePrint = {
    name: req.body.name,
    title: req.body.title,
    templateType: req.body.templateType,
    content: req.body.content,
    endpoint: endPoint(req.body.name, "about"),
  };
  for (const key of Object.keys(bluePrint)) {
    if (bluePrint[key] !== "") {
      update[key] = bluePrint[key];
    }
  }
  if (req.body.templateType != "" || req.body.name != "") {
    await deleteTemplate("about", req.params.id);
    await createTemplate(
      req.body.templateType,
      endPoint(req.body.name, "about")
    );
  }
  await About.findOneAndUpdate({ _id: req.params.id }, update);
  res.status(204).redirect("/admin/abouts");
};
exports.updateGetAboutPhoto = async (req, res) => {
  const singleAbout = await About.findById(req.params.id).catch((err) => {
    throw err;
  });
  res.status(200).render("admin/updateAboutPhoto", {
    result: singleAbout,
    title: "Update About",
    nav: "abouts",
  });
};
exports.updateAboutPhoto = async (req, res) => {
  let update = {};
  let bluePrint = {
    image: req.file.filename,
  };
  for (const key of Object.keys(bluePrint)) {
    if (bluePrint[key] !== "") {
      update[key] = bluePrint[key];
    }
  }
  await deletePhoto("about", req.params.id);
  await About.findOneAndUpdate({ _id: req.params.id }, update);
  res.status(204).redirect("/admin/abouts");
};
exports.deleteAbout = async (req, res) => {
  await deleteTemplate("about", req.params.id);
  await deletePhoto("about", req.params.id);
  await About.findByIdAndDelete(req.params.id);
  res.status(200).redirect("/admin/abouts");
};

//=============================|COMMUNITY|===============================//
exports.readAllCommunity = async (req, res) => {
  const allCommunity = await Community.find().catch((err) => {
    throw err;
  });
  res
    .status(200)
    .render("admin/_community", { result: allCommunity, title: "Community" });
};
exports.readCommunity = async (req, res) => {
  const singleCommunity = await Community.findById(req.params.id);
  res.status(200).render("admin/readCommunity", {
    result: singleCommunity,
    title: "Community Details",
    nav: "communities",
  });
};
exports.createGetCommunity = async (req, res) => {
  await res.status(200).render("admin/createCommunity", {
    nav: "communities",
    title: "Create Community",
  });
};
exports.createCommunity = async (req, res) => {
  let newCommunity;
  if (req.body.templateType == 1) {
    newCommunity = await new Community({
      name: req.body.name,
      title: req.body.title,
      content: req.body.content,
      templateType: req.body.templateType,
      endpoint: endPoint(req.body.name, "community"),
    });
  } else {
    newCommunity = await new Community({
      name: req.body.name,
      title: req.body.title,
      content: req.body.content,
      templateType: req.body.templateType,
      endpoint: endPoint(req.body.name, "community"),
      image: req.file.filename,
    });
  }
  await createTemplate(
    req.body.templateType,
    endPoint(req.body.name, "community")
  );
  await newCommunity
    .save()
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      res.status(201).redirect("/admin/communities");
    });
};
exports.updateGetCommunity = async (req, res) => {
  const singleCommunity = await Community.findById(req.params.id).catch(
    (err) => {
      console.log(err);
    }
  );
  res.status(200).render("admin/updateCommunity", {
    result: singleCommunity,
    title: "Update Community",
    nav: "communities",
  });
};
exports.updateCommunity = async (req, res) => {
  let update = {};
  let bluePrint = {
    name: req.body.name,
    title: req.body.title,
    templateType: req.body.templateType,
    content: req.body.content,
    endpoint: endPoint(req.body.name, "community"),
  };
  for (const key of Object.keys(bluePrint)) {
    if (bluePrint[key] !== "") {
      update[key] = bluePrint[key];
    }
  }
  if (req.body.templateType != "" || req.body.name != "") {
    await deleteTemplate("community", req.params.id);
    await createTemplate(
      req.body.templateType,
      endPoint(req.body.name, "community")
    );
  }
  await Community.findOneAndUpdate({ _id: req.params.id }, update);
  res.status(204).redirect("/admin/communities");
};
exports.updateGetCommunityPhoto = async (req, res) => {
  const singleCommunity = await Community.findById(req.params.id).catch(
    (err) => {
      throw err;
    }
  );
  res.status(200).render("admin/updateCommunityPhoto", {
    result: singleCommunity,
    title: "Update Community",
    nav: "communities",
  });
};
exports.updateCommunityPhoto = async (req, res) => {
  let update = {};
  let bluePrint = {
    image: req.file.filename,
  };
  for (const key of Object.keys(bluePrint)) {
    if (bluePrint[key] !== "") {
      update[key] = bluePrint[key];
    }
  }
  await deletePhoto("community", req.params.id);
  await Community.findOneAndUpdate({ _id: req.params.id }, update);
  res.status(204).redirect("/admin/communities");
};
exports.deleteCommunity = async (req, res) => {
  await deleteTemplate("community", req.params.id);
  await deletePhoto("community", req.params.id);
  await Community.findByIdAndDelete(req.params.id);
  res.status(200).redirect("/admin/communities");
};

//=============================|CONTACTS|===============================//
exports.readAllContact = async (req, res) => {
  const allContact = await Contact.find().catch((err) => {
    throw err;
  });
  res
    .status(200)
    .render("admin/_contact", { result: allContact, title: "Contact" });
};
exports.readContact = async (req, res) => {
  const singleContact = await Contact.findById(req.params.id);
  res.status(200).render("admin/readContact", {
    result: singleContact,
    title: "Contact Details",
    nav: "contacts",
  });
};
exports.createGetContact = async (req, res) => {
  await res.status(200).render("admin/createContact", {
    nav: "contacts",
    title: "Create Contact",
  });
};
exports.createContact = async (req, res) => {
  let newContact = await new Contact({
    title: req.body.title,
    logo: req.body.logo,
  });
  await newContact
    .save()
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      res.status(201).redirect("/admin/contacts");
    });
};
exports.updateGetContact = async (req, res) => {
  const singleContact = await Contact.findById(req.params.id).catch((err) => {
    console.log(err);
  });
  res.status(200).render("admin/updateContact", {
    result: singleContact,
    title: "Update Contact",
    nav: "contacts",
  });
};
exports.updateContact = async (req, res) => {
  let update = {};
  let bluePrint = {
    title: req.body.title,
    logo: req.body.logo,
  };
  for (const key of Object.keys(bluePrint)) {
    if (bluePrint[key] !== "") {
      update[key] = bluePrint[key];
    }
  }
  await Contact.findOneAndUpdate({ _id: req.params.id }, update);
  res.status(204).redirect("/admin/contacts");
};
exports.deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).redirect("/admin/contacts");
};

//=============================|EVENT|===============================//
exports.readAllEvent = async (req, res) => {
  const allEvent = await Event.find().catch((err) => {
    throw err;
  });
  res.status(200).render("admin/_event", { result: allEvent, title: "Event" });
};
exports.readEvent = async (req, res) => {
  const singleEvent = await Event.findById(req.params.id);
  res.status(200).render("admin/readEvent", {
    result: singleEvent,
    title: "Event Details",
    nav: "events",
  });
};
exports.createGetEvent = async (req, res) => {
  await res.status(200).render("admin/createEvent", {
    nav: "events",
    title: "Create Event",
  });
};
exports.createEvent = async (req, res) => {
  let newEvent;
  try {
    newEvent = await new Event({
      title: req.body.title,
      content: req.body.content,
      image: req.files.image[0].filename,
      imageCover: req.files.imageCover[0].filename,
    });
  } catch {
    newEvent = await new Event({
      title: req.body.title,
      content: req.body.content,
      imageCover: req.files.imageCover[0].filename,
    });
  }
  await newEvent
    .save()
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      res.status(201).redirect("/admin/events");
    });
};
exports.updateGetEvent = async (req, res) => {
  const singleEvent = await Event.findById(req.params.id).catch((err) => {
    console.log(err);
  });
  res.status(200).render("admin/updateEvent", {
    result: singleEvent,
    title: "Update Event",
    nav: "events",
  });
};
exports.updateEvent = async (req, res) => {
  let update = {};
  let bluePrint = {
    title: req.body.title,
    content: req.body.content,
  };
  for (const key of Object.keys(bluePrint)) {
    if (bluePrint[key] !== "") {
      update[key] = bluePrint[key];
    }
  }
  await Event.findOneAndUpdate({ _id: req.params.id }, update);
  res.status(204).redirect("/admin/events");
};
exports.updateGetEventPhoto = async (req, res) => {
  const singleEvent = await Event.findById(req.params.id).catch((err) => {
    throw err;
  });
  res.status(200).render("admin/updateEventPhoto", {
    result: singleEvent,
    title: "Update Event",
    nav: "events",
  });
};
exports.updateEventPhoto = async (req, res) => {
  let update = {};
  let bluePrint;
  if (req.files.image == undefined) {
    bluePrint = {
      imageCover: req.files.imageCover[0].filename,
    };
  } else if (req.files.imageCover == undefined) {
    bluePrint = {
      image: req.files.image[0].filename,
    };
  } else {
    bluePrint = {
      image: req.files.image[0].filename,
      imageCover: req.files.imageCover[0].filename,
    };
  }
  for (const key of Object.keys(bluePrint)) {
    if (bluePrint[key] !== "") {
      update[key] = bluePrint[key];
    }
  }
  if (update.image == undefined) {
    deletePhotos("event", req.params.id, "imageCover");
  } else if (update.imageCover == undefined) {
    deletePhotos("event", req.params.id, "image");
  } else {
    deletePhotos("event", req.params.id, "imageCover");
    deletePhotos("event", req.params.id, "image");
  }
  await Event.findOneAndUpdate({ _id: req.params.id }, update);
  res.status(204).redirect("/admin/events");
};
exports.deleteEvent = async (req, res) => {
  deletePhotos("event", req.params.id);
  await Event.findByIdAndDelete(req.params.id);
  res.status(200).redirect("/admin/events");
};

//=============================|FAMOUS|===============================//
exports.readAllFamous = async (req, res) => {
  const allFamous = await Famous.find().catch((err) => {
    throw err;
  });
  res
    .status(200)
    .render("admin/_famous", { result: allFamous, title: "Famous" });
};
exports.readFamous = async (req, res) => {
  const singleFamous = await Famous.findById(req.params.id);
  res.status(200).render("admin/readFamous", {
    result: singleFamous,
    title: "Famous Details",
    nav: "famouses",
  });
};
exports.createGetFamous = async (req, res) => {
  await res.status(200).render("admin/createFamous", {
    nav: "famouses",
    title: "Create Famous",
  });
};
exports.createFamous = async (req, res) => {
  let newFamous = await new Famous({
    name: req.body.name,
    surname: req.body.surname,
    content: req.body.content,
    image: req.file.filename,
  });

  await newFamous
    .save()
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      res.status(201).redirect("/admin/famouses");
    });
};
exports.updateGetFamous = async (req, res) => {
  const singleFamous = await Famous.findById(req.params.id).catch((err) => {
    console.log(err);
  });
  res.status(200).render("admin/updateFamous", {
    result: singleFamous,
    title: "Update Famous",
    nav: "famouses",
  });
};
exports.updateFamous = async (req, res) => {
  let update = {};
  let bluePrint = {
    name: req.body.name,
    surname: req.body.surname,
    content: req.body.content,
  };
  for (const key of Object.keys(bluePrint)) {
    if (bluePrint[key] !== "") {
      update[key] = bluePrint[key];
    }
  }
  await Famous.findOneAndUpdate({ _id: req.params.id }, update);
  res.status(204).redirect("/admin/famouses");
};
exports.updateGetFamousPhoto = async (req, res) => {
  const singleFamous = await Famous.findById(req.params.id).catch((err) => {
    throw err;
  });
  res.status(200).render("admin/updateFamousPhoto", {
    result: singleFamous,
    title: "Update Famous",
    nav: "famouses",
  });
};
exports.updateFamousPhoto = async (req, res) => {
  let update = {};
  let bluePrint = {
    image: req.file.filename,
  };
  for (const key of Object.keys(bluePrint)) {
    if (bluePrint[key] !== "") {
      update[key] = bluePrint[key];
    }
  }
  await deletePhoto("famous", req.params.id);
  await Famous.findOneAndUpdate({ _id: req.params.id }, update);
  res.status(204).redirect("/admin/famouses");
};
exports.deleteFamous = async (req, res) => {
  await deletePhoto("famous", req.params.id);
  await Famous.findByIdAndDelete(req.params.id);
  res.status(200).redirect("/admin/famouses");
};

//=============================|HERO|===============================//
exports.readAllHero = async (req, res) => {
  const allHero = await Hero.find().catch((err) => {
    throw err;
  });
  res.status(200).render("admin/_hero", { result: allHero, title: "Hero" });
};
exports.readHero = async (req, res) => {
  const singleHero = await Hero.findById(req.params.id);
  res.status(200).render("admin/readHero", {
    result: singleHero,
    title: "Hero Details",
    nav: "heroes",
  });
};
exports.createGetHero = async (req, res) => {
  await res.status(200).render("admin/createHero", {
    nav: "heroes",
    title: "Create Hero",
  });
};
exports.createHero = async (req, res) => {
  let newHero = await new Hero({
    name: req.body.name,
    surname: req.body.surname,
    content: req.body.content,
    image: req.file.filename,
  });

  await newHero
    .save()
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      res.status(201).redirect("/admin/heroes");
    });
};
exports.updateGetHero = async (req, res) => {
  const singleHero = await Hero.findById(req.params.id).catch((err) => {
    console.log(err);
  });
  res.status(200).render("admin/updateHero", {
    result: singleHero,
    title: "Update Hero",
    nav: "heroes",
  });
};
exports.updateHero = async (req, res) => {
  let update = {};
  let bluePrint = {
    name: req.body.name,
    surname: req.body.surname,
    content: req.body.content,
  };
  for (const key of Object.keys(bluePrint)) {
    if (bluePrint[key] !== "") {
      update[key] = bluePrint[key];
    }
  }
  await Hero.findOneAndUpdate({ _id: req.params.id }, update);
  res.status(204).redirect("/admin/heroes");
};
exports.updateGetHeroPhoto = async (req, res) => {
  const singleHero = await Hero.findById(req.params.id).catch((err) => {
    throw err;
  });
  res.status(200).render("admin/updateHeroPhoto", {
    result: singleHero,
    title: "Update Hero",
    nav: "heroes",
  });
};
exports.updateHeroPhoto = async (req, res) => {
  let update = {};
  let bluePrint = {
    image: req.file.filename,
  };
  for (const key of Object.keys(bluePrint)) {
    if (bluePrint[key] !== "") {
      update[key] = bluePrint[key];
    }
  }
  await deletePhoto("hero", req.params.id);
  await Hero.findOneAndUpdate({ _id: req.params.id }, update);
  res.status(204).redirect("/admin/heroes");
};
exports.deleteHero = async (req, res) => {
  await deletePhoto("hero", req.params.id);
  await Hero.findByIdAndDelete(req.params.id);
  res.status(200).redirect("/admin/heroes");
};

//=============================|IMAGE|===============================//
exports.readAllImage = async (req, res) => {
  const allImage = await Image.find().catch((err) => {
    throw err;
  });
  res.status(200).render("admin/_image", { result: allImage, title: "Image" });
};
exports.readImage = async (req, res) => {
  const singleImage = await Image.findById(req.params.id);
  res.status(200).render("admin/readImage", {
    result: singleImage,
    title: "Image Details",
    nav: "images",
  });
};
exports.createGetImage = async (req, res) => {
  await res.status(200).render("admin/createImage", {
    nav: "images",
    title: "Create Image",
  });
};
exports.createImage = async (req, res) => {
  let newImage = await new Image({
    title: req.body.title,
    image: req.file.filename,
  });

  await newImage
    .save()
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      res.status(201).redirect("/admin/images");
    });
};
exports.updateGetImage = async (req, res) => {
  const singleImage = await Image.findById(req.params.id).catch((err) => {
    console.log(err);
  });
  res.status(200).render("admin/updateImage", {
    result: singleImage,
    title: "Update Image",
    nav: "images",
  });
};
exports.updateImage = async (req, res) => {
  let update = {};
  let bluePrint = {
    title: req.body.title,
  };
  for (const key of Object.keys(bluePrint)) {
    if (bluePrint[key] !== "") {
      update[key] = bluePrint[key];
    }
  }
  await Image.findOneAndUpdate({ _id: req.params.id }, update);
  res.status(204).redirect("/admin/images");
};
exports.updateGetImagePhoto = async (req, res) => {
  const singleImage = await Image.findById(req.params.id).catch((err) => {
    throw err;
  });
  res.status(200).render("admin/updateImagePhoto", {
    result: singleImage,
    title: "Update Image",
    nav: "images",
  });
};
exports.updateImagePhoto = async (req, res) => {
  let update = {};
  let bluePrint = {
    image: req.file.filename,
  };
  for (const key of Object.keys(bluePrint)) {
    if (bluePrint[key] !== "") {
      update[key] = bluePrint[key];
    }
  }
  await deletePhoto("image", req.params.id);
  await Image.findOneAndUpdate({ _id: req.params.id }, update);
  res.status(204).redirect("/admin/images");
};
exports.deleteImage = async (req, res) => {
  await deletePhoto("image", req.params.id);
  await Image.findByIdAndDelete(req.params.id);
  res.status(200).redirect("/admin/images");
};

//=============================|MEMBER|===============================//
exports.readAllMember = async (req, res) => {
  const allMember = await Member.find().catch((err) => {
    throw err;
  });
  res
    .status(200)
    .render("admin/_member", { result: allMember, title: "Member" });
};
exports.readMember = async (req, res) => {
  const singleMember = await Member.findById(req.params.id);
  res.status(200).render("admin/readMember", {
    result: singleMember,
    title: "Member Details",
    nav: "members",
  });
};
exports.deleteMember = async (req, res) => {
  await Member.findByIdAndDelete(req.params.id);
  res.status(200).redirect("/admin/members");
};

//=============================|MISSION|===============================//
exports.readAllMission = async (req, res) => {
  const allMission = await Mission.find().catch((err) => {
    throw err;
  });
  res
    .status(200)
    .render("admin/_mission", { result: allMission, title: "Mission" });
};
exports.readMission = async (req, res) => {
  const singleMission = await Mission.findById(req.params.id);
  res.status(200).render("admin/readMission", {
    result: singleMission,
    title: "Mission Details",
    nav: "missions",
  });
};
exports.createGetMission = async (req, res) => {
  await res.status(200).render("admin/createMission", {
    nav: "missions",
    title: "Create Mission",
  });
};
exports.createMission = async (req, res) => {
  let newMission;
  if (req.body.templateType == 1) {
    newMission = await new Mission({
      name: req.body.name,
      title: req.body.title,
      content: req.body.content,
      templateType: req.body.templateType,
      endpoint: endPoint(req.body.name, "mission"),
    });
  } else {
    newMission = await new Mission({
      name: req.body.name,
      title: req.body.title,
      content: req.body.content,
      templateType: req.body.templateType,
      endpoint: endPoint(req.body.name, "mission"),
      image: req.file.filename,
    });
  }
  createTemplate(req.body.templateType, endPoint(req.body.name, "mission"));
  await newMission
    .save()
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      res.status(201).redirect("/admin/missions");
    });
};
exports.updateGetMission = async (req, res) => {
  const singleMission = await Mission.findById(req.params.id).catch((err) => {
    console.log(err);
  });
  res.status(200).render("admin/updateMission", {
    result: singleMission,
    title: "Update Mission",
    nav: "missions",
  });
};
exports.updateMission = async (req, res) => {
  let update = {};
  let bluePrint = {
    name: req.body.name,
    title: req.body.title,
    templateType: req.body.templateType,
    content: req.body.content,
    endpoint: endPoint(req.body.name, "mission"),
  };
  for (const key of Object.keys(bluePrint)) {
    if (bluePrint[key] !== "") {
      update[key] = bluePrint[key];
    }
  }
  if (req.body.templateType != "" || req.body.name != "") {
    await deleteTemplate("mission", req.params.id);
    await createTemplate(
      req.body.templateType,
      endPoint(req.body.name, "mission")
    );
  }
  await Mission.findOneAndUpdate({ _id: req.params.id }, update);
  res.status(204).redirect("/admin/missions");
};
exports.updateGetMissionPhoto = async (req, res) => {
  const singleMission = await Mission.findById(req.params.id).catch((err) => {
    throw err;
  });
  res.status(200).render("admin/updateMissionPhoto", {
    result: singleMission,
    title: "Update Mission",
    nav: "missions",
  });
};
exports.updateMissionPhoto = async (req, res) => {
  let update = {};
  let bluePrint = {
    image: req.file.filename,
  };
  for (const key of Object.keys(bluePrint)) {
    if (bluePrint[key] !== "") {
      update[key] = bluePrint[key];
    }
  }
  await deletePhoto("mission", req.params.id);
  await Mission.findOneAndUpdate({ _id: req.params.id }, update);
  res.status(204).redirect("/admin/missions");
};
exports.deleteMission = async (req, res) => {
  await deleteTemplate("mission", req.params.id);
  await deletePhoto("mission", req.params.id);
  await Mission.findByIdAndDelete(req.params.id);
  res.status(200).redirect("/admin/missions");
};

//=============================|NEW|===============================//
exports.readAllNew = async (req, res) => {
  const allNew = await New.find().catch((err) => {
    throw err;
  });
  res.status(200).render("admin/_new", { result: allNew, title: "New" });
};
exports.readNew = async (req, res) => {
  const singleNew = await New.findById(req.params.id);
  res.status(200).render("admin/readNew", {
    result: singleNew,
    title: "New Details",
    nav: "news",
  });
};
exports.createGetNew = async (req, res) => {
  await res.status(200).render("admin/createNew", {
    nav: "news",
    title: "Create New",
  });
};
exports.createNew = async (req, res) => {
  let newNew;
  try {
    newNew = await new New({
      title: req.body.title,
      content: req.body.content,
      image: req.files.image[0].filename,
      imageCover: req.files.imageCover[0].filename,
    });
  } catch {
    newNew = await new New({
      title: req.body.title,
      content: req.body.content,
      imageCover: req.files.imageCover[0].filename,
    });
  }
  await newNew
    .save()
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      res.status(201).redirect("/admin/news");
    });
};
exports.updateGetNew = async (req, res) => {
  const singleNew = await New.findById(req.params.id).catch((err) => {
    console.log(err);
  });
  res.status(200).render("admin/updateNew", {
    result: singleNew,
    title: "Update New",
    nav: "news",
  });
};
exports.updateNew = async (req, res) => {
  let update = {};
  let bluePrint = {
    title: req.body.title,
    content: req.body.content,
  };
  for (const key of Object.keys(bluePrint)) {
    if (bluePrint[key] !== "") {
      update[key] = bluePrint[key];
    }
  }
  await New.findOneAndUpdate({ _id: req.params.id }, update);
  res.status(204).redirect("/admin/news");
};
exports.updateGetNewPhoto = async (req, res) => {
  const singleNew = await New.findById(req.params.id).catch((err) => {
    throw err;
  });
  res.status(200).render("admin/updateNewPhoto", {
    result: singleNew,
    title: "Update New",
    nav: "news",
  });
};
exports.updateNewPhoto = async (req, res) => {
  let update = {};
  let bluePrint;
  if (req.files.image == undefined) {
    bluePrint = {
      imageCover: req.files.imageCover[0].filename,
    };
  } else if (req.files.imageCover == undefined) {
    bluePrint = {
      image: req.files.image[0].filename,
    };
  } else {
    bluePrint = {
      image: req.files.image[0].filename,
      imageCover: req.files.imageCover[0].filename,
    };
  }
  for (const key of Object.keys(bluePrint)) {
    if (bluePrint[key] !== "") {
      update[key] = bluePrint[key];
    }
  }
  if (update.image == undefined) {
    deletePhotos("new", req.params.id, "imageCover");
  } else if (update.imageCover == undefined) {
    deletePhotos("new", req.params.id, "image");
  } else {
    deletePhotos("new", req.params.id, "imageCover");
    deletePhotos("new", req.params.id, "image");
  }
  await New.findOneAndUpdate({ _id: req.params.id }, update);
  res.status(204).redirect("/admin/news");
};
exports.deleteNew = async (req, res) => {
  deletePhotos("new", req.params.id);
  await New.findByIdAndDelete(req.params.id);
  res.status(200).redirect("/admin/news");
};

//=============================|SOCIAL|===============================//
exports.readAllSocial = async (req, res) => {
  const allSocial = await Social.find().catch((err) => {
    throw err;
  });
  res
    .status(200)
    .render("admin/_social", { result: allSocial, title: "Social" });
};
exports.readSocial = async (req, res) => {
  const singleSocial = await Social.findById(req.params.id);
  res.status(200).render("admin/readSocial", {
    result: singleSocial,
    title: "Social Details",
    nav: "socials",
  });
};
exports.createGetSocial = async (req, res) => {
  await res.status(200).render("admin/createSocial", {
    nav: "socials",
    title: "Create Social",
  });
};
exports.createSocial = async (req, res) => {
  console.log(req.body);
  let newSocial = await new Social({
    web: req.body.web,
    logo: req.body.logo,
  });
  await newSocial
    .save()
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      res.status(201).redirect("/admin/socials");
    });
};
exports.updateGetSocial = async (req, res) => {
  const singleSocial = await Social.findById(req.params.id).catch((err) => {
    console.log(err);
  });
  res.status(200).render("admin/updateSocial", {
    result: singleSocial,
    title: "Update Social",
    nav: "socials",
  });
};
exports.updateSocial = async (req, res) => {
  let update = {};
  let bluePrint = {
    web: req.body.web,
    logo: req.body.logo,
  };
  for (const key of Object.keys(bluePrint)) {
    if (bluePrint[key] !== "") {
      update[key] = bluePrint[key];
    }
  }
  await Social.findOneAndUpdate({ _id: req.params.id }, update);
  res.status(204).redirect("/admin/socials");
};
exports.deleteSocial = async (req, res) => {
  await Social.findByIdAndDelete(req.params.id);
  res.status(200).redirect("/admin/socials");
};

//=============================|USER|===============================//
exports.readAllUser = async (req, res) => {
  const allUser = await User.find().catch((err) => {
    throw err;
  });
  res.status(200).render("admin/_user", { result: allUser, title: "User" });
};
exports.readUser = async (req, res) => {
  const singleUser = await User.findById(req.params.id);
  res.status(200).render("admin/readUser", {
    result: singleUser,
    title: "User Details",
    nav: "users",
  });
};
exports.updateGetUser = async (req, res) => {
  const singleUser = await User.findById(req.params.id).catch((err) => {
    console.log(err);
  });
  res.status(200).render("admin/updateUser", {
    result: singleUser,
    title: "Update User",
    nav: "users",
  });
};
exports.updateUser = async (req, res) => {
  let update = {};
  let bluePrint = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  for (const key of Object.keys(bluePrint)) {
    if (bluePrint[key] !== "") {
      update[key] = bluePrint[key];
    }
  }
  await User.findOneAndUpdate({ _id: req.params.id }, update);

  res.status(204).redirect("/admin/users");
};
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).redirect("/admin/users");
};

//=============================|VIDEO|===============================//
exports.readAllVideo = async (req, res) => {
  const allVideo = await Video.find().catch((err) => {
    throw err;
  });
  res.status(200).render("admin/_video", { result: allVideo, title: "Video" });
};
exports.readVideo = async (req, res) => {
  const singleVideo = await Video.findById(req.params.id);
  res.status(200).render("admin/readVideo", {
    result: singleVideo,
    title: "Video Details",
    nav: "videos",
  });
};
exports.createGetVideo = async (req, res) => {
  await res.status(200).render("admin/createVideo", {
    nav: "videos",
    title: "Create Video",
  });
};
exports.createVideo = async (req, res) => {
  let newVideo = await new Video({
    title: req.body.title,
    cover: req.file.filename,
    video: req.body.video,
  });

  await newVideo
    .save()
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      res.status(201).redirect("/admin/videos");
    });
};
exports.updateGetVideo = async (req, res) => {
  const singleVideo = await Video.findById(req.params.id).catch((err) => {
    console.log(err);
  });
  res.status(200).render("admin/updateVideo", {
    result: singleVideo,
    title: "Update Video",
    nav: "videos",
  });
};
exports.updateVideo = async (req, res) => {
  let update = {};
  let bluePrint = {
    title: req.body.title,
    video: req.body.video,
  };
  for (const key of Object.keys(bluePrint)) {
    if (bluePrint[key] !== "") {
      update[key] = bluePrint[key];
    }
  }
  await Video.findOneAndUpdate({ _id: req.params.id }, update);
  res.status(204).redirect("/admin/videos");
};
exports.updateGetVideoPhoto = async (req, res) => {
  const singleVideo = await Video.findById(req.params.id).catch((err) => {
    throw err;
  });
  res.status(200).render("admin/updateVideoPhoto", {
    result: singleVideo,
    title: "Update Video",
    nav: "videos",
  });
};
exports.updateVideoPhoto = async (req, res) => {
  let update = {};
  let bluePrint = {
    title: req.body.title,
    video: req.body.video,
  };
  for (const key of Object.keys(bluePrint)) {
    if (bluePrint[key] !== "") {
      update[key] = bluePrint[key];
    }
  }
  await deletePhoto("video", req.params.id);
  await Video.findOneAndUpdate({ _id: req.params.id }, update);
  res.status(204).redirect("/admin/videos");
};
exports.deleteVideo = async (req, res) => {
  await deletePhoto("video", req.params.id);
  await Video.findByIdAndDelete(req.params.id);
  res.status(200).redirect("/admin/videos");
};

//=============================|IMAGE-COMPRESSION|===============================//
exports.compressPhoto = async (req, res, next) => {
  if (!req.file) return next();
  if (req.file.mimetype.startsWith("image")) {
    req.file.filename = `${Date.now()}.jpeg`;
    sharp(req.file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 80 })
      .toFile(`assets/images/${req.file.filename}`);
  }
  next();
};

exports.compressPhotos = async (req, res, next) => {
  if (req.files.imageCover != undefined) {
    if (req.files.imageCover[0].mimetype.startsWith("image")) {
      req.files.imageCover[0].filename = `${Date.now()}.jpeg`;
      sharp(req.files.imageCover[0].buffer)
        .toFormat("jpeg")
        .jpeg({ quality: 80 })
        .toFile(`assets/images/${req.files.imageCover[0].filename}`);
    }
  }
  if (req.files.image != undefined) {
    if (req.files.image[0].mimetype.startsWith("image")) {
      req.files.image[0].filename = `${Date.now()}.jpeg`;
      sharp(req.files.image[0].buffer)
        .toFormat("jpeg")
        .jpeg({ quality: 80 })
        .toFile(`assets/images/${req.files.image[0].filename}`);
    }
  }
  next();
};

exports.uploadPhoto = upload.single("image");
exports.uploadPhotos = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "imageCover", maxCount: 1 },
]);
