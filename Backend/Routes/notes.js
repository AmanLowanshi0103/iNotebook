const express = require('express')
const fectchuser = require('../Middleware/fetchuser')
const router =express.Router()
const Notes=require("../Modules/Notes.js")
const { body, validationResult } = require('express-validator');

//Route 1: {Get} all notes /api/notes/fetchallnotes : login required
router.get("/fetchallnotes",fectchuser,async(req,res)=>
{
    try {
        console.log(req.user)
        const notes= await Notes.find({User:req.user})// finding all the related notes in backed realted to the user
        res.json(notes)//sending the response in the jason
    } catch (err)
    {
        console.log(err)
        res.status(500).json({erros:"some error accured"})//catching the miscellaneous error 
    }
})

//Route 2: {Post} creating new notes /api/notes/createnotes : login required
router.post("/createnotes",fectchuser,[
    body("Title","title should not be less than 5 characters").isLength({min:2}),// validation in the title and Description field
    body("Description","description should not be less than 5 characters").isLength({min:5})
],async(req,res)=>
    {
        const {Title,Description}=req.body//concatinating title and Description from the request body
try {
    const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });//sending bad request when error accoured
}
const notes= new Notes({
    Title,
    Description,
    User:req.user
})  // create a note with note schema
const saveNotes= await notes.save(notes)//saving the notes in the database
res.json(saveNotes)//sending the jason response in the API
} catch (err)
{
    console.log(err)
    res.status(500).json({erros:"some error accured"})//catching the miscellaneous error 
}
})


//Route 3: {Put} updating notes /api/notes/updatenotes : login required
router.put("/updatenotes/:id",fectchuser,async(req,res)=>
    { 
        try {
        const { Title, Description}=req.body // destructring the Title and description from the request body
        const newNote= {} // creating an empty note
        if(Title){newNote.Title=Title} // checking if title is present in the request body
        if(Description){newNote.Description=Description} // checking if title is present in the request body
        let note=await Notes.findById(req.params.id) //// checking if the note is present in the database
        if(!note){
            return res.status(404).send({error:"Note Not found"})// sending the bad request when desired note is not found
        } 
        // console.log(req.user)
        // console.log(note.User.toString())
        if(note.User.toString()!==req.user){// checking the note user and token user is same or not
            return res.status(401).send({error:"Not Allowed"})// sending the bad request when note user and token user is different
        }
        note=await Notes.findByIdAndUpdate(req.params.id,newNote,{new:true})// finding the note by id and updating it.
        res.json({note}) //sending the note as response if every things work well request 
        } catch (err) 
        {
            console.log(err)
            res.status(500).json({erros:"some error accured"})//catching the miscellaneous error 
        }
    })

//Route 4: {Delete} Deleting the existing notes /api/notes/delete/:id : login required
router.delete("/delete/:id",fectchuser,async(req,res)=>
    { 
        try {
            let note=await Notes.findById(req.params.id)//// checking if the note is present in the database
            if(!note){
                return res.status(404).send({error:"Note Not found"})// sending the bad request when desired note is not found
            } 
            // console.log(req.user)
            // console.log(note.User.toString())
            if(note.User.toString()!==req.user){// checking the note user and token user is same or not
                return res.status(401).send({error:"Not Allowed"})// sending the bad request when note user and token user is different
            }
            note=await Notes.findByIdAndDelete(req.params.id)// finding the note by id and deleteing it.
            res.json({"Success":"Your Note has been deleted sucessfully"}) //seding the response if every thing work well
            } catch (err) 
            {
                console.log(err)
                res.status(500).json({erros:"some error accured"})//catching the miscellaneous error 
            }

    })

module.exports=router