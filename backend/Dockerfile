FROM chaimfn/node:21.5.0-slim.netfree
WORKDIR /app
RUN mkdir data
ADD ./data/rights.json data/rights.json
ADD package*.json ./
ADD server.js ./
RUN npm install --verb
EXPOSE 5000
ENTRYPOINT ["node", "./server.js"]  