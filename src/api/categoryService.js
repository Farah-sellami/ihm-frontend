import axiosInstance from './axiosInstance';

const categoryService = {
  // Récupérer toutes les catégories
  getAllCategories: async () => {
    const response = await axiosInstance.get('/categories');
    return response.data;
  },

  // Récupérer une catégorie par ID
  getCategoryById: async (id) => {
    const response = await axiosInstance.get(`/categories/${id}`);
    return response.data;
  },

  // Créer une nouvelle catégorie
  createCategory: async (categoryData) => {
    const response = await axiosInstance.post('/categories', categoryData);
    return response.data;
  },

  // Mettre à jour une catégorie existante
  updateCategory: async (id, updatedData) => {
    const response = await axiosInstance.put(`/categories/${id}`, updatedData);
    return response.data;
  },

  // Supprimer une catégorie
  deleteCategory: async (id) => {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
  }
};

export default categoryService;
