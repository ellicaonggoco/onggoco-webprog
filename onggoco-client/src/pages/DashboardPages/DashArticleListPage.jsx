import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Switch,
  Stack,
  Alert,
  Snackbar,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, Edit, Delete } from "@mui/icons-material";
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default function DashArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    paragraphs: [],
    preview: "",
    image: "",
    imageFile: null,
    imagePreview: null,
    status: "active",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Helper to ensure every article has paragraphs array and image string
  const normalizeArticle = (article) => ({
    ...article,
    paragraphs: Array.isArray(article.paragraphs) ? article.paragraphs : [],
    image: article.image || "",
  });

  const loadArticles = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/articles");
      const normalized = data.map(normalizeArticle);
      setArticles(normalized);
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Failed to load articles",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleOpenAdd = () => {
    setEditingArticle(null);
    setFormData({
      slug: "",
      title: "",
      paragraphs: [],
      preview: "",
      image: "",
      imageFile: null,
      imagePreview: null,
      status: "active",
    });
    setOpenDialog(true);
  };

  const handleOpenEdit = (article) => {
    setEditingArticle(article);
    setFormData({
      slug: article.slug,
      title: article.title,
      paragraphs: article.paragraphs || [],
      preview: article.preview || "",
      image: article.image || "",
      imageFile: null,
      imagePreview: null,
      status: article.status || "active",
    });
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      let config = {};
      let dataToSend;
      if (formData.imageFile) {
        dataToSend = new FormData();
        dataToSend.append("image", formData.imageFile);
        dataToSend.append("slug", formData.slug);
        dataToSend.append("title", formData.title);
        dataToSend.append("preview", formData.preview);
        dataToSend.append("paragraphs", JSON.stringify(formData.paragraphs));
        dataToSend.append("status", formData.status);
        config.headers = { "Content-Type": "multipart/form-data" };
      } else {
        dataToSend = { ...formData };
        delete dataToSend.imageFile;
        delete dataToSend.imagePreview;
      }

      if (editingArticle) {
        await API.put(`/articles/${editingArticle._id}`, dataToSend, config);
        setSnackbar({
          open: true,
          message: "Article updated",
          severity: "success",
        });
      } else {
        await API.post("/articles", dataToSend, config);
        setSnackbar({
          open: true,
          message: "Article created",
          severity: "success",
        });
      }
      setOpenDialog(false);
      await loadArticles(); // refresh the table
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Error saving",
        severity: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await API.delete(`/articles/${id}`);
        await loadArticles();
        setSnackbar({
          open: true,
          message: "Article deleted",
          severity: "success",
        });
      } catch (err) {
        setSnackbar({
          open: true,
          message: "Delete failed",
          severity: "error",
        });
      }
    }
  };

  const toggleStatus = async (article) => {
    const newStatus = article.status === "active" ? "disabled" : "active";
    await API.put(`/articles/${article._id}`, {
      ...article,
      status: newStatus,
    });
    await loadArticles();
  };

  const columns = [
    { field: "slug", headerName: "Slug", flex: 1 },
    { field: "title", headerName: "Title", flex: 1.5 },
    {
      field: "paragraphs",
      headerName: "Paragraphs",
      flex: 0.5,
      valueGetter: (params) => {
        const paragraphs = params?.row?.paragraphs;
        return Array.isArray(paragraphs) ? paragraphs.length : 0;
      },
    },
    {
      field: "image",
      headerName: "Image",
      flex: 0.8,
      renderCell: (params) =>
        params.value ? (
          <img
            src={params.value}
            alt="thumb"
            style={{
              width: 40,
              height: 40,
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        ) : (
          <Box
            sx={{ width: 40, height: 40, bgcolor: "#333", borderRadius: 1 }}
          />
        ),
    },
    { field: "preview", headerName: "Preview", flex: 2 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "active" ? "success" : "default"}
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleOpenEdit(params.row)}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <Delete fontSize="small" />
          </IconButton>
          <Switch
            checked={params.row.status === "active"}
            onChange={() => toggleStatus(params.row)}
            size="small"
          />
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Manage Articles
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpenAdd}>
          New Article
        </Button>
      </Stack>
      <Card>
        <CardContent>
          <DataGrid
            rows={articles}
            columns={columns}
            getRowId={(row) => row._id}
            loading={loading}
            autoHeight
            pageSizeOptions={[10, 25, 50]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          />
        </CardContent>
      </Card>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingArticle ? "Edit Article" : "Create Article"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Slug (unique identifier)"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Image URL (optional)"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            margin="normal"
          />
          <Button variant="outlined" component="label" sx={{ mt: 1, mb: 1 }}>
            Or Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFormData({ ...formData, imageFile: file, image: "" });
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFormData((prev) => ({
                      ...prev,
                      imagePreview: reader.result,
                    }));
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </Button>
          {formData.imagePreview && (
            <img
              src={formData.imagePreview}
              alt="preview"
              style={{ width: 100, borderRadius: 4, marginBottom: 8 }}
            />
          )}
          <TextField
            fullWidth
            label="Preview (short description)"
            value={formData.preview}
            onChange={(e) =>
              setFormData({ ...formData, preview: e.target.value })
            }
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Paragraphs (comma separated)"
            value={formData.paragraphs.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                paragraphs: e.target.value
                  .split(",")
                  .map((p) => p.trim())
                  .filter((p) => p !== ""),
              })
            }
            margin="normal"
            helperText="Separate each paragraph with a comma"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
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
    </Box>
  );
}
