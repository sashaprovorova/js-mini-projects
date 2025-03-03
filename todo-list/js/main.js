import ToDoList from "./todolist.js";
import ToDoItem from "./todoitem.js";

const toDoList = new ToDoList();

// wait for the document to fully load before launching the app
document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initApp();
  }
});

// launches the app: sets up event listeners and loads stored list data
const initApp = () => {
  const itemEntryForm = document.getElementById("itemEntryForm");
  itemEntryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    processSubmission();
  });

  const clearItems = document.getElementById("clearItems");
  clearItems.addEventListener('click', (event) => {
    const list = toDoList.getList();
    if (list.length) {
      const confirmed = confirm("Are you sure you want to clear the entire list?");
      if (confirmed) {
        toDoList.clearList();
        updatePersistentData(toDoList.getList());
        refreshThePage();
      }
    }
  });
  loadListObject();
  refreshThePage();
};

// loads stored list data from localStorage and populates the to-do list
const loadListObject = () => {
  const storedList = localStorage.getItem("myTodoList");
  if (typeof storedList !== "string") return;
  const parseList = JSON.parse(storedList);
  parseList.forEach(itemObj => {
    const newTodoItem = createNewItem(itemObj._id, itemObj._item);
    toDoList.addItemToList(newTodoItem);
  });
};

// refreshes the UI by clearing and re-rendering the to-do list
const refreshThePage = () => {
  clearListDisplay();
  renderList();
  clearItemEntryField();
  setFocusOnItemEntry();
};

// clears the to-do list display in the UI
const clearListDisplay = () => {
  const parentElement = document.getElementById("listItems");
  deleteContents(parentElement);
};

// removes all child elements from a parent element
const deleteContents = (parentElement) => {
  let child = parentElement.lastElementChild;
  while(child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

// renders the to-do list items in the UI
const renderList = () => {
  const list = toDoList.getList();
  list.forEach(item => {
    buildListItem(item);
  })
};

// creates a to-do list item and appends it to the UI
const buildListItem = (item) => {
  const div = document.createElement("div");
  div.className = "item";

  const check = document.createElement("input");
  check.type ="checkbox";
  check.id = item.getId();
  check.tabIndex = 0;
  addClickListenerToCheckbox(check);

  const label = document.createElement("label");
  label.htmlFor = item.getId();
  label.textContent = item.getItem();

  div.appendChild(check);
  div.appendChild(label);

  const container = document.getElementById("listItems");
  container.appendChild(div);
};

// adds a click event to checkboxes to remove items when checked
const addClickListenerToCheckbox = (checkbox) => {
  checkbox.addEventListener('click', (event) => {
    toDoList.removeItemFromList(checkbox.id);
    updatePersistentData(toDoList.getList());
    const removedText = getLabelText(checkbox.id);
    updateScreenReaderConfirmation(removedText, "removed from list");
    setTimeout(() => {
      refreshThePage();
    }, 1000);
  });
};

// retrieves the label text associated with a checkbox
const getLabelText = (checkboxId) => {
  return document.getElementById(checkboxId).nextElementSibling.textContent;
}

// updates localStorage with the latest to-do list data
const updatePersistentData = (listArray) => {
  localStorage.setItem("myTodoList", JSON.stringify(listArray));
};

// clears the text input field
const clearItemEntryField = () => {
  document.getElementById("newItem").value = "";
};

// sets focus on the input field for new to-do items
const  setFocusOnItemEntry = () => {
  document.getElementById("newItem").focus();
};

// processes form submission by creating and adding a new to-do item
const processSubmission = () => {
  const newEntryText = getNewEntry();
  if (!newEntryText.length) return;
  const nextItemId = calcNextItemId();
  const toDoItem = createNewItem(nextItemId, newEntryText);
  toDoList.addItemToList(toDoItem);
  updatePersistentData(toDoList.getList());
  updateScreenReaderConfirmation(newEntryText, "added")
  refreshThePage();
};

// retrieves the text input value, trimmed of whitespace
const getNewEntry = () => {
  return document.getElementById("newItem").value.trim();
};

// calculates the next ID for a new to-do item
const calcNextItemId = () => {
  let nextItemId = 1;
  const list = toDoList.getList();
  if (list.length > 0) {
    nextItemId = list[list.length - 1].getId()+1;
  }
  return nextItemId;
};

// creates a new to-do item object
const createNewItem = (itemId, itemText) => {
  const toDo = new ToDoItem();
  toDo.setId(itemId);
  toDo.setItem(itemText);
  return toDo;
}

// updates the screen reader confirmation message for accessibility
const updateScreenReaderConfirmation = (newEntryText, actionVerb) => {
  document.getElementById("confirmation").textContent = `${newEntryText} ${actionVerb}.`
};