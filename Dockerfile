# Step 1: Frontend ko build karne ka Stage (Builder Phase)
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

# Pehle package files lo taaki docker cache use kar sake (fast building ke liye)
COPY Frontend/package*.json ./
RUN npm install

# Ab pura Frontend folder container me copy karo aur static files build karo
COPY Frontend/ ./
RUN npm run build

# Step 2: Backend Final Image setup jisme app chalega (Production Phase)
FROM node:20-alpine
WORKDIR /app/backend

# Backend ki dependencies install karenge
COPY Backend/package*.json ./
RUN npm install

# Backend ka pura source code copy karenge
COPY Backend/ ./

# ✨ YAHAN JADU HAI: Humne Stage 1 (React Builder) se \`dist\` wala static code uthaya
# Aur usko explicitly Backend ke \`public\` folder me copy kar diya
RUN mkdir -p public
COPY --from=frontend-builder /app/frontend/dist/ ./public/

# Port 5000 expose karenge jaise aapke Express code ne bataya hai
EXPOSE 5000

# Server chala denge
CMD ["npm", "start"]
