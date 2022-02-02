# TripPlanner Ideas

## Share plans

    As an user
    I want to be able to share my plan with other users
    To show them my ideas an allow to collaborate

### Share with users

This functionality should be accessible for plans that user owns (created).
It will allow to share plan with other active (confirmed account) users.

Later it will allow also to set rights to the shared plan (write/read/both) for each user (or just for a plan).
It will also be connected with another feature - **message/notification bus** described below.

### Share with link

Share functionality should allow to share plan with users that doesn't have an account - **read mode only**.
Each plan should have generated Guid/link

## Message/Notification bus

    As an user
    I want to be informed and inform other users about changes in plan
    To easily view changelog

### Service bus

This feature will be considered as an azure service bus in collaboration with azure function.
TripPlanner.Api will send notification data into bus, and azure function which will be time triggered will take each item from the bus and do whatever necessary:
  - send an **message** to the other user
  - send an email to the user
  - do other tasks

### Messages
This will require a new database table which will contains messages/notifications.

|Id|SenderId|ReceiverId|Title|Content|CreatedTime|ReadTime|
|---|---|---|---|---|---|---|---|
|Guid not null|Guid. 0 - for system|Guid null|string|string|DateTime not null|DateTime. Null -> not read|

# Bugs / Todo

## Plan locations

Currently plan locations are provided by /api/locations/{PlanId} path
it should be changed to get plan locations along with plan details via /api/plans/{planId} path.
Api should verify if user has an access to the plan.

## Plan view

Currently plan is displayed as a timeline with image displayed. It is too big, it should has only a name. Now whole item is available to drag, but it should be only possible only by smaller icon.