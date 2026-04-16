const todos = [
  {
    id: "todo-1",
    title: "Design landing page mockup",
    description:
      "Create wireframes and high-fidelity screens for the new marketing landing page.",
    priority: "High",
    status: "in-progress",
    dueDate: "2026-04-15",
    tags: ["work", "design", "urgent"],
    completed: false,
  },
  {
    id: "todo-2",
    title: "Fix navigation bug on mobile",
    description:
      "The hamburger menu doesn't close after tapping a link on iOS Safari.",
    priority: "High",
    status: "in-progress",
    dueDate: "2026-04-13",
    tags: ["work", "urgent"],
    completed: false,
  },
  {
    id: "todo-3",
    title: "Write unit tests for auth module",
    description:
      "Cover login, logout, token refresh, and session expiry edge cases.",
    priority: "Medium",
    status: "pending",
    dueDate: "2026-04-19",
    tags: ["work", "testing"],
    completed: false,
  },
  {
    id: "todo-4",
    title: "Update project README",
    description:
      "Add setup instructions, environment variables, and deployment steps.",
    priority: "Low",
    status: "pending",
    dueDate: "2026-04-22",
    tags: ["docs"],
    completed: false,
  },
  {
    id: "todo-5",
    title: "Review pull request #42",
    description:
      "Check the new checkout flow implementation and leave feedback.",
    priority: "Medium",
    status: "pending",
    dueDate: "2026-04-14",
    tags: ["work", "review"],
    completed: false,
  },
  {
    id: "todo-6",
    title: "Set up CI/CD pipeline",
    description:
      "Configure GitHub Actions for automated testing and deployment to staging.",
    priority: "Medium",
    status: "in-progress",
    dueDate: "2026-04-17",
    tags: ["work", "devops"],
    completed: false,
  },
  {
    id: "todo-7",
    title: "Prepare sprint retrospective notes",
    description:
      "Summarise wins, blockers, and action items from the last two-week sprint.",
    priority: "Low",
    status: "done",
    dueDate: "2026-04-10",
    tags: ["work", "planning"],
    completed: true,
  },
  {
    id: "todo-8",
    title: "Migrate database to PostgreSQL",
    description:
      "Move all tables from SQLite to Postgres and update the ORM config.",
    priority: "High",
    status: "pending",
    dueDate: "2026-04-11",
    tags: ["work", "urgent", "backend"],
    completed: false,
  },
  {
    id: "todo-9",
    title: "Migrate database to PostgreSQL",
    description:
      "Move all tables from SQLite to Postgres and update the ORM config.",
    priority: "High",
    status: "pending",
    dueDate: "2026-04-16",
    tags: ["work", "urgent", "backend"],
    completed: false,
  },
];

// const mapDates = todos.map(dueDate);

