# Waves Angular Challenge.


![Waves Angular Challenge](./demo/header.png)

#### Initial task description

The app supposed to allow the user to search tweets using Twitter's search api.

The app should allow pagination (load previous tweets).


#### Demo

Currently, it's not deployed anywhere. Please, see `./demo` for the screensnap gifs & run locally in order to see the results.

#### Installation / Running

Set environment variables:

(add these lines in your `.zshrc`/`.bashrc`/...)

```bash
export TWITTER_CONSUMER_KEY="<your consumer key>"
export TWITTER_CONSUMER_SECRET="<your consumer secret>"
```
> in order to obtain these keys, you have to:
>
> 1. Register an application on https://apps.twitter.com/
> 2. Go to your app and check the "Keys and Access Tokens" tab

Make sure, you have the latest node.js & npm installed,

**To run the app:**

- clone this repo and navigate to its dir
- run `npm install`
- run `npm run start:corsproxy` (twitter doesn't allow cross-origin requests)
- in the new terminal window, run `npm run start:dev`
- open http://localhost:8080 in the browser


**To run tests:**

- `npm run test:unit` for unit tests
- `npm run test:e2e` for E2E tests

#### Implementation notes

1. If I had more time, I would write more unit tests for components and E2E tests.
2. Initially I was planning to decouple search-box and pagination components from the search implementation.
 The search box is decoupled, but the pagination isn't.
 The reason is the same - it would take too much time for the test task,
 taking into account that the Twitter's pagination approach is quite unique.
3. I'm using corsproxy instead of the custom node server... Just because the test was about the client-side app.
4. If I had more time, I would also implement:
   - advanced error handling services and corresponding UI components (to show errors)
   - the logging system
   - loading screens & etc
   - better next/prev page UX
   - saving pagination params to the URL in the similar fashion, as I did for the search query
   - handling of corner cases, like no search results(there could be several options, btw) & etc.
   - more decoupling and better responsibility assignment (completely encapsulate all twitter-specific logic into twitter-api module & other things like that)
   - setup the code coverage and CI services
