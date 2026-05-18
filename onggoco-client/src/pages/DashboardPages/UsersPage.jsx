import { useState, useEffect } from "react";
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
  IconButton,
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
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/UserService";

// Helper: generate avatar color based on role (accepts lowercase)
const getAvatarColor = (role) => {
  const colors = {
    admin: "#f97316",
    editor: "#22d3ee",
    viewer: "#a78bfa",
    manager: "#34d399",
  };
  return colors[role?.toLowerCase()] || "#94a3b8";
};

const formatJoinedDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const roleStyle = {
  admin: {
    bg: "rgba(249,115,22,0.1)",
    color: "#f97316",
    border: "rgba(249,115,22,0.2)",
  },
  editor: {
    bg: "rgba(34,211,238,0.1)",
    color: "#22d3ee",
    border: "rgba(34,211,238,0.2)",
  },
  viewer: {
    bg: "rgba(71,85,105,0.2)",
    color: "#94a3b8",
    border: "rgba(71,85,105,0.3)",
  },
};

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
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
    type: "",
    gender: "",
    age: "",
    contactNumber: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data } = await fetchUsers();
      const usersArray = Array.isArray(data) ? data : data.users || [];
      setUsers(usersArray);
    } catch (error) {
      console.error("Error loading users:", error);
      setSnackbar({
        open: true,
        message: "Failed to load users",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.username) errors.username = "Username is required";
    else if (formData.username.includes(" "))
      errors.username = "No spaces allowed";
    if (!editingUser && !formData.password)
      errors.password = "Password is required";
    else if (!editingUser && formData.password.length < 8)
      errors.password = "Min 8 characters";
    if (!formData.type) errors.type = "Role is required";
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

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      type: "",
      gender: "",
      age: "",
      contactNumber: "",
    });
    setFormErrors({});
    setOpenDialog(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      username: user.username || "",
      password: "",
      type: (user.type || "").toLowerCase(), // force lowercase for edit
      gender: user.gender || "",
      age: user.age || "",
      contactNumber: user.contactNumber || "",
    });
    setFormErrors({});
    setOpenDialog(true);
  };

  const handleSaveUser = async () => {
    if (!validateForm()) return;

    try {
      // Force role to lowercase
      const payload = {
        ...formData,
        type: formData.type.toLowerCase(),
      };
      if (!payload.password) delete payload.password;

      if (editingUser) {
        await updateUser(editingUser._id, payload);
        setSnackbar({
          open: true,
          message: "User updated successfully",
          severity: "success",
        });
      } else {
        await createUser(payload);
        setSnackbar({
          open: true,
          message: "User added successfully",
          severity: "success",
        });
      }
      setOpenDialog(false);
      loadUsers();
    } catch (error) {
      console.error("Error saving user:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Save failed",
        severity: "error",
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        loadUsers();
        setSnackbar({
          open: true,
          message: "User deleted",
          severity: "success",
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Delete failed",
          severity: "error",
        });
      }
    }
  };

  const rows = users.map((user) => {
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    const initials = fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    return {
      id: user._id,
      _id: user._id,
      name: fullName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      type: (user.type || "viewer").toLowerCase(), // display lowercase for consistency
      gender: user.gender,
      joined: formatJoinedDate(user.createdAt),
      initials,
      avatarColor: getAvatarColor(user.type),
      age: user.age,
      contactNumber: user.contactNumber,
    };
  });

  const filteredRows = rows.filter((user) => {
    const searchMatch =
      search === "" ||
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.username?.toLowerCase().includes(search.toLowerCase());
    return (
      searchMatch &&
      (roleFilter === "" || user.type === roleFilter.toLowerCase()) &&
      (genderFilter === "" || user.gender === genderFilter)
    );
  });

  const columns = [
    {
      field: "name",
      headerName: "User",
      flex: 1.4,
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
            <Typography sx={{ fontWeight: 600, color: "#e2e8f0" }}>
              {params.value}
            </Typography>
            <Typography sx={{ fontSize: "0.7rem", color: "#475569" }}>
              {params.row.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "type",
      headerName: "Role",
      flex: 0.8,
      renderCell: (params) => {
        const role = params.value;
        const s = roleStyle[role] || roleStyle.viewer;
        // Capitalize first letter for display
        const displayRole = role.charAt(0).toUpperCase() + role.slice(1);
        return (
          <Chip
            label={displayRole}
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
    { field: "gender", headerName: "Gender", flex: 0.6 },
    { field: "joined", headerName: "Date Joined", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.6,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleOpenEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteUser(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth={false} sx={{ py: 5 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" fontWeight="800" color="#f1f5f9">
          Users
        </Typography>
        <Typography color="#475569">
          Manage user accounts and permissions
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" mb={3}>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={handleOpenAdd}
          sx={{ bgcolor: "#f97316", color: "#000" }}
        >
          Add User
        </Button>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={3} gap={2}>
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
          sx={{ width: 320 }}
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
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Role</InputLabel>
              <Select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                label="Role"
              >
                <MenuItem value="">All Roles</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="editor">Editor</MenuItem>
                <MenuItem value="viewer">Viewer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Gender</InputLabel>
              <Select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                label="Gender"
              >
                <MenuItem value="">All Genders</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      )}
      <Card sx={{ bgcolor: "#161616", borderRadius: "20px" }}>
        <CardContent>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            loading={loading}
            autoHeight
            pageSizeOptions={[10, 25, 50]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            sx={{ border: "none" }}
          />
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
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
          }}
        >
          {editingUser ? "Edit User" : "Add New User"}
          <IconButton
            onClick={() => setOpenDialog(false)}
            sx={{ position: "absolute", right: 8, top: 8, color: "#475569" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2.5} sx={{ mt: 0 }}>
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
                helperText={
                  formErrors.password ||
                  (editingUser
                    ? "Leave blank to keep current"
                    : "Min 8 characters")
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={!!formErrors.type}>
                <InputLabel>Role</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  label="Role"
                >
                  <MenuItem value="">Select Role</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="editor">Editor</MenuItem>
                  <MenuItem value="viewer">Viewer</MenuItem>
                </Select>
                {formErrors.type && (
                  <Typography sx={{ color: "#f44336", fontSize: "0.75rem" }}>
                    {formErrors.type}
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
                  <Typography sx={{ color: "#f44336", fontSize: "0.75rem" }}>
                    {formErrors.gender}
                  </Typography>
                )}
              </FormControl>
            </Grid>
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
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{ borderTop: "1px solid rgba(255,255,255,0.1)", p: 3 }}
        >
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{ color: "#475569" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveUser}
            variant="contained"
            sx={{ bgcolor: "#f97316", color: "#000" }}
          >
            Save
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
