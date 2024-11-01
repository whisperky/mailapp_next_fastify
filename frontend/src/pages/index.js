import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import EmailSidebar from "@/components/email/EmailSidebar";
import EmailList from "@/components/email/EmailList";
import EmailContent from "@/components/email/EmailContent";
import EmailCompose from "@/components/email/EmailCompose";
import { useEmails } from "@/hooks/useEmails";
import { useEmailActions } from "@/hooks/useEmailActions";
import { useEmailFilters } from "@/hooks/useEmailFilters";
import { emailTabs } from "@/constants/emailTabs";

export default function Home() {
  const {
    emails,
    selectedEmail,
    searchText,
    setSelectedEmail,
    handleSearch,
    fetchEmails,
  } = useEmails();

  const {
    handleSendEmail,
    handleDeleteEmail,
    handleStarEmail,
    handleArchiveEmail,
    handleRestoreEmail,
    newEmail,
    setNewEmail,
  } = useEmailActions(fetchEmails);

  const { getEmailCounts, getFilteredEmails } = useEmailFilters(emails);

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [openCompose, setOpenCompose] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    fetchEmails();
  }, []);

  const handleReplyEmail = () => {
    setNewEmail({
      to: selectedEmail.from,
      subject: `Re: ${selectedEmail.subject}`,
      body: `\n\nOn ${new Date(selectedEmail.date).toLocaleString()}, ${
        selectedEmail.from
      } wrote:\n${selectedEmail.body}`,
      cc: "",
      bcc: "",
      errors: { to: false, subject: false },
    });
    setOpenCompose(true);
  };

  const handleForwardEmail = () => {
    setNewEmail({
      to: "",
      subject: `Fwd: ${selectedEmail.subject}`,
      body: `\n\n---------- Forwarded message ---------\nFrom: ${
        selectedEmail.from
      }\nDate: ${new Date(selectedEmail.date).toLocaleString()}\nSubject: ${
        selectedEmail.subject
      }\n\n${selectedEmail.body}`,
      cc: "",
      bcc: "",
    });
    setOpenCompose(true);
  };

  const emailCounts = getEmailCounts();
  const tabs = emailTabs(emailCounts);

  return (
    <Box
      sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}
    >
      <EmailSidebar
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isSidebarExpanded={isSidebarExpanded}
        handleSidebarToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
      />
      <EmailList
        emails={getFilteredEmails(currentTab)}
        selectedEmail={selectedEmail}
        setSelectedEmail={setSelectedEmail}
        handleSearch={handleSearch}
        searchText={searchText}
        handleStarEmail={handleStarEmail}
        isSidebarExpanded={isSidebarExpanded}
        setOpenCompose={setOpenCompose}
      />
      <EmailContent
        selectedEmail={selectedEmail}
        setSelectedEmail={setSelectedEmail}
        handleDeleteEmail={handleDeleteEmail}
        handleStarEmail={handleStarEmail}
        handleArchiveEmail={handleArchiveEmail}
        handleReplyEmail={handleReplyEmail}
        handleForwardEmail={handleForwardEmail}
        handleRestoreEmail={handleRestoreEmail}
        isSidebarExpanded={isSidebarExpanded}
      />
      <EmailCompose
        open={openCompose}
        onClose={() => setOpenCompose(false)}
        onSend={(emailData) => {
          const success = handleSendEmail(emailData);
          if (success) setOpenCompose(false);
        }}
        newEmail={newEmail}
        setNewEmail={setNewEmail}
      />
    </Box>
  );
}
