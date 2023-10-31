FROM node:18.17.0-alpine3.17

# Timezone
RUN apk add -U tzdata
ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Essentials
RUN apk --update add --no-cache bash

RUN npm install -g @nestjs/cli@9.1.1

### Application
COPY ./ ./app
WORKDIR /app
RUN npm install --loglevel=error --no-save
RUN npm run build
ENV HOST 0.0.0.0
EXPOSE 3071

CMD ["npm", "run", "start:prod"]
