FROM node:14

WORKDIR /github/workspace/wzb3422/ali-oss-website-action

COPY . .
RUN npm install
RUN npm i -g ts-node
RUN npm i -g typescript

# run in /github/workspace
CMD ["npm", "run", "start"]
