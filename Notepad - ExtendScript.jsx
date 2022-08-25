///--------- author @kay-n ---------///

{
    // Создаем окно интерфейса если оно не является таковым
    var win = (this instanceof Panel)
        ? this
        : new Window("palette", 'Extendscript Notepad');
    
        win.orientation = "column"; 
        win.alignChildren = ["fill","fill"];
        win.spacing = 5; 
    // Добавляем текстовое поле
    var editText = win.add(
        'edittext',                     // Тип добавляемого элемента
        [0, 0, 500, 500],               // Параметры верстки элемента [x, y, width, height]
        'alert("Hello, World!!!")',     // Текст по умолчанию
        { multiline: true, scrolling: true }           // Указываем что текстовое поле многострочное
    );

    // Создаем группу для кнопок, чтобы отрисовывать их инлайн
    var btnsGroup = win.add('group');
    btnsGroup.orientation = "row"; 
    btnsGroup.alignChildren = ["center","center"]; 
    btnsGroup.spacing = 10; 
    //btnsGroup.margins = 10; 
    btnsGroup.alignment = ["center","bottom"]; 

    // Добавляем кнопку запуска кода
    var btnRun = btnsGroup.add(
        'button',                       // Тип добавляемого элемента
        undefined,                      // Параметры верстки не указываем
        'Run'                           // Текст на кнопке
    );
    // Обрабатываем событие нажатие кнопки
    btnRun.onClick = function() {
        try {
            eval(editText.text);        // Пробуем запустить скрипт из текстового поля
        } catch (e) {
            alert(e);                   // В случае неудачи
        }
    };

    // Добавляем кнопку Открыть файл
    var btnOpenFile = btnsGroup.add('button', undefined, 'Open');
    // Открываем диалоговое окно по нажатию на кнопку
    btnOpenFile.onClick = function() {
        var file = File.openDialog('Открываем скрипт для Adobe AE');

        // Если пользователь нажал Отменить,
        // прерываем обработку события
        if (!file) return;

        // Проверяем имеет ли файл расширение .jsx или .js
        if (/\.(jsx|js)$/.test(file.name)) {
            file.open("r");                 // Открываем файл для чтения
            editText.text = file.read();    // Записываем в текстовое поле содержимое файла
            file.close();                   // Закрывем файл, чтобы не засорять память
        } else {
            alert("Файл " + file.name + " должен иметь расширение .js или .jsx")
        }
    };

    // Добавляем кнопку Сохранить файл
    var btnSaveFile = btnsGroup.add('button', undefined, 'Save');
    // Сохраняем файл по нажатию
    btnSaveFile.onClick = function() {
        var file = File.saveDialog('Сохраняем скрипт для Adobe AE');

        if (!file) return;

        // Если файл не имеет расширения .jsx или .js,
        // добавляем к имени файла расширение .jsx
        if (!/\.(jsx|js)$/.test(file.name)) {
            file.rename(file.name + '.jsx')
        }

        file.open('w');             // Открываем файл для записи
        file.write(editText.text);  // Записываем в него содержимое текстового поля
        file.close();               // И вновь закрываем, дабы не отсвечивал
    };

    // Делаем размер окна адаптивным
    win.layout.layout(true);
    win.onResizing  =
    win.onResize    = function () {
        this.layout.resize();
    };
    win.layout.resize();

    // Если тип окна Window, отображаем его.
    if(win instanceof Window) {
        win.show();
    }
}