# Stage 1: Builder
FROM python:3.11-slim AS builder


WORKDIR /app


COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Stage 2: Final Image
FROM python:3.11-slim

WORKDIR /app

# Copy installed dependencies from the builder stage
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Copy the rest of the application files
COPY backend/. /app
# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=development

# Expose the port Flask runs on
EXPOSE 5000

# Run as a non-root user for security
RUN useradd -m flaskuser
USER flaskuser

# Start Flask application
CMD ["python", "app.py"]
