import { PropertyListDto } from "../../../utils/interface";

interface Props { 
   p: PropertyListDto;
};

const PropertyCard: React.FC<Props> = ({ p }) => {

    return (
    <div className="rounded-2xl shadow p-4 flex gap-4">
      <img
        src={p.image ?? "/placeholder.png"}
        alt={p.name}
        className="w-28 h-28 object-cover rounded-xl"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{p.name}</h3>
        <p className="text-sm text-gray-600">{p.address}</p>
        <p className="mt-2 font-medium">${p.price.toLocaleString()}</p>
        <a href={`/properties/${p.id}`} className="text-blue-600 text-sm mt-2 inline-block">Ver detalles</a>
      </div>
    </div>
  );

}

export default PropertyCard;