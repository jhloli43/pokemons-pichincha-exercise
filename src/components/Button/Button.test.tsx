import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  it("when icon prop is null, should render the text of the button without marginLeft", () => {
    const text = "some button";
    const { getByText } = render(<Button text={text} />);
    
    expect(getByText(text)).toHaveStyle("margin-left: 0px");
  });
});