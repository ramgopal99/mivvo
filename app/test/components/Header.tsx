"use client";

interface HeaderData {
  title: string;
  completionPercentage: string;
}

interface HeaderProps {
  headerData: HeaderData;
  completionPercentage: string;
}

const Header = ({ headerData, completionPercentage }: HeaderProps) => (
  <div className="border-b border-border bg-background px-4 py-4 flex-shrink-0">
    <h1 className="text-xl font-bold text-foreground">{headerData.title}</h1>
    <p className="text-sm text-muted-foreground mt-1">{completionPercentage}</p>
  </div>
);

export default Header;
