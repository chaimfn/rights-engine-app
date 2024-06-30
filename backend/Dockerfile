FROM chaimfn/node:21.5.0-slim.netfree
WORKDIR /app
RUN mkdir data
ADD ./data/rights.json data/rights.json
ADD node_modules ./node_modules
ADD server.js ./
EXPOSE 5000
ENTRYPOINT ["node", "./server.js"]  