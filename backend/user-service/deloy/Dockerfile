FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY user-service-0.0.1-SNAPSHOT.jar app.jar
COPY application.yaml application.yaml
ENTRYPOINT ["java","-jar","app.jar"]