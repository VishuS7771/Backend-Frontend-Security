# Use an official Java runtime as a parent image
FROM openjdk:17-jdk-alpine

WORKDIR /app

# Copy the packaged jar file into the container
COPY target/ems-backend-0.0.1-SNAPSHOT.jar /app/ems-backend-0.0.1-SNAPSHOT.jar


# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "/app/ems-backend-0.0.1-SNAPSHOT.jar"]
