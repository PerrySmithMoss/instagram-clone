import { render } from "@testing-library/react";
import { expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  router: { query: { id: "first-user" } },
  stops: [] as Array<ReturnType<typeof vi.fn>>,
}));
vi.mock("next/router", () => ({ useRouter: () => mocks.router }));
vi.mock("next/head", () => ({ default: () => null }));
vi.mock("../../firebase", () => ({ db: {}, storage: {} }));
vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ user: { uid: "viewer" } }),
}));
vi.mock("../../context/UserContext", () => ({
  useUserData: () => ({
    userData: { following: [], followers: [] },
    setUserData: vi.fn(),
  }),
}));
vi.mock("../../components/Navbar/Navbar", () => ({ Navbar: () => null }));
vi.mock("../../lib/social", () => ({ toggleFollowing: vi.fn() }));
vi.mock("firebase/firestore", async (importOriginal) => ({
  ...(await importOriginal<typeof import("firebase/firestore")>()),
  doc: (...args: unknown[]) => args,
  collection: (...args: unknown[]) => args,
  query: (...args: unknown[]) => args,
  where: (...args: unknown[]) => args,
  onSnapshot: () => {
    const stop = vi.fn();
    mocks.stops.push(stop);
    return stop;
  },
}));

import { Profile } from "../../components/User/Profile";

it("unsubscribes from both profile listeners on navigation and unmount", () => {
  const { rerender, unmount } = render(<Profile />);
  expect(mocks.stops).toHaveLength(2);
  mocks.router.query.id = "second-user";
  rerender(<Profile />);
  expect(mocks.stops).toHaveLength(4);
  expect(mocks.stops[0]).toHaveBeenCalledOnce();
  expect(mocks.stops[1]).toHaveBeenCalledOnce();
  unmount();
  for (const stop of mocks.stops) expect(stop).toHaveBeenCalledOnce();
});
