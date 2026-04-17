<img src="./src/assets/website_logo_for_README.svg" width="400px"/>

# quicksale - The global fast-paced marketplace!

## Github repo: https://github.com/ellyburke/webdev-otufbmp

Our web-application uses the Vue framework to develop an online marketplace application, that can be locally hosted on your own machine.

# Requirement Fulfillments and Key Web Components:

- SVGs are used throughout the application to add icons for buttons, corporate logos, and additional aesthetic stylings.

- Bulma is the main CSS framework used to add style.
- Additionally, vanilla CSS is used to develop the website's dynamic background, and scoped CSS is used to tweak element positions.

- JavaScript is used in Vue components to setup functionality in the element:
```js
<script setup>
```
- JavaScript is used to write the backend server.js script.
- The database that stores user data including accounts and listed items for sale is created with the "sqlite3" framework:
```js
new sqlite3.Database('./items.db')
```

- jQuery is used to manage a dynamic filtering system for only viewing select item listings.

- D3 is used to display an updating visual of a global map, that updates each country's shade to be darker with every item listed in that country.
- A CSV is appended with new listings so the map can keep up-to-date.

- AJAX is implemented in the asynchronous calls to load listings from the database, as well as load an updated map visual.

- Node.js is used to manage the fetch requests and make calls from the JavaScript to the database:
```js
app.get('/all-items', (req, res)) => {
  db.all('SELECT...
```
- Additionally, the package multer is used to handle file uploads (for item listing pictures).

- The Vue views display all the info previous mentioned to the user, and are built using our custom components.
- Vue routing is used to link pages together in a way that makes sense, for example after signing in the user is routed to the home page where the user can see available item listings. 

# Unique Features

Firstly, it should be mentioned that item listings can be favourited and viewed from your Favourites, and each item listing is tied to a user's account.

The quicksale marketplace is themed around being fast, so we thought it would be interesting to have items that have been listed for 7 days be removed.

- This encourages an updating market that is continously changing.

Additionally, item listings can be rated, which is not common in marketplace applications.

We added this feature because if a user has posted an item, the user may be selling multiple of that item. In that case, users should be able to leave a rating of what they thought of the item, so other users can make a more informed decision before purchasing.

Furthermore, for added user interaction there is also a comments section for each item listing.

# To Run the Application:

Firstly, download the code repo from the Github link: https://github.com/ellyburke/webdev-otufbmp

Secondly, in your terminal ensure you are in the root directory folder, "webdev-otufbmp".

Afterwards, run the following commands to install and start using the web application fully:

```sh
npm install
```

```sh
node server.js
```

```sh
npm run build
```

# Project Setup & Specifications
## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup & Dependency Installation:

```sh
npm install
```

### Running the Server to Initialize Backend SQL:

```sh
node server.js
```

### Compile and Hot-Reload for Development:

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production:

```sh
npm run build
```
