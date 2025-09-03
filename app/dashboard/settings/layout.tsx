export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  // Session provider is already handled at the root level
  // No additional provider needed here
  return children;
}