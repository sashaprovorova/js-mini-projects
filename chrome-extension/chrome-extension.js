let savedLeads = [];

const inputElement = document.querySelector(".save_info");
const saveButton = document.querySelector(".save_input");
const saveList = document.querySelector(".save_list");
const saveTab = document.querySelector(".save_tab");
const deleteButton = document.querySelector(".delete_input");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("savedLeads"));

if (leadsFromLocalStorage){
  savedLeads = leadsFromLocalStorage;
  render(savedLeads);
};

saveTab.addEventListener("click", ()=>{
  chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
    savedLeads.push(tabs[0].url);
    localStorage.setItem("savedLeads", JSON.stringify(savedLeads));
    render(savedLeads);
  });
});

function render(leads){
  let listItems = "";
  leads.forEach((item)=>{
    listItems += 
    `<li>
      <a target="_blank" href="${item}">
      ${item}
      </a>
    </li>`;
    // const li = document.createElement("li");
    // li.textContent = item;
    // saveList.append(li);
  });
  saveList.innerHTML = listItems;
};

deleteButton.addEventListener("dblclick", ()=>{
  localStorage.clear();
  savedLeads = [];
  render(savedLeads);
});

saveButton.addEventListener("click", ()=>{
  savedLeads.push(inputElement.value);
  inputElement.value = "";
  localStorage.setItem("savedLeads", JSON.stringify(savedLeads));
  render(savedLeads);
});


