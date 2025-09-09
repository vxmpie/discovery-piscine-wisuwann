$(function () {
  function randomColor() {
    return `hsl(${Math.floor(Math.random()*360)},70%,70%)`;
  }
  $('#changer').on('click', () => {
    $('body').css('background-color', randomColor());
  });
});
