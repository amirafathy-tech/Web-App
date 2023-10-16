FROM node
WORKDIR /docker-app/
COPY public/ /docker-app/public
COPY src/ /docker-app/src
COPY package.json /docker-app/
RUN npm install
CMD ["npm", "start"]
