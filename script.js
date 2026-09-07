const taskList = document.getElementById("task-list");

taskList.addEventListener("click", (event) => {
  const taskItem = event.target.closest(".task-item");

  if (event.target.classList.contains("complete-button")) {
    taskItem.classList.toggle("completed");
  }

  if (event.target.classList.contains("delete-button")) {
    taskItem.remove();
  }
});
