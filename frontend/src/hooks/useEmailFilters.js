export const useEmailFilters = (emails) => {
  const getEmailCounts = () => ({
    inbox: emails.filter((email) => !email.archived && !email.deleted).length,
    starred: emails.filter((email) => email.favorite === 1).length,
    drafts: emails.filter((email) => email.draft === 1).length,
    archived: emails.filter((email) => email.archived === 1).length,
    trash: emails.filter((email) => email.deleted === 1).length,
  });

  const getFilteredEmails = (currentTab) => {
    switch (currentTab) {
      case 0: // Inbox
        return emails.filter((email) => !email.archived && !email.deleted);
      case 1: // Starred
        return emails.filter((email) => email.favorite === 1);
      case 2: // Sent
        return emails.filter((email) => email.sent === 1);
      case 3: // Drafts
        return emails.filter((email) => email.draft === 1);
      case 4: // Archive
        return emails.filter((email) => email.archived === 1);
      case 5: // Trash
        return emails.filter((email) => email.deleted === 1);
      default:
        return emails;
    }
  };

  return {
    getEmailCounts,
    getFilteredEmails,
  };
};
