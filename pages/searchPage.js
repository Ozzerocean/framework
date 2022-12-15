const BasePage = require("./basePage");
const { Key } = require("selenium-webdriver");
const logger = require("../logger");

class SearchPage extends BasePage {
  static PAGE_URL = "https://www.honeyroseusa.com/";
  static SEARCH_BUTTON_XPATH = "//button[@class='icon_search']";
  static SEARCH_INPUT_XPATH = "//input[@placeholder='Search']";
  static NO_RESULT_MESSAGE_XPATH = "//div[@class='news_title']";
  static RESULTS_XPATH = "//li[@class='combo_hover']";

  openPage = async () => super.openPage(SearchPage.PAGE_URL);
  
  async clickSearchButton() {
    logger.info("Clicking search button to see search input");
    const element = await this.findByXpath(SearchPage.SEARCH_BUTTON_XPATH);
    await element.click();

    return this;
  }

  async enterNameOfTheProductToSearch(productToSearch) {
    logger.info("Entering '" + productToSearch + "' and click enter");
    const element = await this.findByXpath(SearchPage.SEARCH_INPUT_XPATH);
    await element.sendKeys(productToSearch, Key.ENTER);

    return this;
  }

  async getNoResultsMessage() {
    logger.info("Checking no result message");
    const element = await this.findByXpath(SearchPage.NO_RESULT_MESSAGE_XPATH);
    return element.getText();
  }

  async getNumberOfResults() {
    logger.info("Getting number of results");
    const elements = await this.findElementsByXpath(SearchPage.RESULTS_XPATH);
    return elements.length;
  }
}

module.exports = SearchPage;
