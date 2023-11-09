createdb:
	docker exec -it postgres15 createdb --username=root --owner=root bridge_dev
dropdb:
	docker exec -it postgres15 dropdb --username=root  bridge_dev

.PHONY: dropdb createdb