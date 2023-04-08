const list = document.querySelector<HTMLUListElement>("#list");

const form = document.querySelector("#new-task-form") as HTMLFormElement | null;

const input = document.querySelector<HTMLInputElement>("#new-task-title");

const tasks: Task[] = loadTasksFromLocalStorage();

tasks.forEach(addListItem);

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!input || input?.value === "") {
    console.log("Please enter a task name");

    return;
  }

  const newTask: Task = {
    id: crypto.randomUUID(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);

  addListItem(newTask);

  input.value = "";
});

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

function addListItem(newTask: Task) {
  const item = document.createElement("li");

  const label = document.createElement("label");

  const checkbox = document.createElement("input");

  checkbox.addEventListener("change", () => {
    newTask.completed = checkbox.checked;

    saveTasksToLocalStorage();
  });

  checkbox.type = "checkbox";

  checkbox.checked = newTask.completed;

  label.append(checkbox, newTask.title);

  item.append(label);

  list?.append(item);

  saveTasksToLocalStorage();
}

function saveTasksToLocalStorage(): void {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");

  if (!taskJSON) {
    return [];
  }

  return JSON.parse(taskJSON);
}
