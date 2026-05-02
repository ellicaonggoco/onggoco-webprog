import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Divider,
  IconButton,
  Tooltip,
  Container,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Search as SearchIcon,
  PersonAdd as PersonAddIcon,
  Edit as EditIcon,
  DeleteOutlined as DeleteIcon,
} from "@mui/icons-material";

const statusStyle = {
  Active: {
    bg: "rgba(52,211,153,0.1)",
    color: "#34d399",
    border: "rgba(52,211,153,0.2)",
  },
  Inactive: {
    bg: "rgba(239,68,68,0.1)",
    color: "#f87171",
    border: "rgba(239,68,68,0.2)",
  },
  Pending: {
    bg: "rgba(249,115,22,0.1)",
    color: "#f97316",
    border: "rgba(249,115,22,0.2)",
  },
};
const roleStyle = {
  Admin: {
    bg: "rgba(249,115,22,0.1)",
    color: "#f97316",
    border: "rgba(249,115,22,0.2)",
  },
  Editor: {
    bg: "rgba(34,211,238,0.1)",
    color: "#22d3ee",
    border: "rgba(34,211,238,0.2)",
  },
  Viewer: {
    bg: "rgba(71,85,105,0.2)",
    color: "#94a3b8",
    border: "rgba(71,85,105,0.3)",
  },
  Manager: {
    bg: "rgba(167,139,250,0.1)",
    color: "#a78bfa",
    border: "rgba(167,139,250,0.2)",
  },
};

const rows = [
  {
    id: 1,
    name: "Alice Reyes",
    email: "alice@example.com",
    role: "Admin",
    status: "Active",
    joined: "Jan 15, 2024",
    initials: "AR",
    avatarColor: "#f97316",
  },
  {
    id: 2,
    name: "Ben Cruz",
    email: "ben@example.com",
    role: "Editor",
    status: "Active",
    joined: "Feb 3, 2024",
    initials: "BC",
    avatarColor: "#22d3ee",
  },
  {
    id: 3,
    name: "Carla Tan",
    email: "carla@example.com",
    role: "Viewer",
    status: "Inactive",
    joined: "Mar 20, 2024",
    initials: "CT",
    avatarColor: "#a78bfa",
  },
  {
    id: 4,
    name: "Dan Lim",
    email: "dan@example.com",
    role: "Manager",
    status: "Active",
    joined: "Apr 8, 2024",
    initials: "DL",
    avatarColor: "#34d399",
  },
  {
    id: 5,
    name: "Eva Santos",
    email: "eva@example.com",
    role: "Editor",
    status: "Pending",
    joined: "Apr 22, 2024",
    initials: "ES",
    avatarColor: "#f472b6",
  },
  {
    id: 6,
    name: "Felix Ong",
    email: "felix@example.com",
    role: "Viewer",
    status: "Active",
    joined: "May 10, 2024",
    initials: "FO",
    avatarColor: "#818cf8",
  },
  {
    id: 7,
    name: "Grace Go",
    email: "grace@example.com",
    role: "Editor",
    status: "Active",
    joined: "Jun 1, 2024",
    initials: "GG",
    avatarColor: "#2dd4bf",
  },
  {
    id: 8,
    name: "Henry Sy",
    email: "henry@example.com",
    role: "Viewer",
    status: "Inactive",
    joined: "Jun 18, 2024",
    initials: "HS",
    avatarColor: "#fb923c",
  },
  {
    id: 9,
    name: "Iris Dela Cruz",
    email: "iris@example.com",
    role: "Admin",
    status: "Active",
    joined: "Jul 5, 2024",
    initials: "ID",
    avatarColor: "#06b6d4",
  },
  {
    id: 10,
    name: "Jake Ramos",
    email: "jake@example.com",
    role: "Manager",
    status: "Pending",
    joined: "Jul 25, 2024",
    initials: "JR",
    avatarColor: "#84cc16",
  },
];

