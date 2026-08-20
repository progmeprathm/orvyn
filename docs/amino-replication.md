# Amino Replication Specification

**Project:** Orvyn  
**Reference Product:** Amino  
**Document Type:** Screen-by-Screen Product Replication Specification  
**Version:** 0.1  
**Status:** MASTER / ACTIVE

---

# 1. PURPOSE

This document defines how Orvyn will replicate the core product experience of Amino while rebuilding it on a stable, modern architecture.

The objective is:

> Reproduce the interaction model and user experience of Amino, not its technical limitations.

Orvyn should feel immediately familiar to an Amino user while providing:

- stable navigation
- predictable state handling
- reusable components
- persistent data
- explainable errors
- reliable community behavior
- scalable architecture

---

# 2. REPLICATION PHILOSOPHY

We are not copying implementation.

We are replicating:

```text
USER EXPERIENCE
        +
INFORMATION ARCHITECTURE
        +
INTERACTION PATTERNS
        +
COMMUNITY MODEL
        +
SOCIAL MODEL
```

while rebuilding:

```text
DATABASE
API
STATE MANAGEMENT
COMPONENT ARCHITECTURE
AUTHENTICATION
MEDIA PIPELINE
REALTIME SYSTEM
```

from scratch.

---

# 3. PRIMARY REFERENCE

Amino is the primary UX reference.

Orvyn should preserve the recognizable concepts:

```text
Communities
Profiles
Posts
Comments
Reactions
Followers
Chat
Notifications
Discovery
Moderation
Community roles
```

However, Orvyn is its own product.

Do not copy:

* Amino branding
* Amino logos
* Amino proprietary assets
* proprietary source code
* proprietary backend behavior
* copyrighted artwork
* trademarks
* private APIs

---

# 4. CORE REPLICATION RULE

For every Amino-derived screen, determine:

```text
WHAT DID AMINO DO?
        ↓
WHY DID IT DO IT?
        ↓
WHAT USER PROBLEM DOES IT SOLVE?
        ↓
HOW SHOULD ORVYN IMPLEMENT it?
```

Do not blindly reproduce visual behavior that creates poor UX.

---

# 5. REPLICATION LEVELS

Each reference feature is classified into one of four levels.

## Level 1 — Direct UX Replication

Replicate closely.

Examples:

```text
Community feed
Profile
Post detail
Comments
Notifications
Chat
```

---

## Level 2 — Behavioral Replication

Preserve the interaction but modernize implementation.

Example:

```text
Pull to refresh
```

Same user expectation, different technical implementation.

---

## Level 3 — Improved Replication

Preserve the concept but improve usability.

Example:

```text
Amino-style community discovery
        ↓
Orvyn discovery + better search + better filtering
```

---

## Level 4 — Orvyn Native

Features that do not need an Amino equivalent.

Examples:

```text
Advanced recommendations
Better moderation transparency
Modern account recovery
Improved media processing
```

---

# 6. SCREEN REPLICATION STANDARD

Every screen must be documented using:

```text
Screen ID
Screen name
Purpose
Entry points
Exit points
Layout
Components
Interactions
Data dependencies
States
Permissions
Navigation
Loading behavior
Error behavior
Empty behavior
Offline behavior
Responsive behavior
```

---

# 7. SCREEN ID FORMAT

Use:

```text
SCREEN-[CATEGORY]-[NUMBER]
```

Examples:

```text
SCREEN-AUTH-001
SCREEN-HOME-001
SCREEN-COMMUNITY-001
SCREEN-POST-001
SCREEN-PROFILE-001
SCREEN-CHAT-001
```

---

# 8. MASTER SCREEN CATEGORIES

```text
AUTH
ONBOARDING
HOME
EXPLORE
COMMUNITY
POST
COMMENT
PROFILE
SOCIAL
CHAT
NOTIFICATION
SEARCH
SETTINGS
MODERATION
MEDIA
SYSTEM
```

---

# 9. MASTER NAVIGATION MODEL

Primary navigation:

