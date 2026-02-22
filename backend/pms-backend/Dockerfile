# ---- Build Stage ----
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app
COPY . .

# Give permission to mvnw (important for Linux)
RUN chmod +x mvnw

# Build using Maven wrapper
RUN ./mvnw clean package -DskipTests

# ---- Run Stage ----
FROM eclipse-temurin:21-jdk

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]