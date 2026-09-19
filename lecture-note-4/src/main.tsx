import { createRoot } from "react-dom/client";
import { createMutationObserver } from "../mutationObserver";
import React from "react";

console.log("main starting");

const root = createRoot(document.getElementById("container")!);

// The model
type Model = {
  // Just a list of strings
  items: Array<string>;

  // And an incrementing ID
  nextId: number;
};

// The model instance
const model: Model = {
  nextId: 0,
  items: [],
};

// Function to mutate the model in place
function mutateModel() {
  // add a new item
  model.items.push(`item-${model.nextId++}`);
  if (model.items.length > 5) {
    // if the size is greater than five, then remove the oldest item
    model.items.shift();
  }
}

// Function to produce a view given a model,
// where the view is a React Virtual DOM tree represented by the root element
function computeView(model: Model): ReactElement {
  return (
    <ul>
      {model.items.map((it) => (
        <li key={it}>
          <p>{it}</p>
          <input type="text" />
        </li>
      ))}
    </ul>
  );
}

// Update the model and re-render every two seconds
setInterval(() => {
  mutateModel();
  const view = computeView(model);
  root.render(view);
}, 2000);

// Just a way to observe mutations to the (real) DOM
const observer = createMutationObserver();
observer.observe(document.getElementById("container")!, {
  childList: true,
  subtree: true,
});