```text
                 ORVYN
                   │
       ┌───────────┼───────────┐
       ↓           ↓           ↓
     HOME       EXPLORE      PROFILE
       │           │
       │           ├── Search
       │           ├── Communities
       │           ├── People
       │           └── Content
       │
       ├── Feed
       ├── Community
       └── Notifications
```

Exact navigation implementation is defined in:

```text
navigation.md
```

---

# 10. AUTHENTICATION SCREENS

## SCREEN-AUTH-001 — Welcome

Purpose:

Introduce Orvyn.

Contains:

```text
Logo
Tagline
Sign in
Create account
```

States:

```text
READY
NETWORK_ERROR
```

---

## SCREEN-AUTH-002 — Sign In

Contains:

```text
Email / username
Password
Forgot password
Sign in
Create account
```

States:

```text
IDLE
VALIDATING
AUTHENTICATING
SUCCESS
INVALID_CREDENTIALS
NETWORK_ERROR
ACCOUNT_RESTRICTED
ACCOUNT_BANNED
```

---

## SCREEN-AUTH-003 — Create Account

Contains:

```text
Username
Email
Password
Confirmation
Terms
Create account
```

Validation must be immediate but server validation remains authoritative.

---

## SCREEN-AUTH-004 — Verification

Purpose:

Verify email/account.

States:

```text
SENDING
WAITING
VERIFIED
EXPIRED
FAILED
```

---

## SCREEN-AUTH-005 — Password Recovery

Flow:

```text
Request reset
 ↓
Verification
 ↓
New password
 ↓
Success
```

---

# 11. ONBOARDING

## SCREEN-ONBOARD-001 — Interests

Purpose:

Learn what communities/content the user may want.

Elements:

```text
Interest categories
Search
Selectable chips/cards
Continue
```

States:

```text
LOADING
READY
EMPTY
ERROR
```

---

## SCREEN-ONBOARD-002 — Community Suggestions

Show communities based on selected interests.

Actions:

```text
Join
Skip
View
Continue
```

---

## SCREEN-ONBOARD-003 — Profile Setup

Contains:

```text
Avatar
Display name
Bio
Username
Continue
```

---

# 12. HOME

## SCREEN-HOME-001 — Home

Primary post-login destination.

Core structure:

```text
Top navigation
Feed
Floating/create action
Bottom navigation
```

Feed may contain:

```text
Community posts
Followed users
Recommendations
System recommendations
```

---

# 13. HOME FEED

Feed states:

```text
INITIAL
LOADING
READY
EMPTY
REFRESHING
PAGINATING
OFFLINE
ERROR
```

Important:

Refresh must not replace existing content with a blank loading screen.

Correct:

```text
Existing feed
+
refresh indicator
```

---

# 14. FEED CARD

Each post card should support:

```text
Community
Author
Avatar
Timestamp
Title
Body
Media
Reaction
Comment
Share
Bookmark
More
```

Actions depend on permissions.

---

# 15. POST DETAIL

## SCREEN-POST-001

Purpose:

Display a complete post and discussion.

Structure:

```text
Header
Author
Post content
Media
Actions
Comments
Comment composer
```

States:

```text
LOADING
READY
DELETED
NOT_FOUND
FORBIDDEN
ERROR
```

---

# 16. CREATE POST

## SCREEN-POST-002

Composer:

```text
Select community
Title
Body
Media
Poll
Formatting
Preview
Publish
```

Draft must be persistent.

---

# 17. POST CREATION STATES

```text
DRAFT
VALIDATING
UPLOADING_MEDIA
PUBLISHING
PUBLISHED
FAILED
```

On publishing failure:

```text
Your draft is safe.
```

Never silently discard user content.

---

# 18. COMMENT SYSTEM

## SCREEN-COMMENT-001

Comments may appear inline within Post Detail.

Support:

```text
Comment
Reply
Reaction
Mention
Edit
Delete
Report
```

Nested comments should have a defined maximum rendering depth.

---

# 19. COMMUNITY

