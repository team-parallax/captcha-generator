FROM node:16

RUN apt-get update && apt-get upgrade -y
RUN apt-get install espeak-ng -y
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
CMD pnpm start
