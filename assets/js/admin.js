const showBlueprint = (event) => {
  if (event.value !== "") {
    event.removeAttribute("required");
  } else {
    event.setAttribute("required", "required");
  }
  const blueprintImage = document.querySelector("#template");
  blueprintImage.setAttribute("src", `/images/temp${event.value}.png`);

  const imageUploadRow = document.querySelector("#imageUpload");
  const imageShowRow = document.querySelector("#imageShow");
  const imageUploadField = document.querySelector("input[name=image]");
  if (event.value == 2 || event.value == 3) {
    imageUploadField.setAttribute("required", "required");
    imageShowRow.style.display = "block";
    imageUploadRow.style.display = "block";
  } else {
    imageShowRow.style.display = "none";
    imageUploadRow.style.display = "none";
  }
};

const showUploadedImage = (event) => {
  const newImage = document.querySelector("#newImage");
  const [file] = event.files;
  if (file) {
    newImage.src = URL.createObjectURL(file);
  }
};
