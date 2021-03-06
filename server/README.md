# Django 프로젝트 환경 설정

### Python3 & Modules 설치
1. `Python3`설치
2. 터미널에서 프로젝트 디렉토리 이동
3. `pip3 install -r requirements.txt`을 통해 실행

### PostgreSQL 설치
1. `postgres`설치
2. 터미널에서 프로젝트 디렉토리 이동
3. `createdb goforward`를 통해 database init
4. `psql goforward`를 postgres 실행
5. `CREATE ROLE user_name WITH LOGIN PASSWORD`
6. `GRANT ALL PRIVILEGES ON DATABASE goforward TO admin`
7. `ALTER USER admin CREATEDB`
7. `\q`

### 개발 build 및 개발 서버 실행
1. 터미널에서 프로젝트 디렉토리 이동.
2. `python3 manage.py runserver` 

### `secrets.json`
```
{
    "SECRET_KEY": SECRET_KEY,
    "DATABASES": {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": "goforward",
            "USER": "admin",
            "PASSWORD": PASSWORD,
            "HOST": "127.0.0.1",
            "PORT": "5432"
        }
    }
}
```
