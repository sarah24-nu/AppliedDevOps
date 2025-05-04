FROM mongo:6.0

# Create a non-root user
RUN useradd -m -s /bin/bash mongodb

# Set ownership of data directory
RUN chown -R mongodb:mongodb /data/db

# Switch to non-root user
USER mongodb

# Expose MongoDB port
EXPOSE 27017

# Start MongoDB
CMD ["mongod", "--bind_ip_all"] 