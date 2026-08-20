Orvyn — Whole App Product Specification

Document: Whole App Master Specification
Product: Orvyn
Version: 0.1
Status: Product Definition / Build Reference
Purpose: Single source of truth for the complete Orvyn app experience.

1. Product Definition

1.1 What is Orvyn?

Orvyn is an interest-driven community platform designed around Spaces, identity, conversation, discovery, and lightweight social interaction.

The product takes the strongest ideas from community platforms such as Amino while rebuilding them around a cleaner information architecture, modern discovery, better moderation, and a more flexible content model.

1.2 Core Product Promise

Find your people. Build your space. Belong somewhere.

Orvyn should make it easy for a person to:

Discover communities around their interests.

Join Spaces that feel meaningful.

Build a recognizable identity.

Publish different types of content.

Meet and interact with other members.

Create and manage their own Spaces.

Participate in conversations without needing algorithmic popularity to dominate the experience.

1.3 Product Principles

Interest before popularity

Community before follower count

Identity without pressure

Conversation over engagement farming

Creation should be simple

Moderation should be powerful but understandable

Discovery should feel intentional

Every Space should feel like its own world

Privacy and safety are first-class features

The interface should remain lightweight

2. Product Architecture

Orvyn is organized around six primary layers:

ORVYN
│
├── Identity
│   ├── Account
│   ├── Profile
│   ├── Interests
│   └── Social Graph
│
├── Spaces
│   ├── Discovery
│   ├── Membership
│   ├── Feed
│   ├── Rooms
│   ├── Rules
│   └── Moderation
│
├── Content
│   ├── Posts
│   ├── Questions
│   ├── Polls
│   ├── Media
│   ├── Articles
│   └── Comments
│
├── Interaction
│   ├── Reactions
│   ├── Comments
│   ├── Replies
│   ├── Follows
│   ├── Mentions
│   └── Messaging
│
├── Discovery
│   ├── Search
│   ├── Explore
│   ├── Recommendations
│   └── Trending
│
└── Platform
    ├── Notifications
    ├── Safety
    ├── Moderation
    ├── Settings
    └── Administration

3. Information Architecture

3.1 Primary Navigation

The default mobile navigation should contain:

Home

Explore

Create

Activity

Profile

Spaces remain a primary object throughout the application and can be surfaced through Home, Explore, Search, and Profile.

Navigation model

Home
├── Personal Feed
├── Following
├── Your Spaces
└── Suggested Spaces

Explore
├── Search
├── Categories
├── Trending
├── Recommended Spaces
└── Recommended People

Create
├── Post
├── Question
├── Poll
├── Media
└── Article

Activity
├── Notifications
├── Mentions
├── Replies
├── Reactions
└── Invitations

Profile
├── Posts
├── Spaces
├── About
├── Followers
├── Following
└── Settings

4. Account & Authentication

4.1 Entry Flow

Launch
  ↓
Welcome
  ↓
Sign Up / Log In
  ↓
Verification
  ↓
Profile Setup
  ↓
Interest Selection
  ↓
Space Recommendations
  ↓
Home

4.2 Authentication Methods

MVP:

Email

Password

Email verification

Password reset

Future:

Google

Apple

Passkeys

Phone authentication

4.3 Account States

Unregistered

Registered

Email pending verification

Active

Suspended

Restricted

Deleted

5. Onboarding

Onboarding should be short, progressive, and interest-driven.

5.1 Steps

Step 1 — Welcome

Explain Orvyn in one screen.

Step 2 — Choose Interests

Users select topics they care about.

Examples:

Anime

Gaming

Books

Music

Movies

Technology

Art

Fitness

Photography

Science

Fashion

Education

Step 3 — Identity

Collect:

Username

Display name

Profile image

Optional bio

Step 4 — Space Recommendations

Show Spaces based on selected interests.

Step 5 — Join

User can join immediately or skip.

Step 6 — Home

