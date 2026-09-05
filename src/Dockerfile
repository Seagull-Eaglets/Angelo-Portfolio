FROM n8nio/n8n:latest

USER root

# Install any required system tools or custom certificates if necessary
RUN apk add --no-cache curl bash

USER node

# Expose the default port (overridden at runtime by process.env.PORT)
EXPOSE 5678

CMD ["n8n"]