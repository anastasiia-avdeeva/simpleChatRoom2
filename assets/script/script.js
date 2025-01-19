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

function delWhiteSpace(input) {
  return input.trim().replace(/\s/g, "");
}

function alterFirstChar(input) {
  return input[0].toUpperCase() + input.slice(1).toLowerCase();
}

function pasteChangedName(evt) {
  switch (evt.type) {
    case "input":
      userNameInput.value = delWhiteSpace(userNameInput.value);
      break;
    case "change":
      if (userNameInput.value) {
        userNameInput.value = alterFirstChar(userNameInput.value);
      }
      break;
    default:
      console.warn(`Событие ${evt.type} не обработано`);
  }
}

function checkSpamAndReplace(input) {
  let msg = input.trim();
  msg = msg.replace(/viagra/gi, toReplace).replace(/xxx/gi, toReplace);

  return msg;
}

function pasteChangedMsg() {
  if (msgInput.value) {
    msgInput.value = checkSpamAndReplace(msgInput.value);
  }
}

function checkAndPost(evt) {
  evt.preventDefault();

  if (areFieldsEmpty()) {
    addInformPlaceholder(msgInput);
    if (showNameBtn.checked) {
      addInformPlaceholder(userNameInput);
    }
    return;
  }

  postComment();
}

function addInformPlaceholder(
  inputElem,
  message = "Пожалуйста, заполните поле"
) {
  if (!inputElem.value.trim()) {
    inputElem.placeholder = message;
    inputElem.classList.add("red-placeholder");
  }
}

function deleteInformPlaceholder(inputElem) {
  if (inputElem.placeholder) {
    inputElem.placeholder = "";
    inputElem.classList.remove("red-placeholder");
  }
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

  deleteElement("inform-paragraph");

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

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return now.toLocaleString("ru-Ru", options);
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

function deleteElement(id) {
  document.getElementById(id)?.remove();
}

function clearInput() {
  userNameInput.value = "";
  picLinkInput.value = "";
  msgInput.value = "";
  deleteInformPlaceholder(userNameInput);
  deleteInformPlaceholder(msgInput);
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

userNameInput.addEventListener("input", pasteChangedName);

userNameInput.addEventListener("change", pasteChangedName);

userNameInput.addEventListener("focus", () =>
  deleteInformPlaceholder(userNameInput)
);

msgInput.addEventListener("change", pasteChangedMsg);

msgInput.addEventListener("focus", () => deleteInformPlaceholder(msgInput));

addBtn.addEventListener("click", checkAndPost);
