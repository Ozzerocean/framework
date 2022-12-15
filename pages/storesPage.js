const BasePage = require("./basePage");
const { Key } = require("selenium-webdriver");
const logger = require("../logger");

class StoresPage extends BasePage {
    static PAGE_URL = "https://www.honeyroseusa.com/smoke-shop-near-me";
    static CITY_INPUT_XPATH = "//input[@id='map_input']"
    static DROPDOWN_MENU_XPATH = "//button[contains(@class, 'dropdown-toggle')]"
    static DROPDOWN_MENU_RADIUS_CHOICES_XPATH = "//ul[@class='dropdown-menu inner show']/li/a"
    static SEARCH_BUTTON_XPATH = "//button[@id='map_search']"
    static STORES_LIST_XPATH = "//div[contains(@class, 'list_content')]/div/ul/li[@class='showed']"

    openPage = async () => super.openPage(StoresPage.PAGE_URL);

    async enterCityInWhichToFindStore(cityName) {
        logger.info("Entering " + cityName + " city in which to find store");
        const input = await this.findByXpath(StoresPage.CITY_INPUT_XPATH);
        await input.sendKeys(cityName, Key.ENTER);

        return this;
    }

    async chooseMaxSearchRadius() {
        logger.info("Choosing max search radius");
        const dropdown = await this.findByXpath(StoresPage.DROPDOWN_MENU_XPATH);
        await dropdown.click();

        const choices = await this.findElementsByXpath(StoresPage.DROPDOWN_MENU_RADIUS_CHOICES_XPATH);
        await choices[choices.length - 1].click();

        return this;
    }

    async clickSearchButton() {
        logger.info("Clicking search button");
        const button = await this.findByXpath(StoresPage.SEARCH_BUTTON_XPATH);
        await button.click();

        return this;
    }

    async getStoresListLength() {
        logger.info("Getting list of found stores");
        const listOfStores = await this.findElementsByXpath(StoresPage.STORES_LIST_XPATH);
        return listOfStores.length;
    }
}

module.exports = StoresPage;