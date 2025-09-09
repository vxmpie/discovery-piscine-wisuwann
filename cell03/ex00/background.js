function randomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 70%, 70%)`;
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("changer");
  btn.addEventListener("click", () => {
    document.body.style.backgroundColor = randomColor();
  });
});
