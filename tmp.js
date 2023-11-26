exports.readAllVideo = async (req, res) => {
  const allVideo = await Video.find().catch((err) => {
    throw err;
  });
  res.status(200).render("admin/_image", { result: allVideo, title: "Video" });
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
    image: req.file.filename,
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
    image: req.file.filename,
  };
  for (const key of Object.keys(bluePrint)) {
    if (bluePrint[key] !== "") {
      update[key] = bluePrint[key];
    }
  }
  await deletePhoto("image", req.params.id);
  await Video.findOneAndUpdate({ _id: req.params.id }, update);
  res.status(204).redirect("/admin/videos");
};
exports.deleteVideo = async (req, res) => {
  await deletePhoto("image", req.params.id);
  await Video.findByIdAndDelete(req.params.id);
  res.status(200).redirect("/admin/videos");
};