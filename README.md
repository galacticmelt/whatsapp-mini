# WhatsApp-mini
### https://galacticmelt.github.io/whatsapp-mini/

Небольшое веб-приложение базе Green API, позволяющее владельцу аккаунта WhatsApp 
вести диалог с другим пользователем сервиса.
Использованные технологии: React, Redux/RTK, React-Hook-Forms, React-Router-Dom, MUI, Vite

## Manual:
Для использования приложения необходимо зарегистрироваться на сервисе Green API
и активировать **инстанс** аккаунта Whats App. Там же, в личном кабинете, следует 
**обязательно** включить уведомления о сообщениях.

В самом приложении, в форму авторизации потребуется ввести **ID** и **API Token** инстанса.

После успешной авторизации, появится доступ к основному функционалу приложения.

В верхней части расположена строка поиска, в которую необходимо ввести номер телефона 
собеседника (распознаваемый формат - 10 цифр, 11 цифр, международный).
Собеседника можно менять, производя новый поиск по номеру.
Если искомый номер зарегистрирован в WhatsApp, появится возможность переписки.
Приложение предполагает отправку и получение лишь текстовых сообщений, также 
возможно использование символов emoji.

## Локальный запуск:
Для запуска приложения в локальном режиме необходимо склонировать репозиторий
к себе на устройство:

*git clone https://github.com/galacticmelt/whatsapp-mini.git*

и в созданной директории произвести установку зависимостей:

*npm install*

Далее **обязательно** требуется создать файл **.env** в корневой папке проекта,
в котором следует завести переменную с названием **VITE_SECRET_KEY** и присвоить ей
любое строковое значение. Например:

*VITE_SECRET_KEY=supermegasecret1960*

После этого можно локально запускать приложение:

*npm run dev*






