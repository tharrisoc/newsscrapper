# newsscrapper
This app will scrape articles from a news website, e.g. New York Times.

[Note: in reality it is not practical to try scraping commercial newspaper websites, because most of them have put up paywalls.]

The app scrapes articles from the MacRumors.com website.

This is work in-progress.

The following functionality has been implemented thus far:

* All of the articles that are visible on the home page are scraped. The data retrieved includes title, byline, URL and artical content. Scraping is performed when the `/scrapearticles` route is requested.
* Articles are saved to a MongoDB database. Before an article is added to the database, a check is performed to make sure that it is not already present.
* All articles that have been stored in the database may be retrieved and displayed in a formatted list when the `/getarticles` route is requested.
* A single specific article and its associated comments is retrieved when the `/getarticles/:id` route is requested. The id is the ObjectId of the article in the *Articles* collection of the *macRumorsArticles* database. An example of this route is `localhost:3000/getarticles/5b2511cfbe2e9d2ac3ec80cf`