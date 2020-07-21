
// перечисление констант, модулей, запрашиваемых далее
const http = require('http') // подключение http модуля
const fs = require('fs') // модуль файловой системы
const path = require('path') // модуль для работы с путями и именами файлов
const port = 3000 // указание порта
const hostname = 'localhost' // указание хоста
const { parse } = require('querystring') // подключение парсера, нужен был для тестирования парсинга boby запроса клиента
const mysql = require("mysql2") // подключение модуля mysql

// Подключение к БД
const connection = mysql.createConnection({ // создаем подключение к БД
  host: "localhost", // имя хоста БД
  user: "makeev39_project", // имя БД
  database: "makeev39_project", // имя ползователя БД
  password: "*1zDXvjI" // пароль БД
});



			// const sql = "SELECT LOGIN FROM users" // объявление переменной со значением самого запроса в БД
			// connection.query(sql, function(err, results) { // фунция запроса к БД
   //  			if(err) {
   //  			console.log(err); // если ошибки, то они выводятся
   //  			} else {
			// 		for (let i = 0; i < results.length && results[i].LOGIN == lo; i++) { // использование цикла, чтобы проверить каждый индекс массива на совпадение. [i] позволяет проверить каждый элемент массива, а .LOGIN - каждый элемент объекта, которых в массиве много. По сути делается выборка определенного параметра (логин) из всех объектов массива, полученного из запроса к БД
			// 		console.log(results[i].LOGIN) // выводим все значения столбца LOGIN из БД построчно
			// 		if (results[i].LOGIN == lo) {
			// 			console.log('already')
			// 		} else if (results[i].LOGIN != 'admin') { 
			// 			console.log('done')
			// 		}
			// 		}
			// 	}
			// });





// сама работа сервера
const httpServer = http.createServer((request, response) => { // request - то что мы посылаем на сервер, response - то, что сервер отвечает
	console.log(`request: ${request.url}`) // ответ сервера, url адреса, который запрашивает пользователь (в консоль nodejs будет отдаваться запрошенный адрес)
	if (request.url === '/') { // если request.url совпадает с /, что будет отдаваться index.html (отдача при запросе корня проекта)
		sendRes('index.html', 'text/html', response) // sendRes для функции указывается файл, который нужгно отдавать, явно указывается mime-тип файла. Функции sendRes указывается имя, тип ресурса (MIME-type) и функция response которая будет отвечать на данный запрос.
	} 
// делаем еще один if
	// else if (request.url === '/registerSuccess.html') {
	// sendRes('registerSuccess.html', 'text/html', response)
	// }
//
	else if (request.url === '/registerSuccess.html' && request.method === 'POST') { // если запрашиваемая URL и метод запроса POST, то
		let body = '' // создаем переменную boby - это тело запроса, с пусты значением. Сюда будет подставляться тело запроса
		request.on('data', chunk => { // on связывает событие в объект. Это способ выразить свое намерение, если что-то происходит (отправленные данные или ошибка в вашем случае), а затем выполнить функцию, добавленную в качестве параметра. Этот стиль программирования называется программированием на основе событий 
			body += chunk.toString() // добавление к телу chunk. chunk позволяет сохранять куски тела запроса в кеше, ускоряя загрузку тела. Если этой строки не будет, загрузка тела подвиснет
		})
		request.on('end', () => { // закончить запрос, при этом
			console.log(typeof(body)) // выводится тип значение переменной body (в нашем случае на тело {email: 1, login: 2, password: 3} будет отдаваться String, т.к. тело передается в виде строки)
			let a = eval('(' + body + ')') // введение переменной a, которая преващает body из строки в объект: 
			console.log(a) // { email: 1, login: 2, password: 3 }
			console.log(typeof(a)) // object
			console.log(a['email']) // вывести значение email
			console.log(a['login']) // вывести значение login
			console.log(a['password']) // вывести значение password

			connection.connect(function(err){ // фунция установки соединения с БД. Для установки подключения мы можем использовать метод connect() объекта connection. Метод connect() принимает функцию, параметр которой содержит ошибка, которая возникла при подключении.
    			if (err) { // если ошибка, то 
      			return console.error("Ошибка: " + err.message); // вывести текст ошибкb
   	 			} else{ // если нет, то
      				console.log("Подключение к серверу MySQL успешно установлено"); // сообщение об успешном подключении к БД
   					 }
 			});

			let lo = a['login'] // объявление переменной со значением логина из объекта в теле запроса
			let pa = a['password'] // объявление переменной со значением пароля из объекта в теле запроса
			let em = a['email'] // объявление переменной со значением email из объекта в теле запроса



			
			const sql = "INSERT INTO users(LOGIN, PASSWORD, EMAIL) VALUES('"+ lo +"', '"+ pa +"', '"+ em +"')" // объявление переменной со значением самого запроса в БД
			connection.query(sql, function(err, results) { // фунция запроса к БД
    			if(err) console.log(err); // если ошибки, то они выводятся
    			else console.log("Данные добавлены"); // если ошибок нет, то сообщение об успешном добавлении данных
			});

			connection.end(function(err) { // функция закрытия соединения. Для закрытия подключения применяется метод end(). Метод end() гарантирует, что перед закрытием подключения к бд будут выполнены все оставшиеся запросы, которые не завершились к моменту вызова метода. Если мы не вызовем этот метод, то подключение будет оставаться активным, и приложение Node.js продолжит свою работу, пока сервер MySQL не закроет подключение. Если же нам надо немедленно закрыть подключение, не дожидаясь выполнения оставшихся запросов, то в этом случае можно применить метод destroy()
  				if (err) { // если ошибки, то
    				return console.log("Ошибка: " + err.message); // выводится текст ошибки
 				}
  				console.log("Подключение закрыто"); // если ошибок нет, то сообщение о закрытии соединения
				});
			response.end('ok') // конец ответа 
		})
	}
// до сюда делаем POST
	else {
		sendRes(request.url, getContentType(request.url), response) // данная функция, говорит, что делать, когда запрашивается не html, будет определять тип файла.
// getContentType() будет определять mime-type контента (обработка статики)
	}
}).listen(port, hostname, () => { // слушать порт и хост
	console.log('nodejs port: 3000 host: localhost') // вывод, инофрмация о том, что прот слушает
}) 


