Auth server

1) Set environment variables (copy `.env.example` to `.env` and set JWT_SECRET if desired)

2) Install dependencies and run server:

	cd server
	npm install
	npm start

Auth endpoints:
- POST /register {email, password, name} -> {token, user}
- POST /login {email, password} -> {token, user}
- GET /me (Authorization: Bearer <token>) -> user

