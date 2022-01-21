import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/shared/services/auth.service';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';
import { AccountController } from './controllers/account.controller';
import { AddressController } from './controllers/address.controller';
import { CustomerController } from './controllers/customer.controller';
import { PetController } from './controllers/pet.controller';
import { AccountProvider } from './providers/account.provider';
import { AddressProvider } from './providers/address.provider';
import { CustomerProvider } from './providers/customer.provider';
import { PetProvider } from './providers/pet.provider';
import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: 'secretKey',
            signOptions: {
                expiresIn: 3600,
            },
        }),
        MongooseModule.forFeature([
            {
                name: 'Customer',
                schema: CustomerSchema,
            },
            {
                name: 'User',
                schema: UserSchema,
            },
        ]),
    ],
    controllers: [
        AccountController,
        AddressController,
        CustomerController,
        PetController
    ],
    providers: [
        AccountProvider,
        AddressProvider,
        CustomerProvider,
        PetProvider,
        AuthService,
        JwtStrategy
    ]
})
export class BackofficeModule { }