// функция отдачи документа, или отдачи ошибки (функция отправки информации на сервер)
function sendRes(url, contentType, response) { // функции передается три параметра - url, contentType, response
	let file = path.join(__dirname+'/static/', url) // формируем путь к фалу. _dirname - текущая диретория
	fs.readFile(file, (err, content) => { // прочиать путь и найти файл, первый параметр - ошибка, второй - обработка файла
		if (err) { // если ошибка
			response.writeHead(404) //  используем метод writeHead отдающий 404 код ответа, т.е. устанавливаем заголовк ответа для ошибки
			response.write('File not found :(') // текст ответа, это мы увидим в браузере
			response.end() // конец ответа. Можно 'File not found :(' поместить в response.end() и удалить response.write('File not found :(')
			console.log(`error 404 ${file}`) // ответ сервера в консоли об отсуствии файла с указанием имени запрашиваемого файла
		} else { // если нет ошибок
			response.writeHead(200, {'Content-Type':contentType}) // установка заголовка 200 и тип контента, чтобьы браузер мог корректно отработать
			response.write(content) // это мы увидим в браузере, по сути отдача документа, контента
			response.end() // конец ответа
			console.log(`response 200 ${file}`) // ответ сервера в консоли об наличии файла с указанием имени запрашиваемого файла
		}
	}) // fs.readFile - функция будет читать файл, принимает два параметра - сам файл и функция обработки (ошибки, результат)
}


// функция определения mime-type запрашиваемого документа
function getContentType(url) { // это функция getContentType, определяющая тип контента на основании URL-запроса
	switch (path.extname(url)) { // (path.extname(url)) - возвращает расширение по запросу к файлу
		case '.html': // если расширение .html, то
			return 'text/html' // возвращаем mime-type text/html
		case '.css':
			return 'text/css'
		case '.js':
			return 'text/javascript'
		case '.json':
			return 'application/json'
		case '.jpg':
			return 'image/jpeg'
		case '.jpeg':
			return 'image/jpeg'
		default:
			return 'application/octate-stream'
	} 
}
