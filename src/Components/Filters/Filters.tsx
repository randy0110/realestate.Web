import { useState } from "react";
import { Search } from 'lucide-react';


interface Props { 
    onChange: (p: { name?: string; address?: string; priceMin?: number; priceMax?: number }) => void 
};

const Filters: React.FC<Props> = ({ onChange }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [priceMin, setMin] = useState<number | ''>('');
  const [priceMax, setMax] = useState<number | ''>('');

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onChange({
        name: name || undefined,
        address: address || undefined,
        priceMin: priceMin === '' ? undefined : Number(priceMin),
        priceMax: priceMax === '' ? undefined : Number(priceMax)
      }); }}
      className="grid gap-3 md:grid-cols-4"
    >
      <input className="border p-2 rounded" placeholder="Nombre" value={name} onChange={(e)=>setName(e.target.value)} />
      <input className="border p-2 rounded" placeholder="Dirección" value={address} onChange={(e)=>setAddress(e.target.value)} />
      <input className="border p-2 rounded" placeholder="Precio min" type="number" value={priceMin} onChange={(e)=>setMin(e.target.value as any)} />
      <input className="border p-2 rounded" placeholder="Precio max" type="number" value={priceMax} onChange={(e)=>setMax(e.target.value as any)} />
      <button className="col-span-full md:col-span-1 bg-black text-white rounded-[10px] p-2 flex items-center gap-4">
        <Search color="white" size={20} />
        Buscar
      </button>
    </form>
  );
}

export default Filters;