const formatDueDate = (dateString) => {
  const date = new Date(dateString);

  const formatted = date.toLocaleDateString("en-us", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `Due ${formatted}`;
};

const formatStatus = (status) => {
  switch (status) {
    case "in-progress":
      return "In progress";
    case "pending":
      return "Pending";
    case "done":
      return "Done";
    default:
      return status;
  }
};

const isOverdue = (dateString) => new Date() > toMidnight(dateString);

// document.getElementById("test").innerHTML = `${formatDueDate("2026-02-18")}`;

// every due time is treated as a new day and would be calculated based on the hour left to the due date
const toMidnight = (dateString) => {
  const date = new Date(dateString);
  date.setHours(23, 59, 59, 999);
  return date;
};

// due time function
const getDueTime = (dateString) => {
  const dueTime = toMidnight(dateString);
  const currentTime = new Date();
  //   now.setHours(0, 0, 0, 0);

  const timeDifference = dueTime - currentTime;

  const minutes = Math.floor(Math.abs(timeDifference) / (1000 * 60));
  const hours = Math.floor(Math.abs(timeDifference) / (1000 * 60 * 60));
  const days = Math.floor(Math.abs(timeDifference) / (1000 * 60 * 60 * 24));

  if (timeDifference < 0) {
    if (minutes < 60)
      return `Overdue by ${minutes} min${minutes !== 1 ? "s" : ""}`;
    if (hours < 24) return `Overdue by ${hours} hour${hours !== 1 ? "s" : ""}`;
    return `Overdue by ${days} day${days !== 1 ? "s" : ""}`;
  }

  if (minutes < 60) return "Due now!";
  if (hours < 24) return `Due in ${hours} hour${hours !== 1 ? "s" : ""}`;
  if (days === 1) return "Due tomorrow";
  return `Due in ${days} days`;
};

// document.getElementById("test1").innerHTML = `${getDueTime("2026-02-18")}`;

function card(todo) {
  const article = document.createElement("article");
  article.setAttribute("data-testid", "test-todo-card");
  article.className = "card-ctn" + (todo.completed ? " is-done" : "");

  const tagsHTML = todo.tags
    .map(
      (tag) =>
        `<span data-testid="test-todo-tag-${tag}" class="tag">${tag}</span>`,
    )
    .join(" ");

  article.innerHTML = `
    <div class="task-title">
        <p data-testid="test-todo-title" class="title">${todo.title}</p>
        <div data-testid="test-todo-priority-indicator" class="priority-indicator priority-${todo.priority.toLowerCase()}">
          <p data-testid="test-todo-priority" class="priority" aria-label="Priority: ${todo.priority}">${todo.priority}</p>
        </div>
    </div>

    <!-- description -->
    <div id="collapsible-${todo.id}" data-testid="test-todo-collapsible-section" class="description-ctn">
      <p data-testid="test-todo-description" class="description ${todo.description.length > 40 ? "collapsed-description" : ""}">
        ${todo.description}
      </p>
      ${
        todo.description.length > 40
          ? `<button
            type="button"
            data-testid="test-todo-expand-toggle"
            class="toggle-btn"
            aria-expanded="false"
            aria-controls="collapsible-${todo.id}"
          >
            Show more
          </button>`
          : ""
      }
    </div>

    <!-- status -->
    <div class="status-ctn">
      <p class="status">Status: <span data-testid="test-todo-status" aria-label="Status: ${formatStatus(todo.status)}">${formatStatus(todo.status)}</span></p>
      <select
        data-testid="test-todo-status-control"
        name="status"
        class="status-control"
        aria-label="Change status for '${todo.title}'"
      >
        <option value="pending" ${todo.status === "pending" ? "selected" : ""}>Pending</option>
        <option value="in-progress" ${todo.status === "in-progress" ? "selected" : ""}>In progress</option>
        <option value="done" ${todo.status === "done" ? "selected" : ""}>Done</option>
      </select>
    </div>
    
    <hr />

    <!-- due date -->
    <div class="due-ctn">
        <p data-testid="test-todo-due-date" class="due-date">
         ${formatDueDate(todo.dueDate)}
        </p>
        <div class="time-ctn">
          ${isOverdue(todo.dueDate) && !todo.completed ? `<span data-testid="test-todo-overdue-indicator" class="overdue-badge" aria-label="Overdue" title="Overdue"></span>` : ""}
          <p data-testid="test-todo-time-remaining" class="due-time ${isOverdue(todo.dueDate) && !todo.completed ? "overdue" : ""}" aria-live="polite">
           ${todo.completed ? "Completed" : getDueTime(todo.dueDate)}
          </p>
        </div>
    </div>

    <!-- category -->
    <p data-testid="test-todo-tags" class="category">${tagsHTML}</p>

    <div class="modify">
        <div class="complete-ctn">
            <input
                type="checkbox"
                data-testid="test-todo-complete-toggle"
                class="complete-input"
                id="complete-${todo.id}"
                ${todo.completed ? "checked" : ""}
                aria-label="Mark '${todo.title}' as complete"
            />
            <label for="complete-${todo.id}" class="complete-label">Complete</label>
        </div>

        <div class="modify-ctn">
            <button data-testid="test-todo-edit-button" class="edit" aria-label="Edit task: ${todo.title}">
                Edit
            </button>
            <button data-testid="test-todo-delete-button" class="delete" aria-label="Delete task: ${todo.title}">
                Delete
            </button>
        </div>
    </div>
    `;

  const statusControl = article.querySelector(
    "[data-testid='test-todo-status-control']",
  );
  const checkbox = article.querySelector(
    "[data-testid='test-todo-complete-toggle']",
  );
  const todoStatus = article.querySelector("[data-testid='test-todo-status']");
  const todoTitle = article.querySelector("[data-testid='test-todo-title']");
  // const todoPriorityIndicator = article.querySelector(
  //   "[data-testid='test-todo-priority-indicator']",
  // );
  // const todoPriority = article.querySelector(
  //   "[data-testid='test-todo-priority']",
  // );
  const toggleButton = article.querySelector(
    "[data-testid='test-todo-expand-toggle']",
  );

  const description = article.querySelector(
    "[data-testid='test-todo-description']",
  );

  const timeLeft = article.querySelector(
    "[data-testid='test-todo-time-remaining']",
  );
  // const editBtn = article.querySelector(
  //   "[data-testid='test-todo-edit-button']",
  // );
  const editTodo = article.querySelector(
    "[data-testid='test-todo-edit-button']",
  );

  // apply initial completed state
  if (todo.completed) {
    todoTitle.style.textDecoration = "line-through";
  }

  // status control
  statusControl.addEventListener("change", () => {
    const selected = statusControl.value;
    const done = selected === "done";
    todoStatus.innerHTML = formatStatus(statusControl.value);
    article.classList.toggle("is-done", done);
    checkbox.checked = done;
    todoTitle.style.textDecoration = done ? "line-through" : "";
    timeLeft.textContent = done ? "Completed" : getDueTime(todo.dueDate);
  });

  // checkbox toggle
  checkbox.addEventListener("change", () => {
    const done = checkbox.checked;
    article.classList.toggle("is-done", done);
    statusControl.value = done ? "done" : "pending";
    todoStatus.innerHTML = formatStatus(statusControl.value);
    todoTitle.style.textDecoration = done ? "line-through" : "";
    timeLeft.textContent = done ? "Completed" : getDueTime(todo.dueDate);
  });

  // edit
  editTodo.addEventListener("click", () => {
    document.querySelector("[data-testid='test-todo-edit-title-input']").value =
      todoTitle.textContent;
    document.querySelector(
      "[data-testid='test-todo-edit-description-input']",
    ).value = description.textContent.trim();
    document.querySelector(
      "[data-testid='test-todo-edit-priority-select']",
    ).value = article
      .querySelector("[data-testid='test-todo-priority']")
      .textContent.toLowerCase();
    document.querySelector(
      "[data-testid='test-todo-edit-due-date-input']",
    ).value = article.dataset.dueDate;

    // console.log("Edit clicked:");
    todoModal.dataset.activeTodoId = todo.id;
    todoModal.style.display = "flex";

    document
      .querySelector("[data-testid='test-todo-edit-title-input']")
      .focus();
  });

  // delete
  article
    .querySelector("[data-testid='test-todo-delete-button']")
    .addEventListener("click", () => {
      alert("Delete clicked");
    });

  // toggle description
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
      description.classList.toggle("collapsed-description", isExpanded);
      toggleButton.setAttribute("aria-expanded", !isExpanded);
      toggleButton.textContent = isExpanded ? "Show more" : "Show less";
    });
  }

  article.dataset.dueDate = todo.dueDate;

  return article;
}

