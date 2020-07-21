// 1.0 LOGIN Функция появления правил ввода логина. Смысл: при нажатии на элемент id="loginField", элемент id="loginRuleMessage" будет плавно появляться
// Функция плавного появления:
function fadeInLogin(login, speed) {
  let step = 1 / speed
  let interval = setInterval(function() { // задаем функцию интервала, состоящую из вложенной функции и времени интервала, запуска вложенной функции
    if (+login.style.opacity >= 1) { // + необходим для того, чтобы величину login.style.opacity (прозрачность) привести к числовому значению и сравнить с 1.
    	clearInterval(interval) // позволяет прекратить запуск фложенной функции
    }
    	login.style.opacity = +loginRuleMessage.style.opacity + step // прибавить к значению прозрачности число, равное 1 / speed
  }, speed / 1000)
}
// Назначение элементов из index.html:
let loginRuleMessage = document.getElementById('loginRuleMessage') // просто создаем переменные для работы с вытянутыми из index.html селекторами идектификатора.
let loginField = document.getElementById('loginField') // просто создаем переменные для работы с вытянутыми из index.html селекторами идектификатора.
// Функция действия по клику, запрашивающая Функцию плавного появления:
loginField.addEventListener('click', function(event) { // addEventListener добавляет событие для loginField, т.е поля ввода логина
  fadeInLogin(loginRuleMessage, 300) // click - это тип действия пользователя на сайте, function(event) - это то что происходит на действие пользователя 
}) // для корректной работы функции для id="loginRuleMessage" и id="passRuleMessage" задана прозрачность 0 в mainPageStyle.css

// 2.0 PASSWORD Функция появления правил ввода пароля, идентична Функции появления правил ввода логина
function fadeInPass(pass, speed) {
  let step = 1 / speed
  let interval = setInterval(function() {
    if (+pass.style.opacity >= 1) {
    	clearInterval(interval)
    }
    	pass.style.opacity = +passRuleMessage.style.opacity + step
  }, speed / 1000)
}

let passRuleMessage = document.getElementById('passRuleMessage')
let passField = document.getElementById('passField')

passField.addEventListener('click', function(event) {
  fadeInPass(passRuleMessage, 300)
})

// 1.1 LOGIN Функция отображение количества введенных символов и цвета поля input
// Назначение элементов из index.html:
let countLoginSymbols = document.getElementById('countLoginSymbols') // переменная в index.html в каторую заносится количество введенных симовлов
let countLoginDiv = document.getElementById('countLoginDiv') // поле с информацией о количестве введенных символов

let forbiddenLoginSymbols = document.getElementById('forbiddenLoginSymbols') // поле с информацией об использовании недопустимых символах
let regexpLogin = /[^A-Za-z0-9]/g // регулярное выражение, описывающее все симолы кроме ангийского алфавита и цифр

loginField.addEventListener('keyup', function(event) { // обработчик поля введение логина, производит проверку на корректность введенных данных
  if (loginField.value.length < 6 || regexpLogin.test(String(loginField.value)) == true) { // если длина символов менее 6 или символы некоректны, то
    loginField.style.borderColor = 'red' // границы поля ввода логина становятся красными
  } else if (loginField.value.length >= 6 && regexpLogin.test(String(loginField.value)) == false) { // если длина символов 6 и более, и символы коректны, то
    loginField.style.borderColor = '#78ffa5' // green, границы поля ввода логина становятся зелеными
  } else if (loginField.value.length >= 6 && regexpLogin.test(String(loginField.value)) == true) { // если длина символов 6 и более, и символы некоректны, то
    forbiddenLoginSymbols.style.opacity = 1 // полявляется поле с информацией об использовании недопустимых символах
    loginField.style.borderColor = 'red' // границы поля ввода логина становятся красными
  }
})

