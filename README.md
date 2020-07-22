[200~# Simple HTML form with vanilla Javascript 
A simple web page that presents a form that captures user's name, salary and dob.
### Project features
- vanilla Javascript
- Fetch API to make a post request
- css @keyframes based loading animation
- 5 front-end tests using JEST

# Setup and installation
- install Node, npm in your computer
- clone the repo
- navigate to the directory where repo was cloned
- run 'npm install'

# Run the project
There are 2 ways in which you can do this
- open index.html in the browser and fill out the form details
- navigate to project directory on terminal, command line or command prompt and type 'npm run test'

The test command will run 5 UI tests written in JEST

# Important note
To avoid the CORS issue, this repo uses the [Heroku CORS Anywhere] app and that app has a limited number of requests it can serve per hour. Often during mornings of the AEDT (Australian Eastern day time) the proxy won't work, in which case you will be presented with an error.

# Useful Links
- [Fetch API] 
- [CORS]
- [How to make Fetch Proxy in Javascript to avoid CORS errors]
- [Getting started with JEST]
- [Using Matchers in JEST]

[Using Matchers in JEST]: (https://jestjs.io/docs/en/using-matchers)
[Getting started with JEST]: (https://jestjs.io/docs/en/getting-started)
[How to make Fetch Proxy in Javascript to avoid CORS errors]: (https://medium.com/@kennethscoggins/how-to-make-a-fetch-proxy-in-javascript-to-avoid-cors-errors-with-apis-2b93c4ed0e78)
[CORS]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[Fetch API]: (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
[Heroku Cors Anywhere]: (https://cors-anywhere.herokuapp.com/)
