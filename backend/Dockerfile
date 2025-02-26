# Use a lightweight Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy only the requirements file first (for better caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application files
COPY . .

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
