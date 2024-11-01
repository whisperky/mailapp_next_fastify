import { Box, ListItem, Typography, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { motion } from "framer-motion";

export default function EmailListItem({ email, selected, onClick, onStar }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <ListItem
        button
        selected={selected}
        onClick={onClick}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          "&.Mui-selected": {
            bgcolor: "primary.light",
          },
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="subtitle2">{email.from}</Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {new Date(email.created_at).toLocaleDateString()}
            </Typography>
          </Box>
          <Typography variant="subtitle1" noWrap fontWeight={500}>
            {email.subject}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary" noWrap>
              {email.body}
            </Typography>
            <IconButton size="small" onClick={onStar}>
              <StarIcon color={email.favorite ? "primary" : "disabled"} />
            </IconButton>
          </Box>
        </Box>
      </ListItem>
    </motion.div>
  );
}