## SCREEN-COMMUNITY-001 — Community Home

Core structure:

```text
Cover
Icon
Community name
Description
Member count
Join / Joined
Community navigation
Feed
```

Possible tabs:

```text
Feed
About
Members
Rules
```

Exact tabs may vary by community configuration.

---

# 20. COMMUNITY JOIN

States:

```text
NOT_MEMBER
JOINING
PENDING
MEMBER
RESTRICTED
BANNED
```

Actions:

```text
Join
Request to join
Leave
```

depending on visibility and permissions.

---

# 21. PRIVATE COMMUNITY

A private community must communicate:

```text
Community exists
Access is restricted
Why access is unavailable
What action is possible
```

Example:

**Private community**

> You need to join this community to see its content.

Action:

```text
[Request to join]
```

---

# 22. COMMUNITY DISCOVERY

## SCREEN-EXPLORE-001

Discovery may contain:

```text
Search
Trending communities
Recommended communities
Categories
Popular posts
People
```

---

# 23. SEARCH

## SCREEN-SEARCH-001

Search types:

```text
Everything
Communities
People
Posts
```

States:

```text
IDLE
LOADING
RESULTS
EMPTY
ERROR
OFFLINE
```

---

# 24. PROFILE

## SCREEN-PROFILE-001

Structure:

```text
Cover
Avatar
Display name
Username
Bio
Followers
Following
Posts
Communities
Actions
```

Actions:

```text
Follow
Following
Message
Block
Mute
Report
```

---

# 25. OWN PROFILE

The user's own profile adds:

```text
Edit profile
Settings
Drafts
Bookmarks
```

---

# 26. OTHER PROFILE

Viewer permissions determine available actions.

Example:

```text
Follow
Message
Block
Mute
Report
```

A blocked profile should have a dedicated state.

---

# 27. SOCIAL GRAPH

Replicate:

```text
Follow
Unfollow
Follower list
Following list
Block
Unblock
Mute
Unmute
```

Every relationship must have an explicit state.

---

# 28. CHAT

## SCREEN-CHAT-001 — Inbox

Structure:

```text
Search
Conversations
Unread indicators
Last message
Timestamp
```

States:

```text
LOADING
READY
EMPTY
ERROR
OFFLINE
```

---

# 29. CHAT DETAIL

## SCREEN-CHAT-002

Structure:

```text
Header
Messages
Typing state
Composer
Attachments
Send
```

Message states:

```text
SENDING
SENT
DELIVERED
READ
FAILED
DELETED
```

---

# 30. CHAT FAILURE

Failed message:

```text
Message failed to send.
[Retry]
```

The message must remain visible.

---

# 31. NOTIFICATIONS

## SCREEN-NOTIFICATION-001

Categories:

```text
All
Social
Community
System
```

Possible events:

```text
Follow
Reaction
Comment
Reply
Mention
Message
Community invite
Moderation
```

---

# 32. NOTIFICATION DEEP LINKS

Every actionable notification should resolve to the appropriate destination.

Example:

```text
Someone commented on your post
        ↓
Post Detail
        ↓
Comment highlighted
```

---

# 33. SETTINGS

## SCREEN-SETTINGS-001

Sections:

```text
Account
Profile
Privacy
Notifications
Appearance
Security
Blocked users
Communities
Help
About
Log out
Delete account
```

---

# 34. MODERATION

Community moderators require:

```text
Moderation dashboard
Reports
Members
Content
Actions
Audit history
```

---

# 35. REPORT CONTENT

Flow:

```text
More
 ↓
Report
 ↓
Reason
 ↓
Optional description
 ↓
Submit
 ↓
Confirmation
```

Confirmation:

**Report submitted**

> Thanks. The moderation team will review this report.

---

# 36. MEDIA VIEWER

Media should open into a dedicated viewer when appropriate.

Supports:

```text
Image
Video
Zoom
Swipe
Close
Share
```

States:

```text
LOADING
READY
PROCESSING
FAILED
```

---

