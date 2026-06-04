const mongoose = require('mongoose')

if (process.argv.length < 3){
  console.log('please enter the password')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Utkfullstack:${password}@cluster0.hfieplm.mongodb.net/PhonebookApp?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url,{ family:4 })

const numberSchema = new mongoose.Schema({
  name: String,
  number:String,
})

const PhoneNumber = mongoose.model('PhoneNumber', numberSchema)

if (process.argv.length > 3){

  const person = new PhoneNumber({
    name: process.argv[3],
    number:process.argv[4],
  })

  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })

}

if (process.argv.length === 3){

  PhoneNumber.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}



