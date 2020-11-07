#!/bin/bash
echo "Creating database..."
docker exec postgres psql -U postgres -c "CREATE DATABASE prod;"

echo "Creating users..."
docker exec postgres psql -U postgres -d prod -f /etc/postgres/config/users.sql

#docker exec -it postgres psql -U postgres -d prod
