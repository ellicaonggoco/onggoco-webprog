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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Search as SearchIcon,
  PersonAdd as PersonAddIcon,
  Edit as EditIcon,
  DeleteOutlined as DeleteIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
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

const initialUserData = [
  {
    id: 1,
    firstName: "Herzsel",
    lastName: "Corpuz",
    name: "Herzsel Corpuz",
    username: "herzsel.corpuz",
    email: "herzsel@example.com",
    role: "Admin",
    gender: "Male",
    status: "Active",
    joined: "Jan 15, 2024",
    initials: "HC",
    avatarColor: "#f97316",
    age: 28,
    contactNumber: "09123456789",
  },
  {
    id: 2,
    firstName: "Rafael",
    lastName: "Datul",
    name: "Rafael Datul",
    username: "rafael.datul",
    email: "rafael@example.com",
    role: "Editor",
    gender: "Male",
    status: "Active",
    joined: "Feb 3, 2024",
    initials: "RD",
    avatarColor: "#22d3ee",
    age: 32,
    contactNumber: "09234567890",
  },
  {
    id: 3,
    firstName: "Neil Carlo",
    lastName: "Onggoco",
    name: "Neil Carlo Onggoco",
    username: "neilcarlo.onggoco",
    email: "neilcarlo@example.com",
    role: "Viewer",
    gender: "Male",
    status: "Inactive",
    joined: "Mar 20, 2024",
    initials: "CT",
    avatarColor: "#a78bfa",
    age: 25,
    contactNumber: "09345678901",
  },
  {
    id: 4,
    firstName: "Chester Chris",
    lastName: "Nolasco",
    name: "Chester Chris Nolasco",
    username: "chesterchris.nolasco",
    email: "chesterchris@example.com",
    role: "Manager",
    gender: "Male",
    status: "Active",
    joined: "Apr 8, 2024",
    initials: "CC",
    avatarColor: "#34d399",
    age: 35,
    contactNumber: "09456789012",
  },
  {
    id: 5,
    firstName: "Eva",
    lastName: "Santos",
    name: "Eva Santos",
    username: "eva.santos",
    email: "eva@example.com",
    role: "Editor",
    gender: "Female",
    status: "Pending",
    joined: "Apr 22, 2024",
    initials: "ES",
    avatarColor: "#f472b6",
    age: 27,
    contactNumber: "09567890123",
  },
  {
    id: 6,
    firstName: "Felix",
    lastName: "Ong",
    name: "Felix Ong",
    username: "felix.ong",
    email: "felix@example.com",
    role: "Viewer",
    gender: "Male",
    status: "Active",
    joined: "May 10, 2024",
    initials: "FO",
    avatarColor: "#818cf8",
    age: 29,
    contactNumber: "09678901234",
  },
  {
    id: 7,
    firstName: "Grace",
    lastName: "Go",
    name: "Grace Go",
    username: "grace.go",
    email: "grace@example.com",
    role: "Editor",
    gender: "Female",
    status: "Active",
    joined: "Jun 1, 2024",
    initials: "GG",
    avatarColor: "#2dd4bf",
    age: 26,
    contactNumber: "09789012345",
  },
  {
    id: 8,
    firstName: "Henry",
    lastName: "Sy",
    name: "Henry Sy",
    username: "henry.sy",
    email: "henry@example.com",
    role: "Viewer",
    gender: "Male",
    status: "Inactive",
    joined: "Jun 18, 2024",
    initials: "HS",
    avatarColor: "#fb923c",
    age: 40,
    contactNumber: "09890123456",
  },
  {
    id: 9,
    firstName: "Iris",
    lastName: "Dela Cruz",
    name: "Iris Dela Cruz",
    username: "iris.delacruz",
    email: "iris@example.com",
    role: "Admin",
    gender: "Female",
    status: "Active",
    joined: "Jul 5, 2024",
    initials: "ID",
    avatarColor: "#06b6d4",
    age: 31,
    contactNumber: "09901234567",
  },
  {
    id: 10,
    firstName: "Jake",
    lastName: "Ramos",
    name: "Jake Ramos",
    username: "jake.ramos",
    email: "jake@example.com",
    role: "Manager",
    gender: "Male",
    status: "Pending",
    joined: "Jul 25, 2024",
    initials: "JR",
    avatarColor: "#84cc16",
    age: 33,
    contactNumber: "09123456780",
  },
];

