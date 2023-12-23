// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile, menuClose, getHash, FLS } from "../functions.js";
// Підключення доповнення для збільшення можливостей
// Документація: https://github.com/cferdinandi/smooth-scroll
// import SmoothScroll from "smooth-scroll";
//==============================================================================================================================================================================================================================================================================================================================

// Модуль плавної проктутки до блоку
export let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
  const targetBlockElement = document.querySelector(targetBlock);
  if (targetBlockElement) {
    let headerItem = "";
    let headerItemHeight = 0;
    if (noHeader) {
      headerItem = "header.header";
      const headerElement = document.querySelector(headerItem);
      const headerContainer = headerElement.querySelector(".header__container");
      if (!headerElement.classList.contains("_header-scroll")) {
        headerContainer.style.cssText = `transition-duration: 0s;`;
        headerElement.classList.add("_header-scroll");
        headerItemHeight = headerElement.offsetHeight;
        headerElement.classList.remove("_header-scroll");
        setTimeout(() => {
          headerContainer.style.cssText = ``;
        }, 0);
      } else {
        headerItemHeight = headerElement.offsetHeight;
      }
    }
    let options = {
      speedAsDuration: true,
      speed: speed,
      header: headerItem,
      offset: offsetTop,
      easing: "easeOutQuad",
    };
    // Закриваємо меню, якщо воно відкрите
    document.documentElement.classList.contains("menu-open") ? menuClose() : null;

    if (typeof SmoothScroll !== "undefined") {
      // Прокручування з використанням доповнення
      new SmoothScroll().animateScroll(targetBlockElement, "", options);
    } else {
      // Прокручування стандартними засобами
      let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
      targetBlockElementPosition = headerItemHeight
        ? targetBlockElementPosition - headerItemHeight
        : targetBlockElementPosition;
      targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
      window.scrollTo({
        top: targetBlockElementPosition,
        behavior: "smooth",
      });
    }
    FLS(`[gotoBlock]: Юхуу...крутим к ${targetBlock}`);
  } else {
    FLS(`[gotoBlock]: Ойой... Такого блока нет на странице: ${targetBlock}`);
  }
};
