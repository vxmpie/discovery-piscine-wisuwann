const COOKIE_NAME = "todos";
function saveTodos(todos) {
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(todos))}; path=/; max-age=31536000`; // 365d
}
function loadTodos() {
  const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  if (!m) return [];
  try { return JSON.parse(decodeURIComponent(m[1])) || []; } catch { return []; }
}

const list = () => document.getElementById("ft_list");
const emptyMsg = () => document.getElementById("empty");

function updateEmptyVisibility() {
  emptyMsg().hidden = list().children.length > 0;
}

function makeTodoDiv(text, todos) {
  const div = document.createElement("div");
  div.className = "todo";
  div.textContent = text;
  div.addEventListener("click", () => {
    if (confirm("Remove this to-do?")) {
      div.remove();
      const idx = todos.indexOf(text);
      if (idx !== -1) { todos.splice(idx, 1); saveTodos(todos); }
      updateEmptyVisibility();
    }
  });
  return div;
}

document.addEventListener("DOMContentLoaded", () => {
  const btnNew = document.getElementById("new");
  const todos = loadTodos();             
  todos.forEach(t => list().appendChild(makeTodoDiv(t, todos)));
  updateEmptyVisibility();

  btnNew.addEventListener("click", () => {
    const text = prompt("New TO DO:");
    if (!text) return;                    
    const trimmed = text.trim();
    if (!trimmed) return;
    const div = makeTodoDiv(trimmed, todos);
    list().prepend(div);
    todos.unshift(trimmed);
    saveTodos(todos);
    updateEmptyVisibility();
  });
});
