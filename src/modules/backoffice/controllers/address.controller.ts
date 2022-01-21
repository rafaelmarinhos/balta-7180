import { Body, Controller, HttpException, HttpStatus, Param, Post, UseInterceptors } from "@nestjs/common";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreateAddressContract } from "../contracts/address/create-address.contract";
import { ResultDto } from "../dtos/result.dto";
import { Address } from "../models/address.model";
import { AddressProvider } from "../providers/address.provider";

@Controller('v1/addresses')
export class AddressController {

    constructor(
        private readonly provider: AddressProvider,
    ) { }

    @Post(':document/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async post(@Param('document') document, @Body() model: Address) {
        try {
            const address = await this.provider.create(document, model, AddressType.Billing);
            return new ResultDto('Endereço criado com sucesso', true, address, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível criar o endereço', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}