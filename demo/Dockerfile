# Etapa 1: Build del frontend (React)
FROM node:20 AS frontend-build
WORKDIR /app
COPY ../reactFrontend/package*.json ./
RUN npm install
COPY ../reactFrontend .
RUN npm run build

# Etapa 2: Build del backend (Spring Boot)
FROM maven:3.9.6-eclipse-temurin-21 AS backend-build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Etapa 3: Imagen final
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copia el JAR del backend
COPY --from=backend-build /app/target/*.jar app.jar

# Copia el build del frontend al directorio estático de Spring Boot
COPY --from=frontend-build /app/dist /app/static

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
