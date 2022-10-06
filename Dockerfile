FROM node:16.14.0-alpine as build
WORKDIR /app
COPY ./package.json ./
COPY ./.npmrc   ./
RUN npm config set @flexybyte:registry https://npm.pkg.jetbrains.space/flexybyte/p/fbc/common/
RUN npm install
RUN rm -f .npmrc
COPY . .
#Must be removed in future 
ENV GENERATE_SOURCEMAP=false
RUN npm run build

FROM nginx:1.17.8-alpine
COPY ./assets/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
