import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UpdateCustomerDto } from "../dtos/customer/update-customer.dto";
import { QueryDto } from "../dtos/query.dto";
import { Customer } from "../models/customer.model";

@Injectable()
export class CustomerProvider {
    constructor(
        @InjectModel('Customer') private readonly model: Model<Customer>
    ) { }

    async create(data: Customer): Promise<Customer> {
        const customer = new this.model(data);
        return await customer.save();
    }

    async update(document: string, data: UpdateCustomerDto): Promise<Customer> {
        return await this.model.findOneAndUpdate({ document }, data);
    }

    async findAll(): Promise<Customer[]> {
        return await this.model
            .find({}, 'name email document')
            .populate('user', '')
            .sort('name')
            .exec();
    }

    async query(model: QueryDto): Promise<Customer[]> {
        return await this.model
            .find(model.query, model.fields, { skip: model.skip, limit: model.take })
            .exec();
    }
}