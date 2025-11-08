"use client";

interface HeaderProps {
  title: string;
  percentage?: number;
}

const Header = ({ title, percentage }: HeaderProps) => (
  <div className="border-b border-border bg-background pl-4 pr-4 py-4 flex-shrink-0">
    <div className="flex flex-col gap-1">
    <h1 className="text-xl font-bold text-foreground">{title}</h1>
      {percentage !== undefined && (
        <div className="text-sm text-muted-foreground">
          {percentage}% Complete
        </div>
      )}
    </div>
  </div>
);

export default Header;
