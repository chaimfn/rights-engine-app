FROM chaimfn/node:21.5.0.netfree AS build
WORKDIR workdir
ADD ./public ./public
ADD ./src ./src
ADD config.prod.js ./
ADD package*.json ./
RUN npm run build

FROM chaimfn/nginx:1.26.rtmp.netfree
RUN mkdir /usr/share/nginx/rights-engine
COPY --from=build /workdir/build /usr/share/nginx/rights-engine
COPY ./rights-engine.conf /etc/nginx/conf.d/
EXPOSE 8880
