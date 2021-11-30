const { Shift } = require('../../models/Shift')

const createShift= async (req , res) =>{
    const { kindOfShift,
            availability,
            capacity,
            beginning,
            ending,
            weekday,
            week,
            month,
            year} = req.body
    try{
        const newShift = await Shift.create({ 
            kindOfShift, 
            availability, 
            capacity, 
            beginning, 
            ending, 
            week, 
            weekday, 
            month, 
            year});

        res.send(newShift)
    }
    catch(err){
        res.send(err)
    }}

    

const getAllShifts = async (req , res) =>{
    try{
        const allShift = await Shift.findAll()
        res.json(allShift)
    }
    catch(err){
        res.send(err)
    }
}

const getShiftById = async(req , res) =>{
    const {id} = req.params

    try{
        const oneShift= await Shift.findOne({where:{id:id}})
        res.send(oneShift)
    }
    catch(error){
        next(error)
    }

}

const updateShift = async (req , res) =>{
    const{id, prop} = req.params
    const {update} = req.body
try{
    let oneShift = await Shift.findOne({where:{id:id}})
    oneShift[prop]= update
    console.log(oneShift)
    await oneShift.save()
    res.send(oneShift)
}
catch(err){
    res.send(err)
}
}

const deleteShift = async (req , res) =>{
    const {id} = req.params
    try{
        await Shift.destroy({where:{id:id}})
        res.send({message: "Shift successfully deleted"})
    }
    catch(err){
        res.send(err)
    }
    }

module.exports = { getAllShifts, createShift, updateShift, deleteShift, getShiftById };