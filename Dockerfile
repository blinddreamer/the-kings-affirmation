FROM node:14-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install discord.js
RUN discordjs-reaction-role
COPY . .

CMD ["node", "app.js"]