const Filter = ({searchText,handleWordFind}) =>{
    


    return (
      <div>
        filter shown with <input type="text" value={searchText} onChange={handleWordFind} />
      </div>
    )
}

export default Filter