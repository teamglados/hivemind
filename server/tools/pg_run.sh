#!/bin/bash
# run via: tools/pg_run.sh

function cleanup(){
	echo "Removing containers network..."
	docker-compose down
	exit 0
}

function startup(){
	echo "Starting dev services..."
	docker-compose up -d

	while [ $(docker-compose logs --tail 100 postgres | grep "listening on Unix socket") ]
	do
	  sleep 1
	done

	echo "Initializing database in 2 seconds..."
	sleep 2
	source ./tools/pg_init.sh
}

function logwatch(){
	echo "Ready."
	docker-compose logs -f --tail 1
}

startup
trap cleanup SIGINT
logwatch
