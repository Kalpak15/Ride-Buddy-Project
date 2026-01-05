FROM node:24-alpine

WORKDIR /app

ARG VITE_key_id
ARG VITE_key_secret
ARG VITE_API_URL

ENV VITE_key_id=$VITE_key_id
ENV VITE_key_secret=$VITE_key_secret
ENV VITE_API_URL=$VITE_API_URL

COPY . /app

RUN npm install

EXPOSE 5173

CMD ["npm","run","dev"]
