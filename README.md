### Install dependencies for client, in in root directory

npm install

### Create a .env file in /server directory with following

PORT="port-number" (eg: 3001)  
REACT_APP_LOCAL_URL="http://localhost:" + port-number (eg: "http://localhost:3001") make sure give to use same port number for both variables

REACT_APP_API_PROVIDER="https://openweathermap.org"  
REACT_APP_API_KEY="your-api-key"  
REACT_APP_API_URL="https://api.openweathermap.org/data/2.5"

### To start the client, in root directory run following script

npm start
