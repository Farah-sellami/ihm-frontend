import axios from "axios";
const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000/api";


const axiosInstance = axios.create({
  baseURL: API_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajouter un intercepteur pour inclure le token JWT dans les requêtes
axiosInstance.interceptors.request.use(
    (config) => {
      try {
      const token = localStorage.getItem("token"); // Récupérer le token stocké
      console.log("Token récupéré :", token);
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`; // Ajouter le token à l'en-tête
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du token :", error);
    }
    return config;
  },
  (error) => {
    // Gestion des erreurs lors de la configuration de la requête
    console.error("Erreur dans l'intercepteur des requêtes :", error);
    return Promise.reject(error);
  }
);


// Ajouter un intercepteur pour gérer les erreurs de réponse
axiosInstance.interceptors.response.use(
  (response) => response, // Retourner directement la réponse si elle est valide
  (error) => {
    console.error("Erreur dans la réponse de l'API :", error);
    if (error.response && error.response.status === 401) {
      // Gestion du cas où le token est expiré ou invalide
      console.warn("Token expiré ou non valide. Redirection vers la page de connexion...");
      // Optionnel : rediriger l'utilisateur vers une page de connexion
      window.location.href = "/login";
    }
    return Promise.reject(error); // Propager l'erreur pour un traitement ultérieur
  }
);

export default axiosInstance;