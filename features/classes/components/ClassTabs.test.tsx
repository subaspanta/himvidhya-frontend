import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ClassTabs } from "./ClassTabs";

let mockPathname = "/home/classes/class-1";
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

describe("ClassTabs", () => {
  it("marks Stream active on the base class route", () => {
    mockPathname = "/home/classes/class-1";
    render(<ClassTabs classId="class-1" />);

    expect(screen.getByRole("link", { name: "Stream" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Materials" })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("link", { name: "People" })).not.toHaveAttribute("aria-current");
  });

  it("marks Materials active on the materials route", () => {
    mockPathname = "/home/classes/class-1/materials";
    render(<ClassTabs classId="class-1" />);

    expect(screen.getByRole("link", { name: "Materials" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Stream" })).not.toHaveAttribute("aria-current");
  });

  it("marks People active on the people route", () => {
    mockPathname = "/home/classes/class-1/people";
    render(<ClassTabs classId="class-1" />);

    expect(screen.getByRole("link", { name: "People" })).toHaveAttribute("aria-current", "page");
  });

  it("points each tab at the correct classId-scoped href", () => {
    mockPathname = "/home/classes/class-1";
    render(<ClassTabs classId="class-1" />);

    expect(screen.getByRole("link", { name: "Stream" })).toHaveAttribute(
      "href",
      "/home/classes/class-1",
    );
    expect(screen.getByRole("link", { name: "Materials" })).toHaveAttribute(
      "href",
      "/home/classes/class-1/materials",
    );
    expect(screen.getByRole("link", { name: "People" })).toHaveAttribute(
      "href",
      "/home/classes/class-1/people",
    );
  });
});
