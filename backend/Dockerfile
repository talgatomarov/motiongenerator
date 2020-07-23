FROM python:3.7

COPY requirements/prod.txt requirements/prod.txt
RUN pip install --upgrade pip
RUN pip install -r requirements/prod.txt

WORKDIR /app
ADD . /app

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080", "--proxy-headers"]
