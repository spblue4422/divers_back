FROM node:18-alpine

LABEL version="0.0.0"
LABEL description="divers_back"

# docker image work directory 설정 - host와는 별개
WORKDIR /divers_back

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

ENV TZ=Asia/Seoul

RUN apk --no-cache add tzdata && \
    cp /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone \
    apk del tzdata

RUN yarn run build

EXPOSE 4000

ENV NODE_ENV=dev

CMD [ "node", "./dist/main.js" ]