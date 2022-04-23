FROM python:3.9

WORKDIR /home/app/

COPY requirements.txt /home/app/
RUN pip3 install --upgrade pip -r requirements.txt

COPY ./app /home/app/

EXPOSE 5000

ENTRYPOINT ["python3", "app.py"]