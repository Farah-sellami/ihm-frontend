import axiosInstance from './axiosInstance';

const posteService = {
  // Récupérer tous les postes avec leurs sous-catégories associées
  getAllPostes: async () => {
    const response = await axiosInstance.get('/postes');
    return response.data;
  },

  // Récupérer un poste spécifique par ID avec sa sous-catégorie associée
  getPosteById: async (id) => {
    const response = await axiosInstance.get(`/postes/${id}`);
    return response.data;
  },

  // Créer un nouveau poste
  createPoste: async (posteData) => {
    const response = await axiosInstance.post('/postes', posteData);
    return response.data;
  },

  // Mettre à jour un poste existant
  updatePoste: async (id, updatedData) => {
    const response = await axiosInstance.put(`/postes/${id}`, updatedData);
    return response.data;
  },

  // Supprimer un poste
  deletePoste: async (id) => {
    const response = await axiosInstance.delete(`/postes/${id}`);
    return response.data;
  }
};

export default posteService;
