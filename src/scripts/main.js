/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* MIS SCRIPT */

// Recogemos los elementos con selectores que vamos a usar
// O haciendo uso de los elementos por clase
// Se puede usar querySelector que así los encuetro igual que lo definido en el CSS
// El unico problema de los querySelector es querySelectorAll() que devueve objetos estaticos
// Por lo tanto no podemos modificarlos como hacemos con los span sobre la marcha y los eventos
// Recomiendo estos tutoriales
// https://tobiasahlin.com/blog/move-from-jquery-to-vanilla-javascript/
// https://javascript.info/searching-elements-dom
// https://www.w3schools.com/jsref/met_document_queryselector.asp

const input = document.getElementById('todo_new'); // document.querySelector('#nueva_tarea'); // por id: document.getElementById('nueva_tarea');
const ul = document.getElementById('todo_list'); // document.getElementsByClassName('todos')[0]; // Recojo el primero // document.querySelector('.todos');
// Con spans es interesante porque si usas querySelectorAll es estático y no lo puedes mofificar (añadir eventos) dinamicamente si modificas el doom
const spans = document.getElementsByTagName('span'); // document.querySelectorAll('span'); // por tag: document.getElementsByTagName("span");
const pencil = document.getElementById('pencil'); // document.querySelector('#pencil');
const saveBtn = document.getElementById('save_btn'); // document.querySelector('#save_btn');
const clearBtn = document.getElementById('clear_btn'); // document.querySelector('#clear_btn');
const tipsBtn = document.getElementById('tips_btn'); // document.querySelector('#tips_btn');
const closeBtn = document.getElementById('close_btn'); // document.querySelector('#close_btn');
const overlay = document.getElementById('overlay');

// Función para testear los elementos DOM recogidos
function testDOMElements() {
  console.log(input);
  console.log(ul);
  console.log(spans);
  console.log(pencil);
  console.log(saveBtn);
  console.log(clearBtn);
  console.log(tipsBtn);
  console.log(closeBtn);
  console.log(overlay);
}

// Testeamos la carga de elementos
testDOMElements();

// FUNCIONES Y EVENTOS

// Cargamos de la lista de almacenamiento
function loadTodo() {
  if (localStorage.getItem('todolist-vanilla')) {
    ul.innerHTML = localStorage.getItem('todolist-vanilla');
    console.log('Lista cargada');
  }
}

// Evento para todos los spans
function deleteTodo() {
  const lista = Array.from(spans); // Los trasformo en un array, podría ahorrame esto y recorrelos con un for ... of que es lo mismo
  console.log(lista);
  lista.forEach((span) => {
    span.addEventListener('click', () => {
      console.log('Has pulsado span');
      span.parentElement.remove();
      // event.stopPropagation();
    });
  });
}

// Evento que al pulsar intro cargamos en la lista el contenido del input
input.addEventListener('keypress', (keyPressed) => {
  // Si es intro
  if (keyPressed.which === 13) {
    console.log('Has pulsado Enter');
    // creamos el nodo de la lista y su span
    const li = document.createElement('li');
    const spanElement = document.createElement('span');
    const icon = document.createElement('i');
    // tomamos el valor del input y lo ponemos al blanco
    const newTodo = input.value;
    input.value = '';
    // Le ponemos el estilo al icono
    icon.classList.add('fas', 'fa-trash-alt');
    spanElement.append(icon); // Se lo añadimos
    ul.appendChild(li).append(spanElement, newTodo); // añadimos
    // Activamos el eventos de span
    deleteTodo();
  }
});

// Evento de si has pulsado una lista
ul.addEventListener('click', (ev) => {
  if (ev.target.tagName === 'LI') {
    console.log('Has pulsado un elemento de la lista li');
    // Intercambiamos o activamos o desactivamos el estilo
    ev.target.classList.toggle('checked');
  }
});

// Evento que oculta el input al pulsar el lapiz
pencil.addEventListener('click', () => {
  console.log('Has pulsado Lápiz');
  input.classList.toggle('display');
});

// Evento que salva los resultados en almacenamiento
saveBtn.addEventListener('click', () => {
  console.log('Has pulsado Salvar');
  localStorage.setItem('todolist-vanilla', ul.innerHTML);
});

// Evento que limpia la lista y borra del amacenamiento
clearBtn.addEventListener('click', () => {
  console.log('Has pulsado Limpiar');
  ul.innerHTML = '';
  localStorage.removeItem('todolist-vanilla', ul.innerHTML);
});

// Evento que muestra los trucos
tipsBtn.addEventListener('click', () => {
  console.log('Has pulsado Trucos');
  overlay.style.height = '100%'; // cambiamos el estilo y le damos altura del 100%
});

// Evento que cierra la ventana de trucos
closeBtn.addEventListener('click', (e) => {
  console.log('Has pulsado Cerrar');
  e.preventDefault; // Elimina el evento
  overlay.style.height = '0'; // la minimizamos totalmente
});

// Flujo de funciones iniciales
loadTodo(); // Cargamos si hay en memoria
deleteTodo(); // Actiavmos los eventos de los span
