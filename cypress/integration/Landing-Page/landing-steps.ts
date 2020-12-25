import { And, Given, Then } from 'cypress-cucumber-preprocessor/steps';

const locators = {
  locationField: '#bigsearch-query-detached-query',
  checkInDateField:
    'div[data-testid="structured-search-input-field-split-dates-0"]',
  checkOutDateField:
    'div[data-testid="structured-search-input-field-split-dates-1"]',
  guestField: 'div[data-testid="structured-search-input-field-guests-button"]',
  checkInDate: 'div[data-testid="datepicker-day-2020-12-27"]',
  checkOutDate: 'div[data-testid="datepicker-day-2021-01-03"]',
  increaseAdultBtn: 'button[data-testid="stepper-adults-increase-button"]',
  increaseChildrenBtn: 'button[data-testid="stepper-children-increase-button"]',
  searchBtn: 'button._1mzhry13',
  searchResultHdr: 'div._1snxcqc',
  moreFiltersBtn: '#menuItemButton-dynamicMoreFilters',
  increaseBedroomsBtn:
    'button[data-testid="filterItem-rooms_and_beds-stepper-min_bedrooms-0-increase-button"]',
  poolCheckBox: '#filterItem-facilities-checkbox-amenities-7',
  showMoreResultsBtn: 'button[data-testid="more-filters-modal-submit-button"]',
  firstPropertyLink:
    'div._twmmpk  div:nth-child(2) div:nth-child(2) > div > div > div > div > div:nth-child(1) div._8s3ctt > a',
  showAllBtn: 'div._g9yb1m > div._16e70jgn div._1tv4hg3 > a',
  poolFacilitiesList:
    'section div._1v5ksyp  section > div:nth-child(2) > div:nth-child(2) > div:nth-child(6) > div',
  priceHovered:
    '#ExploreLayoutController div._10v3f8y9 > aside > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(3) > div > div:nth-child(4) > div:nth-child(1) > div',
  detailsOnMap: 'div._v3gzda1 div._1x0fg6n div._1isz8pdq',
  propertyName: '._tmwq9g  ._r6zroz ._1jzvdu8 ._bzh5lkq',
  // 'div:nth-child(2) > div > div > div:nth-child(2) > div > div > div > div > div:nth-child(1) > div > div > div > div > div._8s3ctt > div._tmwq9g > div._r6zroz > div > div._bzh5lkq',
};

Given(/^Navigate to airbnb site$/, function () {
  cy.visit('https://www.airbnb.com/');
});
And(/^Select Rome, Italy as a location$/, function () {
  cy.scrollTo('bottom');
  cy.wait(3000);
  cy.get('#littleSearchLabel').click({ force: true });
  cy.get(locators.locationField).type('Rome,Italy');
});
And(/^Select the checkin date$/, function () {
  cy.get(locators.checkInDateField).click({ force: true });
  cy.wait(3000);
  cy.get(locators.checkInDate).click({ force: true });
});
And(/^Select the checkout date$/, function () {
  cy.get(locators.checkOutDate).click({ force: true });
});
And(/^Select guests$/, function () {
  cy.scrollTo('top');
  cy.get(locators.guestField).click({ force: true });
  cy.wait(3000);
  cy.get(locators.increaseAdultBtn).dblclick({ force: true });
  cy.get(locators.increaseChildrenBtn).click({ force: true });
});
Given(/^Search for property$/, function () {
  cy.get(locators.searchBtn).click({ force: true });
});
Then(/^Assert that the applied filters are correct$/, function () {
  cy.get(locators.searchResultHdr).should(
    'contain.text',
    'stays · Dec 27 - Jan 3 · 3 guests',
  );
});
Then(/^Assert that search results match the search criteria$/, function () {
  cy.wait(3000);
  for (let i = 1; i < 11; i++) {
    cy.get(
      'div._twmmpk div:nth-child(2) div:nth-child(2) div:nth-child(' +
        i +
        ') > div > div > div > div > div._8s3ctt > div._tmwq9g > div:nth-child(3)',
    ).then((item) => {
      const inputText = item.text();
      const inputList: string[] = inputText.split(' ');
      expect(Number(inputList[0])).to.be.at.least(3);
    });
    cy.get(
      'div._twmmpk div:nth-child(4) div:nth-child(2) div:nth-child(' +
        i +
        ') > div > div > div > div > div._8s3ctt > div._tmwq9g > div:nth-child(3)',
    ).then((item) => {
      const inputText = item.text();
      const inputList: string[] = inputText.split(' ');
      expect(Number(inputList[0])).to.be.at.least(3);
    });
  }
});

Given(/^Click More filters$/, function () {
  cy.get(locators.moreFiltersBtn).click();
});
Given(/^Select the number of bedrooms as (\d+)$/, function (numberOFBeds) {
  for (let i = 0; i < numberOFBeds; i++) {
    cy.get(locators.increaseBedroomsBtn, { timeout: 3000 }).click({
      force: true,
    });
  }
});
Given(/^Select Pool from the Facilities section$/, function () {
  cy.get('[aria-label="Facilities"]').scrollIntoView();
  cy.get(locators.poolCheckBox, { timeout: 3000 }).click({ force: true });
});
Given(/^Click Show Stays$/, function () {
  cy.get(locators.showMoreResultsBtn, { timeout: 3000 }).click({ force: true });
});
Then(/^Assert that results displayed having bedrooms$/, function () {
  cy.wait(5000);
  for (let i = 1; i < 11; i++) {
    cy.get(
      'div:nth-child(1) div._twmmpk div:nth-child(2) div:nth-child(2) div:nth-child(' +
        i +
        ') > div > div > div > div > div._8s3ctt > div._tmwq9g > div:nth-child(3)',
    ).then((item) => {
      const inputText = item.text();
      const inputList: string[] = inputText.split(' ');
      expect(Number(inputList[3])).to.be.at.least(5);
    });
    cy.get(
      'div:nth-child(1) div._twmmpk div:nth-child(4) div:nth-child(2) div:nth-child(' +
        i +
        ') > div > div > div > div > div._8s3ctt > div._tmwq9g > div:nth-child(3)',
    ).then((item) => {
      const inputText = item.text();
      const inputList: string[] = inputText.split(' ');
      expect(Number(inputList[3])).to.be.at.least(5);
    });
  }
});

Then(/^Open the details of the first property$/, function () {
  cy.get(locators.firstPropertyLink).then(function (l) {
    const link = l.prop('href');
    cy.visit(link);
    cy.wait(3000);
  });
});

Then(/^Assert that property is having pool as facility$/, function () {
  cy.get(locators.showAllBtn, { timeout: 3000 })
    .scrollIntoView()
    .click({ force: true });
  cy.get('div._vzrbjl').contains('Pool').should('exist');
});

Given(/^Hover over the first property\.$/, function () {
  cy.wait(3000);
  cy.get(locators.firstPropertyLink, { timeout: 3000 }).trigger('mouseover');
});
Then(
  /^Assert that the property is displayed on the map and is selected$/,
  function () {
    cy.get(locators.priceHovered).should('exist');
  },
);

Then(/^Click on the property on the map$/, function () {
  cy.get(locators.priceHovered, { timeout: 3000 }).click();
});

Then(
  /^Assert that the details shown in the map popup are the same as the ones shown in the search results\.$/,
  function () {
    cy.get(locators.propertyName)
      .eq(0)
      .then((item) => {
        const nameText = item.text();
        cy.get(locators.detailsOnMap).then((item) => {
          const detailsOnMap = item.text();
          expect(nameText).contains(detailsOnMap);
        });
      });
  },
);
