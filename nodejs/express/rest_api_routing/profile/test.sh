curl localhost:8080/profile
curl localhost:8080/profile -X POST -d '{"username": "thomas", "email": "another mail"}' -i -H "Content-Type: application/json"
curl localhost:8080/profile 
curl localhost:8080/profile -X PUT -d '{"username": "john", "email": "third mail"}' -i -H "Content-Type: application/json"
curl localhost:8080/profile 
curl localhost:8080/profile -X DELETE
curl localhost:8080/profile 
