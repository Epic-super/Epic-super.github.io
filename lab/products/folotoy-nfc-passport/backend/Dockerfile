FROM node:18-alpine

RUN apk add --no-cache \
    sqlite \
    sqlite-dev \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY src/ ./src/
COPY scripts/ ./scripts/

RUN mkdir -p data logs

EXPOSE 3000 8080

CMD ["node", "src/app.js"]
