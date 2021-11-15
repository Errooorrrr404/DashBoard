FROM node:14-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --quiet
RUN npm install react-scripts -g --quiet
RUN npm install npm -g --quiet
RUN npm i react-beautiful-dnd -g --quiet
RUN npm install firebase -g --quiet
RUN npm install firebase-tools -g --quiet
RUN npm install react-live-clock --save --quiet
RUN npm i public-ip --save --quiet
RUN npm i react-landing-page --save --quiet
RUN npm install @material-ui/icons --quiet
RUN npm i --save @fortawesome/free-solid-svg-icons --quiet
RUN npm i @material-ui/lab --save --quiet
RUN npm i react-scroll -g --quiet
RUN npm i axios -g --quiet
RUN npm i emailjs-com -g --quiet
# add app
COPY . ./
EXPOSE 8080
# start app
CMD ["npm", "start"]
