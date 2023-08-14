ARG NODE_VERSION=""

FROM node:${NODE_VERSION:+${NODE_VERSION}-}alpine

RUN apk update \
    && apk upgrade
