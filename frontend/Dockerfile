FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
# Serve build com serve (instale serve) ou use nginx; aqui uso serve:
RUN pnpm install -g serve
EXPOSE 5173
CMD ["serve","-s","build","-l","5173"]