const columns = [
  {
    field: "name",
    headerName: "User",
    flex: 1.4,
    minWidth: 200,
    renderCell: (params) => (
      <Box display="flex" alignItems="center" gap={1.5}>
        <Avatar
          sx={{
            bgcolor: `${params.row.avatarColor}20`,
            color: params.row.avatarColor,
            width: 36,
            height: 36,
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
          }}
        />
      );
    },
  },
  {
    field: "gender",
    headerName: "Gender",
    flex: 0.6,
    minWidth: 80,
    renderCell: (params) => (
      <Typography sx={{ fontSize: "0.8rem", color: "#94a3b8" }}>
        {params.value}
      </Typography>
    ),
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
    renderCell: (params) => <Typography>{params.value}</Typography>,
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 0.6,
    minWidth: 80,
    sortable: false,
    renderCell: () => (
      <Box>
        <IconButton size="small">
          <EditIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <IconButton size="small">
          <DeleteIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    ),
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUserData);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    role: "",
    gender: "",
    age: "",
    contactNumber: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.username) errors.username = "Username is required";
    else if (formData.username.includes(" "))
      errors.username = "No spaces allowed";
    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 8) errors.password = "Min 8 characters";
    if (!formData.role) errors.role = "Role is required";
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.age) errors.age = "Age is required";
    else if (isNaN(formData.age) || formData.age < 0 || formData.age > 150)
      errors.age = "Numbers only";
    if (!formData.contactNumber)
      errors.contactNumber = "Contact number is required";
    else if (!/^\d{11}$/.test(formData.contactNumber))
      errors.contactNumber = "Exactly 11 digits";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleAddUser = () => {
    if (validateForm()) {
      const newUser = {
        id: users.length + 1,
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        username: formData.username,
        email: formData.email,
        role: formData.role,
        gender: formData.gender,
        status: "Active",
        joined: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        initials: `${formData.firstName[0]}${formData.lastName[0]}`,
        avatarColor: ["#f97316", "#22d3ee", "#a78bfa", "#34d399", "#f472b6"][
          Math.floor(Math.random() * 5)
        ],
        age: parseInt(formData.age),
        contactNumber: formData.contactNumber,
      };
      setUsers([...users, newUser]);
      setSnackbar({
        open: true,
        message: "User added successfully!",
        severity: "success",
      });
      setOpenDialog(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        role: "",
        gender: "",
        age: "",
        contactNumber: "",
      });
      setFormErrors({});
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchMatch =
      search === "" ||
      user.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.username?.toLowerCase().includes(search.toLowerCase());
    return (
      searchMatch &&
      (roleFilter === "" || user.role === roleFilter) &&
      (genderFilter === "" || user.gender === genderFilter) &&
      (statusFilter === "" || user.status === statusFilter)
    );
  });

  const counts = {
    active: users.filter((r) => r.status === "Active").length,
    inactive: users.filter((r) => r.status === "Inactive").length,
    pending: users.filter((r) => r.status === "Pending").length,
  };

  return (
    <Container maxWidth={false} sx={{ py: 5, px: { xs: 3, md: 5 } }}>
      <Box textAlign="center" mb={4}>
        <Typography
          sx={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: { xs: "2rem", md: "3rem" },
            color: "#f1f5f9",
          }}
        >
          Users
        </Typography>
        <Typography
          sx={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem",
            color: "#475569",
          }}
        >
          Manage user accounts and permissions
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" mb={3}>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{
            bgcolor: "#f97316",
            color: "#000",
            borderRadius: "12px",
            px: 3,
            py: 1,
          }}
        >
          Add User
        </Button>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
        gap={2}
      >
        <TextField
          size="small"
          placeholder="Search by name, email, or username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: 320,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              bgcolor: "#1e1e1e",
            },
          }}
        />
        <Button
          startIcon={<FilterIcon />}
          onClick={() => setShowFilters(!showFilters)}
          sx={{ color: "#f97316" }}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </Box>

      {showFilters && (
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Role</InputLabel>
              <Select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                label="Role"
                sx={{ bgcolor: "#1e1e1e", borderRadius: "12px" }}
              >
                <MenuItem value="">All Roles</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Editor">Editor</MenuItem>
                <MenuItem value="Viewer">Viewer</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Gender</InputLabel>
              <Select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                label="Gender"
                sx={{ bgcolor: "#1e1e1e", borderRadius: "12px" }}
              >
                <MenuItem value="">All Genders</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
                sx={{ bgcolor: "#1e1e1e", borderRadius: "12px" }}
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      )}

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
          { label: `All Users: ${users.length}`, color: "#94a3b8" },
          { label: `Active: ${counts.active}`, color: "#34d399" },
          { label: `Inactive: ${counts.inactive}`, color: "#f87171" },
          { label: `Pending: ${counts.pending}`, color: "#f97316" },
        ].map((c) => (
          <Chip
            key={c.label}
            label={c.label}
            sx={{
              bgcolor: `${c.color}15`,
              color: c.color,
              border: `1px solid ${c.color}30`,
              fontWeight: 600,
            }}
          />
        ))}
      </Box>

      <Card
        sx={{
          borderRadius: "20px",
          bgcolor: "#161616",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <CardContent>
          <DataGrid
            rows={filteredUsers}
            columns={columns}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            pageSizeOptions={[10, 25, 50]}
            autoHeight
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "rgba(255,255,255,0.03)",
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { bgcolor: "#161616", borderRadius: "20px" } }}
      >
        <DialogTitle
          sx={{
            color: "#f1f5f9",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            pb: 2,
          }}
        >
          Add New User
          <IconButton
            onClick={() => setOpenDialog(false)}
            sx={{ position: "absolute", right: 8, top: 8, color: "#475569" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2.5}>
            {/* Row 1: First Name + Last Name */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                error={!!formErrors.firstName}
                helperText={formErrors.firstName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                error={!!formErrors.lastName}
                helperText={formErrors.lastName}
              />
            </Grid>

            {/* Row 2: Email */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
            </Grid>

            {/* Row 3: Username + Password */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="username"
                label="Username"
                value={formData.username}
                onChange={handleInputChange}
                error={!!formErrors.username}
                helperText={formErrors.username || "No spaces allowed"}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                error={!!formErrors.password}
                helperText={formErrors.password || "Min 8 characters"}
              />
            </Grid>

            {/* Row 4: Role + Gender */}
            <Grid item xs={6}>
              <FormControl fullWidth error={!!formErrors.role}>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  label="Role"
                >
                  <MenuItem value="">Select Role</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Editor">Editor</MenuItem>
                  <MenuItem value="Viewer">Viewer</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                </Select>
                {formErrors.role && (
                  <Typography
                    sx={{ color: "#f44336", fontSize: "0.75rem", mt: 0.5 }}
                  >
                    {formErrors.role}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={!!formErrors.gender}>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  label="Gender"
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
                {formErrors.gender && (
                  <Typography
                    sx={{ color: "#f44336", fontSize: "0.75rem", mt: 0.5 }}
                  >
                    {formErrors.gender}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {/* Row 5: Age + Contact Number */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="age"
                label="Age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
                error={!!formErrors.age}
                helperText={formErrors.age || "Numbers only"}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="contactNumber"
                label="Contact Number"
                value={formData.contactNumber}
                onChange={handleInputChange}
                error={!!formErrors.contactNumber}
                helperText={formErrors.contactNumber || "Exactly 11 digits"}
              />
            </Grid>

            {/* Row 6: User Status */}
            <Grid item xs={12}>
              <Box
                sx={{
                  bgcolor: "rgba(52,211,153,0.1)",
                  p: 2,
                  borderRadius: "12px",
                  border: "1px solid rgba(52,211,153,0.3)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Chip
                    label="Active"
                    size="medium"
                    sx={{
                      bgcolor: "#34d399",
                      color: "#000",
                      fontWeight: "bold",
                      px: 1,
                    }}
                  />
                  <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                    User status will be set to{" "}
                    <strong style={{ color: "#34d399" }}>Active</strong> by
                    default
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{ p: 3, borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{ color: "#475569" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddUser}
            variant="contained"
            sx={{
              bgcolor: "#f97316",
              color: "#000",
              "&:hover": { bgcolor: "#ea7008" },
            }}
          >
            Add User
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}
