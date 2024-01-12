import { RequestHandler } from "express";
import * as people from "../services/people"
import { z } from "zod";
import { decryptMatch } from "../utils/match";
import { Console } from "console";

export const getAll: RequestHandler = async (req, res) => {
   const { id_event, id_group } = req.params

   const data = await people.getAll({
      id_event: parseInt(id_event),
      id_group: parseInt(id_group)
   })
   if(data) return res.json({ people: data })

   res.json({error: "Ocorreu um erro"})
}

export const getPerson: RequestHandler = async (req, res) => {
   const { id_event, id_group, id } = req.params

   const data = await people.getOne({
      id: parseInt(id),
      id_event: parseInt(id_event),
      id_group: parseInt(id_group)
   })
   if(data) return res.json({ person: data })

   res.json({error: "Ocorreu um erro"})
}
export const addPerson: RequestHandler = async (req, res) => {
   const { id_event, id_group } = req.params

   const peopleSchema = z.object({
      name: z.string(),
      cpf: z.string().transform(val => val.replace(/\.|-/gm, "")),
   })

   const body = peopleSchema.safeParse(req.body)
   if(!body.success) return res.status(403).json({error: "Dados inválidos"})

   const newPerson = await people.add({
      ...body.data,
      id_event: parseInt(id_event),
      id_group: parseInt(id_group)
   })
   
   if(newPerson) return res.status(201).json({person: newPerson})
   
   res.json({error: "Ocorreu um erro"})
}

export const updatePerson: RequestHandler = async (req, res) => {
   const { id_event, id_group, id } = req.params

   const peopleUpdateSchema = z.object({
      name: z.string().optional(),
      cpf: z.string().transform(val => val.replace(/\.|-/gm, "")).optional(),
      matched: z.string().optional()
   })

   const body = peopleUpdateSchema.safeParse(req.body)
   if(!body.success) return res.status(403).json({error: "Dados inválidos"})

   const updatedPerson = await people.update({
      id: parseInt(id),
      id_event: parseInt(id_event),
      id_group: parseInt(id_group)
   }, body.data)
   
   if(updatedPerson) {
      const personItem = await people.getOne({
         id: parseInt(id),
         id_event: parseInt(id_event)
      })
      return res.json({person: personItem})
   }
   
   res.json({error: "Ocorreu um erro"})
}

export const removePerson: RequestHandler = async (req, res) => {
   const { id_event, id_group, id } = req.params

   const deletedPeople = await people.remove({
      id_event: parseInt(id_event),
      id_group: parseInt(id_group),
      id: parseInt(id)
   })
   if(deletedPeople) return res.json({ people: deletedPeople })

   res.json({error: "Ocorreu um erro"})
}

export const searchPerson: RequestHandler = async (req, res) => {
   const { id_event } = req.params

   const searchPersonSchema = z.object({
      cpf: z.string().transform(val => val.replace(/\.|-/gm, ""))
   })
   const query = searchPersonSchema.safeParse(req.query)
   if(!query.success) return res.status(403).json({error: "Dados inválidos"})

   const personItem = await people.getOne({
      id_event: parseInt(id_event),
      cpf: query.data.cpf
   })

   console.log(personItem)

   if(personItem && personItem.matched){
      const matchId = decryptMatch(personItem.matched)
       console.log(matchId)
      const personMatched = await people.getOne({
         id_event: parseInt(id_event),
         id: matchId
      })
      if(personMatched){
         return res.json({
            person: {
               id: personItem.id,
               name: personItem.name
            },
            personMatched: {
               id: personMatched.id,
               name: personMatched.name
            }
         })
      }
   }

   res.json({error: "Ocorreu um erro"})
}