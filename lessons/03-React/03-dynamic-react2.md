# Dynamic React

Welcome back to "Wiring up React for fun and profit". We now have a one-way connection from our form to our list. Put another way, our lists are reacting to the change in our `App`'s state.

#####Not quite there yet.
But, our lists aren't accurate: one list is supposed to show open (uncompleted) tasks, while the other is supposed to show closed (completed) tasks. Let's implement a way to keep the lists sorted by completion status. 

> #####Check for Understanding 
> Before you continue, take a hard look at what actually differentiates the lists. How can we `.filter()` the lists to keep only the items we want? What would that function look like? 

##Step 1: Sort the Lists
