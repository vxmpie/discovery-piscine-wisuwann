const COOKIE_NAME="todos";
function saveTodos(t){ document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(t))}; path=/; max-age=31536000`; }
function loadTodos(){ const m=document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`)); if(!m) return []; try{ return JSON.parse(decodeURIComponent(m[1]))||[] }catch{ return [] } }

$(function(){
  const $list = $('#ft_list'), $empty = $('#empty');
  const todos = loadTodos();

  function updateEmpty(){ $empty.prop('hidden', $list.children().length>0); }
  function addTodo(text, {prepend=false}={}){
    const $div = $('<div class="todo"></div>').text(text);
    $div.on('click', function(){
      if(confirm('Remove this to-do?')){
        $(this).remove();
        const i = todos.indexOf(text);
        if(i!==-1){ todos.splice(i,1); saveTodos(todos); }
        updateEmpty();
      }
    });
    prepend ? $list.prepend($div) : $list.append($div);
  }

  // render from cookie (ล่าสุดอยู่บนสุด -> เก็บ array แบบล่าสุดก่อน)
  todos.forEach(t => addTodo(t));

  $('#new').on('click', function(){
    const val = prompt('New TO DO:');
    if(!val) return;
    const text = val.trim(); if(!text) return;
    addTodo(text, {prepend:true});
    todos.unshift(text); saveTodos(todos); updateEmpty();
  });

  updateEmpty();
});
