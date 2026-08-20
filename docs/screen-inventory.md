# Orvyn Screen Inventory

This document tracks the implementation of Orvyn screens as defined by the `amino-replication.md` specification.

## Status Definitions
- **NOT_STARTED**: No work done.
- **ANALYSIS**: Evaluating Amino reference and defining data.
- **DESIGNING**: Wireframes or visual concepts.
- **IMPLEMENTING**: Writing code.
- **FUNCTIONAL**: Logic works but UI may be incomplete.
- **VISUAL_QA**: Finalizing CSS/layout.
- **STABILITY_QA**: Testing error states, offline, loading.
- **COMPLETE**: Fully meets replication acceptance criteria.

---

## AUTHENTICATION (AUTH)

### `SCREEN-AUTH-001` - Welcome
- **Reference**: Amino Welcome
- **Purpose**: Introduce Orvyn and offer sign in/create account.
- **Implementation**: `NOT_STARTED`
- **State coverage**: 0%
- **QA**: Not started

### `SCREEN-AUTH-002` - Sign In
- **Reference**: Amino Sign In
- **Purpose**: Authenticate existing user.
- **Implementation**: `FUNCTIONAL`
- **State coverage**: 50% (Needs full state matrix)
- **QA**: Not started

### `SCREEN-AUTH-003` - Create Account
- **Reference**: Amino Create Account
- **Purpose**: Register a new user.
- **Implementation**: `FUNCTIONAL`
- **State coverage**: 50% (Needs full state matrix)
- **QA**: Not started

### `SCREEN-AUTH-004` - Verification
- **Reference**: Amino Email Verification
- **Purpose**: Verify email address.
- **Implementation**: `NOT_STARTED`
- **State coverage**: 0%
- **QA**: Not started

### `SCREEN-AUTH-005` - Password Recovery
- **Reference**: Amino Forgot Password
- **Purpose**: Reset lost password.
- **Implementation**: `NOT_STARTED`
- **State coverage**: 0%
- **QA**: Not started

---

## ONBOARDING (ONBOARD)

### `SCREEN-ONBOARD-001` - Interests
- **Reference**: Amino Topic Selection
- **Purpose**: Learn user interests for recommendations.
- **Implementation**: `NOT_STARTED`
- **State coverage**: 0%
- **QA**: Not started

### `SCREEN-ONBOARD-002` - Community Suggestions
- **Reference**: Amino Suggested Communities
- **Purpose**: Recommend communities to join upon signup.
- **Implementation**: `NOT_STARTED`
- **State coverage**: 0%
- **QA**: Not started

### `SCREEN-ONBOARD-003` - Profile Setup
- **Reference**: Amino Profile Setup
- **Purpose**: Set initial avatar, name, and bio.
- **Implementation**: `NOT_STARTED`
- **State coverage**: 0%
- **QA**: Not started

---

## HOME (HOME)

### `SCREEN-HOME-001` - Home Feed
- **Reference**: Amino Global Feed / Following Feed
- **Purpose**: Primary post-login destination displaying aggregated content.
- **Implementation**: `IMPLEMENTING`
- **State coverage**: 20%
- **QA**: Not started

---

## EXPLORE (EXPLORE)

### `SCREEN-EXPLORE-001` - Discovery
- **Reference**: Amino Discover Page
- **Purpose**: Find trending communities, posts, and people.
- **Implementation**: `NOT_STARTED`
- **State coverage**: 0%
- **QA**: Not started

---

## COMMUNITY (COMMUNITY)

### `SCREEN-COMMUNITY-001` - Community Home
- **Reference**: Amino Community Hub
- **Purpose**: Main page for a specific community (Cover, members, feed).
- **Implementation**: `NOT_STARTED`
- **State coverage**: 0%
- **QA**: Not started

---

## POST (POST)

### `SCREEN-POST-001` - Post Detail
- **Reference**: Amino Post View
- **Purpose**: View full post, media, and comments.
- **Implementation**: `NOT_STARTED`
- **State coverage**: 0%
- **QA**: Not started

### `SCREEN-POST-002` - Create Post
- **Reference**: Amino Composer
- **Purpose**: Draft and publish new posts with rich media.
- **Implementation**: `NOT_STARTED`
- **State coverage**: 0%
- **QA**: Not started

---

## COMMENT (COMMENT)

### `SCREEN-COMMENT-001` - Comments Section
- **Reference**: Amino Comments
- **Purpose**: Inline comment threads and replies.
- **Implementation**: `NOT_STARTED`
- **State coverage**: 0%
- **QA**: Not started

---

## PROFILE (PROFILE)

### `SCREEN-PROFILE-001` - Profile View
- **Reference**: Amino User Profile
- **Purpose**: Display user info, stats, and personal posts.
- **Implementation**: `FUNCTIONAL`
- **State coverage**: 20%
- **QA**: Not started

---

## SOCIAL (SOCIAL)

### `SCREEN-SOCIAL-001` - Follower/Following List
- **Reference**: Amino Followers List
- **Purpose**: View social graph connections.
- **Implementation**: `NOT_STARTED`
- **State coverage**: 0%
- **QA**: Not started

---

## CHAT (CHAT)

### `SCREEN-CHAT-001` - Inbox
- **Reference**: Amino Chats List
- **Purpose**: List active direct and group conversations.
- **Implementation**: `NOT_STARTED`
- **State coverage**: 0%
- **QA**: Not started

### `SCREEN-CHAT-002` - Chat Detail
- **Reference**: Amino Chat Room
- **Purpose**: Realtime messaging interface.
- **Implementation**: `NOT_STARTED`
- **State coverage**: 0%
- **QA**: Not started

---

## NOTIFICATION (NOTIFICATION)

### `SCREEN-NOTIFICATION-001` - Notifications Hub
- **Reference**: Amino Alerts
- **Purpose**: List aggregated alerts and activities.
- **Implementation**: `NOT_STARTED`
- **State coverage**: 0%
- **QA**: Not started

---

## SEARCH (SEARCH)

### `SCREEN-SEARCH-001` - Global Search
- **Reference**: Amino Search
- **Purpose**: Find content across the entire platform.
- **Implementation**: `NOT_STARTED`
- **State coverage**: 0%
- **QA**: Not started

---

## SETTINGS (SETTINGS)

### `SCREEN-SETTINGS-001` - Settings Menu
- **Reference**: Amino Settings
- **Purpose**: Manage account, privacy, and app preferences.
- **Implementation**: `NOT_STARTED`
- **State coverage**: 0%
- **QA**: Not started

---

## MODERATION (MODERATION)

### `SCREEN-MODERATION-001` - Moderation Dashboard
- **Reference**: Amino ACM / Mod Menu
- **Purpose**: Manage reports, users, and content rules.
- **Implementation**: `NOT_STARTED`
- **State coverage**: 0%
- **QA**: Not started

---

## MEDIA (MEDIA)

### `SCREEN-MEDIA-001` - Media Viewer
- **Reference**: Amino Image/Video Viewer
- **Purpose**: Full-screen immersive media inspection.
- **Implementation**: `NOT_STARTED`
- **State coverage**: 0%
- **QA**: Not started

---

## SYSTEM (SYSTEM)

### `SCREEN-SYSTEM-001` - Global Overlays
- **Reference**: Standard App Behavior
- **Purpose**: Loading, Error, Offline, and Toast alerts.
- **Implementation**: `NOT_STARTED`
- **State coverage**: 0%
- **QA**: Not started
