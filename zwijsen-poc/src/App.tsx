import AppShell from "./components/shell/AppShell";
import { LibraryProvider } from "./state/LibraryContext";

export default function App() {
  return (
    <LibraryProvider>
      <AppShell />
    </LibraryProvider>
  );
}
