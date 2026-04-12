const todos = [
  {
    id: "todo-1",
    title: "Design landing page mockup",
    description:
      "Create wireframes and high-fidelity screens for the new marketing landing page.",
    priority: "High",
    status: "In Progress",
    dueDate: "2026-04-20",
    tags: ["work", "design", "urgent"],
    completed: false,
  },
  {
    id: "todo-2",
    title: "Fix navigation bug on mobile",
    description:
      "The hamburger menu doesn't close after tapping a link on iOS Safari.",
    priority: "High",
    status: "In Progress",
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
    status: "Pending",
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
    status: "Pending",
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
    status: "Pending",
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
    status: "In Progress",
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
    status: "Done",
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
    status: "Pending",
    dueDate: "2026-04-11",
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

// document.getElementById("test").innerHTML = `${formatDueDate("2026-02-18")}`;

// every due time is treated as a new day and would be calculated based on the hour left to the due date
const toMidnight = (dateString) => {
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
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
        <p data-testid="test-todo-priority" class="priority" aria-label="Priority: ${todo.priority}">${todo.priority}</p>
    </div>

    <!-- description -->
    <p data-testid="test-todo-description" class="description">
        ${todo.description}
    </p>

    <!-- status -->
    <p class="status">Status: <span data-testid="test-todo-status" aria-label="Status: ${todo.status}">${todo.status}</span></p>

    <hr />

    <!-- due date -->
    <div class="due-ctn">
        <p data-testid="test-todo-due-date" class="due-date">
         ${formatDueDate(todo.dueDate)}
        </p>
        <p data-testid="test-todo-time-remaining" class="due-time" aria-live="polite">
         ${getDueTime(todo.dueDate)}
        </p>
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

  // checkbox toggle
  const checkbox = article.querySelector(
    "[data-testid='test-todo-complete-toggle']",
  );
  const todoStatus = article.querySelector("[data-testid='test-todo-status']");
  const todoTitle = article.querySelector("[data-testid='test-todo-title']");

  // apply initial completed state
  if (todo.completed) {
    todoTitle.style.textDecoration = "line-through";
  }

  checkbox.addEventListener("change", () => {
    const done = checkbox.checked;
    article.classList.toggle("is-done", done);
    todoStatus.textContent = `${done ? "Done" : todo.status}`;
    todoTitle.style.textDecoration = done ? "line-through" : "";
  });

  // edit
  article
    .querySelector("[data-testid='test-todo-edit-button']")
    .addEventListener("click", () => {
      console.log("Edit clicked:");
    });

  // delete
  article
    .querySelector("[data-testid='test-todo-delete-button']")
    .addEventListener("click", () => {
      alert("Delete clicked");
    });

  return article;
}

const board = document.getElementById("board");
todos.forEach((todo) => board.appendChild(card(todo)));

// refresh the time every 60 seconds
setInterval(() => {
  document
    .querySelectorAll("[data-testid='test-todo-card']")
    .forEach((card, i) => {
      const checkbox = card.querySelector(
        "[data-testid='test-todo-complete-toggle']",
      );
      if (!checkbox.checked) {
        const timeLeft = card.querySelector(
          "[data-testid='test-todo-time-remaining']",
        );
        timeLeft.textContent = getDueTime(todos[i].dueDate);
      }
    });
}, 60000);
