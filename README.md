# Calendra
*A mobile application that works as a crowd-managed calendar*

**Proposed level of achievement:** Gemini

![Poster](../media/Poster2.jpeg)

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
   4. Personal calendar: See all events picked on a calendar, and configure notifications to one’s liking
   5. Group Privacy and Moderation: Add moderator role and group privacy options.

* **Login and Register Screen:** If the user signed out or is signing in for the first time, the Welcome Screen will be the first thing they see. From this screen, they can either go to log in or register. The length of the password must be at least 6 characters.

Welcome Screen                             |  Login Screen                           |  Register Screen
:-----------------------------------------:|:---------------------------------------:|:---------------------------------------------:
<img src="../media/Welcome_new.png" alt="welcome" width="300"/>  |  <img src="../media/Login_new.png" alt="login" width="300"/>  |  <img src="../media/Register.PNG" alt="login" width="300"/>


* **Posts Screen:** Displays all the new events posted on the groups that the user joins. The user can then choose to add or ignore the events, to upvote or downvote the event for legitimacy. Users can see the new events of each group by selecting from the dropdown list of joined groups. Users can also post new events by selecting the group from the dropdown list and press the add button right next to it.

   <img src="../media/Post2.png" alt="posts" width="300"/>


* **Add new Event Screen:** Users can add a new event with event name, date, and time. The group this event belongs to is the group indicated in the dropdown list from the previous screen.

   <img src="../media/New_post_new.png" alt="add_post" width="300"/>


* **Calendar Screen:** Shows all the events in a calendar.

Full Calendar                                            |  Displayed Events                                        |  No Event Day
:-------------------------------------------------------:|:--------------------------------------------------------:|:----------------------------------------------------------:
<img src="../media/Calendar Month.png" alt="calendar_month" width="300"/>  |  <img src="../media/New Calendar.png" alt="calendar_event" width="300"/>  |  <img src="../media/Calendar Day no Event.png" alt="calendar_no_event" width="300"/>


* **Group Screen:** Display all the events of the groups in chronological order and by order of voting score. Highlights all the events that the user has already registered for. Has a following/follow button to follow/unfollow. If the user is the moderator of the group, there is a "Moderate" button to access moderator's options.

   <img src="../media/Group.png" alt="group" width="300"/>

* **Edit Group Image Screen:** A simple screen to change the group image. Accessible only by group moderators by tapping on the gear icon in the top-right of the Group Screen

   <img src="../media/Edit_group_image.png" alt="Edit_group_image" width="300"/>

* **Moderator Screen:** Display the options for moderators of a group. Moderators can set the mode of the group from public to private(request to follow and see the events). Moderators can also add more moderators to the group, kick people from the group, accept requests to join the group, delete events, or quit their role.

   <img src="../media/Moderator.PNG" alt="mod" width="300"/>
   
* **Request Screen:** Moderators can accept or decline requests to follow the group.

Before                                                   |  After                                        
:-------------------------------------------------------:|:--------------------------------------------------------:
<img src="../media/Request Before.PNG" alt="request_before" width="300"/>  |  <img src="../media/Request After.PNG" alt="request_after" width="300"/>  
   
* **Add Moderator Screen:** Moderators can search from the list of group members to add new moderators for the group.

   <img src="../media/Add Mod.PNG" alt="add_mod" width="300"/>
   
* **Member Screen:** Show a list of all the members of the group. Moderators can kick people out of the group.

   <img src="../media/Member.PNG" alt="member" width="300"/>
   
* **Account Screen:** This screen contains the profile image of the user which can be changed by tapping on it and the following utilities: 
   * Group Options: Navigate to another screen with options related to groups.
   * Settings: Customize the app and notifications.
   * Logout: Logout from the app.
<br/><br/>

   <img src="../media/Account2.png" alt="account" width="300"/>

* **Group Options Screen:** Display the options related to groups. User can search for groups, create new groups, or access the list of groups they are following.

   <img src="../media/Group Options.PNG" alt="add_post" width="300"/>

   
