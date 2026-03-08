-include .env
up:
	docker compose up -d
	
down:
	docker compose down
	
rebuild-server:
	docker compose build frontend


