curl localhost:8080/profile -i
curl localhost:8080/profile -i -H "Content-Type: application/json" -X POST -d '{"first_name": "Zesheng"}'
sleep 1
curl localhost:8080/profile -i
curl localhost:8080/profile -i -H "Content-Type: application/json" -X POST -d '{"first_name": "Zesheng", "last_name": "Chen"}'
sleep 1
curl localhost:8080/profile -i
curl localhost:8080/profile -i -H "Content-Type: application/json" -X POST -d '{"first_name": "Caleb", "last_name": "Chen", "middle_name": "Kaile"}'
curl localhost:8080/profile -i
