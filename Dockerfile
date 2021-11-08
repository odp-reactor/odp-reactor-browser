# build environment
FROM node:14 as build

# clone codebase
RUN git clone https://github.com/ODPReactor/odp-reactor-browser.git /app
WORKDIR /app
# install dep
RUN yarn install

# copy build env
ARG REACT_APP_LDR_URL
ARG REACT_APP_NAME

#build
RUN yarn build

# production environment
FROM nginx:alpine

# copy static site in nginx
COPY --from=build /app/build /usr/share/nginx/html
# copy config from nginx
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf


# run nginx
CMD ["nginx", "-g", "daemon off;"]
