const Persons = ({persons,searchText}) => {
	
  const personChange = searchText ? persons.filter(person => person.name.trim().toLowerCase().includes(searchText.toLowerCase())) : persons
	
	return(
		personChange.map(person => <p key={person.name}>{person.name} {person.number}</p>)
	)
}

export default Persons