Show a useful feed instead of an empty state.

6. Home

Home is the user's primary social surface.

6.1 Home Structure

Header
├── Orvyn Logo
├── Search
└── Profile / Quick Access

Feed Controls
├── For You
├── Following
└── Spaces

Feed
├── Post
├── Post
├── Post
└── Post

Floating / Bottom Create Action

6.2 Home Feed

The feed can contain:

Posts from joined Spaces

Posts from followed users

Recommended content

Questions

Polls

Media

Announcements

6.3 Feed Ranking

MVP ranking should prioritize:

Membership relevance

Recent activity

User interaction

Content quality signals

Freshness

Diversity

Avoid building an aggressively addictive ranking system in the first version.

7. Explore

Explore is the discovery engine of Orvyn.

7.1 Explore Sections

Explore
│
├── Search
├── Trending
├── Popular Spaces
├── New Spaces
├── Recommended For You
├── Categories
└── People

7.2 Categories

Spaces may belong to one or more categories.

Example:

Anime
Gaming
Books
Movies
Music
Technology
Art
Science
Education
Sports
Lifestyle
Culture
Creative
Professional
Other

7.3 Search

Search should support:

Spaces

Users

Posts

Tags

Categories

Search suggestions should appear while typing.

8. Spaces

Spaces are the central object of Orvyn.

A Space is a persistent community organized around a shared interest, fandom, topic, identity, project, or purpose.

8.1 Space Types

MVP:

Public

Private

Future:

Invite-only

Unlisted

Restricted

8.2 Space Structure

Space
│
├── Identity
│   ├── Name
│   ├── Icon
│   ├── Cover
│   ├── Description
│   └── Category
│
├── Community
│   ├── Members
│   ├── Roles
│   ├── Rules
│   └── Moderators
│
├── Content
│   ├── Feed
│   ├── Rooms
│   ├── Posts
│   └── Announcements
│
└── Management
    ├── Moderation
    ├── Settings
    ├── Analytics
    └── Member Management

9. Space Home

9.1 Layout

Cover
Space Icon
Space Name
Description
Member Count

[Join / Joined]

Tabs
├── Feed
├── Rooms
├── About
└── Members

Content

9.2 Space Header Actions

For members:

Joined

Notifications

Share

More

For non-members:

Join

Share

More

For moderators:

Manage

Notifications

Share

More

10. Space Membership

Membership states:

Visitor
↓
Requested
↓
Member
↓
Moderator
↓
Owner

A member may leave a Space at any time unless restricted by product policy.

10.1 Membership Actions

Join

Leave

Invite

Follow Space

Enable notifications

Mute Space

11. Space Roles

11.1 Owner

Full control.

Permissions:

Delete Space

Transfer ownership

Manage moderators

Manage rules

Manage settings

Manage members

Moderate content

View analytics

11.2 Moderator

Permissions configurable by Space owner.

Default:

Remove content

Lock posts

Warn members

Mute members

Ban members

Review reports

Manage discussions

11.3 Member

Can:

Publish

Comment

React

Participate in rooms

Report content

Invite where permitted

12. Space Rules

Every Space should be able to define rules.

Example:

1. Be respectful.
2. Stay on topic.
3. No spam.
4. No harassment.
5. Use content warnings when appropriate.

Rules are displayed during joining and accessible from the Space About page.

13. Rooms

Rooms are focused areas inside a Space.

Examples:

Anime Space
├── General
├── Manga
├── Fan Art
├── Theories
├── Spoilers
└── Announcements

Rooms can provide:

Name

Description

Icon

Permissions

Moderators

Content type restrictions

14. Smart Post System

Orvyn should not force every piece of content into the same generic post format.

14.1 Content Types

Standard Post

Text + optional media.

Question

Designed for answers and discussion.

Poll

Question + multiple options.

Media Post

Image/video-focused content.

Article

Long-form text.

Announcement

Moderator/owner controlled important communication.

