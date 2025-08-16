// Routes/routes.tsx (actualizar el archivo existente)
import { useRoutes } from "react-router-dom";
import Properties from "../Components/Properties/Properties";
import PropertyDetail from "../Components/Properties/PropertyDetail/PropertyDetail";


export const AppRoutes = () => {

  const routes = useRoutes([
    {
      path: "/",
      element: <Properties />,
    },
    {
      path: "/properties/:id",
      element: 
      <PropertyDetail />
    },
  ]);


  return (
    <div
      style={{
        width: "100vw",
        overflowY: "auto",
        height: "100svh",
      }}
    >
      <div className="page w-full">{routes}</div>
    </div>
  );
};