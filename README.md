# Дипломный проект
Нетология, курс: "введение в программирование", pb-12

По условиям диплома верстка, рендер поля и организация хранения поля были даны изначально. Изменения можно было вносить только в файл с логикой работы крестиков-ноликов. После того как завершил логику, начал улучшать исходные файлы ;-)

**Внес изменения в оригинальные файлы:**
- Картинки теперь в SVG (а не текстом) и меняются при изменении размера поля
- Дополнительно задание было сделать крестики-нолики на квадратном поле произвольного размера. Для соблюдения ТЗ сначала сделал запрос размера поля на prompt, но позже переделал на input

**Текущие ограничения при вводе**
Ограничение на размер поля: 10
Ограничение вызвано не алгоритмами, а внешним видом поля при больших размерах

**Что хочется улучшить**
внешний вид поля при больших размерах:
- зафиксировать размер клетки
- уменьшить скругление у клетки
- уменьшить отступы между колонками
- добавить прокрутку

**Глобально**
Если будет нужно гибко работать с размером поля, то желательно переписать весь renderBoard для большей гибкости.
