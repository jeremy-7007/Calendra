# Calendra
*A mobile application that works as a crowd-managed calendar*

**Proposed level of achievement:** Gemini

![Poster](../media/Poster.png?raw=true)

## Motivation
University life is hectic. We are constantly bombarded with one deadline after another, from homework or project submissions to competitions or club events. 
Manually keeping track of all these deadlines can be a gruelling task, and there’s no telling when you might forget about one of them entirely. 
With Calendra, you can be at ease knowing a community of your peers are here to remind you of every event. One tap will add a peer-suggested event to your calendar, 
and you can vote on each event to verify their authenticity, just like social media!

## Aim
We wish to make an app where students can quickly and conveniently add peer-suggested events and deadlines to their personal calendar, 
as well as vote on each event to verify them.

## User Stories
* As a student, I want to be able to see all events and deadlines suggested by my peers, and add each one to my calendar easily. 
I also want to be reminded of these events before they come according to my own configurations. 
Moreover, I want to be able to post new events, and vote on existing events to verify them.
* As a teacher or event organiser, I want to be able to post events and deadlines where my students or audience group can see them 
and conveniently add them to their own calendars.
* As a moderator of a group, I need to be able to see all members and ban anyone I suspect might be spamming or a bot

## Scope of Project
1. Key features:
   1. Upvote/Downvote system: To allow crowd verification of the legitimacy of the event.
   2. Visible/Ignore: To allow personalization since not all events in the group are relevant to all members.
   3. Groups system: Follow relevant groups to see events posted there
   4. Personal calendar: see all events picked on a calendar, and configure notifications to one’s liking

* **Login and Register Screen:** For now, any email can be registered. However, we will implement a restriction which is that only NUS email can be used. Passwords must have at least 6 characters.

Welcome Screen                             |  Login Screen                           |  Register Screen
:-----------------------------------------:|:---------------------------------------:|:---------------------------------------------:
<img src="../media/Welcome.PNG" alt="welcome" width="300"/>  |  <img src="../media/Login.PNG" alt="login" width="300"/>  |  <img src="../media/Register.PNG" alt="login" width="300"/>


* **Posts Screen:** Displays all the new events posted on the groups that the user joins. The user can then choose to add or ignore the events, to upvote or downvote the event for legitimacy. Users can see the new events of each group by selecting from the dropdown list of joined groups. Users can also post new events by selecting the group from the dropdown list and press the add button right next to it. In the future we will implement an admin role so that only the admins can post new events.

   <img src="../media/Post.png" alt="posts" width="300"/>


* **Add new Event Screen:** Users can add a new event with event name, date, and time. The group this event belongs to is the group indicated in the dropdown list from the previous screen.

   <img src="../media/Create Event.png" alt="add_post" width="300"/>


* **Calendar Screen:** Shows all the events in a calendar.

Full Calendar                                            |  Displayed Events                                        |  No Event Day
:-------------------------------------------------------:|:--------------------------------------------------------:|:----------------------------------------------------------:
<img src="../media/Calendar Month.png" alt="calendar_month" width="300"/>  |  <img src="../media/Calendar Day got Event.png" alt="calendar_event" width="300"/>  |  <img src="../media/Calendar Day no Event.png" alt="calendar_no_event" width="300"/>


* **Group Screen:** Display all the events of the groups in chronological order. Highlights all the events that the user has already registered for. Has a following/follow button to follow/unfollow.

   *(Yet to implement)*


* **Account Screen:** This screen contains the profile image of the user which can be changed by tapping on it and the following utilities: 
   * My Group: See which groups the user belongs to
   * Create Group: Create a new group. This automatically adds the user to the group.
   * Search Group: Search for an existing group.
   * Setting: Customize the app and notifications  
<br/><br/>

   <img src="../media/Account.png" alt="account" width="300"/>


* **My Group Screen:** Displays all the groups the user currently joins. Has a following/follow button to unfollow the group.

   <img src="../media/Mi Group.png" alt="my_group" width="300"/>


* **Create Group Screen:** Includes a profile image and the name field.

   <img src="../media/Create Group.PNG" alt="create_group" width="300"/>


* **Search Group Screen:** Search for an existing group. Displays an error message if the group does not exist.

   <img src="../media/Search.PNG" alt="search_group" width="300"/>


* **Setting Screen:**

   *(Yet to implement)*

2. Additional features:
   1. Admin role: Each group may have a few mods to regulate posts and also to accept followers. To follow a group, users will have to wait until a mod accepts their request to    follow.
   2. Login via NUS: To ensure that each student/teacher/staff only has one official account.
   3. Multi-language support
   4. Notification settings

## Comparison with Existing Apps
*Default Calendar app:* with *default Calendar apps*, we have to keep track of all events and deadlines and manually add them to the calendar ourselves 
instead of using events suggested by others. This process is inefficient and tedious for a large number of deadlines and events on a regular basis.

*Google Calendar:* *Google Calendar* is designed mainly to facilitate small groups, and uses a shared calendar to show events for that group. 
*Calendra*, in contrast, can work for groups of all sizes, such as university module group or club group, since it uses a personal calendar which 
we personally populate with posted events. Moreover, we cannot vote on events in *Google Calendar*, which makes our app less susceptible to 
malicious parties such as spammers or trolls (which are admittedly more common in larger groups).

## Program Flow
_* Numbers only indicate scenario_

![Program_flow](../media/Program_flow.jpeg?raw=true)

## Firebase

* Users:
   * id: auto-generated
   * displayName: string
   * email: string
   * profileImage: string
   * groups: [ groupID, groupID, … ]
   * selectedEvents: [ eventID, eventID, … ]
   * ignoredEvents: [ eventID, eventID, … ]

* Groups:
   * id: groupName
   * groupName: string
   * groupImage: string
   * events: [ eventID, eventID, … ]

* Events:
   * id: auto-generated
   * title: string
   * group: string
   * dateTime: timestamp
   * score: number

## Development plan

**1st week of July:** Peer review + Troubleshooting core features\
**2nd week of July:** Addressing feedback + Add additional features\
**3rd week of July:** Working app + Troubleshooting\
**4th week of July:** Working on MS3

## Tech Stack
* Firebase
* React Native
* Android Studio
* Javascript

## Testing Plan
We plan to test on our own first, and get friends to test out and give feedback on our app in week 3 of July.

