FROM python:3.10

RUN apt-get update && apt-get install -y g++ cmake
RUN pip install sqlalchemy psycopg2

WORKDIR /app
COPY main.cpp .
COPY server.py .
COPY database.py .

RUN g++ -fPIC -shared -o libwordcount.so main.cpp

RUN pip install fastapi uvicorn

EXPOSE 8000

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
