FROM python:3.11-slim AS builder

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir gunicorn==21.2.0

FROM python:3.11-slim

WORKDIR /app

COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

COPY . /app/

ENV FLASK_APP=app.py
ENV FLASK_ENV=production

EXPOSE 5000

RUN useradd -m flaskuser
USER flaskuser

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
