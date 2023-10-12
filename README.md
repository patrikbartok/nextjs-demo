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

# Solution:

### Lighthouse production build test
![Alt text](./docs/img.png?raw=true "Title")

(Only lang tags are missing for Accessibility)

### Production build
- Added a "production" script in package.json next to "dev"
- Calling this in the Dockerfile instead
- Builds a production build on docker and starts it
- to change between build modes: Switch the last word in the Dockerfile between dev and production

## Optimization notes:
### SSR and CSR
- Each page prefetches the related data to the page in react query
- Since the data is available, on request it pre renders the contentful html
- React query Hydrates on the client side
- Client side navigation - hydration with JSON data only

### Code splitting
- Nextjs automatically splits code on production build.
- Generates static pages
- Splits javascript into chunks that are required for a page only

### Mutations
- Sending POST to DB
- Instantly modifying the cache client side, no refetching from API endpoint
- On POST error: Undo the modifications on the cache
- This is called Optimistic Updates, it gives a very smooth user experience

### Component Structure and Logic Flow
- Dumb components - most of the styled components
- Smart components - only the pages basically, every logic for the page is put together there
- Bubbling up events from dumb components to smart (page)

### Further optimizing possibilites
- Instead of using getServerSideProps (Server Side Rendering), use Incremental Static Regeneration
- ISR: getStaticProps with revalidate (interval) or manual revalidation
- Basically generating a static page build time, and storing it on a Content Delivery Network (CDN)
- Can instantly server the pre generated page on request, re render it on CDN if its revalidated

### Missing TODO
- Pagination
- Tests
