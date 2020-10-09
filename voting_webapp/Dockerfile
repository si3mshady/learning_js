FROM alpine

WORKDIR /app
COPY . .
RUN apk update && \
    apk upgrade &&  \
    apk add  nodejs-npm

RUN npm install 

EXPOSE 3000

CMD ["npm","start"]