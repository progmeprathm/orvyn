# Product Context and Architecture

## 1. Product Definition

### 1.1 What is Orvyn?
Orvyn is an interest-driven community platform designed around Spaces, identity, conversation, discovery, and lightweight social interaction.

The product takes the strongest ideas from community platforms such as Amino while rebuilding them around a cleaner information architecture, modern discovery, better moderation, and a more flexible content model.

### 1.2 Core Product Promise
Find your people. Build your space. Belong somewhere.

Orvyn should make it easy for a person to:
- Discover communities around their interests.
- Join Spaces that feel meaningful.
- Build a recognizable identity.
- Publish different types of content.
- Meet and interact with other members.
- Create and manage their own Spaces.
- Participate in conversations without needing algorithmic popularity to dominate the experience.

### 1.3 Product Principles
- Interest before popularity
- Community before follower count
- Identity without pressure
- Conversation over engagement farming
- Creation should be simple
- Moderation should be powerful but understandable
- Discovery should feel intentional
- Every Space should feel like its own world
- Privacy and safety are first-class features
- The interface should remain lightweight

## 2. Product Architecture

Orvyn is organized around six primary layers:

```text
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
```

## 3. Backend Architecture

Recommended initial architecture:
Client -> API / Backend -> Authentication -> Database -> Storage -> Notifications

Suggested early stack:
- Frontend: React / Next.js or React Native
- Backend: Supabase
- Database: PostgreSQL
- Storage: Supabase Storage
- Authentication: Supabase Auth
- Realtime: Supabase Realtime
- Hosting: Vercel / equivalent

The architecture should remain replaceable so the MVP does not become locked to one provider.
