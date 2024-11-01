import { Box, Tabs, Tab, IconButton, Badge } from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";

export default function EmailSidebar({
  tabs,
  currentTab,
  setCurrentTab,
  isSidebarExpanded,
  handleSidebarToggle,
}) {
  return (
    <Box
      sx={{
        width: isSidebarExpanded ? 200 : 90,
        borderRight: "1px solid",
        borderColor: "divider",
        height: "100vh",
        bgcolor: "background.paper",
        position: "fixed",
        left: 91,
        overflowY: "auto",
        zIndex: 100,
        transition: "width 0.3s ease",
      }}
    >
      <IconButton
        onClick={handleSidebarToggle}
        sx={{
          width: "100%",
          p: 3,
          borderRadius: 0,
          borderBottom: "1px solid #0000001A",
        }}
      >
        <DehazeIcon />
      </IconButton>
      <Tabs
        orientation="vertical"
        value={currentTab}
        onChange={(e, newValue) => setCurrentTab(newValue)}
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            icon={tab.icon}
            iconPosition="start"
            label={
              isSidebarExpanded ? (
                tab.label + (tab.count ? ` (${tab.count})` : "")
              ) : tab.count ? (
                <Badge
                  badgeContent={tab.count}
                  color="primary"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "0.6rem",
                      height: "16px",
                      minWidth: "16px",
                      padding: "0 4px",
                    },
                  }}
                />
              ) : null
            }
            sx={{
              minHeight: 48,
              minWidth: isSidebarExpanded ? 200 : 90,
              p: 1,
              justifyContent: isSidebarExpanded ? "flex-start" : "center",
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
