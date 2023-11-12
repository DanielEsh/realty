# Используем базовый образ Python
FROM python:3.10-slim

# Устанавливаем зависимость requests
RUN pip install requests

# Копируем файл скрипта в контейнер
COPY generate.py /app/generate.py

# Задаем рабочую директорию
WORKDIR /app

# Запускаем скрипт при старте контейнера
CMD ["python", "generate.py"]