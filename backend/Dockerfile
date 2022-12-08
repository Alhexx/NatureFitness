FROM maven:3.6.0-jdk-11-slim
RUN mkdir /root/backend && mkdir /root/.m2
COPY . /root/backend
WORKDIR /root/backend
ENV TZ=America/Fortaleza
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN mvn clean install
RUN mv target/*.jar target/app.jar
ENTRYPOINT ["java","-jar","target/app.jar"]