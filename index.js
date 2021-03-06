const express = require("express");
const knex = require("knex");

const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

//------------PROJECTS----------------

// GET

server.get("/projects", (req, res) => {
    db("projects")
      .then(projects => {
          res.status(200).json(projects)
      })
      .catch(err => {
          res.status(500).json(err)
      });
  });

  
  // GET BY ID
  
  server.get("/projects/:id", (req, res) => {
    const { id } = req.params;
    db("projects")
      .where({ id: id})
      .then(projects => {
          res.status(200).json(projects)
      })
      .catch(err => {
          res.status(500).json(err)
      });
  });
  

// POST

server.post("/projects", (req, res) => {
    const projects = req.body;

    db("projects")
      .insert(projects)
      .into("projects")
      .then(ids => {
          res.status(201).json({ids})
      })
      .catch(err => {
          res.status(500).json({ error: err })
      });
  });

  // UPDATE

server.put("/projects/:id", (req, res) => {
    const changes = req.body;
    const {id} = req.params;
    db("projects")
      .where({ id: id })
      .update(changes)
      .then(count => {
          res.status(200).json(count)
      })
      .catch(err => res.status(500).json({ error: err }));
  });

// DELETE

server.delete("/projects/:id", (req, res) => {
    const { id } = req.params;
    db("cohorts")
      .where({id:id})
      .del()
      .then(ids => {
          res.status(200).json(ids)
      })
      .catch(err => {
          res.status(500).json({ error: err })
      });
  });

//------------ACTIONS----------------

// GET

server.get("/actions", (req, res) => {
    db("actions")
      .then(actions => {
          res.status(200).json(actions)
      })
      .catch(err => {
          res.status(500).json(err)
      });
  });

  // GET BY ID

server.get("/actions/:id", (req, res) => {
    const { id } = req.params;
    db("actions")
      .where({ id: id})
      .then(actions => {
          res.status(200).json(actions)
      })
      .catch(err => {
          res.status(500).json(err)
      });
  });

// POST

server.post("/actions", (req, res) => {
    const actions = req.body;

    db("actions")
      .insert(actions)
      .then(ids => {
          res.status(201).json(ids)
      })
      .catch(err => {
          res.status(500).json({ error: err })
      });
  });

// UPDATE

server.put("/actions/:id", (req, res) => {
    const changes = req.body;
    const {id} = req.params;
    db("actions")
      .where({ id: id })
      .update(changes)
      .then(count => {
          res.status(200).json(count)
      })
      .catch(err => res.status(500).json({ error: err }));
  });

// DELETE

server.delete("/actions/:id", (req, res) => {
    const { id } = req.params;
    db("actions")
      .where({id:id})
      .del()
      .then(ids => {
          res.status(200).json(ids)
      })
      .catch(err => {
          res.status(500).json({ error: err })
      });
  });


  //------------PROJECTS&ACTIONS----------------

    // GET BY ID WITH PROJECTS AND ACTIONS

server.get("/projects/:id/actions", (req, res) => {
    const { id } = req.params;
    db("projects")
      .where({ id: id})
      .first()
      .then(projects => {
          if (projects) {
            db("actions")
            .where({ project_id: id})
            .then(actions => {
                projects.actions = actions;
                res.status(200).json(projects)
            })
            .catch(err => {
                res.status(500).json(err)
            });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
          })
      .catch(err => {
          res.status(500).json(err)
      });
  });



server.listen(6000, () => console.log("\n== Port 6k ==\n"));