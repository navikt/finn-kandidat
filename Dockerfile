FROM navikt/node-express:1.0.0
WORKDIR /app

RUN yarn add http-proxy-middleware fs-extra

COPY build/ build/
COPY src/server/ src/server/

EXPOSE 3000
ENTRYPOINT ["node", "src/server/server.js"]
