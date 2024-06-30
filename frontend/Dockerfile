FROM chaimfn/node:21.5.0.netfree AS build
WORKDIR workdir
ADD ./public ./public
ADD ./src ./src
ADD config.prod.js ./
ADD package*.json ./
RUN npm install --verb
RUN npm run build

FROM chaimfn/nginx:1.26.rtmp.netfree
COPY --from=build /workdir/build /usr/share/nginx/html
EXPOSE 80