loginField.addEventListener('keyup', function(event) { // обработчик поля введение логина, производит проверку на корректность введенных данных
  if (loginField.value.length < 6) { // если длина символов менее 6, то
    countLoginSymbols.innerHTML = loginField.value.length // в span в countLoginSymbols в index.html передается колличество введеных символов пользовтелем
    countLoginDiv.style.opacity = 1 // появляется предупреждение о количестве введенных символов
  } else if (loginField.value.length >= 6) { // если длина символов 6 и более, то
    countLoginDiv.style.opacity = 0 // скрывается предупреждение о количестве введенных символов
  }
})

loginField.addEventListener('keyup', function(event) { // обработчик поля введение логина, производит проверку на корректность введенных данных
  if (regexpLogin.test(String(loginField.value)) == true) { // если введены недопустимые символы, то 
    forbiddenLoginSymbols.style.opacity = 1 // появляется предупреждение об использовании недопустимых символах
  } else if (regexpLogin.test(String(loginField.value)) == false) { // // если введены допустимые символы, то
    forbiddenLoginSymbols.style.opacity = 0 // скрывается предупреждение об использовании недопустимых символах
  }
})

// 2.1 PASSWORD Функция отображения количества введенных символов и цвета поля input
// Назначение элементов из index.html:
let countPassSymbols = document.getElementById('countPassSymbols') // переменная в index.html в каторую заносится количество введенных симовлов
let countPassDiv = document.getElementById('countPassDiv') // поле с информацией о количестве введенных символов

let forbiddenPassSymbols = document.getElementById('forbiddenPassSymbols') // поле с информацией об использовании недопустимых символах
let regexpPass = /[^A-Za-z0-9]/g // регулярное выражение, описывающее все симолы кроме ангийского алфавита и цифр. флаг g - ищет совпадение напротяжении всей строки (глобальный поиск). [A-Za-z0-9] - означает весь латинский алфавит любого регистра и цифры (эквивалентно \w). [^A-Za-z0-9] - все кроме букв и цифр (эквивалентно \W). 

passField.addEventListener('keyup', function(event) { // обработчик поля введение пароля, производит проверку на корректность введенных данных
  if (passField.value.length < 6 || regexpPass.test(String(passField.value)) == true) { // (|| - это оператор ИЛИ) если длина символов менее 6 или символы некоректны, то
    passField.style.borderColor = 'red' // границы поля ввода логина становятся красными
  } else if (passField.value.length >= 6 && regexpPass.test(String(passField.value)) == false) { // (&& - это оператор И)если длина символов 6 и более, и символы коректны, то
    passField.style.borderColor = '#78ffa5' // green, границы поля ввода логина становятся зелеными
  } else if (passField.value.length >= 6 && regexpPass.test(String(passField.value)) == true) { // (Метод regexpPass.test(String(passField.value)) ищет совпадение в строке и возвращает true/false, в зависимости от того, находит ли он его.)если длина символов 6 и более, и символы некоректны, то
    forbiddenPassSymbols.style.opacity = 1 // полявляется поле с информацией об использовании недопустимых символах
    passField.style.borderColor = 'red' // границы поля ввода логина становятся красными
  }
})

passField.addEventListener('keyup', function(event) { // обработчик поля введение пароля, производит проверку на корректность введенных данных
  if (passField.value.length < 6) { // если длина символов менее 6, то
    countPassSymbols.innerHTML = passField.value.length // в span в countLoginSymbols в index.html передается колличество введеных символов
    countPassDiv.style.opacity = 1 // появляется предупреждение о количестве введенных символов
  } else if (passField.value.length >= 6) { // если длина символов 6 и более, то
    countPassDiv.style.opacity = 0 // скрывается предупреждение о количестве введенных символов
  }
})

passField.addEventListener('keyup', function(event) { // обработчик поля введение пароля, производит проверку на корректность введенных данных. keyup: происходит при отпускании ранее нажатой клавиши клавиатуры
  if (regexpPass.test(String(passField.value)) == true) { // если введены недопустимые символы, то 
    forbiddenPassSymbols.style.opacity = 1 // появляется предупреждение об использовании недопустимых символах
  } else if (regexpPass.test(String(passField.value)) == false) { // // если введены допустимые символы, то
    forbiddenPassSymbols.style.opacity = 0 // скрывается предупреждение об использовании недопустимых символах
  }
})

// 3. Email