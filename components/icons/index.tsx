import {
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Search,
  Phone,
  Video,
  Image,
  Check,
  CheckCheck,
  Clock,
  User,
  LogOut,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  type LucideIcon,
} from "lucide-react";

export type IconName =
  | "send"
  | "paperclip"
  | "smile"
  | "moreVertical"
  | "search"
  | "phone"
  | "video"
  | "image"
  | "check"
  | "checkCheck"
  | "clock"
  | "user"
  | "logout"
  | "settings"
  | "menu"
  | "close"
  | "chevronLeft"
  | "chevronRight"
  | "plus"
  | "edit"
  | "trash"
  | "eye"
  | "eyeOff";

const iconMap: Record<IconName, LucideIcon> = {
  send: Send,
  paperclip: Paperclip,
  smile: Smile,
  moreVertical: MoreVertical,
  search: Search,
  phone: Phone,
  video: Video,
  image: Image,
  check: Check,
  checkCheck: CheckCheck,
  clock: Clock,
  user: User,
  logout: LogOut,
  settings: Settings,
  menu: Menu,
  close: X,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  plus: Plus,
  edit: Edit,
  trash: Trash2,
  eye: Eye,
  eyeOff: EyeOff,
};

export type IconSize = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<IconSize, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
};

interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
}

export default function Icon({ name, size = "md", className = "" }: IconProps) {
  const IconComponent = iconMap[name];
  const sizeClass = sizeMap[size];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent className={`${sizeClass} ${className}`} />;
}

// Export individual icons if needed for direct import
export { iconMap };