15. Post Composer

15.1 Entry

User taps Create.

Create
├── Post
├── Question
├── Poll
├── Media
└── Article

15.2 Composer

Common fields:

Destination Space

Room

Content

Media

Tags

Mentions

Visibility

Optional:

Spoiler

Content warning

Comments enabled/disabled

15.3 Drafts

Users should be able to save unfinished content.

16. Posts

16.1 Post Card

Author
Avatar
Name
Username
Time
Space

Content

Media

Actions
├── React
├── Comment
├── Share
└── More

16.2 More Menu

Depending on ownership:

Edit

Delete

Save

Share

Copy link

Report

Hide

Mute author

17. Comments & Replies

Comments support threaded conversation.

Post
└── Comment
    ├── Reply
    │   └── Reply
    └── Reply

Actions:

React

Reply

Edit own comment

Delete own comment

Report

Hide

18. Reactions

MVP:

Like / primary reaction

Future:

Multiple reactions

Custom Space reactions

Reaction counts should not dominate the interface.

19. User Profiles

19.1 Profile

Avatar
Display Name
@username
Bio

[Follow]

Stats
├── Followers
├── Following
└── Spaces

Tabs
├── Posts
├── Spaces
└── About

19.2 Profile Identity

A profile should represent the person across Orvyn.

Space-specific roles and reputation may appear separately.

20. Following System

Users can follow other users.

Following affects:

Home feed

Recommendations

Activity

Notifications

Follow relationships should remain independent from Space membership.

21. Messaging

Private messaging is a secondary feature.

21.1 MVP

One-to-one conversations

Text

Image/media

Message requests

Block

Report

21.2 Future

Group chats

Voice

Video

File sharing

Rich reactions

Messaging should not become the primary navigation focus.

22. Notifications

Notification categories:

Activity
├── Reactions
├── Comments
├── Replies
├── Mentions
├── Follows
├── Space Invitations
├── Moderation
└── System

Users can configure notification preferences globally and per Space.

23. Discovery & Recommendation

Recommendation signals:

Selected interests

Joined Spaces

Followed users

Interaction history

Search history

Content similarity

Space activity

Freshness

Avoid recommending content exclusively based on popularity.

23.1 Recommendation Goals

The system should answer:

"What community would I actually enjoy joining?"

rather than:

"What content will keep me scrolling?"

24. Tags

Tags provide lightweight content classification.

Examples:

#anime
#manga
#revit
#physics
#gaming
#books

Tags can be:

searched

followed

recommended

attached to posts

25. Sharing

Content can be shared through:

Internal share

Copy link

Native OS share

Space share

User share

Deep links should open the relevant content.

26. Moderation

Moderation is a core platform feature.

26.1 User Actions

Users can:

Report

Block

Mute

Hide

26.2 Moderator Actions

Moderators can:

Remove content

Lock discussion

Warn user

Mute user

Suspend user from Space

Ban user from Space

Review reports

26.3 Platform Actions

Platform administrators can:

Suspend account

Restrict account

Remove illegal/unsafe content

Delete Spaces

Manage platform-wide reports

27. Reporting

Report flow:

Report
 ↓
Select reason
 ↓
Optional details
 ↓
Submit
 ↓
Confirmation

Reasons:

Spam

Harassment

Hate

Sexual content

Violence

Self-harm

Illegal activity

Copyright

Misinformation

Other

Do not expose unnecessary moderation details to the reporter.

28. Safety

Core safety controls:

Block

Mute

Report

Message requests

Privacy controls

Account visibility

Content warnings

Moderation

Age-appropriate protections

29. Settings

Account

Email

Password

Username

Delete account

Profile

Name

Avatar

Bio

Privacy

Profile visibility

Follow permissions

Message permissions

Mention permissions

Notifications

Push

Email

Space notifications

Activity notifications

Appearance

Light

Dark

System

Safety

Blocked accounts

Muted accounts

Content preferences

Support

