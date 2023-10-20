(function () {
  let listArray = [],//делаем так чтобы сюда записывались дела
      listName = '';//делаем глобально, чтобы переменная была доступна не только в функции, но и по всему коду
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
        button.classList.add('btn', 'btn-primary', 'btn-disabled');//такой набор классов используется для единственной кнопки на форме либо кнопке на форме которая осуществляет основное действие
        button.disabled = true; //Добавили атрибут disabled
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);//1 - куда добавить , 2 - что добавить
        form.append(input);
        form.append(buttonWrapper);

        input.addEventListener('input', function(){ //Добавили атрибут disabled
          if (input.value !== ''){
            button.disabled = false;
          } else {
            button.disabled = true;
          }
        })

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




    // function createTodoItemObj(nameObj){
    //   let nameObj = {
    //     name: createTodoItemForm.input.value,
    //     done: false
    //   }
    // }



    function createTodoItem(obj) {
        let item = document.createElement('li');
        //кнопки помещаем в элемент, который красиво покажет их в одной группе
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        //устанавливаем стили для элемента списка, а также для размещения кнопок
        //в его правой части с помощью flex
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = obj.name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success')
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        if (obj.done == true) item.classList.add('list-group-item-success');

         //добавляем обработчики на кнопки
        doneButton.addEventListener('click', function() {
          item.classList.toggle('list-group-item-success')

          for (const listItem of listArray) {
            if(listItem.id == obj.id) {
              listItem.done = !listItem.done
            } //чтобы можно было нажатием на 1 кнопку делать выполненное дело и невыполненное
          }
          saveList(listArray, listName) //при нажатии сохраняем в localstorage
        });

        deleteButton.addEventListener('click', function(){
          if (confirm('Вы уверены?')) {
            item.remove();

            for (let i = 0; i < listArray.length; i++) {
              if(listArray[i].id == obj.id) {
               listArray.splice(i, 1)//функция удаления элемента из массива
              } //чтобы можно было нажатием на 1 кнопку делать выполненное дело и невыполненное
            }
            saveList(listArray, listName) //при удалении дела сохраняем в localstorage
          }

        });

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

    function getNewId(arr){//функция чтобы id у каждого элемента было свое и при удалении удалялся только тот элемент что надо
      let max = 0;
      for(const item of arr){
        if(item.id > max) {
          max = item.id
        }
      }''
      return max + 1;
    }

    function saveList(arr,keyName) {
      localStorage.setItem(keyName, JSON.stringify(arr))
    }

    function createTodoApp(container, title = 'Список дел', keyName) {
        //обработчик события
        // let container = document.getElementById('todo-app');//див в котором мы будем размещать наши предложения
        // let todoItem = createTodoItem();
        let todoAppTitle = createAppTitle(title);//вызываем поочередно 3 функции которые создали до этого
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        listName = keyName;//создали глобально вначале кода

        // container.append(todoItem);
        container.append(todoAppTitle);//их результат размещаем внутри контейнера
        container.append(todoItemForm.form);//возвращаем объект
        container.append(todoList);

        let localData = localStorage.getItem(listName) //извлекаем из LocalStorage

        if (localData !== null && localData !== '') {
          listArray = JSON.parse(localData)
        }//после перезагрузки не удаленный список остался в массиве + мы делали преобразование из строки и обратно

        for (const itemList of listArray) {
          let todoItem = createTodoItem(itemList);
          todoList.append(todoItem.item);
        }

        //браузер создает событие submit(свойственно только элементу form) на форме по нажатию enter или на кнопку создания дела
        todoItemForm.form.addEventListener('submit', function(e) {
            // эта строчка необходима чтобы предотвратить стандартное действие браузера
            //в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
            e.preventDefault();

            //игнорируем создание элемента если пользователь ничего не ввел в поле
            if (!todoItemForm.input.value) {
                return;
            }


            let newItem = {
              id: getNewId(listArray),
              name: todoItemForm.input.value,
              done: false,
            }

            let todoItem = createTodoItem(newItem);

            listArray.push(newItem)

            saveList(listArray, listName) //при добавлении дела сохраняем в localstorage

            //создаем и добавляем в список новое дело с названием из поля для ввода
            todoList.append(todoItem.item);

            todoItemForm.button.disabled = true; //чтобы при отправке формы снова кнопка становилась неактивной

            //обнуляем  значение в поле, чтобы не пришлось стирать его вручную
            todoItemForm.input.value = '';
        });
    }


    window.createTodoApp = createTodoApp;
})();


