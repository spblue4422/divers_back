FROM node:18

LABEL version="0.0"
LABEL description="divers_back"

# docker image work directory 설정 - host와는 별개
WORKDIR /divers_back

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4000

ENV NODE_ENV=dev

CMD [ "node", "./dist/main.js" ]