Help

Report a problem

Community guidelines

Terms

Privacy policy

30. Design System

30.1 Visual Direction

Orvyn should feel:

Modern

Bold

Community-first

Youthful without being childish

Expressive

Clean

Slightly futuristic

30.2 Core Palette

Primary:

Electric Violet
#8B5CF6

Dark backgrounds:

Deep Indigo

Use neutral surfaces extensively.

The action color should remain recognizable without overwhelming every screen.

30.3 Typography

Recommended:

Headings:
Bold modern sans-serif

Body:
Clean readable sans-serif

Buttons:
Medium / semibold

The interface should use strong typography hierarchy rather than excessive decoration.

31. Responsive Design

Primary target:

Mobile

Secondary:

Tablet

Desktop web

The information architecture should remain consistent across breakpoints.

Desktop can use:

Left Navigation
    +
Main Content
    +
Right Context Panel

Mobile should prioritize:

Bottom Navigation
+
Single-column content

32. Core Data Model

User

User
- id
- username
- display_name
- email
- avatar_url
- bio
- created_at
- status

Interest

Interest
- id
- name
- category

UserInterest

UserInterest
- user_id
- interest_id

Space

Space
- id
- name
- slug
- description
- icon_url
- cover_url
- category
- visibility
- owner_id
- created_at

Membership

Membership
- id
- user_id
- space_id
- role
- status
- joined_at

Room

Room
- id
- space_id
- name
- description
- permissions
- created_at

Post

Post
- id
- author_id
- space_id
- room_id
- type
- title
- body
- visibility
- created_at
- updated_at

Comment

Comment
- id
- post_id
- author_id
- parent_id
- body
- created_at
- updated_at

Reaction

Reaction
- id
- user_id
- target_type
- target_id
- reaction_type
- created_at

Follow

Follow
- follower_id
- following_id
- created_at

Notification

Notification
- id
- user_id
- actor_id
- type
- target_type
- target_id
- read_at
- created_at

Report

Report
- id
- reporter_id
- target_type
- target_id
- reason
- details
- status
- created_at

33. Backend Architecture

Recommended initial architecture:

Client
  ↓
API / Backend
  ↓
Authentication
  ↓
Database
  ↓
Storage
  ↓
Notifications

Suggested early stack:

Frontend:
React / Next.js or React Native

Backend:
Supabase

Database:
PostgreSQL

Storage:
Supabase Storage

Authentication:
Supabase Auth

Realtime:
Supabase Realtime

Hosting:
Vercel / equivalent

The architecture should remain replaceable so the MVP does not become locked to one provider.

34. API Domains

Suggested API organization:

/auth
/users
/profiles
/interests
/spaces
/memberships
/rooms
/posts
/comments
/reactions
/follows
/search
/discovery
/notifications
/messages
/reports
/moderation
/settings

35. Permissions Model

Permissions should be checked server-side.

Example:

Platform Admin
    ↓
Space Owner
    ↓
Moderator
    ↓
Member
    ↓
Visitor

Never rely solely on client-side permission checks.

36. Analytics

Track product health without turning Orvyn into an engagement-maximization machine.

Important metrics:

Acquisition

Signups

Signup completion

Onboarding completion

Activation

First Space joined

First post

First comment

First follow

Community

Active Spaces

New Spaces

Active members

Posts per Space

Comments per post

Retention

D1

D7

D30

Safety

Reports

Moderation actions

Block rate

Spam rate

37. Empty States

Every major screen needs a useful empty state.

Examples:

No Spaces

You haven't joined any Spaces yet.

CTA:

Explore Spaces

No Posts

Your community is quiet right now.

CTA:

Start a conversation

No Notifications

You're all caught up.

No Messages

Your conversations will appear here.

38. Loading States

Use skeletons for:

Home feed

Space page

Explore

Profiles

Comments

Avoid excessive spinners.

39. Error Handling

Errors should explain:

What happened.

