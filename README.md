[![CircleCI](https://circleci.com/gh/maryvilledev/skilldirectory.svg?style=svg)](https://circleci.com/gh/maryvilledev/skilldirectoryui)
# Skilldirectory UI
Skilldirectory UI is a React frontend for the [Skilldirectory REST API](https://github.com/maryvilledev/skilldirectory). It allows users to add and view skills, team members, links, and reviews - as well as register skills under team members.

![Skilldirectory UI Demo GIF](http://i.giphy.com/l0ExcOOIp6RKTVA5i.gif)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), and uses the [React Bootstrap](https://react-bootstrap.github.io/) theme.

You can find info on how to perform common tasks with a Create React App project [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## To Run Locally
```bash
git clone https://github.com/maryvilledev/skilldirectoryui.git
cd skilldirectoryui
npm install
npm start
```
This will cause the project to start, and will open a new tab in your default browser. Note that you'll also want
to have the [backend](https://github.com/maryvilledev/skilldirectory) running on http://localhost:8080. If you are
having trouble getting the frontend (this project) to display data from the backend, the first thing you should
check is that you actually have data in the backend, and didn't clean it out (e.g. by using the `--dropdata` file
for `./make`).

**Note that this project only contains the frontend.** It is not very functional unless the [Skilldirectory REST API](https://github.com/maryvilledev/skilldirectory) is also running and available (and the associated Cassandra backend) on `localhost:8080`.

## Running Tests
Unit tests for the project are written with [Jest](https://facebook.github.io/jest/docs/tutorial-react.html) and [Enzyme](https://github.com/airbnb/enzyme). The tests currently come in two varieties: snapshots and event simulations. To run the tests:
```bash
npm test
```
