import { useEffect, useState } from "react";
import { Pagination, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import categoryService from "../../api/categoryService";
import { ExpandLess, ExpandMore, Edit, Delete } from "@mui/icons-material";
import { PrimaryButton } from "../../router";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; 
import { Button } from '@mui/material';


export const CategoryList  = () => {
  const [allCategories, setAllCategories] = useState([]); // toutes les catégories
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState({}); // pour gérer l'affichage des sous-catégories
  const [subcategories, setSubcategories] = useState({}); // stocke les sous-catégories chargées
  const [openModal, setOpenModal] = useState(false); // Etat pour gérer l'ouverture du modal
  const [newCategoryTitle, setNewCategoryTitle] = useState(""); // Etat pour le titre de la nouvelle catégorie
  const itemsPerPage = 5;
  const navigate = useNavigate();  // Créez une instance de useNavigate

  const handleCreateNewCategory = () => {
    setOpenModal(true);  // Ouvre le modal pour créer une nouvelle catégorie
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Ferme le modal
    setNewCategoryTitle(""); // Réinitialise le titre
  };

  const handleSaveCategory = async () => {
    if (!newCategoryTitle.trim()) {
      alert("Le titre ne peut pas être vide.");
      return;
    }
  
    try {
      const newCategory = { titre: newCategoryTitle };
      await categoryService.createCategory(newCategory);
  
      // Recharge les catégories après ajout
      const updatedCategories = await categoryService.getAllCategories();
      setAllCategories(updatedCategories);
  
      // Fermer le modal et réinitialiser le champ
      setOpenModal(false);
      setNewCategoryTitle("");
    } catch (error) {
      console.error("Erreur lors de la création de la catégorie :", error);
      alert("Une erreur est survenue lors de la création de la catégorie.");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setAllCategories(data);
      } catch (error) {
        console.error("Erreur de chargement :", error);
      }
    };

    fetchCategories();
  }, []);

  // 🔎 Appliquer le filtre
  const filteredCategories = allCategories.filter((cat) =>
    cat.titre.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Pagination côté client
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const toggleExpand = async (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    // Charger les sous-catégories si ce n'est pas encore fait
    if (!subcategories[id]) {
      try {
        const data = await categoryService.getSubcategoriesByCategoryId(id);
        setSubcategories((prev) => ({
          ...prev,
          [id]: data.sous_categories,
        }));
      } catch (error) {
        console.error("Erreur lors du chargement des sous-catégories :", error);
      }
    }
  };

  const handleEdit = (id) => {
    // Logique pour éditer une catégorie, par exemple, redirection vers une page de modification

    console.log("Éditer catégorie ID:", id);
  };

  const handleDelete = (id) => {
    // Logique pour supprimer une catégorie
    console.log("Supprimer catégorie ID:", id);
  };

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-6xl mt-32 mb-10 shadow-s1 p-8 rounded-lg bg-white">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Categories list
        </h1>
        {/* Bouton Create New */}
        <div className="mb-4 flex justify-between items-center">
          <Button 
            className="bg-green-800 text-white px-6 py-2 rounded-md"
            onClick={handleCreateNewCategory}
          >
            Create new
          </Button>
        </div>

        {/* Barre de recherche */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by title..."
            className="border px-4 py-2 rounded-md w-full"
          />
        </div>

        {/* Tableau */}
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-[600px] w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Sub-categories</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((cat, index) => (
                  <>
                    <tr key={cat.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-6 py-4">{cat.titre}</td>
                      <td className="px-6 py-4">
                        <button
                          className="text-black-600 hover:underline flex items-center gap-1"
                          onClick={() => toggleExpand(cat.id)}
                        >
                          {expanded[cat.id] ? (
                            <>
                              Hide <VisibilityOff fontSize="small" />
                            </>
                          ) : (
                            <>
                              Show <Visibility fontSize="small" />
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {/* Icônes d'action */}
                        <IconButton onClick={() => handleEdit(cat.id)}
                           sx={{ 
                            color: 'orange', 
                            '&:hover': { color: 'darkorange' }
                          }}>
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(cat.id)}
                           sx={{ 
                            color: 'red', 
                            '&:hover': { color: 'darkred' }
                          }}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </td>
                    </tr>

                    {expanded[cat.id] && (
                      <tr className="bg-gray-50">
                        <td colSpan="4" className="px-6 py-4">
                          <ul className="list-disc list-inside text-sm text-gray-700">
                            {subcategories[cat.id]?.length > 0 ? (
                              subcategories[cat.id].map((sub) => (
                                <li key={sub.id}>{sub.titre}</li>
                              ))
                            ) : (
                              <li>Aucune sous-catégorie.</li>
                            )}
                          </ul>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center px-6 py-4">
                    Aucun résultat trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-end">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
          />
        </div>

        {/* Modal de création */}
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Create new category </DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={newCategoryTitle}
              onChange={(e) => setNewCategoryTitle(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button 
            onClick={handleCloseModal}
            variant="contained" 
            sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: 'darkred' } }}
            >Undo
            </Button>
            <Button onClick={handleSaveCategory}
             variant="contained" 
             sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: 'darkgreen' } }}
           >Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};


//install npm install @mui/material @emotion/react @emotion/styled
// npm install @mui/material @emotion/react @emotion/styled @emotion/cache
//npm install @mui/icons-material
//npm install @mui/material @mui/icons-material