* **My Group Screen:** Displays all the groups the user currently joins. Has a following/follow button to unfollow the group.

   <img src="../media/My Group.PNG" alt="my_group" width="300"/>


* **Create Group Screen:** Includes a profile image and the name field.

   <img src="../media/Create Group.PNG" alt="create_group" width="300"/>


* **Search Group Screen:** Search for an existing group.

   <img src="../media/Search2.PNG" alt="search_group" width="300"/>


* **Setting Screen:** Includes options to edit user's profile, as well as to see all selected events and ignored events

   <img src="../media/Settings.png" alt="settings" width="300"/>

* **Selected Events Screen:** Displays all selected events. Each event includes options to change reminder notification time, attach a personal memo, and deselect that event

   <img src="../media/Selected_screen.png" alt="selected" width="300"/>

* **Ignored Events Screen:** Displays all ignored events. Each event can be unignored.

   <img src="../media/Ignored_screen.png" alt="ignored" width="300"/>

* **Edit Profile Screen:** Has options to change the user's profile image as well as display name. These two fields are both optional (e.g. leaving the image field empty while choosing a new display name will only change the display name).

   <img src="../media/Edit_profile.png" alt="edit_profile" width="300"/>

2. Additional features:
   1. Group Privacy: Group can be private or public
   2. Notification Settings: Implemented in the Selected Events Screen. Has options to trigger the notification 1 week before, 1 day before, 1 hour before or at event time
   3. Personal memo: Implemented in the Selected Events Screen. Allows user to save an event-specific personal memo that can be seen in the Calendar Screen only by the user

## Comparison with Existing Apps
*Default Calendar app:* with *default Calendar apps*, we have to keep track of all events and deadlines and manually add them to the calendar ourselves 
instead of using events suggested by others. This process is inefficient and tedious for a large number of deadlines and events on a regular basis.

*Google Calendar:* *Google Calendar* is designed mainly to facilitate small groups, and uses a shared calendar to show events for that group. 
*Calendra*, in contrast, can work for groups of all sizes, such as university module group or club group, since it uses a personal calendar which 
we personally populate with posted events. Moreover, we cannot vote on events in *Google Calendar*, which makes our app less susceptible to 
malicious parties such as spammers or trolls (which are admittedly more common in larger groups).

## Program Flow
_* Numbers only indicate scenario_

![Program_flow](../media/Updated User.PNG)
![Program_flow2](../media/Updated Mod.PNG)

## Firebase

* Users:
   * id: auto-generated
   * displayName: string
   * email: string
   * profileImage: string
   * groups: [ groupID, groupID, … ]
   * selectedEvents: [ eventID, eventID, … ]
   * ignoredEvents: [ eventID, eventID, … ]
   * downvotedEvents: [ eventID, eventID, … ]
   * upvotedEvents: [ eventID, eventID, … ]

* Groups:
   * id: groupName
   * groupName: string
   * groupImage: string
   * events: [ eventID, eventID, … ]
   * members: [ userID, userID, … ]
   * mode: “Public” or “Private”
   * moderator:  [ userID, userID, … ]
   * requests: [ userID, userID, … ]


* Events:
   * id: auto-generated
   * title: string
   * group: string
   * dateTime: timestamp
   * score: number


## Tech Stack
* Firebase
* React Native
* Android Studio
* Javascript

## Testing Plan
We tested the app among our friends, and including ourselves, to see if the idea worked well. We asked them to simulate a few scenarios: 

**Private group:** We created a small group with initially only one person as the sole member and moderator of the group. Other people request to join the group, and the moderator can accept and decline some requests(working). Non-followers cannot see the events of the group(working). The moderator then gives another member the moderator role, and can kick another member from the group(working). The moderator can also quit their moderator role in the moderate screen, or simply unfollow the group(working). (Corner case: If there is only one moderator left for the group, the moderator cannot quit their role or unfollow the group)

**Public group:** Everyone can follow and unfollow as they like(except for the last moderator), and all the events are public.

We also tested the app with slow internet connections. All functions still work as intended. However, offline support may be needed in the future.

