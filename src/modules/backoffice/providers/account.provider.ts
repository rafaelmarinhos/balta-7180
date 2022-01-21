import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customer } from "../models/customer.model";
import { User } from "../models/user.model";

@Injectable()
export class AccountProvider {
    constructor(
        @InjectModel('Customer') private readonly customerModel: Model<Customer>,
        @InjectModel('User') private readonly userModel: Model<User>
    ) { }

    async create(data: User): Promise<User> {
        const user = new this.userModel(data);
        return await user.save();
    }

    async authenticate(username, password): Promise<Customer> {
        var customer = await this.customerModel
            .findOne({ document: username })
            .populate('user')
            .exec();

        return await customer;
    }
}