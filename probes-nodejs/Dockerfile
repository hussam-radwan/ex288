FROM registry.access.redhat.com/ubi9/nodejs-24-minimal:9.8-1779831271 as build

WORKDIR /opt/app-root

COPY package.json package.json

USER 0

RUN npm install 

COPY . .

RUN npm run build --omit=dev

FROM registry.access.redhat.com/ubi9/nodejs-24-minimal:9.8-1779831271 

COPY --from=build /opt/app-root/package.json ./package.json

COPY --from=build /opt/app-root/dist ./dist

COPY --from=build /opt/app-root/public ./public

RUN npm install --omit=dev

USER 1001

ENTRYPOINT [ "npm", "run", "start" ]