import InboxIcon from "@mui/icons-material/Inbox";
import StarIcon from "@mui/icons-material/Star";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";

export const emailTabs = (emailCounts) => [
  { label: "Inbox", icon: <InboxIcon />, count: emailCounts.inbox },
  { label: "Starred", icon: <StarIcon />, count: emailCounts.starred },
  { label: "Sent", icon: <SendIcon /> },
  { label: "Drafts", icon: <DraftsIcon />, count: emailCounts.drafts },
  { label: "Archive", icon: <ArchiveIcon />, count: emailCounts.archived },
  { label: "Trash", icon: <DeleteIcon />, count: emailCounts.trash },
];
