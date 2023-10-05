
FROM node:16.16.0 as node
WORKDIR /app
COPY . .
RUN npm install ng
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/guids /usr/share/nginx/html
COPY --from=node /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD [ "nginx","-g", "daemon off;" ]
