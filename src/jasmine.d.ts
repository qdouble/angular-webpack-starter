declare namespace jasmine {
  interface Matchers {
    toHaveText(text: string): boolean;
    toContainText(text: string): boolean;
    toHaveCssClass(expected: any): boolean;
    toBeAnInstanceOf(expected: any): boolean;
  }
}
