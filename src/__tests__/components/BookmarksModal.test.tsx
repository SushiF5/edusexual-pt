import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookmarksModal from "@/components/BookmarksModal";
import { I18nProvider } from "@/i18n/context";
import { BookmarkItem } from "@/types";

function mount(ui: React.ReactNode) {
  return render(<I18nProvider>{ui}</I18nProvider>);
}

const bookmarks: BookmarkItem[] = [
  {
    id: "bm-1",
    type: "topic",
    title: "Puberdade",
    category: "Anatomia",
    tabTarget: "quiz",
    savedAt: 1,
  },
  {
    id: "bm-2",
    type: "guide",
    title: "Guia para Pais",
    tabTarget: "recursos",
    savedAt: 2,
  },
];

describe("BookmarksModal", () => {
  const onClose = jest.fn();
  const onRemoveBookmark = jest.fn();
  const onNavigateTab = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
    onRemoveBookmark.mockClear();
    onNavigateTab.mockClear();
  });

  it("returns null when closed", () => {
    const { container } = mount(
      <BookmarksModal
        isOpen={false}
        onClose={onClose}
        bookmarks={bookmarks}
        onRemoveBookmark={onRemoveBookmark}
        onNavigateTab={onNavigateTab}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders dialog with bookmark count", () => {
    mount(
      <BookmarksModal
        isOpen={true}
        onClose={onClose}
        bookmarks={bookmarks}
        onRemoveBookmark={onRemoveBookmark}
        onNavigateTab={onNavigateTab}
      />
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/os meus favoritos/i)).toBeInTheDocument();
    expect(screen.getByText(/2/)).toBeInTheDocument();
  });

  it("shows empty-state message when no bookmarks", () => {
    mount(
      <BookmarksModal
        isOpen={true}
        onClose={onClose}
        bookmarks={[]}
        onRemoveBookmark={onRemoveBookmark}
        onNavigateTab={onNavigateTab}
      />
    );
    expect(screen.getByText(/ainda não guardaste/i)).toBeInTheDocument();
  });

  it("lists bookmark titles", () => {
    mount(
      <BookmarksModal
        isOpen={true}
        onClose={onClose}
        bookmarks={bookmarks}
        onRemoveBookmark={onRemoveBookmark}
        onNavigateTab={onNavigateTab}
      />
    );
    expect(screen.getByText("Puberdade")).toBeInTheDocument();
    expect(screen.getByText("Guia para Pais")).toBeInTheDocument();
  });

  it("navigates to tab and closes when opening an item", () => {
    mount(
      <BookmarksModal
        isOpen={true}
        onClose={onClose}
        bookmarks={bookmarks}
        onRemoveBookmark={onRemoveBookmark}
        onNavigateTab={onNavigateTab}
      />
    );
    fireEvent.click(screen.getByText("Puberdade"));
    expect(onNavigateTab).toHaveBeenCalledWith("quiz");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("removes a bookmark via trash button", () => {
    mount(
      <BookmarksModal
        isOpen={true}
        onClose={onClose}
        bookmarks={bookmarks}
        onRemoveBookmark={onRemoveBookmark}
        onNavigateTab={onNavigateTab}
      />
    );
    const trashButtons = screen.getAllByTitle(/remover dos favoritos/i);
    fireEvent.click(trashButtons[0]);
    expect(onRemoveBookmark).toHaveBeenCalledWith("bm-1");
  });

  it("closes via backdrop click", () => {
    const { container } = mount(
      <BookmarksModal
        isOpen={true}
        onClose={onClose}
        bookmarks={bookmarks}
        onRemoveBookmark={onRemoveBookmark}
        onNavigateTab={onNavigateTab}
      />
    );
    fireEvent.click(container.querySelector(".bg-black\\/60")!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});