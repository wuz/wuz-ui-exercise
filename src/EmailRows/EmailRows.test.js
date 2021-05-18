import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EmailRows from ".";

const emails = [
  {
    id: "1",
    subject: "Hello",
    sender: "bob.smith@gmail.com",
    body:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacinia vestibulum eros, a aliquet odio fermentum et. Fusce in volutpat est, eu aliquam ante. Integer at sapien sit amet nisl venenatis ullamcorper eu sed magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a odio vitae risus dictum pellentesque in vehicula leo. Nam massa sem, pretium at lacus quis, aliquam facilisis odio. Maecenas risus purus, dapibus sed viverra a, efficitur eget leo. Integer quis magna id ante ornare euismod. Nunc aliquet arcu sit amet tincidunt feugiat. Ut et sapien ut leo blandit egestas a non arcu.</p><p>Sed finibus rhoncus nulla, eu molestie urna volutpat non. Etiam molestie faucibus nisi eget molestie. Vestibulum porta a leo a scelerisque. Mauris eget nisl sapien. Aliquam consectetur sed massa eget accumsan. Pellentesque eget arcu quam. Vivamus feugiat lacinia laoreet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed quis quam vitae lorem rhoncus viverra vel et dolor. Sed pharetra cursus risus sit amet accumsan.</p>",
    tags: ["work"],
    date: "2017-03-05T03:25:43.511Z"
  }
];

test("handles search and onClick", async () => {
  const dispatch = jest.fn();
  const { rerender } = render(
    <EmailRows openEmail={null} search="" emails={emails} dispatch={dispatch} />
  );

  expect(screen.getByText("bob.smith@gmail.com")).toBeTruthy();
  fireEvent.click(screen.getByText("Hello"));
  expect(dispatch).toHaveBeenCalledWith({ data: "1", type: "updateOpenEmail" });
  rerender(
    <EmailRows
      openEmail={null}
      search="jeff"
      emails={emails}
      dispatch={dispatch}
    />
  );
  expect(screen.queryByText("bob.smith@gmail.com")).toBeNull();
});
