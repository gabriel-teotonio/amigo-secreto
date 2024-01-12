import { RequestHandler } from "express";
import * as groups from "../services/groups"
import { z } from "zod";

export const getAll: RequestHandler = async (req, res) => {
   const data = await groups.getAll()
   if(data) return res.json({ groups: data })

   res.json({error: "Ocorreu um erro"})
}

export const getGroup: RequestHandler = async (req, res) => {
   const { id, id_event } = req.params
   const data = await groups.getOne({
      id: parseInt(id),
      id_event: parseInt(id_event)
   })
   if(data) return res.json({ group: data })

   res.json({error: "Ocorreu um erro"})
}
export const addGroup: RequestHandler = async (req, res) => {
   const { id_event } = req.params 
   const addGroupSchema = z.object({
      name: z.string()
   })

   const body = addGroupSchema.safeParse(req.body)
   if(!body.success) return res.status(403).json({ error: "dados inválidos" })

   const data = await groups.add({
      name: body.data.name,
      id_event: parseInt(id_event),
   })
   if(data) return res.status(201).json({ group: data })
   
   res.json({error: "Ocorreu um erro"})
}

export const updateGroup: RequestHandler = async (req, res) => {
   const { id, id_event } = req.params
   const updateGroupSchema = z.object({
      name: z.string().optional()
   })
   const body = updateGroupSchema.safeParse(req.body)
   if(!body.success) return res.status(403).json({error: "dados inválidos"})

   const updatedGroup = await groups.update(
      {
         id: parseInt(id),
         id_event: parseInt(id_event)
      }, body.data)
   if(updatedGroup) return res.json({ group: updatedGroup })

   res.json({error: "Ocorreu um erro"})
}

export const removeGroup: RequestHandler = async (req, res) => {
   const { id, id_event } = req.params
   const deletedGroup = await groups.remove({
      id: parseInt(id),
      id_event: parseInt(id_event)
   })
   if(deletedGroup) return res.json({group: deletedGroup})

   res.json({error: "Ocorreu um erro"})
}