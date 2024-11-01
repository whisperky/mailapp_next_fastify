import {
  Box,
  Typography,
  IconButton,
  Divider,
  Tooltip,
  Paper,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import RestoreIcon from "@mui/icons-material/Restore";
import ReplyIcon from "@mui/icons-material/Reply";
import ForwardIcon from "@mui/icons-material/Forward";
import { motion, AnimatePresence } from "framer-motion";

export default function EmailContent({
  selectedEmail,
  setSelectedEmail,
  handleDeleteEmail,
  handleStarEmail,
  handleArchiveEmail,
  handleRestoreEmail,
  handleReplyEmail,
  handleForwardEmail,
  isSidebarExpanded,
}) {
  const onStar = (e) => {
    e.stopPropagation();
    handleStarEmail(
      selectedEmail.id,
      selectedEmail.favorite ? "DELETE" : "PUT",
      selectedEmail,
      setSelectedEmail
    );
  };

  if (!selectedEmail) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          left: isSidebarExpanded ? 651 : 541,
          right: 0,
          top: 0,
          bottom: 0,
          bgcolor: "background.default",
          transition: "left 0.3s ease",
        }}
      >
        <Typography color="text.secondary">Select an email to read</Typography>
      </Box>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedEmail.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "fixed",
          left: isSidebarExpanded ? 651 : 541,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "background.default",
          transition: "left 0.3s ease",
          overflow: "auto",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            m: 3,
            p: 3,
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          {/* Email Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedEmail.subject}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Avatar
                  sx={{ width: 32, height: 32 }}
                  alt={selectedEmail.from}
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    selectedEmail.from
                  )}&background=random`}
                />
                <Box>
                  <Typography variant="subtitle2">
                    {selectedEmail.from}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    to {selectedEmail.to}
                  </Typography>
                </Box>
              </Box>
              {(selectedEmail.cc || selectedEmail.bcc) && (
                <Box sx={{ ml: 5 }}>
                  {selectedEmail.cc && (
                    <Typography
                      variant="caption"
                      display="block"
                      color="text.secondary"
                    >
                      cc: {selectedEmail.cc}
                    </Typography>
                  )}
                  {selectedEmail.bcc && (
                    <Typography
                      variant="caption"
                      display="block"
                      color="text.secondary"
                    >
                      bcc: {selectedEmail.bcc}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
            <Typography variant="caption" color="text.secondary">
              {new Date(selectedEmail.created_at).toLocaleString()}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
            <Tooltip title="Reply">
              <IconButton onClick={handleReplyEmail} size="small">
                <ReplyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Forward">
              <IconButton onClick={handleForwardEmail} size="small">
                <ForwardIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={selectedEmail.favorite ? "Unstar" : "Star"}>
              <IconButton onClick={onStar} size="small">
                {selectedEmail.favorite ? (
                  <StarIcon color="primary" />
                ) : (
                  <StarBorderIcon />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title={selectedEmail.archived ? "Unarchive" : "Archive"}>
              <IconButton
                onClick={() =>
                  handleArchiveEmail(
                    selectedEmail.id,
                    selectedEmail.archived ? "DELETE" : "PUT",
                    selectedEmail,
                    setSelectedEmail
                  )
                }
                size="small"
              >
                {selectedEmail.archived ? <UnarchiveIcon /> : <ArchiveIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={() =>
                  selectedEmail.deleted
                    ? handleRestoreEmail(
                        selectedEmail.id,
                        selectedEmail,
                        setSelectedEmail
                      )
                    : handleDeleteEmail(
                        selectedEmail.id,
                        selectedEmail,
                        setSelectedEmail
                      )
                }
                size="small"
                color="error"
              >
                {selectedEmail.deleted ? <RestoreIcon /> : <DeleteIcon />}
              </IconButton>
            </Tooltip>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Email Body */}
          <Box sx={{ whiteSpace: "pre-wrap" }}>
            <Typography variant="body1">{selectedEmail.body}</Typography>
          </Box>
        </Paper>
      </motion.div>
    </AnimatePresence>
  );
}