const board = document.getElementById("board");
todos.forEach((todo) => board.appendChild(card(todo)));

// refresh the time every 60 seconds
setInterval(() => {
  document
    .querySelectorAll("[data-testid='test-todo-card']")
    .forEach((card) => {
      const checkbox = card.querySelector(
        "[data-testid='test-todo-complete-toggle']",
      );
      if (checkbox.checked) return;

      const timeLeft = card.querySelector(
        "[data-testid='test-todo-time-remaining']",
      );
      timeLeft.textContent = getDueTime(card.dataset.dueDate);
    });
}, 30000);

// edit
const todoModal = document.querySelector("#todoModal");
const closeModal = document.querySelector("#cancelBtn");

function returnFocusToEditButton() {
  const activeId = todoModal.dataset.activeTodoId;
  if (!activeId) return;
  const activeCard = document
    .querySelector(`#complete-${activeId}`)
    ?.closest("[data-testid='test-todo-card']");
  activeCard?.querySelector("[data-testid='test-todo-edit-button']")?.focus();
}

closeModal.addEventListener("click", () => {
  todoModal.style.display = "none";
  returnFocusToEditButton();
  // console.log("fire");
});

window.addEventListener("click", (event) => {
  if (event.target == todoModal) {
    todoModal.style.display = "none";
    returnFocusToEditButton();
  }
});

const saveBtn = document.querySelector("[data-testid='test-todo-save-button']");

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const activeId = todoModal.dataset.activeTodoId;
  if (!activeId) return;

  const activeCard = document
    .querySelector(`#complete-${activeId}`)
    ?.closest("[data-testid='test-todo-card']");
  if (!activeCard) return;

  const newTitle = document
    .querySelector("[data-testid='test-todo-edit-title-input']")
    .value.trim();
  const newDesc = document
    .querySelector("[data-testid='test-todo-edit-description-input']")
    .value.trim();
  const newPriority = document.querySelector(
    "[data-testid='test-todo-edit-priority-select']",
  ).value;
  const newDate = document.querySelector(
    "[data-testid='test-todo-edit-due-date-input']",
  ).value;

  if (!newTitle) return;

  // update elements
  activeCard.querySelector("[data-testid='test-todo-title']").textContent =
    newTitle;
  activeCard.querySelector(
    "[data-testid='test-todo-description']",
  ).textContent = newDesc;
  activeCard.querySelector("[data-testid='test-todo-due-date']").textContent =
    formatDueDate(newDate);

  // update time remaining only if card is not done
  const cb = activeCard.querySelector(
    "[data-testid='test-todo-complete-toggle']",
  );

  if (!cb.checked) {
    activeCard.querySelector(
      "[data-testid='test-todo-time-remaining']",
    ).textContent = getDueTime(newDate);
  }

  // update priority indicator class and label
  const indicator = activeCard.querySelector(
    "[data-testid='test-todo-priority-indicator']",
  );
  indicator.className = `priority-indicator priority-${newPriority}`;
  activeCard.querySelector("[data-testid='test-todo-priority']").textContent =
    newPriority.charAt(0).toUpperCase() + newPriority.slice(1);

  // sync todos array so setInterval keeps using the updated dueDate
  const todoIndex = todos.findIndex((t) => t.id === activeId);
  if (todoIndex !== -1) {
    todos[todoIndex].title = newTitle;
    todos[todoIndex].description = newDesc;
    todos[todoIndex].priority = newPriority;
    todos[todoIndex].dueDate = newDate;
  }

  activeCard.dataset.dueDate = newDate;

  todoModal.style.display = "none";
  returnFocusToEditButton();
});

todoModal.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    todoModal.style.display = "none";
    returnFocusToEditButton();
  }

  if (e.key !== "Tab") return;


  const focusable = todoModal.querySelectorAll(
    "button, input, textarea, select, [tabindex]:not([tabindex='-1'])",
  );

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});
