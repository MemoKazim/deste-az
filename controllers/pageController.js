const Community = require("../models/communityModel");
const Mission = require("../models/missionModel");
const Contact = require("../models/contactModel");
const Social = require("../models/socialModel");
const Famous = require("../models/famousModel");
const About = require("../models/aboutModel");
const Event = require("../models/eventModel");
const Image = require("../models/imageModel");
const Video = require("../models/videoModel");
const Hero = require("../models/heroModel");
const New = require("../models/newModel");
const Member = require("../models/memberModel");

const models = {
  community: Community,
  mission: Mission,
  contact: Contact,
  social: Social,
  famous: Famous,
  about: About,
  event: Event,
  image: Image,
  video: Video,
  hero: Hero,
  new: New,
};

const regularCollections = async () => {
  const abouts = await About.find().sort({ date: -1 });
  const communities = await Community.find().sort({ date: -1 });
  const missions = await Mission.find().sort({ date: -1 });
  const socials = await Social.find().sort({ date: -1 });
  return [abouts, communities, missions, socials];
};
exports.regularCollections;
const requiredCollections = async (Collections) => {
  let result = [];
  for (const collection of Collections) {
    let current_collecion = await collection.find().sort({ date: -1 });
    result.push(current_collecion);
  }
  return result;
};

const capitalize = (collection) => {
  collection = collection.charAt(0).toUpperCase() + collection.slice(1);
  return collection;
};

exports.getHome = async (req, res) => {
  const [abouts, communities, missions, socials] = await regularCollections();
  const [events, news] = await requiredCollections([Event, New]);
  res.status(200).render("public/index", {
    title: "Əsas Səhifə",
    abouts: abouts,
    communities: communities,
    missions: missions,
    socials: socials,
    events: events,
    news: news,
  });
};

exports.getNews = async (req, res) => {
  const [abouts, communities, missions, socials] = await regularCollections();
  const [news, events] = await requiredCollections([New, Event]);
  res.status(200).render("public/news", {
    title: "Xəbərlər",
    abouts: abouts,
    communities: communities,
    missions: missions,
    socials: socials,
    news: news,
    events: events,
  });
};

exports.getNew = async (req, res) => {
  const [abouts, communities, missions, socials] = await regularCollections();
  const [news, events] = await requiredCollections([New, Event]);
  const _new = await New.findById(req.params.id);
  res.status(200).render("public/new", {
    title: "Xəbərlər",
    abouts: abouts,
    communities: communities,
    missions: missions,
    socials: socials,
    news: news,
    events: events,
    _new: _new,
  });
};

exports.getEvents = async (req, res) => {
  const [abouts, communities, missions, socials] = await regularCollections();
  const [events, news] = await requiredCollections([Event, New]);
  res.status(200).render("public/events", {
    title: "Tədbirlər",
    abouts: abouts,
    communities: communities,
    missions: missions,
    socials: socials,
    events: events,
    news: news,
  });
};

exports.getEvent = async (req, res) => {
  const [abouts, communities, missions, socials] = await regularCollections();
  const [events, news] = await requiredCollections([Event, New]);
  const event = await Event.findById(req.params.id);
  res.status(200).render("public/event", {
    title: "Tədbirlər",
    abouts: abouts,
    communities: communities,
    missions: missions,
    socials: socials,
    events: events,
    news: news,
    event: event,
  });
};

exports.getFamousPeople = async (req, res) => {
  const [abouts, communities, missions, socials] = await regularCollections();
  const [famouses] = await requiredCollections([Famous]);
  res.status(200).render("public/famouses", {
    title: "Tanınmış Şəxslər",
    abouts: abouts,
    communities: communities,
    missions: missions,
    socials: socials,
    famouses: famouses,
  });
};

exports.getFamousPerson = async (req, res) => {
  const [abouts, communities, missions, socials] = await regularCollections();
  const famouses = await Famous.findById(req.params.id);
  res.status(200).render("public/famous", {
    title: "Tanınmış Şəxslər",
    abouts: abouts,
    communities: communities,
    missions: missions,
    socials: socials,
    famouses: famouses,
  });
};

