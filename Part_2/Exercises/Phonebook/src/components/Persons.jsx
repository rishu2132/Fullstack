const Persons = ({person,deleteNumber}) => {
	
	return(
		 <p >
			{person.name} {person.number}
			<button onClick={deleteNumber}>delete</button>
		</p>)
	
}

export default Persons