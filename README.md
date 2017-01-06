This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## To Run Locally
```bash
git clone https://github.com/maryvilledev/skilldirectoryui.git
cd skilldirectoryui
npm install
npm install axios
npm start
```
This will cause the project to start, and will open a new tab in your default browser. Note that you'll also want
to have the [backend](https://github.com/maryvilledev/skilldirectory) running on http://localhost:8080. If you are
having trouble getting the frontend (this project) to display data from the backend, the first thing you should
check is that you actually have data in the backend, and didn't clean it out (e.g. by using the `--dropdata` file
for `./make`).
