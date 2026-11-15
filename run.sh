#!/usr/bin/env bash
# ==============================================================================
# SAHAJ MITRA (सहज मित्र) - Festive Street Vendor Assistant Launcher
# Class 12th Student Project (Python & JavaScript)
# ==============================================================================

echo "------------------------------------------------------------------"
echo "🪔 SAHAJ MITRA (सहज मित्र) - Starting Server..."
echo "Created by Class 12th Student using Python 3 & Modern JavaScript"
echo "Zero external pip dependencies required!"
echo "------------------------------------------------------------------"

# Initialize database
python3 database.py

# Run server on port 8080
python3 server.py
