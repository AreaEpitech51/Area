# How to start project

## Web

### Start without docker

To start the web project, you need to install the dependencies:
```bash
npm install
```

Then, install the dependencies:
```bash
cd area-web
npx prisma migrate dev
```

Finally, start the project:
```bash
npm run dev
```

then, if the port 3000 is not already used, you can go to http://localhost:3000 to see the web project.

### Start with docker
to start the web project with docker you need to install docker and docker-compose if you dont have them.

Then, launch docker-compose at the root of the project:
```bash
docker-compose up
```

then, if the port 3000 is not already used, you can go to http://localhost:3000 to see the web project.
