FROM node:11

LABEL maintainer="me"

# Add your codacy project token here
# ENV CODACY_PROJECT_TOKEN='5109c2f071894d2ead4c90ffba1ab807'

# Create app directory
RUN mkdir -p /usr/src/app
RUN chmod -R 777 /usr/src/app

# Change working directory
WORKDIR /usr/src/app

# Copy code
COPY gitprofile /usr/src/app/.git
COPY . /usr/src/app

# Switch to Node User
USER node

# Install Deps & update to latest minor versions
RUN npm install

# Port
EXPOSE		8080

# Start Server
CMD ["npm", "start"]