const columns = [
  {
    field: "name",
    headerName: "User",
    flex: 1.4,
    minWidth: 200,
    renderCell: (params) => (
      <Box display="flex" alignItems="center" gap={1.5} height="100%">
        <Avatar
          sx={{
            bgcolor: `${params.row.avatarColor}20`,
            color: params.row.avatarColor,
            width: 36,
            height: 36,
            fontSize: "0.75rem",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            border: `1px solid ${params.row.avatarColor}40`,
          }}
        >
          {params.row.initials}
        </Avatar>
        <Box>
          <Typography
            sx={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#e2e8f0",
              lineHeight: 1.3,
            }}
          >
            {params.value}
          </Typography>
          <Typography
            sx={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.7rem",
              color: "#475569",
            }}
          >
            {params.row.email}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    field: "role",
    headerName: "Role",
    flex: 0.8,
    minWidth: 100,
    renderCell: (params) => {
      const s = roleStyle[params.value] || {};
      return (
        <Chip
          label={params.value}
          size="small"
          sx={{
            bgcolor: s.bg,
            color: s.color,
            border: `1px solid ${s.border}`,
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "0.7rem",
            height: 24,
            borderRadius: "6px",
          }}
        />
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    flex: 0.8,
    minWidth: 100,
    renderCell: (params) => {
      const s = statusStyle[params.value] || {};
      return (
        <Chip
          label={params.value}
          size="small"
          sx={{
            bgcolor: s.bg,
            color: s.color,
            border: `1px solid ${s.border}`,
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "0.7rem",
            height: 24,
            borderRadius: "6px",
          }}
        />
      );
    },
  },
  {
    field: "joined",
    headerName: "Date Joined",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <Typography
        sx={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.8rem",
          color: "#475569",
        }}
      >
        {params.value}
      </Typography>
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 0.6,
    minWidth: 80,
    sortable: false,
    filterable: false,
    renderCell: () => (
      <Box display="flex" alignItems="center" gap={0.5}>
        <Tooltip title="Edit">
          <IconButton
            size="small"
            sx={{ color: "#475569", "&:hover": { color: "#f97316" } }}
          >
            <EditIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            size="small"
            sx={{ color: "#475569", "&:hover": { color: "#f87171" } }}
          >
            <DeleteIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const filtered = rows.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.role.toLowerCase().includes(search.toLowerCase()),
  );

  const counts = {
    active: rows.filter((r) => r.status === "Active").length,
    inactive: rows.filter((r) => r.status === "Inactive").length,
    pending: rows.filter((r) => r.status === "Pending").length,
  };

  return (
    <Container
      maxWidth={false}
      sx={{ py: 4, px: { xs: 2, md: 4 }, width: "100%" }}
    >
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Typography
          sx={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: { xs: "2rem", md: "3rem" },
            color: "#f1f5f9",
            mb: 1,
          }}
        >
          Users
        </Typography>
        <Typography
          sx={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1.5rem",
            color: "#f97316",
            mb: 2,
          }}
        >
          Manage user accounts and permissions
        </Typography>
      </Box>

      {/* Add User button - Centered */}
      <Box display="flex" justifyContent="center" mb={4}>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          sx={{
            bgcolor: "#f97316",
            color: "#000",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            textTransform: "none",
            borderRadius: "12px",
            px: 3,
            py: 1,
            fontSize: "1rem",
            "&:hover": {
              bgcolor: "#ea7008",
              boxShadow: "0 0 20px rgba(249,115,22,0.3)",
            },
            transition: "all 0.2s",
          }}
        >
          Add User
        </Button>
      </Box>

      {/* Status summary chips - Centered horizontal row */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
          mb: 4,
        }}
      >
        {[
          {
            label: `All Users: ${rows.length}`,
            bg: "rgba(255,255,255,0.05)",
            color: "#94a3b8",
            border: "rgba(255,255,255,0.08)",
          },
          {
            label: `Active: ${counts.active}`,
            bg: "rgba(52,211,153,0.08)",
            color: "#34d399",
            border: "rgba(52,211,153,0.2)",
          },
          {
            label: `Inactive: ${counts.inactive}`,
            bg: "rgba(239,68,68,0.08)",
            color: "#f87171",
            border: "rgba(239,68,68,0.2)",
          },
          {
            label: `Pending: ${counts.pending}`,
            bg: "rgba(249,115,22,0.08)",
            color: "#f97316",
            border: "rgba(249,115,22,0.2)",
          },
        ].map((c) => (
          <Chip
            key={c.label}
            label={c.label}
            sx={{
              bgcolor: c.bg,
              color: c.color,
              border: `1px solid ${c.border}`,
              fontFamily: "'Syne', sans-serif",
              fontWeight: 600,
              fontSize: "0.8rem",
              borderRadius: "10px",
              py: 2,
            }}
          />
        ))}
      </Box>

      {/* Table card */}
      <Card
        elevation={0}
        sx={{
          borderRadius: "20px",
          bgcolor: "#161616",
          border: "1px solid rgba(255,255,255,0.06)",
          width: "100%",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Card header with search */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            flexWrap="wrap"
            gap={2}
          >
            <Typography
              sx={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "1.2rem",
                color: "#f1f5f9",
              }}
            >
              User List
            </Typography>
            <TextField
              size="small"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#475569", fontSize: 18 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: 260,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  fontSize: "0.85rem",
                  bgcolor: "#1e1e1e",
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#94a3b8",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
                  "&:hover fieldset": { borderColor: "rgba(249,115,22,0.3)" },
                  "&.Mui-focused fieldset": { borderColor: "#f97316" },
                },
                "& input::placeholder": { color: "#475569" },
              }}
            />
          </Box>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 2 }} />

          <DataGrid
            rows={filtered}
            columns={columns}
            initialState={{ pagination: { paginationModel: { pageSize: 7 } } }}
            pageSizeOptions={[7, 10]}
            disableRowSelectionOnClick
            autoHeight
            sx={{
              border: "none",
              color: "#94a3b8",
              fontFamily: "'DM Sans', sans-serif",
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "rgba(255,255,255,0.03)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "10px",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "0.7rem",
                color: "#475569",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              },
              "& .MuiDataGrid-columnSeparator": { display: "none" },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                "&:focus": { outline: "none" },
              },
              "& .MuiDataGrid-row:hover": { bgcolor: "rgba(249,115,22,0.04)" },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "1px solid rgba(255,255,255,0.06)",
              },
              "& .MuiTablePagination-root": {
                color: "#475569",
                fontFamily: "'DM Sans', sans-serif",
              },
              "& .MuiTablePagination-actions .MuiIconButton-root": {
                color: "#475569",
                "&:hover": { color: "#f97316" },
              },
              "& .MuiDataGrid-selectedRowCount": { color: "#475569" },
            }}
          />
        </CardContent>
      </Card>
    </Container>
  );
}
