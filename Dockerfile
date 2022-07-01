FROM node:16-alpine3.16

RUN apk add --no-cache \
    bash bash-completion git

COPY docker/run.sh /run.sh
RUN chmod +x /run.sh

WORKDIR /app
RUN \
    yarn install && \
    npm install --no-package-lock --no-save @adminjs/express

EXPOSE 3000
ENTRYPOINT [ "/run.sh" ]
