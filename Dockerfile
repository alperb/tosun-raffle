FROM node
WORKDIR /app
COPY package.json package.json
COPY app.js app.js
RUN npm install
EXPOSE 3131
ENTRYPOINT [ "node", "app.js" ]