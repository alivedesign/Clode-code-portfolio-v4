export interface NavigationItem {
  command: string;
  route: string;
  description: string;
}

export interface CommandHistory {
  command: string;
  timestamp: number;
}
