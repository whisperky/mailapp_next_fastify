import { useState } from "react";
import {
  Box,
  List,
  Typography,
  InputAdornment,
  TextField,
  Fab,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EmailListItem from "./EmailListItem";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 10;

export default function EmailList({
  emails,
  selectedEmail,
  setSelectedEmail,
  handleSearch,
  searchText,
  handleStarEmail,
  isSidebarExpanded,
  setOpenCompose,
}) {
  const [hoveredEmail, setHoveredEmail] = useState(null);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(emails.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedEmails = emails.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (event, value) => {
    setPage(value);
    // Add smooth scroll to top
    const listElement = document.getElementById("email-list");
    if (listElement) {
      listElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      sx={{
        width: 360,
        borderRight: "1px solid",
        borderColor: "divider",
        height: "100vh",
        bgcolor: "background.paper",
        position: "fixed",
        left: isSidebarExpanded ? 291 : 181,
        transition: "left 0.3s ease",
      }}
    >
      {/* Search and New Email Button */}
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search emails..."
          value={searchText}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              bgcolor: "background.default",
            },
          }}
        />
        <Fab
          color="primary"
          size="small"
          onClick={() => setOpenCompose(true)}
          sx={{ minWidth: 40 }}
        >
          <AddIcon />
        </Fab>
      </Box>

      {/* Email List */}
      <List
        id="email-list"
        sx={{
          height: `calc(100vh - ${
            emails.length > ITEMS_PER_PAGE ? 140 : 80
          }px)`,
          overflowY: "auto",
          p: 0,
        }}
      >
        <AnimatePresence mode="wait">
          {paginatedEmails.length > 0 ? (
            paginatedEmails.map((email, index) => (
              <motion.div
                key={email.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <EmailListItem
                  email={email}
                  selected={selectedEmail?.id === email.id}
                  onClick={() => setSelectedEmail(email)}
                  onStar={(e) => {
                    e.stopPropagation();
                    handleStarEmail(
                      email.id,
                      email.favorite ? "DELETE" : "PUT",
                      selectedEmail,
                      setSelectedEmail
                    );
                  }}
                  onMouseEnter={() => setHoveredEmail(email.id)}
                  onMouseLeave={() => setHoveredEmail(null)}
                  isHovered={hoveredEmail === email.id}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  p: 4,
                }}
              >
                <Typography color="text.secondary" align="center">
                  {searchText
                    ? "No emails found matching your search"
                    : "No emails in this folder"}
                </Typography>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </List>

      {/* Pagination */}
      {emails.length > ITEMS_PER_PAGE && (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: "background.paper",
            borderTop: "1px solid",
            borderColor: "divider",
            p: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              size="small"
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontWeight: 500,
                },
                "& .Mui-selected": {
                  bgcolor: "primary.light",
                },
              }}
            />
          </motion.div>
        </Box>
      )}
    </Box>
  );
}
