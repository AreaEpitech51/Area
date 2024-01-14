# How to add a new action to the list of actions

first, in the box conmponents there is a list of actions, your action will be defined by a string put it in the list of actions associated with a service
in seconds, go to the CallAction function and check if the action is registered on the web/mobile if yes, call the function associated with the action.

# How to add a reaction to the list of actions

Same than action, register your reaction to the list of reactions, and go to the CallReaction function, the call action will call callReaction when action triggered with the reaction in parameters.