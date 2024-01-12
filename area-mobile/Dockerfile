FROM node:21

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install expo@49.0.21
RUN npm install -g expo-cli
RUN npm install -g eas-cli
RUN npm install -g react-native-cli
RUN npm install

COPY . .

EXPOSE 8081

RUN eas build -p android
# RUN npx expo build:android

ENV NODE_ENV=production

# Run the application
# CMD ["npm", "run", "start"]
CMD ["npx", "expo", "start"]