Whether the user's action succeeded.

What they can do next.

Example:

We couldn't publish your post. Check your connection and try again.

CTA:

Retry

40. Deep Linking

Supported deep-link patterns:

/orvyn
/orvyn/space/{space}
/orvyn/space/{space}/post/{post}
/orvyn/user/{username}
/orvyn/tag/{tag}

Deep links should preserve navigation context.

41. Search UX

Search should be globally accessible.

Example:

Search Orvyn

Recent
────────────
anime
revit

Suggested
────────────
Anime Spaces
People
Posts
Tags

Search results should be categorized rather than one giant mixed list.

42. Space Creation Flow

Create Space
 ↓
Name
 ↓
Category
 ↓
Description
 ↓
Icon
 ↓
Visibility
 ↓
Rules
 ↓
Create
 ↓
Space Home

Optional advanced setup can happen later.

The user should be able to create a Space in under a few minutes.

43. Space Management

Owner dashboard:

Manage Space
│
├── Overview
├── Content
├── Members
├── Moderation
├── Roles
├── Rooms
├── Rules
├── Notifications
├── Appearance
├── Settings
└── Analytics

44. Admin Dashboard

Platform administration should be separate from normal user UX.

Admin
├── Dashboard
├── Users
├── Spaces
├── Reports
├── Moderation
├── Content
├── Categories
├── System Health
└── Settings

45. Monetization

Monetization should not compromise community quality.

Potential future models:

Premium Spaces

Owners can offer premium communities.

Creator Subscriptions

Users can support creators.

Digital Goods

Future marketplace for community-specific goods.

Platform Premium

Potential Orvyn Plus features.

Sponsorship

Only if relevant and clearly disclosed.

Monetization is not required for MVP.

46. MVP Scope

Must Have

Authentication

Onboarding

Interests

Home

Explore

Search

Spaces

Space membership

Space feed

Rooms

Profiles

Posts

Comments

Reactions

Follows

Notifications

Reporting

Blocking

Basic moderation

Settings

Should Have

Polls

Media posts

Drafts

Deep links

Better recommendations

Space analytics

Later

Private messaging

Group chats

Premium Spaces

Creator monetization

Advanced reactions

Voice/video

Marketplace

Advanced recommendation engine

47. MVP User Journey

Install
 ↓
Welcome
 ↓
Sign Up
 ↓
Choose Interests
 ↓
Create Profile
 ↓
Recommended Spaces
 ↓
Join 3–5 Spaces
 ↓
Home Feed
 ↓
Open Post
 ↓
Comment
 ↓
Follow User
 ↓
Discover Another Space
 ↓
Create First Post
 ↓
Receive Notification
 ↓
Return

The first session should demonstrate the value of community as quickly as possible.

48. Core UX Loops

Member Loop

Discover
 ↓
Join
 ↓
Read
 ↓
Interact
 ↓
Contribute
 ↓
Return

Creator Loop

Join
 ↓
Create
 ↓
Receive Responses
 ↓
Build Identity
 ↓
Create More

Community Loop

People Join
 ↓
People Create
 ↓
People Interact
 ↓
Community Develops
 ↓
More People Discover It

49. Anti-Patterns

Do not:

Overload the home screen.

Turn every Space into a follower competition.

Make reactions the dominant metric.

Hide moderation controls.

Force users into endless onboarding.

Require a post before joining a Space.

Make discovery entirely popularity-based.

Introduce monetization before community health.

Copy Amino's legacy UI literally.

Make the platform feel like a generic social network.

50. Accessibility

Minimum requirements:

Accessible color contrast

Dynamic text support

Screen-reader labels

Keyboard navigation on web

Large tap targets

Reduced-motion support

Captions for video

Alt text for images where applicable

51. Privacy

Principles:

Collect only necessary data.

Clearly explain data usage.

Allow account deletion.

Allow privacy controls.

Protect private messages.

Keep moderation data access controlled.

