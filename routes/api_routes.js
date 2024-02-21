const router = require("express").Router();
const store = require("../db/store");

module.exports = router;

//Created store file
//API to get notes
router.get("/notes",(req,res)=>{
    store.getNotes().then((notes)=>{
        return res.json(notes)
    })
    .catch((err)=>res.status(500).json(err))
})