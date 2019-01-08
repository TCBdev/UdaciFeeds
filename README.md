# UdaciFeeds Feed Reader Testing

* See live version here [UdaciFeeds](https://tcbdev.github.io/UdaciFeeds/). 
* The test will run once the page is loaded.
* Results of the test will be dispayed at the bottom of the page 


## Feed Testing

1. TEST RSS FEEDS 
    1. Make sure that the 'allFeeds' variable has been defined and that it is not empty.
    1. Loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
    1. Loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.

1. TEST MENU VISIBILITY
    1. Ensures Menu is hidden by default
    1. Ensures Menu is hidden is not shown when hidden
    1. Checks Menu is properly positioned when shown hidden
    1. Checks Menu is visible to user
    1. Checks Menu is properly positioned when shown shown
    1. Complete visibility Test

1. TEST ENTRIE(S) PRESENT IN FEED
    1. Make sure feed names updates
    1. Contents changed when loaded
    1. Is loadded by loadFeed
    1. Look for feed entries
    1. Check for test text and Headings
    1. Update text and heading with actual information
