"use client"

export default function SectionSelect() {

    // const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setCurrentEnseignant({
    //             ...currentEnseignant,
    //         [e.target.name]: e.target.value,
    //     });
    // };
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Sexe*</label>
        <select
            name="sexe"
            value={""}
            // onChange={handleSelectChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            required
        >
            <option value="">-- sexe --</option>
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
        </select>
    </div>
  )
}
