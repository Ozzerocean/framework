const { expect } = require('chai');
const Driver = require("../driver/Driver");
const DataReaderService = require("../services/dataReader.service");
const ProductPage = require("../pages/productPage");
const Constants = require("../config/constants");

describe("Adding an item to the bag", () => {
  before(async function () {
    const props = await DataReaderService.getTestData('quantity.properties');
    for (const key in props) {
      this[key] = props[key];
    }
  })

  beforeEach(async function () {
    this.driver = await Driver.createDriver();
  });

  it("Product is shown in the bag and can be removed", async function () {
    const productPage = new ProductPage(this.driver);
    await productPage.openPage(this.anyProductPageURL);
    await productPage.clickAddButton();
    await productPage.goToTheBag();
    expect(await productPage.getNumberOfProducts()).to.be.equal(1);
    expect(await productPage.getProductName()).to.contain(this.productName);
    await productPage.removeProductFromBag();
    expect(await productPage.getEmptyBagMessage()).to.contain(this.emptyBagMessage);
  }).timeout(Constants.TEST_TIMEOUT);

  it("Choose Quantity of the product lower then 1 and 1 or more", async function () {
    const productPage = new ProductPage(this.driver);
    await productPage.openPage(this.anyProductPageURL);
    await productPage.choseQuantity("0");
    await productPage.clickAddButton();
    await productPage.choseQuantity(this.itemsQuantityToAdd);
    await productPage.clickAddMoreButton();
    await productPage.goToTheBag();
    expect(await productPage.getQuantityOfProduct()).to.contain(this.itemsQuantityToEqual);
  }).timeout(Constants.TEST_TIMEOUT);

  afterEach(async function () {
    await this.driver.quit();
  });
});
