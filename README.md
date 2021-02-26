# Game of Thrones Interactive Map

This is an interactive map based on the popular TV series Game of Thrones built using React, Leaflet, Node.js, and MongoDB.

To explore the live app visit [https://game-of-thrones-interactive.herokuapp.com](https://game-of-thrones-interactive.herokuapp.com/).

#### Deploy Repo

The app has been deployed using heroku from a different repo which can be found here [https://github.com/LukasV3/g.o.t-interactive-map-heroku-deploy](https://github.com/LukasV3/g.o.t-interactive-map-heroku-deploy/). The deploy repo is simply the server files along with the compiled and minified client build folder from this repo. Both repos feature the same code however I had to create the deploy repo so heroku can run properly.

#### Technologies Used

Inspiration for the app came from Patrick Triest's implementation using Webpack, Leaflet, and framework-less Javascript components on the frontend and Node.js (koa), PostGIS, and Redis on the backend.

I however have implemented it using **React**, and **Leaflet** on the frontend, and **Node.js (express)**, and **MongoDB (mongoose)** on the backend. I have kept much of the styles the same and have focused on implementing the same functionality using entirely different technologies.

#### Structure

- `client/` - The frontend app code.
- `server/` - The backend app code.
