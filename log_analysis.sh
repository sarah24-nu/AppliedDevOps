#!/bin/bash

LOG_FILE="/var/log/nginx/access.log"  # Update this path based on your actual log location

# Check if the log file exists
if [ ! -f "$LOG_FILE" ]; then
    echo "Error: Log file not found at $LOG_FILE"
    exit 1
fi

echo "Top 3 IP addresses by request count:"
awk '{print $1}' $LOG_FILE | sort | uniq -c | sort -nr | head -3

