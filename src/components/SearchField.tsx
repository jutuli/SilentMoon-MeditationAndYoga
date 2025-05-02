
export interface ISearchFieldProps {
  doSearch: (value: string) => void;
}

export default function SearchField({doSearch}: ISearchFieldProps) {
  //platz für die Search - Funktion
  return (
    <>
      <div className="text-red w-full relative mb-5">
        <input
          type="text"
          className="relative w-full overflow-hidden rounded-3xl bg-gray-100 px-5 py-2"
          onChange={(e)=> doSearch(e.target.value)}
          placeholder="Type in what you're looking for..."
        />
      </div>
    </>
  );
}
