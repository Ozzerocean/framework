const BasePage = require("./basePage");
const { Key } = require("selenium-webdriver");
const logger = require("../logger");

class ProductPage extends BasePage {
  static QUANTITY_INPUT_XPATH = "//input[@id='qty-field']";
  static ADD_TO_BAG_BUTTON_XPATH = "//span[text()='Add to Bag']//ancestor::button";
  static ADD_MORE_BUTTON_XPATH = "//span[text()='Add More']//ancestor::button";
  static BAG_BUTTON_XPATH = "//div[@class='ec-minicart__body']";
  static PRODUCT_QUANTITY_XPATH = "//div[@class='form-control__select-text']";
  static PRODUCTS_IN_THE_BAG_XPATH = "//div[@class='ec-cart__products-inner']/div";
  static PRODUCT_NAME_IN_THE_BAG_XPATH = "//a[@class='ec-cart-item__title']";
  static REMOVE_FROM_BAG_BUTTON_XPATH = "//a[contains(@class, 'ec-cart-item__control-inner')]";
  static EMPTY_BAG_MESSAGE_XPATH = "//div[@class='ec-cart__message']"

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

  async getProductName() {
    logger.info("Getting name of the product in the bag");
    const productName = await this.findByXpath(ProductPage.PRODUCT_NAME_IN_THE_BAG_XPATH);

    return productName.getText();
  }

  async removeProductFromBag() {
    logger.info("Removing product from the bag");
    const removeButton = await this.findByXpath(ProductPage.REMOVE_FROM_BAG_BUTTON_XPATH);
    await removeButton.click();

    return this;
  }

  async getEmptyBagMessage() {
    logger.info("Getting empty bag message");
    const emptyBagMessage = await this.findByXpath(ProductPage.EMPTY_BAG_MESSAGE_XPATH);

    return emptyBagMessage.getText();
  }
}

module.exports = ProductPage;
