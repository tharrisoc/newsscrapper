"use strict";

// For display purpooses, remove the anchor tag from the byline so
// all that remains is the date and the author's name, e.g.
// Friday June 15, 2018 11:45 am PDT by <a class="author-url" href="//www.macrumors.com/author/juli-clover/">Juli Clover</a>
// becomes
// Friday June 15, 2018 11:45 am PDT by Juli Clover

function stripAnchorTags(abstracts) {
    let numAbstracts = 0;
    let wasArray = true;

    if (Array.isArray(abstracts)) {
      numAbstracts = abstracts.length;
    } else {
      numAbstracts = 1;
      wasArray = false;
    }

    let regex1 = /<a[^>]+>/;
    let regex2 = /<\/a>/;
  
    for (let i = 0; i < numAbstracts; i++) {
      let byline = null;
      if (wasArray) {
        byline = abstracts[i].byline;
      } else {
        byline = abstracts.byline;
      }

      byline = byline.replace(regex1, "");
      byline = byline.replace(regex2, "");

      if (wasArray) {
        abstracts[i].byline = byline;
      } else {
        abstracts.byline = byline;
      }
    }
}

// TODO: this works only part of the time.  
//       For example, it fails on the article
//       "Popular Mac Developer Slams Apple for 'Sad State of Macintosh Hardware"

// Create summaries of all the articles in the input object

function createSummaries(abstracts) {
    const numAbstracts = abstracts.length;
console.log("In createSummaries numAbstracts= " + numAbstracts);  // TWH DEBUG
    for (let i = 0; i < numAbstracts; i++) {
console.log("title:"); console.log(abstracts[i].title)  // TWH DEBUG
      let allContent = abstracts[i].content;

      // Step 1 -- capture everything up to, but not including the first <br />
      let regexp1 = /^(.+?)<br>/m;
console.log("Trying regexp1"); // TWH DEBUG
      let match = regexp1.exec(allContent);
console.log(match[1]); // TWH DEBUG
      let beginning = match[1];

console.log("beginning:"); console.log(beginning);  // TWH DEBUG 
      // Step 2 -- remove any anchor tags
      let regexp2 = /<a[^>]+>/g;
      let regexp3 = /<\/a>/g;

      beginning = beginning.replace(regexp2, "");
      beginning = beginning.replace(regexp3, "");

      // Step 3 -- remove any image tags
      let regexp4 = /<img[^>]+>/;
      beginning = beginning.replace(regexp4, "");

      // More steps will probably be added

console.log("Summary:"); console.log(beginning);  // TWH DEBUG

      abstracts[i].summary = beginning;
    }  
}

module.exports = {
  stripAnchorTags,
  createSummaries  
}

