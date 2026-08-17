import { beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";

// Modal (components/ui/modal.tsx) portals into #modal-root and renders
// nothing if that node is absent. In the app it's provided by
// app/layout.tsx; tests get no layout, so any test rendering a
// Modal-wrapped component would silently render an empty tree without
// this.
beforeEach(() => {
  if (!document.getElementById("modal-root")) {
    const modalRoot = document.createElement("div");
    modalRoot.id = "modal-root";
    document.body.appendChild(modalRoot);
  }
});
