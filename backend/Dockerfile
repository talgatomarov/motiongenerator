FROM python:3.6.9

COPY requirements/prod.txt requirements/prod.txt
RUN pip install --upgrade pip
RUN pip install -r requirements/prod.txt


WORKDIR /app
ADD . .

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080", "--proxy-headers"]
