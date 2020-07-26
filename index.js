// 4. Существует страница на домене domain.one,
//  на которой загружается iframe с другого домена
//   - domain.two. Нужно на странице domain.one 
//   использовать скрипт для записи/чтения/удаления 
//   данных из localStorage домена domain.two. При 
//   этом оба домена под нашим управлением, то есть, 
//   мы можем изменять файлы и там, и там, как нам удобно.

// Задача: написать реализацию методов для чтения/записи
// /удаления данных из доступного localStorage другого домена. 
// Пусть при успешном чтении данные выводятся в консоль, а при 
// успешной записи/удалении в консоль отправляется лог вроде
//  “written” или “removed”.

const input = document.getElementById("input-value");
const save = document.getElementById("save");
const look = document.getElementById("look");
const del = document.getElementById("del");
const upper = document.getElementById("upper");
const iframe = document.getElementById("iframe");

iframe.onload = function () {
  save.addEventListener("click", () => {
    iframe.contentWindow.postMessage(localStorage.setItem('test', input.value), '*');
    console.log("written");
  });
  look.addEventListener("click", () => {
    iframe.contentWindow.postMessage(localStorage.getItem('test', input.value), '*');
    console.log(localStorage.getItem('test'));
  });
  del.addEventListener("click", () => {
    iframe.contentWindow.postMessage(localStorage.removeItem('test'), '*');
    console.log("removed");
  });

  //   5. Для работы с кросс-доменным localStorage понадобилось
  //    не только чтение/запись/удаление данных из него,
  //     но и их дополнительная обработка. 

  // Задача: добавить в решение задачи 4 возможность
  //  передать callback и вызвать его на domain.one после 
  //  выполнения операции чтения/записи/удаления.

  upper.addEventListener("click", () => {
    iframe.contentWindow.postMessage(localStorage.getItem('test', input.value), '*');
    let changeValue = localStorage.getItem('test');
    iframe.contentWindow.postMessage('callback', '*');
    let funcString = localStorage.getItem("callback");
    //можно через eval
    // const startFunc = eval('(' + funcString + ')');
    // startFunc();
    const arrFunc = funcString.split("=>");
    const callbackFunc =
      new Function(arrFunc[0].trim(), arrFunc[1].trim());
    console.log(callbackFunc(changeValue));

  });
};

