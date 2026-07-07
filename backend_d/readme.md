1) npm init -y
2) npm install express dotenv mongoose cors
3) npm install --save-dev nodemon
4) structure:
            backend
                -src
                    -config
                    -controllers
                    -middleware
                    -model
                    -routes
                    -app.js
                -.env
                -.gitignore
                -server.js


writing flow:
1) db.js
2) app.js
3) server.js
4) In package.json change, main : server.js and add dev : nodemon server.js in scripts.
5) user.model.js
6) user.controller.js