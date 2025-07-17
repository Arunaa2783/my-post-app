FROM python:3.10

# OS dependencies
RUN apt-get update && apt-get install -y g++ cmake

# Set workdir
WORKDIR /app

# Copy all files (important!)
COPY . .

# Build shared C++ library
RUN g++ -fPIC -shared -o libwordcount.so main.cpp

# Install dependencies
RUN pip install fastapi uvicorn sqlalchemy psycopg2

EXPOSE 8000

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
