const userNameInput = document.getElementById("name-input");
const picLinkInput = document.getElementById("pic-input");
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

function areFieldsEmpty(name = true) {
  if (name) {
    return !userNameInput.value.trim() || !msgInput.value.trim();
  }
  return !msgInput.value.trim();
}

function isFieldsEmpty(fieldName) {
  return !fieldName.value.trim();
}

function postComment() {
  const mainContainer = createElemAddClass("div", "comment");

  const imgContainer = createElemAddClass("div", "comment__user-pic-container");

  const img = createElemAddClass("img", "comment__user-pic");
  addSrcAltToImg(
    img,
    picLinkInput.value,
    `Аватарка юзера ${userNameInput.value}`
  );
  imgContainer.append(img);

  const h3Elem = createElemAddClass(
    "h3",
    "comment__user-name",
    userNameInput.value
  );

  const pElem = createElemAddClass("p", "comment__user-msg", msgInput.value);

  mainContainer.append(imgContainer, h3Elem, pElem);

  delInformParagraph();

  comments.append(mainContainer);
  clearInput();
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
