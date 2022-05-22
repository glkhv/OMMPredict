FROM amd64/python:3.10-buster

WORKDIR /home/app/

COPY requirements.txt /home/app/
RUN pip3 install --upgrade pip -r requirements.txt
RUN pip install -U pip
RUN pip install --upgrade setuptools
RUN pip install catboost

COPY ./app /home/app/

EXPOSE 5000

ENTRYPOINT ["python3", "app.py"]