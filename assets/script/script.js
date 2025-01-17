const showNameBtn = document.getElementById("radio-yes");
const hideNameBtn = document.getElementById("radio-no");
const userNameInputGroup = document.getElementById("userName-inputGroup");
const userNameInput = document.getElementById("name-input");
const picLinkInput = document.getElementById("pic-input");
const picNames = [
  "fox",
  "gira",
  "hippo",
  "rino",
  "whale",
  "cat",
  "dino",
  "pig",
  "parrot",
  "raccoon",
];
const msgInput = document.getElementById("msg-input");
const addBtn = document.getElementById("add-btn");
const toReplace = "***";
const comments = document.getElementById("comments");

function delWhiteSpaceInName(input) {
  return input.trim().replace(/\s/g, "");
}

function alterName(input) {
  return input[0].toUpperCase() + input.slice(1).toLowerCase();
}

function checkSpamAndReplace(input) {
  let msg = input.trim();
  msg = msg.replace(/viagra/gi, toReplace).replace(/xxx/gi, toReplace);

  return msg;
}

function checkAndPost(evt) {
  evt.preventDefault();

  if (areFieldsEmpty()) {
    alert("Пожалуйста, заполните все поля ввода");
    return;
  }

  postComment();
}

function areFieldsEmpty() {
  if (showNameBtn.checked) {
    return !userNameInput.value.trim() || !msgInput.value.trim();
  }
  return !msgInput.value.trim();
}

function postComment() {
  const userName = showNameBtn.checked ? userNameInput.value : "Username";
  const picSrc = picLinkInput.value
    ? picLinkInput.value
    : makePathToRandomPic();
  const dateStr = makeDateStr();

  const mainContainer = createElemAddClass("div", "comment");

  const imgContainer = createElemAddClass("div", "comment__user-pic-container");

  const img = createElemAddClass("img", "comment__user-pic");
  addSrcAltToImg(img, picSrc, `Аватарка юзера ${userName}`);
  imgContainer.append(img);

  const usernameElem = createElemAddClass("h3", "comment__user-name", userName);

  const dateElem = createElemAddClass("p", "comment__date", dateStr);

  const msgElem = createElemAddClass("p", "comment__user-msg", msgInput.value);

  mainContainer.append(imgContainer, usernameElem, dateElem, msgElem);

  delInformParagraph();

  comments.append(mainContainer);
  clearInput();
}

function makePathToRandomPic() {
  const number = Math.floor(Math.random() * 10);
  const picName = picNames[number];
  const pathToPic = "assets/img/" + picName + ".svg";
  return pathToPic;
}

function makeDateStr() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const date = now.getDate().toString().padStart(2, "0");
  const hour = now.getHours().toString().padStart(2, "0");
  const min = now.getMinutes().toString().padStart(2, "0");

  const daysOfWeek = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  const day = daysOfWeek[now.getDay()];

  return `${day}, ${date}.${month}.${year} в ${hour}:${min}`;
}

function createElemAddClass(elemName, className, textContentVal = undefined) {
  const newElem = document.createElement(elemName);
  newElem.classList.add(className);

  if (textContentVal !== undefined) {
    newElem.textContent = textContentVal;
  }
  return newElem;
}

function addSrcAltToImg(imgElem, src, alt) {
  imgElem.src = src;
  imgElem.alt = alt;
}

function delInformParagraph() {
  const informParagraph = document.querySelector(".comments__inform-paragraph");

  if (informParagraph !== null) {
    informParagraph.remove();
  }
}

function clearInput() {
  userNameInput.value = "";
  picLinkInput.value = "";
  msgInput.value = "";
}

function toggleUserNameField(show = true) {
  if (show) {
    userNameInputGroup.style.display = "block";
  } else {
    userNameInputGroup.style.display = "none";
  }
}

showNameBtn.addEventListener("click", toggleUserNameField);

hideNameBtn.addEventListener("click", () => toggleUserNameField(false));

userNameInput.addEventListener("input", () => {
  userNameInput.value = delWhiteSpaceInName(userNameInput.value);
});

userNameInput.addEventListener("change", () => {
  userNameInput.value = alterName(userNameInput.value);
});

msgInput.addEventListener("change", () => {
  msgInput.value = checkSpamAndReplace(msgInput.value);
});

addBtn.addEventListener("click", checkAndPost);