Never expose private Space membership without permission.

52. Performance

Targets:

Fast first render

Optimized images

Lazy-loaded media

Pagination / infinite scrolling

Cached feed data

Optimistic reactions

Efficient comment loading

Avoid loading an entire Space feed at once.

53. Security

Required:

Server-side authorization

Input validation

Rate limiting

Secure authentication

Abuse prevention

File validation

Content-size limits

Audit logs for moderation

Secure secret management

54. Version Roadmap

v0.1 — Foundation

Project setup

Authentication

Database

Design system

Navigation

Basic profile

Basic Space model

v0.2 — Community

Spaces

Membership

Rooms

Feed

Posts

Comments

Reactions

v0.3 — Discovery

Explore

Search

Categories

Recommendations

Tags

v0.4 — Safety

Reports

Blocking

Moderation

Roles

Admin tools

v0.5 — Social

Following

Notifications

Mentions

Sharing

Messaging foundation

v0.6 — Polish

Performance

Accessibility

Analytics

UX refinement

Empty/error/loading states

v1.0 — Public MVP

A stable, coherent community platform ready for controlled public launch.

55. Screen Inventory

Authentication

Splash

Welcome

Login

Signup

Verification

Forgot Password

Reset Password

Onboarding

Welcome

Interests

Profile Setup

Space Recommendations

Completion

Home

Home

Feed

Post Detail

Comments

Explore

Explore

Search

Search Results

Categories

Trending

Recommendations

Spaces

Space Home

Space About

Space Members

Room

Create Space

Space Settings

Space Management

Moderation

Analytics

Content

Create

Post Composer

Question Composer

Poll Composer

Media Composer

Article Composer

Drafts

Post Detail

Social

Profile

Followers

Following

Notifications

Messages

Conversation

Settings

Account

Profile

Privacy

Notifications

Appearance

Safety

Blocked Users

Support

Legal

Admin

Admin Dashboard

Reports

Users

Spaces

Content

Moderation

Categories

56. Product State Model

Every major object should support clear states.

Post

Draft
 ↓
Published
 ↓
Edited
 ↓
Hidden / Removed
 ↓
Deleted

Space

Draft
 ↓
Active
 ↓
Restricted
 ↓
Archived
 ↓
Deleted

User

Pending
 ↓
Active
 ↓
Restricted
 ↓
Suspended
 ↓
Deleted

57. Design Component Inventory

Core components:

AppShell
BottomNavigation
TopBar
Avatar
Button
IconButton
Input
SearchBar
Tabs
Chip
Badge
Card
PostCard
Comment
ReactionButton
SpaceCard
UserCard
RoomCard
NotificationItem
Modal
BottomSheet
Toast
Dialog
Dropdown
Skeleton
EmptyState
ErrorState
MediaGrid
Composer

Components should be reusable and theme-aware.

58. Suggested Project Structure

orvyn/
│
├── app/
│   ├── auth/
│   ├── onboarding/
│   ├── home/
│   ├── explore/
│   ├── create/
│   ├── activity/
│   ├── profile/
│   ├── spaces/
│   ├── messages/
│   └── settings/
│
├── components/
│   ├── ui/
│   ├── navigation/
│   ├── feed/
│   ├── spaces/
│   ├── profiles/
│   └── moderation/
│
├── lib/
│   ├── auth/
│   ├── api/
│   ├── database/
│   ├── storage/
│   └── notifications/
│
├── hooks/
├── types/
├── utils/
├── constants/
└── tests/

59. Build Order

The application should be built in dependency order.

1. Project Foundation
2. Design System
3. Authentication
4. User Profile
5. Navigation
6. Onboarding
7. Interests
8. Spaces
9. Membership
10. Rooms
11. Posts
12. Comments
13. Reactions
14. Home Feed
15. Explore
16. Search
17. Follow System
18. Notifications
19. Moderation
20. Settings
21. Admin
22. Performance
23. Accessibility
24. Testing
25. Launch

