FROM node:current-alpine3.10

WORKDIR /app
COPY ./package.json .
COPY . . 
RUN apk update && \
    apk upgrade    

RUN npm install


EXPOSE 3000


CMD ["node","app.js"]