# 37. SYSTEM SCREENS

Required system screens:

```text
Offline
Server unavailable
Session expired
Account restricted
Account banned
Resource deleted
Resource not found
Permission denied
Maintenance
```

---

# 38. GLOBAL OVERLAYS

Supported overlays:

```text
Bottom sheet
Modal
Dialog
Context menu
Toast
Snackbar
Full-screen media viewer
Loading overlay
```

Each overlay must have a defined dismissal behavior.

---

# 39. BACK BEHAVIOR

Back navigation must be predictable.

Default:

```text
Current screen
 ↓
Previous screen
```

Modal:

```text
Modal
 ↓
Dismiss
 ↓
Underlying screen
```

Nested flow:

```text
Post
 ↓
Comments
 ↓
Reply
 ↓
Back
 ↓
Comments
```

---

# 40. DEEP LINK BEHAVIOR

All major resources should support direct navigation.

Examples:

```text
Community
Post
Profile
Conversation
Notification
```

Deep link resolution:

```text
URL
 ↓
Resource ID
 ↓
Authorization
 ↓
Resource state
 ↓
Destination screen
```

---

# 41. REPLICATION STATE MATRIX

Every screen must document:

| State        | Required         |
| ------------ | ---------------- |
| Initial      | Yes              |
| Loading      | Yes              |
| Ready        | Yes              |
| Empty        | Where applicable |
| Error        | Yes              |
| Offline      | Where applicable |
| Forbidden    | Where applicable |
| Unauthorized | Where applicable |
| Not Found    | Where applicable |
| Deleted      | Where applicable |
| Restricted   | Where applicable |
| Submitting   | Where applicable |

---

# 42. SCREEN IMPLEMENTATION RULE

No screen is considered complete merely because:

```text
UI looks correct
```

A screen is complete only when:

```text
UI
+
Navigation
+
Data
+
Permissions
+
Loading
+
Empty
+
Error
+
Offline
+
Interaction
+
Persistence
```

are implemented.

---

# 43. VISUAL REPLICATION PRIORITY

When reproducing an Amino screen, prioritize:

1. Information hierarchy
2. Navigation placement
3. Component hierarchy
4. Interaction behavior
5. Spacing
6. Typography
7. Icons
8. Color
9. Animation
10. Decorative details

Functionality takes priority over pixel-level decoration.

---

# 44. COMPONENT REUSE RULE

If two screens contain the same conceptual component:

```text
PostCard
CommunityCard
UserCard
Comment
Avatar
BottomNav
Header
```

they must use the same component implementation.

Do not duplicate screen-specific versions unless behavior genuinely differs.

---

# 45. DATA REUSE RULE

If two screens reference the same entity:

```text
Post
Community
User
Message
```

they must use the same canonical data model.

See:

```text
data-model.md
```

---

# 46. STATE REUSE RULE

All screens must use the global state contract.

See:

```text
state-system.md
```

Do not invent:

```text
loadingSomething
failedSomething
badError
```

when a standardized state exists.

---

# 47. AMINO → ORVYN TRANSLATION

Conceptual translation:

| Amino Concept             | Orvyn             |
| ------------------------- | ----------------- |
| Community                 | Community         |
| Member                    | Member            |
| Leader                    | Owner / Leader    |
| Curator                   | Curator           |
| Post                      | Post              |
| Blog                      | Post              |
| Chat                      | Conversation      |
| Public Chat               | Community Chat    |
| Profile                   | Profile           |
| Feed                      | Home Feed         |
| Explore                   | Explore           |
| Notification              | Notification      |
| Reputation/social signals | Social Graph      |
| Moderation                | Moderation System |

---

# 48. WHAT MUST NOT BE REPLICATED

Do not intentionally reproduce:

```text
Broken navigation
Unexplained loading
Dead screens
Inconsistent back behavior
Data loss
Silent failures
Unclear permissions
Duplicate UI logic
Hardcoded fake content
```

---

# 49. STABILITY-FIRST RULE

If exact visual replication conflicts with application stability:

