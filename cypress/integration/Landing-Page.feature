Feature: Search and search result feature


   Background:
     Given Navigate to airbnb site
     And Select Rome, Italy as a location
     And Select the checkin date
     And Select the checkout date
     And Select guests
     And Search for property


  Scenario: Verify that results match the search criteria
    Then Assert that the applied filters are correct
    Then Assert that search results match the search criteria


  Scenario: Verify that the results and details page match the extra filters
    And Click More filters
    And Select the number of bedrooms as 5
    And Select Pool from the Facilities section
    And Click Show Stays
    Then Assert that results displayed having bedrooms
    And Open the details of the first property
    Then Assert that property is having pool as facility


  Scenario: Verify that a property is displayed on the map correctly
    And Hover over the first property.
    Then Assert that the property is displayed on the map and is selected
    And Click on the property on the map
    Then Assert that the details shown in the map popup are the same as the ones shown in the search results.




