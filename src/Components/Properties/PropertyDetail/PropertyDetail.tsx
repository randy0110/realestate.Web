import { useEffect, useState } from "react";
import { GetByIdPropertiesDto } from "../../../utils/interface";
import { useLoading } from "../../../Context/LoadingContext/LoadingContext";
import { useParams } from "react-router-dom";
import { getById } from "../../../Controllers/Properties";

const PropertyDetail: React.FC = () => {
  const [data, setData] = useState<GetByIdPropertiesDto | undefined>(undefined);
  const { setLoading } = useLoading();
  const { id } = useParams();

  const load = async () => {
    if (id) {
      setLoading(true);
      const res = await getById(id);
      if (res.success) {
        if (res.result) {
          setData(res.result);
        }
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if(!data){
    return <></>;
  }

  return (
    <div className="relative max-w-4xl mx-auto space-y-4">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold">{data.name}</h1>
        <p className="text-gray-600">{data.address}</p>
        <a href={`/`} className="text-blue-600 text-3xl font-bold mt-2 inline-block absolute right-8 top-2 ">x</a>
      </div>

      {/* Imagen principal */}
      {data.images?.length > 0 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {data.images.filter(i => i.enabled).map((img, i) => (
            <img
              key={i}
              src={img.file ?? "/placeholder.png"}
              alt={`Property image ${i + 1}`}
              className="w-60 h-40 object-cover rounded-xl shadow"
            />
          ))}
        </div>
      )}

      {/* Datos generales */}
      <div className="bg-white shadow rounded-xl p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        <div>
          <h2 className="font-semibold">Precio</h2>
          <p>${data.price.toLocaleString()}</p>
        </div>
        <div>
          <h2 className="font-semibold">Año</h2>
          <p>{data.year}</p>
        </div>
        <div>
          <h2 className="font-semibold">Codigo Interno</h2>
          <p>{data.codeInternal}</p>
        </div>
      </div>

      {/* Datos propietario */}
      <div className="bg-white shadow rounded-xl p-4">
        <div>
          <h2 className="font-semibold">Propietario</h2>
          
        </div>
        <div>

          <div className="flex flex-col gap-3 overflow-x-auto pb-2">
            <img
              src={data.owner?.photo ?? "/placeholder.png"}
              alt={`Property image`}
              className="w-60 h-40 object-cover rounded-xl shadow"
            />
            <p>{data.owner?.name}</p>
            <p>{data.owner?.address}</p>
            <p>{data.owner?.birthday}</p>
        </div>
        </div>
      </div>

      {/* Historial de ventas */}
      {data.traces && data.traces.length > 0 && (
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-3">Historial de ventas</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Fecha</th>
                <th className="text-left p-2">Nombre</th>
                <th className="text-left p-2">Valor</th>
                <th className="text-left p-2">Impuestos</th>
              </tr>
            </thead>
            <tbody>
              {data.traces.map((t, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">
                    {new Date(t.dateSale).toLocaleDateString()}
                  </td>
                  <td className="p-2">{t.name}</td>
                  <td className="p-2">${t.value.toLocaleString()}</td>
                  <td className="p-2">${t.tax.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
