# Dynamic React

###Learning Objectives
 - [ ] Design the flow of data in a React application
 - [ ] Investigate when to use state vs. props
 - [ ] Justify storing Objects with keys as state instead of array


##Get organized
_NOTE:_ Before we continue, it will be easier to have three (3) terminal windows open to the same directory. This will allow us to work without swapping tons of windows. It might also be a good idea to open your browser to full-screen on another desktop. Also, now would be a good time to make sure your database is running. 

We'll need each one to do the following:
 1. One for our normal terminal window where we can work with git; 
 2. One for `webpack`, which will watch the `src` folder for changes and auto-rebuild our react app. 
 3. One for `nodemon`, which will watch our root folder for changes and auto-restart our node server (the step above usually triggers this step.) 
 
##Where are we now?
Now that you have the template sliced up into React, we should be able to `npm run rebuild` to rebuild the app. 

Your `App.jsx` should look something like this:

```
// import the libs we need
import React            from 'react'
import ReactDOM         from 'react-dom'
import Nav              from './Nav.jsx'
import Footer           from './Footer.jsx'
import TaskForm         from './TaskForm.jsx'
import TaskList         from './TaskList.jsx'

import util             from '../helpers/util.js'


// create a React Component Class called _App_
export default class App extends React.Component{

  // every class gets a constructor.
  // this is where we init the state.
  constructor() {

    // we also need to wake up our ancestors
    super();

    // here's our state
    this.state = {
      tasks : {}
    }
  }

  // ... other stuff here

  // 90% of your components will render()
  // REMEMBER you can only return **one** root element from a render fn.
  render(){
    return(
      <container>
        <header>
          <Nav />
        </header>
        <div className="container">
          <TaskForm />
          <section className="row">

            {/*OPEN ITEMS*/}
            <article className="col-md-6">
              <h3>Open Items</h3>
              <TaskList />
            </article>


            {/* COMPLETED ITEMS */}
            <article className="col-md-6">
              <h3>Completed Items</h3>
              <TaskList />

            </article>

          </section>
        </div>
        <footer>
          <Footer />
        </footer>
      </container>
      )
  }
}

// mount our App at #container
ReactDOM.render(<App/>, document.querySelector('#container'))

```

###Please Explain

Notice that our `App` has a `constructor` which is the method that runs when the class is instantiated. This is the perfect place to initialize our _state_. Our App is the container for our application and should be the only thing that manages the state for our app. The rest of our components will simply receive `props`, or references to methods (_mutators_ and/or _accessors_ of the state). 

The other components we've built should be `import`ed here (see `Nav`, `TaskList`, `TaskForm`,`Footer`). We'll instantiate these components using JSX syntax.
> JSX is an XML-compliant shortcut for creating React components
> see https://facebook.github.io/react/docs/jsx-in-depth.html



##Step 1: Make it Dynamic
Now that we have all the components in place and organized, we should be able  

