const { expect } = require('chai');
const Driver = require("../driver/Driver");
const DataReaderService = require("../services/dataReader.service");
const StoresPage = require("../pages/StoresPage");
const Constants = require("../config/constants");

describe("Search any store", () => {
  before(async function () {
    const props = await DataReaderService.getTestData('stores.properties');
    for (const key in props) {
      this[key] = props[key];
    }
  })

  beforeEach(async function () {
    this.driver = await Driver.createDriver();
  });

  it("Find stores in New York City", async function () {
    const storesPage = new StoresPage(this.driver);
    await storesPage.openPage();
    await storesPage.enterCityInWhichToFindStore(this.cityWithoutGivenRadius);
    expect(await storesPage.getStoresListLength()).to.be.greaterThan(0);
  }).timeout(Constants.TEST_TIMEOUT);

  it("Find stores within 50 miles of Indianapolis", async function () {
    const storesPage = new StoresPage(this.driver);
    await storesPage.openPage();
    await storesPage.enterCityInWhichToFindStore(this.cityWithGivenRadius);
    await storesPage.chooseMaxSearchRadius();
    await storesPage.clickSearchButton();
    expect(await storesPage.getStoresListLength()).to.be.greaterThan(0);
  }).timeout(Constants.TEST_TIMEOUT);

  afterEach(async function () {
    await this.driver.quit();
  });
});
