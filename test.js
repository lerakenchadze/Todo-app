(function () {
  // создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
      let appTitle = document.createElement('h2');
      appTitle.innerHTML = title; // присваиваем внутрреннему содержимому этого тега title который мы передаем в качестве аргумента
      return appTitle;
  }

  // создаем и возвращаем форму для создания дела
  function createTodoItemForm() {
      let form = document.createElement('form');
      let input = document.createElement('input');//поле для ввода создаем
      let buttonWrapper = document.createElement('div'); //чтобы правильно стилизовать кнопку в стилях bootstrap
      let button = document.createElement('button');

      form.classList.add('input-group', 'mb-3');//классы bootstrap можно посмотреть что значат в интернете (этот параметр это просто установление классов)
      input.classList.add('form-control');//класс bootstrap
      input.placeholder = 'Введите название нового дела';//отображается когда в поле ничего не введено
      buttonWrapper.classList.add('input-group-append');//класс нужен для того чтобы позиционировать какой то элемент в форме справа от нашего поля для ввода
      button.classList.add('btn', 'btn-primary');//такой набор классов используется для единственной кнопки на форме либо кнопке на форме которая осуществляет основное действие
      button.textContent = 'Добавить дело';

      buttonWrapper.append(button);//1 - куда добавить , 2 - что добавить
      form.append(input);
      form.append(buttonWrapper);

      //для наглядности html
      //<form class="input-group mb-3">
        // <input class="form-control" placeholder="Введите название нового дела">
        //      <div class="input-group-append">
        //         <button class="btn btn-primary">
        //             Добавить дело
        //         </button>
        //         </div>
        // </form>


      return {
          form,
          input,
          button,
      };
  }

  // создаем и возвращаем список элементов
  function createTodoList() {
      let list = document.createElement('ul');
      list.classList.add('list-group');
      return list;
  }


  function createTodoItem(name) {
      let item = document.createElement('li');
      //кнопки помещаем в элемент, который красиво покажет их в одной группе
      let buttonGroup = document.createElement('div');
      let doneButton = document.createElement('button');
      let deleteButton = document.createElement('button');

      //устанавливаем стили для элемента списка, а также для размещения кнопок
      //в его правой части с помощью flex
      item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
      item.textContent = name;

      buttonGroup.classList.add('btn-group', 'btn-group-sm');
      doneButton.classList.add('btn', 'btn-success')
      doneButton.textContent = 'Готово';
      deleteButton.classList.add('btn', 'btn-danger');
      deleteButton.textContent = 'Удалить';

      //вкладываем кнопки в отдельный элемент, чтобы они объединились в 1 блок
      buttonGroup.append(doneButton);
      buttonGroup.append(deleteButton);
      item.append(buttonGroup);

      //приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатитя
      return {
          item,
          doneButton,
          deleteButton,
      };
  }

  function createTodoApp(container, title = 'Список дел'){
    // let container = document.getElementById('todo-app');//Приложение в котором будем размещать все функции, после рпзделения кода container будет передаваться аргументом

    let todoAppTitle = createAppTitle(title);//вернут сам дом элемент
    let todoItemForm = createTodoItemForm();//возвращаем объект в котором помимо всего прочего есть форм
    let todoList = createTodoList();//вернут сам дом элемент
    // let todoItems = [createTodoItem('Сходить за хлебом'), createTodoItem('Купить молоко')];

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);
    // todoList.append(todoItems[0].item);//т.к и там и там возвращается  объект то добавляем .item
    // todoList.append(todoItems[1].item);
  }

  function createTodoApp(container, title = 'Список дел') {
      //обработчик события
      // let container = document.getElementById('todo-app');//див в котором мы будем размещать наши предложения
      // let todoItem = createTodoItem();
      let todoAppTitle = createAppTitle(title);//вызываем поочередно 3 функции которые создали до этого
      let todoItemForm = createTodoItemForm();
      let todoList = createTodoList();

      // container.append(todoItem);
      container.append(todoAppTitle);//их результат размещаем внутри контейнера
      container.append(todoItemForm.form);//возвращаем объект
      container.append(todoList);

      //браузер создает событие submit(свойственно только элементу form) на форме по нажатию enter или на кнопку создания дела
      todoItemForm.form.addEventListener('submit', function(e) {
          // эта строчка необходима чтобы предотвратить стандартное действие браузера
          //в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
          e.preventDefault();

          //игнорируем создание элементаб если пользователь ничего не ввел в поле
          if (!todoItemForm.input.value) {
              return;
          }

          let todoItem = createTodoItem(todoItemForm.input.value);

          //добавляем обработчики на кнопки
          todoItem.doneButton.addEventListener('click', function() {
              todoItem.item.classList.toggle('list-group-item-success');
          });
          todoItem.deleteButton.addEventListener('click', function(){
              if (confirm('Вы уверены?')) {
                  todoItem.item.remove();
              }
          });

          //создаем и добавляем в список новое дело с названием из поля для ввода
          todoList.append(todoItem.item);

          //обнуляем  значение в поле, чтобы не пришлось стирать его вручную
          todoItemForm.input.value = '';
      });
  }


  window.createTodoApp = createTodoApp;
})();


// document.addEventListener('DOMContentLoaded', function() {
//     createTodoApp(document.getElementById('my-todos'), 'Мои дела');
//     createTodoApp(document.getElementById('mom-todos'), 'Дела для мамы');
//     createTodoApp(document.getElementById('dad-todos'), 'Дела для папы');
// });

