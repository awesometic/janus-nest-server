FROM node:current-alpine3.15
LABEL maintainer="Deokgyu Yang <secugyu@gmail.com>" \
      description="Janus Project container based on Alpine Linux"

RUN apk add --no-cache \
    bash bash-completion supervisor git

ENV TARGET_UID=1000
ENV TARGET_GID=1000
ENV RUN_MODE='development'

ADD config/init.sh /
ADD config/run.sh /
RUN chmod a+x /init.sh /run.sh

COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80
VOLUME [ "/janus" ]
ENTRYPOINT [ "/init.sh" ]
