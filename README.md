# Websocket

Для соединения используется интерфейс [WebSocket](https://developer.mozilla.org/ru/docs/Web/API/WebSocket).

## Открытие соединения
```javascript
WebSocket WebSocket(
  in DOMString url,
  in optional DOMString protocols
);
```

Объект WebSocket предоставляет АПИ для создания и управления вебсокет-подключения к серверу, а также для отправки и получения данных в этом подключении.

_host_ – адрес websocket–сервера
Возвращает объект _WebSocket_, если соединение установлено успешно.

Пример: 
```javascript 
var socket = new WebSocket("ws://javascript.ru/ws");
```

## Закрытие соединения
Используется метод close. Метод не возвращает данных.

Пример:
```javascript 
socket.close();
```


## Пересылка данных
Используется метод send. Метод не возвращает данных. 

Пример:
```javascript 
socket.send("Привет");
```

# Методы API

Методы принимают и возвращают данные в формате [JSON](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/JSON)

## GET: /editor/create
Метод создает документ для редактирования. Возвращает id созданного документа: 

```json 
{"id" : "123"}
```

## GET: /editor/:id
Принимает параметр id - идентификатор документа.
Возвращает данные документа (текст и количество пользователей онлайн).

```json 
{
    "text" : "some text",
    "users" : "3"
}
```

## POST: /editor/operation
Принимает данные следующего вида:

```json
{
    "type": "operation type (insert/delete)",
    "lines": ["some text"],
    "range": {
        "start": {"row": 0, "column": 3},
        "end": {"row": 0, "column": 5}
    }
}
```

Для добавления/удаления текста используется один метод, чтобы можно было делать очередь из запросов на сервере и точно знать, изменения какого пользователя были последними.

# Как запустить приложение
1. Установить библиотеки. В консоли выполнить:
```
npm install
```

2. Собрать js. В консоли выполнить:
```
npm run build
npm start
```

3. Запустить сервер:
```
npm start
```

4. Открыть http://127.0.0.1:8080/