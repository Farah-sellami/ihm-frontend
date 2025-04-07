import axiosInstance from './axiosInstance';

const authService = {
  // Enregistrer un nouvel utilisateur
  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/register', userData, 
        {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
       }
    );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de l\'enregistrement');
    }
  },

  // Connecter un utilisateur
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Identifiants invalides');
    }
  },
// Vérifier si l'utilisateur est authentifié
isAuthenticated: () => {
  const token = localStorage.getItem('token');
  return !!token; // Retourne true si un token est présent
},

// Déconnecter l'utilisateur
logout: () => {
  localStorage.removeItem('token'); // Supprimer le token du localStorage
},
};

export default authService;
