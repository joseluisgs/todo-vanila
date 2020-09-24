/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* MIS SCRIPT */

// Recogemos los elementos con selectores que vamos a usar
// O haciendo uso de los elementos por clase
// Voy a usar querySelector que así los encuetro igual que lo definido en el CSS
// Aunque prefiero los getElementBy... porque así sabes lo que estas cogiendo y no presenta el problema de querySelectorAll()
// y te ayuda a la reactivdad o a que estén vivos. Tutorial recomendado numero 2
// Recomiendo estos tutoriales
// https://tobiasahlin.com/blog/move-from-jquery-to-vanilla-javascript/
// https://javascript.info/searching-elements-dom
// https://www.w3schools.com/jsref/met_document_queryselector.asp

const input = document.getElementById('nueva_tarea'); // document.querySelector('#nueva_tarea'); // por id: document.getElementById('nueva_tarea');
const ul = document.getElementsByClassName('todos')[0]; // Recojo el primero // document.querySelector('.todos'); // por clase: document.getElementsByClassName('todos');
// Con spans es interesante porque si usas querySelectorAll es estático y no lo puedes mofificar (añadir eventos) dinamicamente si modificas el doom
const spans = document.getElementsByTagName('span'); // document.querySelectorAll('span'); // por tag: document.getElementsByTagName("span");
const pencil = document.querySelector('#pencil');
const saveBtn = document.querySelector('#save_btn');
const clearBtn = document.querySelector('#clear_btn');
const tipsBtn = document.querySelector('#tips_btn');
const closeBtn = document.querySelector('#close_btn');
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

// Evento que al pulsar intro cargamos en la lista
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
  overlay.style.height = '100%';
});

// close overlay when close btn is clicked
closeBtn.addEventListener('click', (e) => {
  console.log('Has pulsado Cerrar');
  e.preventDefault; // Elimina el evento
  overlay.style.height = '0';
});

// Flujo de funciones iniciales
loadTodo(); // Cargamos si hay en memoria
deleteTodo(); // Actiavmos los eventos de los span
