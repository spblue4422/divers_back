FROM ubuntu:24.04

LABEL version="0.0"
LABEL description="divers_back"

RUN apt-get update
RUN apt-get-upgrade -y

RUN apt-get install git -y

RUN mkdir /opt/server
RUN git clone https://github.com/spblue4422/divers_back.git /opt/server