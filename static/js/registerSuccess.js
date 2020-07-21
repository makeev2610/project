let loginPaste = document.getElementById('loginPaste') // участок разметки, куда записывается логин, берущийся из cookie
let stringCookie = document.cookie // выводим cookie переменную. Значение переменной будет login=created_login, а тип - string
let objectCookie = stringCookie.split('=') // разделяем строку по = и она превращается в объект ["login", "created_login"]
let createdLogin = (objectCookie[1]) // здесь вызывется значение объекта соотвествующее ключу login.
loginPaste.innerHTML = createdLogin // вставка переменной c логином на страницу привествия