exports.getHeroes = async (req, res) => {
  const [abouts, communities, missions, socials] = await regularCollections();
  const [heroes] = await requiredCollections([Hero]);
  res.status(200).render("public/heroes", {
    title: "Qəhrəmanlarımız",
    abouts: abouts,
    communities: communities,
    missions: missions,
    socials: socials,
    heroes: heroes,
  });
};

exports.getHero = async (req, res) => {
  const [abouts, communities, missions, socials] = await regularCollections();
  const heroes = await Hero.findById(req.params.id);
  res.status(200).render("public/hero", {
    title: "Qəhrəmanlarımız",
    abouts: abouts,
    communities: communities,
    missions: missions,
    socials: socials,
    heroes: heroes,
  });
};

exports.getPhoto = async (req, res) => {
  const [abouts, communities, missions, socials] = await regularCollections();
  const [images] = await requiredCollections([Image]);
  res.status(200).render("public/photos", {
    title: "Qalereya",
    abouts: abouts,
    communities: communities,
    missions: missions,
    socials: socials,
    images: images,
  });
};

exports.getVideo = async (req, res) => {
  const [abouts, communities, missions, socials] = await regularCollections();
  const [videos] = await requiredCollections([Video]);
  res.status(200).render("public/videos", {
    title: "Videolar",
    abouts: abouts,
    communities: communities,
    missions: missions,
    socials: socials,
    videos: videos,
  });
};

exports.getMembership = async (req, res) => {
  const [abouts, communities, missions, socials] = await regularCollections();
  res.status(200).render("public/membership", {
    title: "Üzv ol",
    abouts: abouts,
    communities: communities,
    missions: missions,
    socials: socials,
    message: undefined,
  });
};

exports.getContact = async (req, res) => {
  const [abouts, communities, missions, socials] = await regularCollections();
  const [contacts] = await requiredCollections([Contact]);
  res.status(200).render("public/contact", {
    title: "Əlaqə",
    abouts: abouts,
    communities: communities,
    missions: missions,
    socials: socials,
    contacts: contacts,
    message: undefined,
  });
};

exports.saveMember = async (req, res) => {
  const newMember = await new Member({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
  });
  const [abouts, communities, missions, socials] = await regularCollections();
  const [contacts] = await requiredCollections([Contact]);

  await newMember
    .save()
    .catch((err) => {
      console.log(error);
    })
    .then(
      res.status(200).render("public/contact", {
        title: "Əlaqə",
        abouts: abouts,
        communities: communities,
        missions: missions,
        socials: socials,
        contacts: contacts,
        message: "Your message received!",
      })
    );
};

exports.getCollection = async (req, res) => {
  try {
    const [abouts, communities, missions, socials] = await regularCollections();
    const [news, events] = await requiredCollections([New, Event]);
    const collectionName = req.originalUrl.split("-")[0].slice(1);
    const currentCollection = await models[collectionName].find({
      endpoint: req.path.split("/")[1],
    });

    if (!models[collectionName]) {
      res.render("error/404", {
        title: "404 - Nəticə tapılmadı",
        abouts: abouts,
        communities: communities,
        missions: missions,
        socials: socials,
      });
    }

    await new Promise((resolve, reject) => {
      res.render(
        `public/${req.path.split("/")[1]}`,
        {
          title: req.path.split("/")[1],
          news: news,
          events: events,
          abouts: abouts,
          communities: communities,
          missions: missions,
          socials: socials,
          result: currentCollection[0],
        },
        (err) => {
          if (err) {
            console.log(err);
            res.render("error/404", {
              title: "404 - Nəticə tapılmadı",
              abouts: abouts,
              communities: communities,
              missions: missions,
              socials: socials,
            });
          }
          res.render(`public/${req.path.split("/")[1]}`, {
            title: req.path.split("/")[1],
            news: news,
            events: events,
            abouts: abouts,
            communities: communities,
            missions: missions,
            socials: socials,
            result: currentCollection[0],
          });
        }
      );
    });
  } catch (error) {
    const [abouts, communities, missions, socials] = await regularCollections();
    res.render("error/404", {
      title: "404 - Nəticə tapılmadı",
      abouts: abouts,
      communities: communities,
      missions: missions,
      socials: socials,
    });
  }
};
