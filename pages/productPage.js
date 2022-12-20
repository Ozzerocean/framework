const BasePage = require("./basePage");
const { Key } = require("selenium-webdriver");
const logger = require("../logger");

class ProductPage extends BasePage {
  static QUANTITY_INPUT_XPATH = "//input[@id='qty-field']";
  static ADD_TO_BAG_BUTTON_XPATH = "//span[text()='Add to Bag']//ancestor::button";
  static ADD_MORE_BUTTON_XPATH = "//span[text()='Add More']//ancestor::button";
  static BAG_BUTTON_XPATH = "//div[@class='ec-minicart__body']";
  static PRODUCT_QUANTITY_XPATH = "//div[@class='form-control__select-text']";
  static PRODUCTS_IN_THE_BAG_XPATH = "//div[@class='ec-cart__products-inner']/div"

  async choseQuantity(quantity) {
    logger.info("Chosing quantity of the product");
    const element = await this.findByXpath(ProductPage.QUANTITY_INPUT_XPATH);
    await element.sendKeys(Key.BACK_SPACE);
    await element.sendKeys(quantity, Key.ENTER);

    return this;
  }

  async clickAddButton() {
    logger.info("Adding product to the bag");
    const element = await this.findByXpath(ProductPage.ADD_TO_BAG_BUTTON_XPATH);
    await element.click();

    return this;
  }

  async clickAddMoreButton() {
    logger.info("Adding product to the bag else");
    const block = await this.findByXpath("//div[@class='product-details-module product-details__action-panel details-product-purchase details-product-purchase--in-bag details-product-purchase--add-more details-product-purchase--checkout']")
    const element = await this.findByXpath(ProductPage.ADD_MORE_BUTTON_XPATH);
    await element.click();

    return this;
  }

  async goToTheBag() {
    logger.info("Opening bag page");
    const element = await this.findByXpath(ProductPage.BAG_BUTTON_XPATH);
    await element.click();

    return this;
  }

  async getQuantityOfProduct() {
    const elements = await this.findElementsByXpath(ProductPage.PRODUCT_QUANTITY_XPATH);
    if (elements.length > 3) {
      return this.getQuantityOfProduct();
    } 
    logger.info("Getting quantity of products in the bag");
    return elements[0].getText();
  }

  async getNumberOfProducts() {
    logger.info("Getting number of products in the bag");
    const elements = await this.findElementsByXpath(ProductPage.PRODUCTS_IN_THE_BAG_XPATH);
    return elements.length;
  }
}

module.exports = ProductPage;
