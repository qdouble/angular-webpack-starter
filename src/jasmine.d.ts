declare namespace jasmine {
  interface Matchers<T> {
    toHaveText(text: string): boolean;
    toContainText(text: string): boolean;
    toHaveCssClass(expected: any): boolean;
    toBeAnInstanceOf(expected: any): boolean;
  }
}
