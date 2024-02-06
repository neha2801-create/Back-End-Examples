curl localhost:8080/profile -i
curl localhost:8080/profile -i -H "Content-Type: application/json" -X POST -d '{"first_name": "Zesheng", "last_name": "Chen"}'
sleep 1
curl localhost:8080/profile -i
curl localhost:8080/profile/0 -i -H "Content-Type: application/json" -X PUT -d '{"first_name": "Thomas", "last_name": "Bolinger"}'
sleep 1
curl localhost:8080/profile?id=0 -i
sleep 1
curl -X DELETE localhost:8080/profile/0 -i
sleep 1
curl localhost:8080/profile -i
