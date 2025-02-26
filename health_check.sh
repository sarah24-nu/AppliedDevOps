#!/bin/bash

SERVICE_NAME="read_aid"
LOG_FILE="$HOME/flask_health.log"


# Function to check if the service is running
check_service() {
    systemctl is-active --quiet $SERVICE_NAME
}

# Function to restart the service and log the event
restart_service() {
    echo "$(date) - $SERVICE_NAME was down. Restarting..." | tee -a $LOG_FILE
    systemctl restart $SERVICE_NAME
}

# Main script execution
if check_service; then
    echo "$(date) - $SERVICE_NAME is running." >> $LOG_FILE
else
    restart_service
fi
