FROM node:20-alpine

RUN apk --no-cache add ca-certificates wget
RUN wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub
RUN wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.28-r0/glibc-2.28-r0.apk
RUN apk add --no-cache --force-overwrite glibc-2.28-r0.apk

RUN npm install -g bun

ARG PORT=3000

WORKDIR /app

COPY . .

RUN bun install

RUN bun run build

ENV NODE_ENV=production
ENV PORT=$PORT

EXPOSE $PORT

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"
CMD ["bun", "start"]