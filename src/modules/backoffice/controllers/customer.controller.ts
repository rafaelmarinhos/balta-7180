import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreateCustomerContract } from "../contracts/customer/create-customer.contract";
import { UpdateCustomerContract } from "../contracts/customer/update-customer.contract";
import { QueryContract } from "../contracts/query.contract";
import { CreateCustomerDto } from "../dtos/customer/create-customer.dto";
import { UpdateCustomerDto } from "../dtos/customer/update-customer.dto";
import { QueryDto } from "../dtos/query.dto";
import { ResultDto } from "../dtos/result.dto";
import { Customer } from "../models/customer.model";
import { User } from "../models/user.model";
import { AccountProvider } from "../providers/account.provider";
import { CustomerProvider } from "../providers/customer.provider";

@Controller('v1/customers')
export class CustomerController {

    constructor(
        private readonly accountProvider: AccountProvider,
        private readonly customerProvider: CustomerProvider,
    ) { }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() model: CreateCustomerDto) {

        try {
            // const user = await this.accountProvider.create(
            //     new User(model.document, model.password, "Male", true, ['user']),
            // );

            const customer = await this.customerProvider.create(
                new Customer(model.name, model.document, model.email, model.type),
            );

            return new ResultDto('Cliente criado com sucesso', true, customer, null,);

        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível realizar seu cadastro', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':document')
    @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
    async update(@Param('document') document, @Body() model: UpdateCustomerDto) {
        try {
            const customer = await this.customerProvider.update(document, model);
            return new ResultDto('Pet atualizado com sucesso', true, customer, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível atualizar o pet', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async getAll() {
        const costumers = await this.customerProvider.findAll();
        return costumers;
    }

    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
    async query(@Body() model: QueryDto) {
        const customers = await this.customerProvider.query(model);
        return new ResultDto(null, true, customers, null);
    }
}