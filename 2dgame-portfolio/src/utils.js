export function displayDialogue(text, onDisplayEnd) {
  const dialogueUI = document.getElementById("textbox-container");
  const dialogue = document.getElementById("dialogue");

  dialogueUI.style.display = "block";

  let index = 0;
  let currentText = "";

  // simulate text appearing one letter at a time
  const intervalRef = setInterval(() => {
    if (index < text.length) {
      currentText += text[index]; // append next letter
      dialogue.innerHTML = currentText; // update ui
      index++;
      return;
    }

    clearInterval(intervalRef); // stop interval once text is fully displayed
  }, 5);

  const closeBtn = document.getElementById("close");
  function onCloseBtnClick() {
    onDisplayEnd(); // callback function to resume game
    dialogueUI.style.display = "none"; // hide dialogue box
    dialogue.innerHTML = ""; // clear dialogue text
    clearInterval(intervalRef);
    closeBtn.removeEventListener("click", onCloseBtnClick); // recursion

    addEventListener("keypress", (key) => {
      if (key.code === "Enter") {
        closeBtn.click();
      }
    });
  }
  closeBtn.addEventListener("click", onCloseBtnClick);
}

export function setCamScale(k) {
  const resizeFactor = k.width() / k.height();
  if (resizeFactor < 1) {
    // if the aspect ratio is less than 1 (portrait mode), it sets the camera scale to 1 (default view)
    k.camScale(k.vec2(1));
    return;
  }
  //  if the aspect ratio is greater than or equal to 1 (landscape mode), it adjusts the camera scale to 1.5 for a wider view
  k.camScale(k.vec2(1.5));
}
