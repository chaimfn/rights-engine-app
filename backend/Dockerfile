FROM chaimfn/node:???
WORKDIR /app
ADD node_modules ./node_modules
ADD dbo.js ./
ADD server.js ./
EXPOSE 5000
ENTRYPOINT ["node", "./server.js"]  