let emailField = document.getElementById('emailField')
let registrationForm = document.getElementById('registrationForm') // объявление переменной для формы 

function uploadRegisterinfo(event) { // функция-обработчик элемента submit формы registrationForm.
	if (loginField.value.length >= 6 && regexpLogin.test(String(loginField.value)) == false && passField.value.length >= 6 && regexpPass.test(String(passField.value)) == false) { // если все соотвествует условиям регистрации, то
	event.preventDefault() // Метод preventDefault () интерфейса Event сообщает User agent, что если событие не обрабатывается явно, его действие по умолчанию не должно выполняться так, как обычно
	let form = registrationForm.elements
	fetch('/registerSuccess.html', { // функция fetch позволяет отправить запрос на сервер. В параметрах функции указывается URL и опции
		method : 'POST', // указываем, что метод запроса на сервер будет POST, что необходимо для передачи данных
		body : JSON.stringify({ // Метод JSON.stringify() преобразует значение JavaScript в строку JSON
			"email" : document.getElementById('emailField').value, // параметр email массива замены для элемента emailField
			"login" : document.getElementById('loginField').value, // параметр login массива замены для элемента loginField
			"password" : document.getElementById('passField').value // параметр password массива замены для элемента passField
		}) 
	})
	.then(response => response.text()) // позволяет получить тело ответа как обычный текст
	document.location.href = 'registerSuccess.html' // по вызову обработчика также происходит редирект на registerSuccess.html
	document.cookie = 'login=' + loginField.value // задаются cookie вида login=user_login (key=value)
	} else { // если не соотвествует условиям регистрации, то
	alert('Enter correct data') // вывести сообщение о некорректных данных
	event.preventDefault() // не делать редирект на querry string URL
	}
} 

registrationForm.addEventListener('submit', uploadRegisterinfo) // по нажатию на элемент формы registrationForm - submit, срабатывает функция обработчик uploadRegisterinfo. submit – пользователь отправил форму <form>.
// submit - это тип прослушиваемого события. uploadRegisterinfo - объект, который принимает уведомление, когда событие указанного типа произошло.

