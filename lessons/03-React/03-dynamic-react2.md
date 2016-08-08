# Dynamic React, Pt 2
###Learning Objectives
 - [ ] Use function composition to simplify complex behavior
 - [ ] Create layers of abstraction to hide and contain complexity
 - [ ] Construct and implement React Child Nodes

Welcome back to "Wiring up React for fun and profit". We now have a one-way connection from our form to our list. Put another way, our lists are reacting to the change in our `App`'s state.

#####Not quite there yet.
But, our lists aren't accurate: one list is supposed to show open (uncompleted) tasks, while the other is supposed to show closed (completed) tasks. Let's implement a way to keep the lists sorted by completion status. 

> #####Check for Understanding 
> Before you continue, take a hard look at what actually differentiates the lists. How can we `.filter()` the lists to keep only the items we want? What would that function look like? 

##Step 1: Sort the Lists
In `TaskList`, before we run the `.map()`, we'll need to filter out the completed tasks. 
>Remember, that [`Array.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) takes a function that allows us to take certain items from an array that match a Boolean expression

```javascript
return (
  <div className="list-group">
    {Object.keys(props.tasks)
      .filter(task=>!task.completed)
      .map(createButton)}
  </div>
)
```

###Eh, kinda.
This works, but for only one of the lists. We need to somehow do the opposite function on the other list (`!task.completed` vs `task.completed`). The problem we're facing here is that from within the `TaskList` we don't know where we are on the page or how we're being used. Additionally, we _shouldn't_ have this much knowledge. Remember that from inside a stateless function, our only job is to render, not have knowledge about the rest of the application.

###A Better Filter
The solution to the above problem should be solved by our `TaskList`'s parent— the `App`, which holds all the logic and reasoning about the overall application and how each `TaskList` should be implemented. 

In the `App`, let's supply the `TaskList` with a filter function to tell it how to filter itself.
```javascript
<h3>Open Items</h3>
<TaskList
  tasks={this.state.tasks}
  filter={task=>!task.completed}/>

```

```javascript
<h3>Completed Items</h3>
<TaskList
  tasks={this.state.tasks}
  filter={task=>!!task.completed}/>

```
Then, back in `TaskList`, let's just use this new filter passed in from our props. We have one more hurdle to jump through: our `.filter` is looping over keys, not tasks, so let's wrap it with another function that takes the key and returns our task.
```javascript
return (
  <div className="list-group">
    {Object.keys(props.tasks)
      .filter(key=>props.filter(props.tasks[key]))
      .map(createButton)}
  </div>
)

``` 
Test this out and you should see that only the open tasks get populated. 
  1. Add a few tasks using the form
  2. If we open the React dev tool, we can manipulate a task to change it to 'completed' and it should magically jump to the 'completed' list.

> Imagine that in the future, we could implement a third list of deleted tasks. All we would have to do is change the supplied filter function

##Step 2. Completing Tasks
We've got all our functionality, but clicking on the buttons doesn't do anything. Let's fix that. 

###Toggling Tasks
Let's make a mutator for toggling tasks. Clicking any button should swap Boolen value of `task.completed`. 

#####You Do:
  1. In `App`, create a new mutator method that toggles the `completed` key of each task. _Hint: this method is almost identical to the `addTask` method. `previousState.tasks[task_id].completed = !previousState.tasks[task_id].completed`
  2. Update the `TaskList` JSX to include a new prop, `buttonClick` and pass your new method.
  3. Don't forget to `.bind(this)` since we're refrencing `this.state` in the method.


####Wait! REFACTOR ALERT!
This is starting to get a little visually complicated and verbose. We can do better, my friends. 

  1. Let's promote our `createButton` function in `TaskList` to a React component. From the point of view of the TaskList, its responsibility is to make a list of `Task`s, so let's promote our button to a `Task`.
  2. Create a new stateless, functional component called `Task`.
  3. Move the contents of the `createButton` function (the `<button...>` stuff) into our new `Task`
  4. Make sure you `import` your new `Task.jsx` into `TaskList`.
  5. The keys and the clicks will stay in `TaskList` and the `<button type=` and `className` will be the responsibility of our new `Task`


######TaskList.jsx
```javascript
import React from 'react'
import Task from './Task.jsx'

const TaskList = props=>

  <div className="list-group">
    {Object.keys(props.tasks)
      .filter(key=>props.filter(props.tasks[key]))
      .map(key=>
        <Task
          key={key}
          onClick={event=>props.buttonClick(key)}
          task={props.tasks[key]} />
      )}
  </div>

export default function TaskList
```

######Task.jsx
```javascript

import React from 'react'

const Task = props=>
  <button 
    type="button"
    className="list-group-item"
    onClick={props.onClick}>
      {/* text on the button */}
      <strong>{props.task.name}</strong> {props.task.desc}

      {/* any children given to me shall be rendered here */}
      {props.children}
  </button>


export default Task

```
> Notice that `Task` has no idea about `key` only `props.task`, and any children passed in. 


Notice that in the layout reference, only the completed `TaskList` contains a 'delete button'. How can we add specific links to only one instance of `TaskList`? 

#####You Do:
  1. Create `App.deleteTask(task_id)` method.
  2. This method should be almost the same as `toggleTask`, except we're going to toggle `previousState[task_id].deleted` 

##Step 3. Create Child Nodes
Open up  `layout.html` and take a look at the realtionship between the `<button />` and the `delete` link. It's a parent/child relationship. When we nest JSX (like X/HTML), we create a parent/child relationship. 

The nested child JSX is referenced by the parent as `props.children`. To build on the example, we could simply add our `<a/>` tag here, but it will look ugly and complicated, and also mix lots of concerns. Let's create a new component to wrap our links. 

#####You Do:
  1. Create a new stateless component called `DeleteButton.jsx` in the same fashion as `Task`. Use One of the delete html links from `layout.html`. 
  2. Within the `DeleteButton` function, create another function, `handleClick(event)`. 
  3. `handleClick(event)` should stop the event's propagation and fire the `click` provided by the props (we'll cover the click event next).
  4. Create `App.deleteTask(task_id)` that will behave identically to `toggleTask`, except it'll toggle `task.deleted`.
  5. Include your newly-minted `DeleteButton` as a child of `TaskList`
  6. Give `DeleteButton` a new `click` prop  to pass in the `deleteTask` action. 
  7. Your child `DeleteButton` won't yet work, but `App` should look like this:

```javascript
...
  {/* COMPLETED ITEMS */}
  <article className="col-md-5">
    <h3>Completed Items</h3>
    <TaskList
      tasks={this.state.tasks}
      filter={task=>!!task.completed&&!task.deleted }
      buttonClick={this.toggleTask.bind(this)}>

      <DeleteButton click={this.deleteTask.bind(this)} />
    
    </TaskList>
  </article>
...
```
##Step 4. Passing Child Nodes

###TaskList is actually a `button` (Task) Factory
In the steps above, we've successfully wired up the JSX, and passed the appropriate props to our components, but it still doesn't work properly. If you look closely inside the `TaskList`, you'll see that its primary goal is to iterate over `state.tasks` and generate new `Task`s (buttons)... or even `DeleteButton`s.

>Technically, this creational pattern is called a [Factory Pattern](https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)), wherein we have a method that generates other objects. From the point of view of the `App`, `TaskList` is a [black box](https://en.wikipedia.org/wiki/Black_box): we give it as input some raw ingredients, and it outputs some useful, decorated objects. The key to this pattern is that we didn't tell the factory _how_ to create the object, just gave it some stuff to build.


From within the `TaskList`, we can take these raw ingredients and build a `Task` with each iteration.


```javascript

/*BAD EXAMPLE*/
const TaskList = props=>

  <div className="list-group">
    {Object.keys(props.tasks)
      .filter( task_id=>props.filter(props.tasks[task_id]) )
      .map(task_id=>
        <Task
          key={task_id}
          onClick={event=>props.buttonClick(task_id)}
          task={props.tasks[task_id]}>

          /* WRONG; Our child's click event isn't bound to **this** task_id */
          {props.children}
        </Task>
      )}
  </div>

```

>This code has a serious problem; our `deleteTask` function has no idea about the `task_id` of the button it's sitting on. In order to work as expected, `deleteClick` (like `buttonClick`) needs a specific `task_id` to operate. 

Like `onClick`, we should wrap `deleteTask` in another function to capture this current `task_id` (actually creates a closure around each `task_id`). However, `props.children` is _immutable_ (READ-ONLY), so we can't change any of its props or events. In order to modify these kids, we need to clone them.


##Step 6. Cloning Child Nodes
In `TaskList`, we've been given everything we need by our parents to actually clone the child item(s). Let's clone our children dynamically and assign them anything we want at our new creation-time. 

>Is this another factory (within-a-factory)??

######TaskList.jsx

```javascript

import React from 'react'
import Task from './Task.jsx'

const cloneAndAssignClickHandler = (children,id) =>
  React.Children.map(children, child=>
    /* We have to clone our children because props are READ-ONLY*/
    React.cloneElement(child, {
      /* our child needs some modified behavior*/
      click: ()=>child.props.click(id)
    })
  )


const TaskList = props=>

  <div className="list-group">
    {Object.keys(props.tasks)
      .filter( task_id=> props.filter(props.tasks[task_id]) )
      .map( task_id=>

        <Task
          key={task_id}
          onClick={event=>props.buttonClick(task_id)}
          task={props.tasks[task_id]}>

          {cloneAndAssignClickHandler(props.children, task_id)}

        </Task>
      )}
  </div>

export default TaskList
```
>Note `props.children` is an [opaque data structure](https://facebook.github.io/react/docs/top-level-api.html#react.children), meaning that it may be an array or object. We use `React.Children.map` to help us iterate over 0..n children without an error.

In keeping things tidy, we've exiled our cloning operation and exposed only what is necessary, the ref to the `props.children` and the current`task_id`. **This will effectively "modify" our child by updating its `click` to a function that is bound by our current `task_id`.**

