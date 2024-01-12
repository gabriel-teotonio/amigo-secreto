import { Prisma, PrismaClient } from "@prisma/client";
import * as groups from '../services/groups'

const prisma = new PrismaClient()

type GetAllFilters = {id_event: number; id_group?: number;}
export const getAll = async (filters: GetAllFilters) => {
   try{
      return await prisma.eventPeople.findMany({where: filters})
   } catch (error) {return false}
}

type GetOneFilters = {id_event: number; id_group?: number; id?: number; cpf?: string;}
export const getOne = async (filters: GetOneFilters) => {
   try{
      if(!filters.id && !filters.cpf) return false
      return await prisma.eventPeople.findFirst({where: filters})
   } catch (error) {return false}
}

type PeopleCreateData = Prisma.Args<typeof prisma.eventPeople, 'create'>['data']
export const add = async (data: PeopleCreateData) => {
   try{
      if(!data.id_group) return false

      const group = await groups.getOne({
         id: data.id_group,
         id_event: data.id_event
      })
      if(!group) return false
      
      return await prisma.eventPeople.create({data})
   } catch (error) {return false}
}

type PeopleUpdateFilters = {id_event: number; id_group?: number; id?: number;}
type PeopleUpdateData = Prisma.Args<typeof prisma.eventPeople, 'update'>['data']
export const update = async (filters: PeopleUpdateFilters, data: PeopleUpdateData) => {
   try{
      return await prisma.eventPeople.updateMany({where: filters, data})
   } catch (error) {return false}
}

type PeopleRemoveFilters = {id_event?: number; id_group?: number; id: number;}
export const remove = async (filters: PeopleRemoveFilters) => {
   try{
      return await prisma.eventPeople.delete({where: filters})
   } catch (error) {return false}
}