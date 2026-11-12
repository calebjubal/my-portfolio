import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Search,
  FileText,
  Code2,
  ExternalLink,
  Mail,
  PenLine,
  X,
  Plus,
  Trash2,
  Eye,
  Save,
  FolderOpen,
  Download,
} from "lucide-react";
const icons = {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Search,
  FileText,
  Code2,
  ExternalLink,
  Mail,
  PenLine,
  X,
  Plus,
  Trash2,
  Eye,
  Save,
  FolderOpen,
  Download,
};
export default function Icon({ name, className = "" }) {
  const Component = icons[name];
  return (
    <Component
      className={`ui-icon ${className}`}
      size={18}
      strokeWidth={1.7}
      aria-hidden="true"
      focusable="false"
    />
  );
}