```text
STABILITY > EXACT REPLICATION
```

If exact behavior creates unnecessary technical debt:

```text
USER EXPECTATION > LEGACY IMPLEMENTATION
```

---

# 50. SCREEN-BY-SCREEN BUILD ORDER

Recommended implementation order:

```text
AUTH
 ↓
ONBOARDING
 ↓
HOME
 ↓
EXPLORE
 ↓
COMMUNITY
 ↓
POST
 ↓
COMMENTS
 ↓
PROFILE
 ↓
NOTIFICATIONS
 ↓
CHAT
 ↓
SETTINGS
 ↓
MODERATION
```

---

# 51. REPLICATION WORKFLOW

For every screen:

```text
1. Identify Amino reference
        ↓
2. Document screen
        ↓
3. Identify components
        ↓
4. Identify data dependencies
        ↓
5. Define states
        ↓
6. Define navigation
        ↓
7. Define permissions
        ↓
8. Build reusable components
        ↓
9. Implement screen
        ↓
10. Test all states
        ↓
11. Visual comparison
        ↓
12. Stability test
        ↓
13. Mark complete
```

---

# 52. SCREEN ACCEPTANCE CRITERIA

A replicated screen passes only if:

```text
[ ] Layout is correct
[ ] Navigation is correct
[ ] Back behavior is correct
[ ] Data loads correctly
[ ] Loading state exists
[ ] Empty state exists where needed
[ ] Error state exists
[ ] Offline behavior exists where needed
[ ] Permissions work
[ ] Actions work
[ ] Data persists
[ ] Refresh works
[ ] Deep link works where applicable
[ ] No console/runtime errors
[ ] No broken interactions
[ ] No unnecessary duplicated components
```

---

# 53. VISUAL QA

Visual comparison should check:

```text
Header height
Navigation placement
Margins
Padding
Typography hierarchy
Image ratios
Avatar sizes
Button sizes
Card dimensions
Border radius
Icons
Scroll behavior
Modal placement
Bottom navigation
```

---

# 54. RESPONSIVE QA

Every major screen should be checked at:

```text
Mobile portrait
Mobile landscape
Tablet
Desktop
```

Where Orvyn is mobile-first, desktop adaptation should preserve the same information hierarchy.

---

# 55. PERFORMANCE QA

Every screen should be checked for:

```text
Initial render
Image loading
Scrolling
Pagination
Memory usage
Animation smoothness
Network retry
Large content
Slow connection
Offline transition
```

---

# 56. REPLICATION DATABASE

The project should maintain a screen registry:

```text
screen-inventory.md
```

Each screen receives:

```text
Screen ID
Reference
Status
Components
Dependencies
Implementation status
QA status
```

Example:

```text
SCREEN-HOME-001

Reference: Amino Home
Implementation: 0%
State coverage: 0%
QA: Not started
```

---

# 57. IMPLEMENTATION STATUS

Use:

```text
NOT_STARTED
ANALYSIS
DESIGNING
IMPLEMENTING
FUNCTIONAL
VISUAL_QA
STABILITY_QA
COMPLETE
BLOCKED
```

---

# 58. DEFINITION OF REPLICATED

A feature is "replicated" only when:

```text
Reference understood
+
UX reproduced
+
Data connected
+
States implemented
+
Navigation implemented
+
Permissions implemented
+
Persistence verified
+
QA passed
```

---

# 59. MASTER RULE

> **Do not build screens as isolated pages. Build them as states of a connected product.**

Amino's strength was not any single screen.

The strength was the relationship between:

```text
User
 ↓
Community
 ↓
Feed
 ↓
Post
 ↓
Comment
 ↓
Profile
 ↓
Chat
 ↓
Notification
 ↓
Back to content
```

Orvyn must preserve that connected experience.

---

# 60. FINAL PRINCIPLE

The goal is not:

> "Make Orvyn look like Amino."

The goal is:

> **"Make an Amino user immediately understand Orvyn, while giving them a significantly more stable product underneath."**
