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
  <div className="border-b border-border bg-background px-3 py-3 md:px-4 md:py-4 flex-shrink-0">
    <h1 className="text-lg md:text-xl font-bold text-foreground">{headerData.title}</h1>
    <p className="text-xs md:text-sm text-muted-foreground mt-1">{completionPercentage}</p>
  </div>
);

export default Header;
