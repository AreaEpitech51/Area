FROM node:21

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

ENV NODE_ENV=production

# Run the application
CMD ["npm", "run", "start"]
