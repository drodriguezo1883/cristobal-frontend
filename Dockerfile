FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist/cristobal-frontend/browser ./dist
EXPOSE 3000
CMD serve dist -l tcp://0.0.0.0:${PORT:-3000} --single-page-app
