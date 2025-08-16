import { useEffect, useState } from "react";
import { PropertyListDto } from "../../utils/interface";
import Filters from "../Filters/Filters";
import PropertyCard from "./PropertyCard/PropertyCard";
import { getList } from "../../Controllers/Properties";
import { useLoading } from "../../Context/LoadingContext/LoadingContext";
import Pagination from "../Commons/Pagination/Pagination";


const Properties: React.FC = () => {
  const [items, setItems] = useState<PropertyListDto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [params, setParams] = useState({});
  const { setLoading } = useLoading();

  const load = async  (p = params) => {
    setLoading(true);
    const res = await getList({ ...p, page: currentPage, pageSize: 20 });
    if(res.success){
        
        if(res.result){
            setItems(res.result); 
        }
        setTotalPages(Math.ceil(res.total / res.pageSize));
        setLoading(false);
    }
  }

  useEffect(() => { load(); }, [params, currentPage]);

  return (
    <div className="relative max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Propiedades</h1>
      <Filters onChange={(p) => { setParams(p); setCurrentPage(1); }} />
      {items.length === 0 && <div>No results</div>}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map(item => <PropertyCard key={item.id} p={item} />)}
      </div>

<Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

    </div>
  );
}

export default Properties;