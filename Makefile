.PHONY: build-dev dev prod test shell down-dev build

YML_DEV=environment/dev/docker-compose.yml
COMPOSE_DEV=docker-compose -f ${YML_DEV}

build-dev:
	${COMPOSE_DEV} build

dev: build-dev down-dev
	${COMPOSE_DEV} run --rm --service-ports lottery-dapp dev

prod: build-dev down-dev
	${COMPOSE_DEV} run --rm --service-ports lottery-dapp prod

build: build-dev down-dev
	${COMPOSE_DEV} run --rm --service-ports lottery-dapp build

test: build-dev down-dev
	${COMPOSE_DEV} run --rm --service-ports lottery-dapp test

shell: build-dev down-dev
	${COMPOSE_DEV} run --rm lottery-dapp /bin/bash

down-dev:
	${COMPOSE_DEV} down