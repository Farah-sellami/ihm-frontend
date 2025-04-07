import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import categoryService from "../../api/categoryService";

export const Catgeorylist = () => {
  const [allCategories, setAllCategories] = useState([]); // toutes les catégories
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-6xl mt-32 mb-10 shadow-s1 p-8 rounded-lg bg-white">
        {/* Barre de recherche */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset page à 1 si on tape
            }}
            placeholder="Rechercher par titre..."
            className="border px-4 py-2 rounded-md w-full"
          />
        </div>

        {/* Tableau */}
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-[600px] w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Titre</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((cat, index) => (
                  <tr key={cat.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4">{cat.titre}</td>
                    <td className="px-6 py-4 text-right">...</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center px-6 py-4">
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
      </div>
    </div>
  );
};

//install npm install @mui/material @emotion/react @emotion/styled
// npm install @mui/material @emotion/react @emotion/styled @emotion/cache

