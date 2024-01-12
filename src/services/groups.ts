import { Prisma, PrismaClient } from "@prisma/client";
import * as events from "../services/events"

const prisma = new PrismaClient()

export const getAll = async () => {
   try{
      return await prisma.eventGroup.findMany()
   } catch (error) {return false}
}

type GetOneFilters = {id: number; id_event?: number}
export const getOne = async (filters: GetOneFilters) => {
   try{
      return await prisma.eventGroup.findFirst({where: filters})
   } catch(error) {return false}
}

type GroupCreateData = Prisma.Args<typeof prisma.eventGroup, 'create'>['data']
export const add = async (data: GroupCreateData) => {
   try{
      if(!data.id_event) return false

      const event = await events.getOne(data.id_event)
      if(!event) return false

      return await prisma.eventGroup.create({data})
   } catch(error) {return false}
}
type UpdateFilters = {id: number, id_event: number}
type GroupUpdateData = Prisma.Args<typeof prisma.eventGroup, 'update'>['data']
export const update = async (filters:UpdateFilters, data:GroupUpdateData) => {
   try {
      return await prisma.eventGroup.update({where: filters, data})
   } catch (error) {return false}
}

type DeleteFilters = {id: number, id_event: number}
export const remove = async (filters: DeleteFilters) => {
   try {
      return await prisma.eventGroup.delete({where: filters})
   } catch (error) {return false}
}