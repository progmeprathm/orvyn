# Spaces

Spaces are the central object of Orvyn. A Space is a persistent community organized around a shared interest, fandom, topic, identity, project, or purpose.

## Space Types
- **MVP:** Public, Private
- **Future:** Invite-only, Unlisted, Restricted

## Space Structure

```text
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
```

## Space Home

### Layout
- Cover
- Space Icon
- Space Name
- Description
- Member Count
- [Join / Joined]

**Tabs**
- Feed
- Rooms
- About
- Members

Content follows.

### Space Header Actions
- **For members:** Joined, Notifications, Share, More
- **For non-members:** Join, Share, More
- **For moderators:** Manage, Notifications, Share, More

## Space Membership

Membership states: Visitor -> Requested -> Member -> Moderator -> Owner

A member may leave a Space at any time unless restricted by product policy.

**Membership Actions:**
- Join
- Leave
- Invite
- Follow Space
- Enable notifications
- Mute Space

## Space Roles

### Owner
Full control. Permissions:
- Delete Space
- Transfer ownership
- Manage moderators
- Manage rules
- Manage settings
- Manage members
- Moderate content
- View analytics

### Moderator
Permissions configurable by Space owner. Default:
- Remove content
- Lock posts
- Warn members
- Mute members
- Ban members
- Review reports
- Manage discussions

### Member
Can:
- Publish
- Comment
- React
- Participate in rooms
- Report content
- Invite where permitted

## Space Rules

Every Space should be able to define rules (e.g., 1. Be respectful, 2. Stay on topic). Rules are displayed during joining and accessible from the Space About page.

## Rooms

Rooms are focused areas inside a Space. Examples in an Anime Space:
- General
- Manga
- Fan Art
- Theories
- Spoilers
- Announcements

Rooms can provide: Name, Description, Icon, Permissions, Moderators, Content type restrictions.

## Space Creation Flow

Create Space -> Name -> Category -> Description -> Icon -> Visibility -> Rules -> Create -> Space Home

The user should be able to create a Space in under a few minutes.

## Space Management

Owner dashboard:
Manage Space
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
