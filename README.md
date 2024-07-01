<img src="https://github.com/supchyan/Hono/assets/123704468/997ee1fc-3091-49bc-a33a-d2facb3fac91&width" height="15" />
</br>

### ☂️Building
```
npm i electron @electron-forge/cli @electron-forge/maker-zip desmos fluent-ffmpeg tracking @types/tracking @ffmpeg-installer/ffmpeg
```
**Важно** добавить экспорт `module.exports = tracking` внизу основного файла в библиотеке `tracking.js` </br>
Запуск проги через `run` скрипты, потому что у electron'а билды слишком тяжелые, я такие не люблю, но кто хочет, можете собрать прогу конечно в исполняемый файл.. Правда конфиг для билда я прописал только под винду, так что линуксоиды сосат B) </br></br>

Как-нибудь добавлю экспорт в `.csv`, чтобы данные трекинга можно было использовать где-нибудь извне, а так же доработаю алгоритм определения цветов через пипетку на видео, так как сейчас он выбирает только основные `RED` `GREEN` `BLUE`. </br>

### 🌂Showcase
![image](https://github.com/supchyan/Hono/assets/123704468/96c4bbbc-fc84-4d5f-83ac-11ebe8549bce) </br>
*Аддон для [desmos](https://desmos.com) , который позволят отслеживать движение объекта на видео. Записывает опорные точки, по которым можно рассчитывать характер движения объекта. Своеобразный аналог **LabCamera**, которая когда-то существовала.*
</br></br>

```json
This is a commission project, all stack had been chosen not by me.
```
