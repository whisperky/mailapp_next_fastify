import { useState, useEffect } from "react";
import { debounce } from "lodash";
import { emailService } from "../services/emailService";

export function useEmails() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchText, setSearchText] = useState("");

  const fetchEmails = async (search = "") => {
    try {
      const data = await emailService.getEmails(search);
      setEmails(data);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  const debouncedSearch = debounce((text) => {
    fetchEmails(text);
  }, 500);

  useEffect(() => {
    fetchEmails();
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    debouncedSearch(e.target.value);
  };

  return {
    emails,
    selectedEmail,
    searchText,
    setSelectedEmail,
    handleSearch,
    fetchEmails,
  };
}
