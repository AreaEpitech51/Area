FROM node:21

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npx prisma migrate dev
RUN npm run build
RUN npm i sharp

EXPOSE 8080

ENV NODE_ENV=production

# Run the application
CMD ["npm", "run", "start"]
