import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";

export default function EmailCompose({
  open,
  onClose,
  onSend,
  replyTo = null,
  forwardEmail = null,
  newEmail = null,
  setNewEmail = null,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [emailData, setEmailData] = useState({
    replyTo: replyTo || null,
    forwardEmail: forwardEmail || null,
    to: newEmail?.to || replyTo?.from || forwardEmail?.to || "",
    cc: newEmail?.cc || "",
    bcc: newEmail?.bcc || "",
    subject:
      newEmail?.subject || replyTo?.subject || forwardEmail?.subject || "",
    body: replyTo
      ? `\n\nOn ${new Date(replyTo?.created_at).toLocaleString()}, ${
          replyTo?.from
        } wrote:\n${replyTo?.body}`
      : forwardEmail
      ? `\n\n---------- Forwarded message ---------\nFrom: ${
          forwardEmail.from
        }\nDate: ${new Date(
          forwardEmail?.created_at
        ).toLocaleString()}\nSubject: ${forwardEmail?.subject}\nTo: ${
          forwardEmail?.to
        }\n\n${forwardEmail?.body}`
      : "",
    errors: {},
  });

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateEmails = (emails) => {
    if (!emails) return true;
    return emails.split(",").every((email) => validateEmail(email.trim()));
  };

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setEmailData((prev) => ({
      ...prev,
      [field]: value,
      errors: {
        ...prev.errors,
        [field]: false,
      },
    }));
  };

  const handleValidation = () => {
    const errors = {};

    if (!emailData.to || !validateEmails(emailData.to)) {
      errors.to = "Please enter valid email address(es)";
    }
    if (emailData.cc && !validateEmails(emailData.cc)) {
      errors.cc = "Please enter valid email address(es)";
    }
    if (emailData.bcc && !validateEmails(emailData.bcc)) {
      errors.bcc = "Please enter valid email address(es)";
    }
    if (!emailData.subject.trim()) {
      errors.subject = "Subject is required";
    }
    if (!emailData.body.trim()) {
      errors.body = "Message body is required";
    }

    setEmailData((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleSend = () => {
    if (handleValidation()) {
      const { errors, ...emailToSend } = emailData;
      onSend(emailToSend);
      handleClose();
    }
  };

  const handleClose = () => {
    setEmailData({
      to: "",
      cc: "",
      bcc: "",
      subject: "",
      body: "",
      errors: {},
    });
    setIsFullscreen(false);
    setIsMinimized(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      fullScreen={isFullscreen}
      sx={{
        "& .MuiDialog-paper": {
          ...(isMinimized && {
            position: "fixed",
            bottom: 0,
            right: 24,
            m: 0,
            height: "48px",
            width: "300px",
            overflow: "hidden",
          }),
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          bgcolor: "background.default",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: isMinimized ? "pointer" : "default",
        }}
        onClick={() => isMinimized && setIsMinimized(false)}
      >
        <Typography variant="subtitle1">
          {isMinimized ? "New Message" : "Compose Email"}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title={isMinimized ? "Maximize" : "Minimize"}>
            <IconButton
              size="small"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <MinimizeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
            <IconButton
              size="small"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Close">
            <IconButton size="small" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </DialogTitle>

      {!isMinimized && (
        <>
          <DialogContent dividers>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="To"
                value={emailData.to}
                onChange={handleChange("to")}
                error={!!emailData.errors.to}
                helperText={emailData.errors.to}
                size="small"
              />
              <TextField
                fullWidth
                label="Cc"
                value={emailData.cc}
                onChange={handleChange("cc")}
                error={!!emailData.errors.cc}
                helperText={emailData.errors.cc}
                size="small"
              />
              <TextField
                fullWidth
                label="Bcc"
                value={emailData.bcc}
                onChange={handleChange("bcc")}
                error={!!emailData.errors.bcc}
                helperText={emailData.errors.bcc}
                size="small"
              />
              <TextField
                fullWidth
                label="Subject"
                value={emailData.subject}
                onChange={handleChange("subject")}
                error={!!emailData.errors.subject}
                helperText={emailData.errors.subject}
                size="small"
              />
              <TextField
                fullWidth
                multiline
                rows={15}
                label="Message"
                value={emailData.body}
                onChange={handleChange("body")}
                error={!!emailData.errors.body}
                helperText={emailData.errors.body}
              />
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 2, bgcolor: "background.default" }}>
            <Button
              variant="contained"
              onClick={handleSend}
              startIcon={<SendIcon />}
            >
              Send
            </Button>
            <Button onClick={handleClose}>Discard</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
