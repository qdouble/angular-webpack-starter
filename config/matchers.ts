/* tslint:disable: max-line-length triple-equals */
beforeEach(() => {
  jasmine.addMatchers({

    toHaveText: function () {
      return {
        compare: function (actual, expectedText) {
          const actualText = actual.textContent;
          return {
            pass: actualText == expectedText,
            get message() { return 'Expected ' + actualText + ' to equal ' + expectedText; }
          };
        }
      };
    },

    toContainText: function () {
      return {
        compare: function (actual, expectedText) {
          const actualText = actual.textContent;
          return {
            pass: actualText.indexOf(expectedText) > -1,
            get message() { return 'Expected ' + actualText + ' to contain ' + expectedText; }
          };
        }
      };
    },
    toHaveCssClass: function (util, customEqualityTests) {
      return { compare: buildError(false), negativeCompare: buildError(true) };

      function buildError(isNot: boolean) {
        return function (actual: HTMLElement, className: string) {
          return {
            pass: actual.classList.contains(className) === !isNot,
            get message() {
              return `Expected ${actual.outerHTML} ${isNot ? 'not ' : ''}to contain the CSS class "${className}"`;
            }
          };
        };
      }
    },
    toBeAnInstanceOf: function () {
      return {
        compare: function (actual: any, expectedClass: any) {
          const pass = typeof actual === 'object' && actual instanceof expectedClass;
          return {
            pass: pass,
            get message() {
              return 'Expected ' + actual + ' to be an instance of ' + expectedClass;
            }
          };
        }
      };
    },
  });
});
