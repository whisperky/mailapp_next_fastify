import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function Leads() {
  const [openDialog, setOpenDialog] = useState(false);
  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  });

  const getLeads = async () => {
    try {
      const response = await fetch("/api/leads");
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    getLeads();
  }, []);

  const handleSubmit = async () => {
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead),
      });
      setOpenDialog(false);
      setNewLead({ name: "", email: "", company: "", phone: "" });
      getLeads();
    } catch (error) {
      console.error("Error creating lead:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Leads
      </Typography>

      {/* Add Lead Button */}
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={() => setOpenDialog(true)}
      >
        <AddIcon />
      </Fab>

      {/* Add Lead Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Lead</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={newLead.name}
            onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={newLead.email}
            onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
          />
          <TextField
            fullWidth
            label="Company"
            margin="normal"
            value={newLead.company}
            onChange={(e) =>
              setNewLead({ ...newLead, company: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Phone"
            margin="normal"
            value={newLead.phone}
            onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display Leads */}
      <Box sx={{ mt: 2 }}>
        {leads.map((lead) => (
          <Box
            key={lead.id}
            sx={{ mb: 2, p: 2, border: "1px solid #ddd", borderRadius: 1 }}
          >
            <Typography variant="h6">{lead.name}</Typography>
            <Typography>{lead.email}</Typography>
            <Typography>{lead.company}</Typography>
            <Typography>{lead.phone}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
