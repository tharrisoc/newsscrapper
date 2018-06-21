# newsscrapper
This app will scrape articles from a news website, e.g. New York Times.

[Note: in reality it is not practical to try scraping commercial newspaper websites, because most of them have put up paywalls.]

The app scrapes articles from the MacRumors.com website.

This is work in-progress.

The following functionality has been implemented thus far:

* All of the articles that are visible on the home page are scraped. The data retrieved includes title, byline, URL and article content. Scraping is performed when the `/scrapearticles` route is requested.
* Articles are saved to a MongoDB database. Before an article is added to the database, a check is performed to make sure that it is not already present.
* All articles that have been stored in the database may be retrieved and displayed in a formatted list when the `/getarticles` route is requested.
* A single specific article and its associated comments are retrieved when the `/getarticle/:id` route is requested. The id is the ObjectId of the article in the *Articles* collection of the *macRumorsArticles* database. An example of this route is `localhost:3000/getarticle/5b2511cfbe2e9d2ac3ec80cf`
* In addition to the Article model, models for Comment and User have been implemented
* It is now possible to add new Users and Comments to the database. There is a client-side form that accepts a username and password, along with the data that is necessary to create a comment on a specific article. The route that is used to request the comment form is `/commentform/:id`
* When a Comment is created, it is linked to the Article to which it refers. It is possible for an Article to have many comments because the ObjectIds of the comments are stored in an array within the Article document. Comments are added to the head of this array so that the most-recently-added comments appear first.
* Comments are actually added to the database through the `/addcomment` route.
* The client-side web pages are rendered through handlebars.