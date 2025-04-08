import { useEffect, useState } from "react";
import {
  Pagination,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import {  PrimaryButton } from "../../router";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import sCategoryService from "../../api/sCategoryService";
import categoryService from "../../api/categoryService";

export const SCategoryList = () => {
  const [sousCategories, setSousCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    loadSubcategories();
    loadCategories();
  }, []);

  const loadSubcategories = async () => {
    try {
      const data = await sCategoryService.getAllSubcategories();
      setSousCategories(data);
    } catch (error) {
      console.error("Erreur lors du chargement des sous-catégories", error);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Erreur lors du chargement des catégories", error);
    }
  };

  const filteredList = sousCategories.filter((item) => {
    const matchesSearch = item.titre.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCat ? item.categorieID === selectedCat : true;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = filteredList.slice(indexOfLastItem - itemsPerPage, indexOfLastItem);
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-6xl mt-32 mb-10 shadow-s1 p-8 rounded-lg bg-white">
        {/* <h1 className="text-xl font-semibold mb-6 text-center">Sous-catégories</h1> */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
       Sub Categories list
      </h1>
         {/* Bouton Create New */}
              <div className="mb-4 flex justify-between items-center">
                <PrimaryButton
                  className="bg-green-800 text-white px-6 py-2 rounded-md"
                  onClick={() => console.log("Créer une nouvelle catégorie")}
                >
                  Create new
                </PrimaryButton>
              </div>
        {/* Filtres */}
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <input
            type="text"
            placeholder="Recherche..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-3 py-2 rounded-md w-64"
          />

          <FormControl size="small" className="min-w-[200px]">
            <InputLabel id="select-cat">Categorie</InputLabel>
            <Select
              labelId="select-cat"
              value={selectedCat}
              label="Categorie"
              onChange={(e) => {
                setSelectedCat(e.target.value);
                setCurrentPage(1);
              }}
            >
              <MenuItem value="">Toutes</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.titre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Affichage sous forme de cartes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <Card key={item.id} className="shadow-md">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.titre}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Catégorie : {item.categorie ? item.categorie.titre : "Non défini"}
                  </Typography>
                </CardContent>
                <CardActions className="flex justify-end pr-4 pb-2">
                  <IconButton
                    onClick={() => console.log("Éditer", item.id)}
                    sx={{ color: "orange" }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => console.log("Supprimer", item.id)}
                    sx={{ color: "red" }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">
              Aucune sous-catégorie trouvée.
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
};
