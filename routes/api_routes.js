const router = require("express").Router();
const store = require("../db/store");


//Created store file
//API to get notes
router.get("/notes",(req,res)=>{
    store.getNotes().then((notes)=>{
        return res.json(notes)
    })
    .catch((err)=>res.status(500).json(err))
})

//Create note
router.post('/notes', (req, res) => {
    store
      .addNote(req.body)
      .then((note) => res.json(note))
  });
  
//Delete note
  router.delete('/notes/:id', (req, res) => {
    store
      .removeNote(req.params.id)
      .then(() => res.json({ ok: true }))
      .catch((err) => res.status(500).json(err));
  });

  module.exports = router;