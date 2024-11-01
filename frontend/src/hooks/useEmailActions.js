import { useState } from "react";
import { Snackbar } from "@mui/material";

export const useEmailActions = (fetchEmails) => {
  const [newEmail, setNewEmail] = useState({});

  const handleSendEmail = async (newMail) => {
    const errors = {
      to: !newMail.to,
      subject: !newMail.subject,
    };

    if (errors.to || errors.subject) {
      setNewEmail((prev) => ({ ...prev, errors }));
      return false;
    }

    try {
      await fetch("/api/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMail),
      });
      fetchEmails();
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  };

  const handleDeleteEmail = async (
    emailId,
    selectedEmail,
    setSelectedEmail
  ) => {
    try {
      await fetch(`/api/emails/${emailId}`, { method: "DELETE" });
      setSelectedEmail(null);
      fetchEmails();
      if (selectedEmail && selectedEmail.id === emailId) {
        setSelectedEmail({
          ...selectedEmail,
          deleted: 1,
        });
      }
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  const handleRestoreEmail = async (
    emailId,
    selectedEmail,
    setSelectedEmail
  ) => {
    try {
      await fetch(`/api/emails/${emailId}/restore`, { method: "PUT" });
      setSelectedEmail(null);
      fetchEmails();
      if (selectedEmail && selectedEmail.id === emailId) {
        setSelectedEmail({
          ...selectedEmail,
          deleted: 0,
        });
      }
    } catch (error) {
      console.error("Error restoring email:", error);
    }
  };

  const handleStarEmail = async (
    emailId,
    method,
    selectedEmail,
    setSelectedEmail
  ) => {
    try {
      await fetch(`/api/emails/${emailId}/star`, { method });
      fetchEmails();
      if (selectedEmail && selectedEmail.id === emailId) {
        setSelectedEmail({
          ...selectedEmail,
          favorite: method === "PUT" ? 1 : 0,
        });
      }
    } catch (error) {
      console.error("Error starring email:", error);
    }
  };

  const handleArchiveEmail = async (
    emailId,
    method,
    selectedEmail,
    setSelectedEmail
  ) => {
    try {
      await fetch(`/api/emails/${emailId}/archive`, { method });
      fetchEmails();
      if (selectedEmail && selectedEmail.id === emailId) {
        setSelectedEmail({
          ...selectedEmail,
          archived: method === "PUT" ? 1 : 0,
        });
      }
    } catch (error) {
      console.error("Error archiving email:", error);
    }
  };

  return {
    handleSendEmail,
    handleDeleteEmail,
    handleStarEmail,
    handleArchiveEmail,
    handleRestoreEmail,
    newEmail,
    setNewEmail,
  };
};
