FROM node:16.13.1
LABEL org.opencontainers.image.source https://github.com/Arquisoft/dede_es5a
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

#Create an optimized version of the webapp
RUN npm run build

ARG API_URI="http://localhost:5000/api"
ENV REACT_APP_API_URI=$API_URI

#Ver como podemos llamar npm run prod aquí
CMD [ "npm", "run", "prod" ]