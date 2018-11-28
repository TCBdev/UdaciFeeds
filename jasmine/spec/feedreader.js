/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('is defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */


        it('should have a URL', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeTruthy();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('should have a name', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeTruthy();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

    describe('The menu', function () {

        // ENSURE MENUS IS HIDDEN BY DEFAULT
        it('should be hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('should change visibility when clicked', function () {
            $('.menu-icon-link').click(); // CLICK ON MENU BUTTON
            expect($('body').hasClass('menu-hidden')).toBe(false); // CHECKS MENU IS HIDDEN
            $('.menu-icon-link').click(); // CLICK ON MENU BUTTON
            expect($('body').hasClass('menu-hidden')).toBe(true); // CHECKS MENU IS SHOWN
        });

        //TEST MENU VISIBILITY
        describe('visibility', function () {
            // Select all elements with class slide-menu
            var menuElement = $('.slide-menu');
            var menuIcon = $('.menu-icon-link');

			// ENSURE MENU IS NOT SHOWN WHEN HIDDEN
            it('positions menu to left and is hidden', function () {

                expect($('body').hasClass('menu-hidden')).toBe(true);
                var elementOffset = menuElement.offset();

                // CHECK IF MENU IS PROPERLY POSITIONED
                expect(elementOffset.left + menuElement.outerWidth()).not.toBeGreaterThan(0);
            });

        // ENSURE MENU IS SHOWING PROPERLY
        describe('finished transition', function () {

            beforeEach(function (done) {
                menuElement[0].addEventListener("transitionend", done, false);
                menuIcon.click();
            });

            // CHECK MENU WHEN VISIBLE TO USER
            it('menu content is posisitioned left when visible', function (done) {
                expect($('body').hasClass('menu-hidden')).toBe(false);

                // CHECK IF MENU IS PROPERLY POSITIONED
                var elementOffset = menuElement.offset();
                expect(elementOffset.left).toEqual(0);

                // REMOVE EVENT LISTENER AFTER TASK FINISHED
                menuElement[0].removeEventListener("transitionend", done, false);
                menuIcon.click();

                // COMPLETE TEST
                done();
            });
        });
    });


        /* TODO: Write a new test suite named "Initial Entries" */

        describe('Initial Entries', function () {

            // ENTRIE(S) PRESENT IN FEED
            var container = $('.feed');
            beforeEach(function (done) {
                loadFeed(0, done);
            });

        /* TODO: Write a test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        * Remember, loadFeed() is asynchronous so this test will require
        * the use of Jasmine's beforeEach and asynchronous done() function.
        */
        

            it('has one or more element(s)', function () {
                var items = container.find('.entry');
                expect(items.length).toBeGreaterThan(0);
            });

            // MAKES SURE FEED NAME UPDATES
            it('displays the feed heading', function () {
                var feedName = allFeeds[0].name;
                var headerTitle = $('.header-title');
                expect(headerTitle.html().trim()).toMatch(feedName.trim());
            });
        });    


    /* TODO: Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function () {
        var feedText;
        // CONTENTS CHANGE WHEN LOADED
        beforeEach(function (done) {
            loadFeed(0, function () {
                feedText = $('.feed').text();
                loadFeed(1, function () {
                    done();
                });
            });
        })

        
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
    
        it('is loaded by the loadFeed', function () {
            expect($('.feed').text()).not.toBe(feedText);
        });
        });

        describe('Update of Feed', function () {

            var testID = 1;
            var TEST_TEXT = '!!!---FeedReader---!!!';

            beforeEach(function (done) {
                // ALL FEED HEADINGS - ARRAY
                var feedEntryHeadings = $('.entry').find('h2');

                // UPDATE ALL HEADINGS FOR TESTS
                feedEntryHeadings.html(TEST_TEXT);

                // ASYNC SECOND FEED
                loadFeed(testID, done);
            });

            afterEach(function (done) {
                // BACK TO DEFAULT AFTER TEST COMPLETION
                loadFeed(0, done);
            });


			// LOADFEED LOADS NEW FEED AND CONTENT UPDATES
            it('updates entries in feed', function () {

                var items = $('.entry');

                //LOOKING FOR FEED ENTRIES
                expect(items.length).toBeGreaterThan(0);

				// CHECK FOR TEST TEXT AND HEADINGS
                var feedEntryHeadingsMatched = $(".entry h2:contains('" + TEST_TEXT + "')");
                expect(feedEntryHeadingsMatched.length).toEqual(0);
            });


			// UPDATE FEED WITH TITLE AND FEED NAME
            it('updates the heading to feed name', function () {
                var feedName = allFeeds[testID].name;
                var headerTitle = $('.header-title');
                expect(headerTitle.html().trim()).toMatch(feedName.trim());
            });
        });
    });
}());
