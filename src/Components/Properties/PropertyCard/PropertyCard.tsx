import { PropertyListDto } from "../../../utils/interface";
import { ReceiptText } from 'lucide-react';

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
        <a
          href={`/properties/${p.id}`}
          className="inline-flex items-center gap-2 mt-2 text-blue-600 text-sm bg-blue-100 rounded p-1 hover:bg-blue-200 transition"
        >
        <ReceiptText size={16} />
        Ver detalles
      </a>
      </div>
    </div>
  );

}

export default PropertyCard;