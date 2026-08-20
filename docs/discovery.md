# Discovery & Recommendation

Explore is the discovery engine of Orvyn.

## Explore Sections

```text
Explore
│
├── Search
├── Trending
├── Popular Spaces
├── New Spaces
├── Recommended For You
├── Categories
└── People
```

## Categories
Spaces may belong to one or more categories.
Examples: Anime, Gaming, Books, Movies, Music, Technology, Art, Science, Education, Sports, Lifestyle, Culture, Creative, Professional, Other.

## Search
Search should support:
- Spaces
- Users
- Posts
- Tags
- Categories

Search suggestions should appear while typing.

## Recommendation Signals
- Selected interests
- Joined Spaces
- Followed users
- Interaction history
- Search history
- Content similarity
- Space activity
- Freshness

*Avoid recommending content exclusively based on popularity.*

### Recommendation Goals
The system should answer:
"What community would I actually enjoy joining?"
rather than:
"What content will keep me scrolling?"

## Tags
Tags provide lightweight content classification.
Examples: `#anime`, `#manga`, `#revit`, `#physics`, `#gaming`, `#books`.

Tags can be:
- searched
- followed
- recommended
- attached to posts
