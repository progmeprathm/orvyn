# Navigation & Architecture

## Information Architecture

### Primary Navigation
The default mobile navigation should contain:
- Home
- Explore
- Create
- Activity
- Profile

Spaces remain a primary object throughout the application and can be surfaced through Home, Explore, Search, and Profile.

### Navigation Model

**Home**
- Personal Feed
- Following
- Your Spaces
- Suggested Spaces

**Explore**
- Search
- Categories
- Trending
- Recommended Spaces
- Recommended People

**Create**
- Post
- Question
- Poll
- Media
- Article

**Activity**
- Notifications
- Mentions
- Replies
- Reactions
- Invitations

**Profile**
- Posts
- Spaces
- About
- Followers
- Following
- Settings

## Responsive Design

**Primary target:** Mobile
**Secondary:** Tablet, Desktop web

The information architecture should remain consistent across breakpoints.

**Desktop can use:**
Left Navigation + Main Content + Right Context Panel

**Mobile should prioritize:**
Bottom Navigation + Single-column content

## Deep Linking

Supported deep-link patterns:
- `/orvyn`
- `/orvyn/space/{space}`
- `/orvyn/space/{space}/post/{post}`
- `/orvyn/user/{username}`
- `/orvyn/tag/{tag}`

Deep links should preserve navigation context.
