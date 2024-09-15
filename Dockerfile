FROM node:18 as build

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/talents-app/browser /usr/share/nginx/html

EXPOSE 80






