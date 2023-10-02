# ICF Social

This is a simple app with users and posts, something like a social network. (think of Twitter... or 𝕏). Currently it shows all the posts in the same order every time. We want to spice things up!

## Setup

1. Start with docker

```bash
docker compose up -d
```

2. Open `http://localhost:3000`

## Task

### Improve the feed:

- mark the posts in the database that the logged in user has already seen
  - a post is considered "seen" if it was on the screen for at least 5 seconds
  - on next page load show only "unseen" posts
- show popup when there's no new content available

### Requirements:

- make every change with user experience in mind
- feel free to change anything in the project, but don't install any more dependencies

## Project details

- react and next on the frontend
  - styling with style tags to keep things simple
- postgres database and drizzle to store the data
- react-query for data fetching
- migrating and seeding the database when starting the server
  - restart docker if you make database changes

## Notes

If you have any note or comment, feel free to put them here!
