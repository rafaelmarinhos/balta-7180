import { Body, Controller, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreatePetContract } from "../contracts/pet/create-pet.contract";
import { ResultDto } from "../dtos/result.dto";
import { Pet } from "../models/pet.model";
import { PetProvider } from "../providers/pet.provider";

@Controller('v1/pets')
export class PetController {

    constructor(
        private readonly provider: PetProvider,
    ) { }

    @Post(':document/')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async post(@Param('document') document, @Body() model: Pet) {
        try {
            const pet = await this.provider.create(document, model);
            return new ResultDto('Pet criado com sucesso', true, pet, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível criar o pet', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':document/:id')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async update(@Param('document') document, @Param('id') id, @Body() model: Pet) {
        try {
            const pet = await this.provider.update(document, id, model);
            return new ResultDto('Pet atualizado com sucesso', true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível atualizar o pet', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}