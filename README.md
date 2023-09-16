# Countdown

## Improved countdown
The below component was designed to count down the days until our CTO's birthday, but it still needs some work. How can you make the implementation better?

**Do a critique:** The current implementation isn't perfect. How could it be improved?

* Pick an area of improvement to implement.
  * I will be improving the User Facing component of the countdown, making it more engaging.
* What would happen to the current code if the date were changed, the page layout was changed or the format was changed?
  * The current code only allows the date to be changed by the programmer since it is hard coded. 
  * If the page layout was changed there needs to be styling applied to the App, since there is basically no css for the website to adhere to. 
  * As far as formatting changes, the format of the data that is input for the date props does not have any error handlers in case it is not input correctly. Incorrect inputs would break the app.
* Does the current implementation follow best practices for HTML, CSS, JS and React?
  * There is no HTML unless you count jsx, CSS needs to have more styling, as well as mobile friendly styling/media queries to ensure proper styling on mobile. 
  * There is one hard coded value for the date which is not a best practice. 
  * Although there is nothing logically wrong with using a class based react component, functional components offer better simplicity and readability, and more libraries and tools are optomized for a React app built using functional components.

**Spice it up:** Let's be honest, this countdown could be a whole lot more exciting.

* What could you do to create a greater sense of urgency?
  * I think the size, and color of the timer numbers could set the tone as the timer ends. 
* How would you make this countdown more aesthetically pleasing?
  * I plan on using R3F to bring in 3D elements to the countdown, along with color. It is a birthday timer at the end of the day.
* Trust your design instincts, and explain how your design choices impact the user experience
  * 

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)



### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