60. Definition of Done

A feature is considered complete only when:

UI is implemented.

Loading state exists.

Empty state exists where relevant.

Error state exists.

Permissions are enforced.

Mobile layout works.

Accessibility is considered.

Analytics events are defined where useful.

Backend validation exists.

Tests cover critical behavior.

Navigation/deep links work where applicable.

61. Final Product Mental Model

Orvyn should always be understandable through this simple hierarchy:

PERSON
  ↓
INTEREST
  ↓
SPACE
  ↓
ROOM
  ↓
CONTENT
  ↓
CONVERSATION

And the core loop is:

DISCOVER
   ↓
BELONG
   ↓
PARTICIPATE
   ↓
CREATE
   ↓
CONNECT
   ↓
RETURN

That is the product.

62. Master Product Rule

Orvyn is not a feed with communities attached.

Orvyn is a community platform where the feed is one way of experiencing belonging.

Every future feature should be evaluated against this principle.

If a feature increases community quality, identity, discovery, expression, or meaningful interaction, it belongs.

If it only increases superficial engagement while weakening community quality, it should be questioned.

Appendix A — Existing Product Documentation

This master document should sit above the more granular product documents:

/orvyn
│
├── README.md
├── roadmap.md
├── context.md
├── onboarding.md
├── navigation.md
├── home-flow.md
├── spaces.md
├── discovery.md
├── content.md
├── interaction.md
├── moderation.md
├── profile.md
├── notifications.md
├── settings.md
└── whole-app.md

whole-app.md is the master reference.

Detailed documents may expand individual systems, but they must not contradict this specification without an explicit product decision.

| Stage                        | User Goal                    | Key Actions                                            | Product Experience                                  |
| ---------------------------- | ---------------------------- | ------------------------------------------------------ | --------------------------------------------------- |
| **1. Discovery**             | Understand what the app is   | Finds app → opens landing/app store → installs         | Clear positioning around interest-based communities |
| **2. First Launch**          | Decide whether to continue   | Opens app → welcome screen → learns core concept       | Minimal onboarding, immediate value proposition     |
| **3. Identity Setup**        | Create their identity        | Sign up → username → avatar → basic profile            | Fast account creation                               |
| **4. Interest Discovery**    | Tell the app what they like  | Select interests/topics                                | Personalized recommendations                        |
| **5. Community Discovery**   | Find their people            | Browse/search recommended Spaces                       | Community cards, categories, trending spaces        |
| **6. First Space**           | Enter a community            | Opens Space → views feed → reads posts                 | Strong first-impression feed                        |
| **7. First Interaction**     | Participate                  | Like → comment → follow → react                        | Low-friction interaction                            |
| **8. First Post**            | Express themselves           | Create post → choose format → publish                  | Smart Post Composer                                 |
| **9. Social Connection**     | Build relationships          | Follow users → reply → DM → join discussions           | Social graph starts forming                         |
| **10. Habit Formation**      | Return regularly             | Notifications → feed → conversations → events          | Personalized home/feed                              |
| **11. Community Membership** | Become part of a Space       | Join → customize notifications → participate regularly | Member identity + reputation                        |
| **12. Contribution**         | Add value                    | Posts, polls, guides, media, discussions               | Contribution/reputation system                      |
| **13. Community Creation**   | Build their own community    | Create Space → configure identity → define rules       | Space creation wizard                               |
| **14. Community Management** | Manage members/content       | Moderate → appoint staff → configure rules             | Admin + moderation tools                            |
| **15. Community Growth**     | Attract members              | Invite → share → publish → discoverability             | Growth/discovery mechanisms                         |
| **16. Long-Term Engagement** | Make app part of routine     | Multiple Spaces → relationships → content creation     | Personalized ecosystem                              |
| **17. Monetization**         | Support/monetize communities | Premium content, subscriptions, perks, etc.            | Creator/community economy                           |
